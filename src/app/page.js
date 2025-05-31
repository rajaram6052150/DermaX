import { LoginForm } from "@/components/login-form"
import "./login.css"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#E6FAF7] relative overflow-hidden">
      <div className="absolute inset-0 medical-pattern opacity-5" aria-hidden="true" />
      <div className="container flex min-h-screen items-center justify-center py-20">
        <div className="w-full max-w-sm md:max-w-3xl relative z-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
