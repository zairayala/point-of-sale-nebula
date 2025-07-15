import { LoginForm } from "@/components/auth/LoginForm";
import Logo from "@/components/Logo";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative min-h-svh">
      <Image
        src="/login-image.jpg"
        quality={100}
        alt="Image"
        fill
        className="absolute inset-0 -z-10 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
      <div className="grid min-h-svh lg:grid-cols-2">

        <div className="flex flex-col gap-4 p-6 md:p-10 bg-white/70 backdrop-blur-md">
          <div className="flex justify-center gap-2 md:justify-start">
            <div className="size-8">
              <Logo />
            </div>
            <h1 className="text-secondary font-semibold tracking-wide text-xl">NEBULA</h1>

          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-lg">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="hidden lg:block " />
      </div>
    </div>
  )
}
