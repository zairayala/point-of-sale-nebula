"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

export default function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [genre, setGenre] = useState("")
    const [typeDoc, setTypeDoc] = useState("")
    const [role, setRole] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [passwordAdmin, setPasswordAdmin] = useState("")

    /*const handleRegister = async (formData: FormData) => {
        const data = {
            names: formData.get('names'),
            lastnames: formData.get('lastnames'),
            email: formData.get('email'),
            password: formData.get('password'),
            password_confirmation: formData.get('password_confirmation'),
            age: formData.get('age'),
            genre: formData.get('genre'),
            type_doc: formData.get('type_doc'),
            number_doc: formData.get('number_doc'),
            profile_photo: formData.get('profile_photo'),
            cellphone: formData.get('cellphone'),
            password_admin: formData.get('password_admin'),
            role: formData.get('role'),
        }

        setOpenModal(true)

    }*/
    const typeDocOptions = [
        { value: 'DNI' },
        { value: 'Pasaporte' },
        { value: 'CE' }
    ]
    const roleOptions = [
        { value: '1', name: 'Administrador' },
        { value: '2', name: 'Vendedor' }
    ]

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} /*action={handleRegister}*/>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-4xl font-bold">Registra tu cuenta</h1>
                <p className="text-balance text-lg text-muted-foreground">
                    Digite sus datos para crear una cuenta
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="names" className="text-base">Nombres</Label>
                    <Input
                        id="names"
                        type="text"
                        name="names"
                        placeholder="Ejm: Juan Raul"
                        className="text-base! bg-white"
                    />
                </div>

                <div>
                    <Label htmlFor="lastnames" className="text-base">Apellidos</Label>
                    <Input
                        id="lastnames"
                        type="text"
                        name="lastnames"
                        placeholder="Ejm: Perez Ruiz"
                        className="text-base! bg-white"
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="cellphone" className="text-base">Celular</Label>
                <Input
                    id="cellphone"
                    type="number"
                    name="cellphone"
                    placeholder="Ejm: 998746112"
                    className="text-base! bg-white"
                />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="password" className="text-base">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        className="text-base! bg-white"
                        placeholder="Ejm: tucontraseña"
                    />

                </div>
                <div>
                    <Label htmlFor="password_confirmation" className="text-base">Repetir contraseña</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        className="text-base! bg-white"
                        placeholder="Ejm: tucontraseña"
                    />

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <Label htmlFor="type_doc" className="text-base">Tipo de documento</Label>
                    <Select value={typeDoc} onValueChange={setTypeDoc}>
                        <SelectTrigger id="genre" className="w-full bg-white">
                            <SelectValue placeholder="Selecciona tipo documento" />
                        </SelectTrigger>
                        <SelectContent>
                            {typeDocOptions.map(t => (
                                <SelectItem value={t.value} key={t.value}>{t.value}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <input type="hidden" name="type_doc" value={typeDoc}></input>
                </div>
                <div>
                    <Label htmlFor="number_doc" className="text-base">N. documento</Label>
                    <Input
                        id="number_doc"
                        type="number"
                        name="number_doc"
                        placeholder="Ejm: 75431657"
                        className="text-base! bg-white"
                    />
                </div>
            </div>
        
            <div>
                <Label htmlFor="role" className="text-base">Rol</Label>
                <RadioGroup onValueChange={setRole} value={role} className="flex flex-row gap-5">
                    {roleOptions.map(r => (
                        <div className="flex items-center space-x-2" key={r.value}>
                            <RadioGroupItem value={r.value} id={r.value} className="" />
                            <Label htmlFor="role" className="text-base! text-gray-700">{r.name}</Label>
                        </div>
                    ))}
                </RadioGroup>

                <input type="hidden" name="role" value={role}></input>
            </div>
            <Button type="submit" className="w-full text-lg">
                Registrar
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-slate-500!">
            </div>
            <div className="text-center text-base">
                ¿Ya tiene una cuenta? {''}
                <Link href="/autenticacion/iniciar-sesion">
                    Iniciar sesión
                </Link>
            </div>
        </form>
    )
}
