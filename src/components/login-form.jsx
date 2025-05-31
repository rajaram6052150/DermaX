"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function LoginForm({ className, ...props }) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8000/accounts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({          username,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("token", data.token)
        document.cookie = `token=${data.token}; path=/`
        window.dispatchEvent(new Event("authChanged"))
        router.push("/dashboard")
      } else {
        setError(data.non_field_errors?.[0] || "Invalid credentials")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">      
      <Card className={cn("w-full border border-[#27A89C]/20 shadow-xl bg-white/80 backdrop-blur-sm", className)} {...props}>
        <CardContent className="grid gap-4">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold text-center text-[#27A89C]">
              DermaX
            </CardTitle>
            <p className="text-center text-gray-600">Advanced Skin Analysis Platform</p>
          </CardHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-gray-700">
                  Username
                </Label>
                <Input
                  id="username"                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}                  className="border-[#27A89C]/20 bg-white text-gray-800 focus:border-[#27A89C] focus:ring-[#27A89C]/20"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-[#27A89C]/20 bg-white text-gray-800 focus:border-[#27A89C] focus:ring-[#27A89C]/20"
                />
              </div>
              <Button className="w-full bg-[#27A89C] hover:bg-[#1F8277] text-white transition-colors">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => router.push('/register')}
                className="font-medium text-[#27A89C] hover:text-[#1F8277] cursor-pointer transition-colors"
              >
                Register here
              </span>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Medical Illustration */}
      <div className="hidden lg:block relative">
        <div className="absolute inset-0">
          <div className="h-full w-full flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Background Blobs */}              <div className="absolute top-0 -left-4 w-72 h-72 bg-[#27A89C]/20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-[#27A89C]/15 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#27A89C]/25 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>                {/* Main Image */}
                <div className="relative flex items-center justify-center h-full">
                  <img
                    src="/dermax_login_medical_green.png"
                    alt="DermaX Medical Interface"
                    className="w-full h-auto max-w-[420px] rounded-2xl opacity-90 mx-auto my-auto"
                    style={{
                      filter: "drop-shadow(0 20px 30px rgba(39, 168, 156, 0.15))"
                    }}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
