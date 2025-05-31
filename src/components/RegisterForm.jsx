"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function RegisterForm({ className, ...props }) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      console.log('Attempting registration with:', { username, email })
      const response = await fetch("http://localhost:8000/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ username, email, password, password2 }),
      })

      console.log('Response status:', response.status)
      if (response.ok || response.status === 201) {
        const data = await response.json()
        console.log('Registration successful:', data)
        if (data.token) {
          localStorage.setItem("token", data.token)
          document.cookie = `token=${data.token}; path=/`
          window.dispatchEvent(new Event("authChanged"))
          router.push("/dashboard")
        } else {
          console.error('No token in response:', data)
          setError("Registration successful but no token received")
        }
      } else {
        const text = await response.text()
        console.log('Error response:', text)
        try {
          const data = JSON.parse(text)
          setError(
            data.error || data.non_field_errors?.[0] ||
            "Registration failed. Email may already exist or passwords don't match."
          )
        } catch (e) {
          setError("Server error. Please try again later.")
        }
      }
    } catch (err) {      console.error('Fetch error:', err)
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#E6FAF7] relative overflow-hidden">
      <div className="absolute inset-0 medical-pattern opacity-5" aria-hidden="true" />
      <div className="relative container flex min-h-screen items-center justify-center py-20">
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl relative z-10">
          <Card className="overflow-hidden border border-[#27A89C]/20 shadow-xl bg-white/80 backdrop-blur-sm w-full">
            <CardContent>
              <CardHeader className="space-y-2 px-0">
                <CardTitle className="text-3xl font-bold text-center text-[#27A89C]">
                  Create Account
                </CardTitle>
                <p className="text-center text-gray-600">Join DermaX - Advanced Skin Analysis Platform</p>              </CardHeader>
              <form className="space-y-6" onSubmit={handleSubmit}>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="grid gap-3">                <Label htmlFor="username" className="text-sm text-gray-700">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-[#27A89C]/20 bg-white text-gray-800 placeholder:text-gray-400 focus:border-[#27A89C] focus:ring-[#27A89C]/20"
                />
              </div>

              <div className="grid gap-3">                <Label htmlFor="email" className="text-sm text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[#27A89C]/20 bg-white text-gray-800 placeholder:text-gray-400 focus:border-[#27A89C] focus:ring-[#27A89C]/20"
                />
              </div>

              <div className="grid gap-3">                <Label htmlFor="password" className="text-sm text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-[#27A89C]/20 bg-white text-gray-800 placeholder:text-gray-400 focus:border-[#27A89C] focus:ring-[#27A89C]/20"
                />
              </div>

              <div className="grid gap-3">                <Label htmlFor="confirm-password" className="text-sm text-gray-700">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Re-enter your password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                  className="border-[#27A89C]/20 bg-white text-gray-800 placeholder:text-gray-400 focus:border-[#27A89C] focus:ring-[#27A89C]/20"
                />
              </div>              <Button
                type="submit"
                className="w-full bg-[#27A89C] hover:bg-[#1F8277] text-white font-medium transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing up...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <span
                  onClick={() => router.push('/')}
                  className="font-medium text-[#27A89C] hover:text-[#1F8277] cursor-pointer transition-colors"
                >
                  Login
                </span>
              </div>
            </form>
            </CardContent>
          </Card>

          {/* Medical Illustration Side */}
          <div className="hidden md:block relative">
            <div className="h-full w-full flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                {/* Background Blobs */}
                <div className="absolute top-0 -left-4 w-72 h-72 bg-[#27A89C]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-[#27A89C]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#27A89C]/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                
                {/* Main Image */}
                <div className="relative">
                  <img
                    src="/medical-technology.svg"
                    alt="Medical Technology"
                    className="w-full h-auto max-w-md mx-auto drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-600 mt-4 col-span-2">
            By clicking continue, you agree to our{" "}
            <a href="#" className="text-[#27A89C] hover:text-[#1F8277] transition-colors">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-[#27A89C] hover:text-[#1F8277] transition-colors">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  )
}
