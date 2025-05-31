# 🌐 DermaX – Advanced Skin Analysis Platform

**DermaX** is a full-stack medical AI platform that allows users to upload skin disease images and receive predictions using a VGG-based classifier, Grad-CAM visual explanation, and LLM-powered medical reasoning.

---

## 🛠️ Tech Stack

- 🔧 **Frontend**: [Next.js](https://nextjs.org/) (React)
- 🔧 **Backend**: [Django](https://www.djangoproject.com/) (Django REST Framework)
- 🧠 **ML**: PyTorch (VGG16), Grad-CAM, Gradio Client, Groq API (LLM)
- 🧪 **Model Types**: Classification, XAI (Explainable AI)

---

## 🧠 What It Can Detect

DermaX can classify skin anomalies such as:

- Actinic keratosis
- Atopic Dermatitis
- Benign keratosis
- Dermatofibroma
- Melanocytic nevus
- Melanoma
- Squamous cell carcinoma
- Tinea/Ringworm/Candidiasis
- Vascular lesions

---

## 🔐 Authentication & User Flow

- 🧾 **User Registration** (`/register`)
- 🔐 **Login** (`/`)
- 📊 **Protected Dashboard** (`/dashboard`)
- 🔓 **Token-based authentication**
- ✅ Secure routes and access control

---

## 📦 Key Features

- 📤 Upload skin image for diagnosis
- 🎯 AI model performs classification
- 🔥 Grad-CAM heatmap visualization
- 🧠 VLM + LLM generate user-friendly medical explanations
- 🔄 Fullstack integration (Next.js ↔ Django ↔ PyTorch ↔ Groq)
- 🛡️ Protected routes with JWT/token verification

---

## 📁 Project Structure

```text
DermaX/
├── Backend/
│   ├── manage.py
│   ├── requirements.txt
│   └── Sky_Mappers/
│       ├── settings.py         # DRF, auth, AI model paths
│       ├── urls.py
│       ├── api/                # Inference logic
│       └── accounts/           # Auth logic
├── terraview/
│   ├── package.json
│   ├── public/
│   │   └── bg.png, reg.png     # UI assets
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js
│   │   │   ├── page.jsx        # Login
│   │   │   ├── register/page.jsx
│   │   │   └── dashboard/page.jsx
│   │   └── components/
│   │       ├── Navbar.jsx
│   │       ├── login-form.jsx
│   │       ├── RegisterForm.jsx
│   │       └── imageUploader.jsx
│   └── styles/
│       └── globals.css
├── Sample_Images/
│   ├── input/                  # Example input images
│   └── output/                 # Grad-CAM output
└── README.md
