"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, Loader2, FileImage, Check, AlertCircle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [predictions, setPredictions] = useState(null)
  const [vlmDescription, setVlmDescription] = useState(null)
  const [groqSummary, setGroqSummary] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      setProcessedImage(null)
      setError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedImage) {
      setError("Please select an image.")
      return
    }

    setLoading(true)
    setError(null)
    // Reset all results
    setPredictions(null)
    setVlmDescription(null)
    setGroqSummary(null)
    setProcessedImage(null)

    const formData = new FormData()
    formData.append("image", selectedImage)

    try {
      const response = await fetch("http://localhost:8000/images/segment/", {
        method: "POST",
        body: formData,
      })

      const contentType = response.headers.get("Content-Type")

      if (!response.ok) {
        if (contentType?.includes("application/json")) {
          const errorData = await response.json()
          setError(errorData.error || "Failed to process image.")
        } else {
          const text = await response.text()
          setError("Unexpected server error: " + text.slice(0, 100))
        }
        return
      }

      const data = await response.json()
      setPredictions(data.predicted_class || null)
      setVlmDescription(data.vlm_description || null)
      setGroqSummary(data.groq_summary || null)
    } catch (err) {
      console.error("Fetch error:", err.message)
      setError(`An error occurred: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="upload-section">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          DermaX
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="image-upload" className="text-gray-700">Upload Image</Label>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all",
                "hover:border-[#27A89C] hover:bg-[#E6FAF7]/50",
                selectedImage ? "border-[#27A89C] bg-[#E6FAF7]/20" : "border-gray-300"
              )}
              onClick={() => document.getElementById("image-upload").click()}
            >
              <input
                type="file"
                id="image-upload"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              {selectedImage ? (
                <div className="space-y-2">
                  <FileImage className="medical-icon w-12 h-12 mx-auto" />
                  <p className="text-sm text-gray-600">{selectedImage.name}</p>
                  <span className="status-badge">
                    <Check className="w-4 h-4 mr-2" />
                    Image Selected
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="medical-icon w-12 h-12 mx-auto" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="flex items-center text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}

          <Button
            type="submit"
            className={cn(
              "w-full bg-[#27A89C] hover:bg-[#1F8277] text-white",
              loading && "opacity-50 cursor-not-allowed"
            )}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Image...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Analyze Image
              </>
            )}
          </Button>
        </form>

        {(predictions || vlmDescription || groqSummary) && (
          <div className="mt-6 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-[#27A89C] pb-2">
              Analysis Results
            </h3>

            <div className="space-y-4">
              {/* Prediction Result */}
              {predictions && (
                <div className="bg-white rounded-lg p-4 border border-[#27A89C]/20">
                  <h4 className="font-medium text-gray-700 mb-2">Predicted Condition</h4>
                  <p className="text-lg font-semibold text-[#27A89C]">{predictions}</p>
                </div>
              )}

              {/* VLM Description */}
              {vlmDescription && (
                <div className="bg-white rounded-lg p-4 border border-[#27A89C]/20">
                  <h4 className="font-medium text-gray-700 mb-2">Visual Analysis</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Original Image */}
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Original Image</p>
                        {selectedImage && (
                          <div className="flex justify-center">
                            <img
                              src={URL.createObjectURL(selectedImage)}
                              alt="Original"
                              className="w-auto h-[200px] rounded-lg border border-[#27A89C]/20 object-contain"
                            />
                          </div>
                        )}
                      </div>
                      {/* GradCAM Overlay */}
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Attention Map</p>
                        <div className="flex justify-center">
                          <img
                            src="/op/gradcam_overlay.jpg"
                            alt="GradCAM Overlay"
                            className="w-auto h-[200px] rounded-lg border border-[#27A89C]/20 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Description Text */}
                    <div className="space-y-3">
                      {vlmDescription.map((description, index) => (
                        <p key={index} className="text-gray-600 text-sm leading-relaxed">
                          {description}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Groq Summary */}
              {groqSummary && (
                <div className="bg-white rounded-lg p-4 border border-[#27A89C]/20">
                  <h4 className="font-medium text-gray-700 mb-2">Medical Summary</h4>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                      {groqSummary}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
