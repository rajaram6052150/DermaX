"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import ImageUploader from "@/components/imageUploader"
import "./styles.css"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/")
    }
  }, [router])

  return (
    <div className="min-h-[calc(100vh-4rem)] medical-background">      <div className="absolute inset-0 medical-pattern" aria-hidden="true" />
      {/* Molecule Decorations */}<div className="molecule-decorations" aria-hidden="true">
        {/* Top Left Corner Molecules */}
        <svg className="molecule-9" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="6" fill="#27A89C"/>
          <circle cx="30" cy="30" r="4" fill="#27A89C"/>
          <circle cx="70" cy="30" r="4" fill="#27A89C"/>
          <circle cx="70" cy="70" r="4" fill="#27A89C"/>
          <circle cx="30" cy="70" r="4" fill="#27A89C"/>
          <line x1="50" y1="50" x2="30" y2="30" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="70" y2="30" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="70" y2="70" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="30" y2="70" stroke="#27A89C" strokeWidth="2"/>
        </svg>

        <svg className="molecule-10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="5" fill="#27A89C"/>
          <circle cx="50" cy="25" r="4" fill="#27A89C"/>
          <circle cx="75" cy="50" r="4" fill="#27A89C"/>
          <circle cx="50" cy="75" r="4" fill="#27A89C"/>
          <circle cx="25" cy="50" r="4" fill="#27A89C"/>
          <line x1="50" y1="50" x2="50" y2="25" stroke="#27A89C" strokeWidth="1.5"/>
          <line x1="50" y1="50" x2="75" y2="50" stroke="#27A89C" strokeWidth="1.5"/>
          <line x1="50" y1="50" x2="50" y2="75" stroke="#27A89C" strokeWidth="1.5"/>
          <line x1="50" y1="50" x2="25" y2="50" stroke="#27A89C" strokeWidth="1.5"/>
        </svg>

        <svg className="molecule-11" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="5" fill="#27A89C"/>
          <circle cx="35" cy="35" r="3" fill="#27A89C"/>
          <circle cx="65" cy="35" r="3" fill="#27A89C"/>
          <circle cx="50" cy="70" r="3" fill="#27A89C"/>
          <line x1="50" y1="50" x2="35" y2="35" stroke="#27A89C" strokeWidth="1.5"/>
          <line x1="50" y1="50" x2="65" y2="35" stroke="#27A89C" strokeWidth="1.5"/>
          <line x1="50" y1="50" x2="50" y2="70" stroke="#27A89C" strokeWidth="1.5"/>
        </svg>

        {/* Existing molecules */}
        <svg className="molecule-1" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="8" fill="#27A89C"/>
          <circle cx="20" cy="20" r="6" fill="#27A89C"/>
          <circle cx="80" cy="80" r="6" fill="#27A89C"/>
          <line x1="50" y1="50" x2="20" y2="20" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="80" y2="80" stroke="#27A89C" strokeWidth="2"/>
        </svg>
        {/* Cross Molecule */}
        <svg className="molecule-2" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="8" fill="#27A89C"/>
          <circle cx="50" cy="20" r="6" fill="#27A89C"/>
          <circle cx="20" cy="50" r="6" fill="#27A89C"/>
          <circle cx="80" cy="50" r="6" fill="#27A89C"/>
          <circle cx="50" cy="80" r="6" fill="#27A89C"/>
          <line x1="50" y1="50" x2="50" y2="20" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="20" y2="50" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="80" y2="50" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="50" y2="80" stroke="#27A89C" strokeWidth="2"/>
        </svg>
        {/* Triangle Molecule */}
        <svg className="molecule-3" viewBox="0 0 100 100">
          <circle cx="50" cy="30" r="6" fill="#27A89C"/>
          <circle cx="30" cy="70" r="6" fill="#27A89C"/>
          <circle cx="70" cy="70" r="6" fill="#27A89C"/>
          <line x1="50" y1="30" x2="30" y2="70" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="30" x2="70" y2="70" stroke="#27A89C" strokeWidth="2"/>
          <line x1="30" y1="70" x2="70" y2="70" stroke="#27A89C" strokeWidth="2"/>
        </svg>
        {/* Diamond Molecule */}
        <svg className="molecule-4" viewBox="0 0 100 100">
          <circle cx="50" cy="20" r="5" fill="#27A89C"/>
          <circle cx="20" cy="50" r="5" fill="#27A89C"/>
          <circle cx="50" cy="80" r="5" fill="#27A89C"/>
          <circle cx="80" cy="50" r="5" fill="#27A89C"/>
          <line x1="50" y1="20" x2="20" y2="50" stroke="#27A89C" strokeWidth="2"/>
          <line x1="20" y1="50" x2="50" y2="80" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="80" x2="80" y2="50" stroke="#27A89C" strokeWidth="2"/>
          <line x1="80" y1="50" x2="50" y2="20" stroke="#27A89C" strokeWidth="2"/>
        </svg>
        {/* Star Molecule */}
        <svg className="molecule-5" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="6" fill="#27A89C"/>
          <circle cx="50" cy="20" r="4" fill="#27A89C"/>
          <circle cx="80" cy="50" r="4" fill="#27A89C"/>
          <circle cx="65" cy="80" r="4" fill="#27A89C"/>
          <circle cx="35" cy="80" r="4" fill="#27A89C"/>
          <circle cx="20" cy="50" r="4" fill="#27A89C"/>
          <line x1="50" y1="50" x2="50" y2="20" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="80" y2="50" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="65" y2="80" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="35" y2="80" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="20" y2="50" stroke="#27A89C" strokeWidth="2"/>
        </svg>
        {/* Hexagonal Molecule */}
        <svg className="molecule-6" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="7" fill="#27A89C"/>
          <circle cx="50" cy="20" r="5" fill="#27A89C"/>
          <circle cx="77" cy="35" r="5" fill="#27A89C"/>
          <circle cx="77" cy="65" r="5" fill="#27A89C"/>
          <circle cx="50" cy="80" r="5" fill="#27A89C"/>
          <circle cx="23" cy="65" r="5" fill="#27A89C"/>
          <circle cx="23" cy="35" r="5" fill="#27A89C"/>
          <line x1="50" y1="50" x2="50" y2="20" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="77" y2="35" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="77" y2="65" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="50" y2="80" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="23" y2="65" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="23" y2="35" stroke="#27A89C" strokeWidth="2"/>
        </svg>

        {/* Ring Molecule */}
        <svg className="molecule-7" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="8" fill="#27A89C"/>
          <circle cx="50" cy="20" r="5" fill="#27A89C"/>
          <circle cx="80" cy="50" r="5" fill="#27A89C"/>
          <circle cx="50" cy="80" r="5" fill="#27A89C"/>
          <circle cx="20" cy="50" r="5" fill="#27A89C"/>
          <circle cx="71" cy="29" r="5" fill="#27A89C"/>
          <circle cx="71" cy="71" r="5" fill="#27A89C"/>
          <circle cx="29" cy="71" r="5" fill="#27A89C"/>
          <circle cx="29" cy="29" r="5" fill="#27A89C"/>
          <path d="M50 20 A30 30 0 1 1 50 80 A30 30 0 1 1 50 20" stroke="#27A89C" strokeWidth="2" fill="none"/>
        </svg>

        {/* Branched Molecule */}
        <svg className="molecule-8" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="7" fill="#27A89C"/>
          <circle cx="50" cy="20" r="5" fill="#27A89C"/>
          <circle cx="80" cy="35" r="5" fill="#27A89C"/>
          <circle cx="65" cy="75" r="5" fill="#27A89C"/>
          <circle cx="35" cy="75" r="5" fill="#27A89C"/>
          <circle cx="20" cy="35" r="5" fill="#27A89C"/>
          <line x1="50" y1="50" x2="50" y2="20" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="80" y2="35" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="65" y2="75" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="35" y2="75" stroke="#27A89C" strokeWidth="2"/>
          <line x1="50" y1="50" x2="20" y2="35" stroke="#27A89C" strokeWidth="2"/>
        </svg>
      </div>
      <div className="plus-decorations" aria-hidden="true">
        <div className="plus-symbol plus-symbol-1">+</div>
        <div className="plus-symbol plus-symbol-2">+</div>
        <div className="plus-symbol plus-symbol-3">+</div>
        <div className="plus-symbol plus-symbol-4">+</div>
      </div>
      <div className="relative z-10 container mx-auto py-12">
        <h1 className="dashboard-heading text-center mb-12">
          Skin Disease Classification
        </h1>
        <div className="mx-auto max-w-3xl">
          <div className="upload-section">
            <ImageUploader />          </div>
        </div>
      </div>
    </div>
  )
}
