from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from PIL import Image
import torch
import numpy as np
import cv2
from torchvision import models, transforms
import os
from gradio_client import Client, handle_file
from groq import Groq
from django.conf import settings

# === PLACEHOLDER PATHS ===
VGG_MODEL_PATH = "E:\Sky_Mappers\Sky_Mappers\Models\pretrained.pth"
IMAGE_OUTPUT_DIR = "E:\Sky_Mappers\Sky_Mappers\Models\op"
os.makedirs(IMAGE_OUTPUT_DIR, exist_ok=True)

# Load class names
CLASS_NAMES = [
    "Actinic keratosis", "Atopic Dermatitis", "Benign keratosis",
    "Dermatofibroma", "Melanocytic nevus", "Melanoma",
    "Squamous cell carcinoma", "Tinea Ringworm Candidiasis", "Vascular lesion"
]

# Load model
vgg_model = models.vgg16(pretrained=False)
vgg_model.classifier[6] = torch.nn.Linear(vgg_model.classifier[6].in_features, len(CLASS_NAMES))
vgg_model.load_state_dict(torch.load(VGG_MODEL_PATH, map_location='cpu'))
vgg_model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

def generate_gradcam(image: Image.Image, model):
    input_tensor = transform(image).unsqueeze(0)
    gradients, activations = [], []

    def save_gradients_hook(module, grad_input, grad_output):
        gradients.append(grad_output[0])

    def save_activations_hook(module, input, output):
        activations.append(output)

    target_layer = model.features[-1]
    target_layer.register_forward_hook(save_activations_hook)
    target_layer.register_backward_hook(save_gradients_hook)

    output = model(input_tensor)
    _, pred_idx = torch.max(output, 1)
    output[0, pred_idx].backward()

    grads = gradients[0].detach().numpy()[0]
    acts = activations[0].detach().numpy()[0]
    weights = np.mean(grads, axis=(1, 2))
    cam = np.zeros(acts.shape[1:], dtype=np.float32)
    for i, w in enumerate(weights):
        cam += w * acts[i]

    cam = np.maximum(cam, 0)
    cam = cv2.resize(cam, (224, 224))
    cam -= cam.min()
    cam /= cam.max()

    np_img = np.array(image.resize((224, 224)))
    heatmap = cv2.applyColorMap(np.uint8(255 * cam), cv2.COLORMAP_JET)
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
    overlay = np.float32(heatmap) * 0.4 + np.float32(np_img) * 0.6
    overlay = np.uint8(overlay)

    return overlay, CLASS_NAMES[pred_idx]

def describe_with_vlm(image_path):
    client = Client("fancyfeast/joy-caption-alpha-two")
    result = client.predict(
        handle_file(image_path),
        "Descriptive",
        "long",
        [],
        "",
        "Describe where the heatmap is focused in the image with respect to the image. "
        "Warmer colors (like red and yellow) indicate higher importance, while cooler colors "
        "indicate lower importance. Tell where there is higher importance with respect to the image.",
        api_name="/stream_chat"
    )
    return result

def generate_final_report_groq(predicted_class, vlm_text):
    system_prompt = (
        f"The system predicted a skin condition called '{predicted_class}'. "
        f"The visual heatmap interpreter said: \"{vlm_text}\". "
        f"Based on this, explain briefly:\n"
        f"- What the condition is.\n"
        f"- Why this condition was predicted using Grad-CAM evidence.\n"
        f"- What are possible remedies and when to seek medical attention.\n"
        f"Respond in plain English for patients, and be empathetic but precise."
    )

    client = Groq(api_key="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")
    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{"role": "user", "content": system_prompt}],
        temperature=0.7,
        max_tokens=512
    )
    return response.choices[0].message.content

class SkinDiagnosisAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('image')
        if not file_obj:
            return Response({"error": "Image not provided."}, status=status.HTTP_400_BAD_REQUEST)

        image = Image.open(file_obj).convert("RGB")
        gradcam_overlay, pred_class = generate_gradcam(image, vgg_model)

        gradcam_path = os.path.join(IMAGE_OUTPUT_DIR, "gradcam_overlay.jpg")
        Image.fromarray(gradcam_overlay).save(gradcam_path)

        try:
            vlm_text = describe_with_vlm(gradcam_path)
            groq_summary = generate_final_report_groq(pred_class, vlm_text)
        except Exception as e:
            return Response({"error": f"Processing failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            "predicted_class": pred_class,
            "vlm_description": vlm_text,
            "groq_summary": groq_summary
        }, status=status.HTTP_200_OK)
