import { RegisterForm } from "@/components/RegisterForm";
import "../login.css";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#E6FAF7] relative overflow-hidden">
      <div className="absolute inset-0 medical-pattern opacity-5" aria-hidden="true" />
      <div className="min-h-screen flex items-center justify-center p-6 md:p-10 relative z-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
