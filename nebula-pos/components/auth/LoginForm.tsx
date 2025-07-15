"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone } from "lucide-react"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { login } from "@/server/auth.service"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Error from "./Error"
import { LoginSchema } from "@/src/schemas/auth.schema"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const router = useRouter()
  const [errors, setErrors] = useState<{phone?: string[], password?: string[], errors?: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      phone: formData.get('phone') as string,
      password: formData.get('password') as string
    }

    const validation = LoginSchema.safeParse(data)
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors
      setErrors(errors)
      setIsSubmitting(false)
      return
    }
    const response = await login(data)
    if (typeof response === 'string' ) {
      console.log("response", response)
      router.push('/dashboard/principal')
    } else {
      setErrors({ errors: response.message }) 
      setIsSubmitting(false)
      return
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleLogin}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Ingresa a tu cuenta</h1>
        <p className="text-balance text-lg text-muted-foreground">
          Digite su correo electrónico para iniciar sesión
        </p>
      </div>
      <div className="grid gap-6">
        {errors && errors.errors &&
          <Error>{errors.errors}</Error>
        }
        <div className="grid gap-2">
          <Label htmlFor="phone" className="text-base">Celular</Label>
          <div className="relative flex mx-auto w-full">
            <Input
              id="phone"
              type="number"
              name="phone"
              placeholder="Ejm: 994542112"
              className="text-base! bg-white"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Phone className="text-xl " style={{ strokeWidth: 2 }} />
            </div>
          </div>
          {errors && errors.phone &&
            <Error>{errors.phone[0]}</Error>
          }
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-base">Contraseña</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="ml-auto underline-offset-4 hover:underline text-base text-indigo-800 font-semibold">
                  ¿Olvidaste tu contraseña?
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 mb-0.5">
                  <p>Contacta a un administrador para reestablecer tu contraseña</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative flex mx-auto w-full">
            <Input
              id="password"
              type="password"
              name="password"
              className="text-base! bg-white"
              placeholder="Ejm: tucontraseña"

            />
          </div>
          {errors && errors.password &&
            <Error>{errors.password[0]}</Error>
          }

        </div>
      </div>
      <Button type="submit" className="w-full text-lg mt-3" disabled={isSubmitting}>
        {isSubmitting ? "Ingresando..." : "Ingresar"}

      </Button>

    </form>
  )
}
