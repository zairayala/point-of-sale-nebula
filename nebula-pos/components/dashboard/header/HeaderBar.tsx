"use client"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Bell, LogOut, Plus, Settings, ShoppingCart, User } from "lucide-react"
import Link from "next/link"

export default function HeaderBar() {
    const { toggleSidebar, state } = useSidebar()

    return (
        <header className="sticky bg-slate-900 top-0 z-10 w-full flex h-16 shrink-0 items-center gap-2  ">
            <div className="flex gap-5 justify-end px-5 items-center w-full h-full">
                <div className="text-white flex items-center">
                    <SidebarTrigger className="-ml-1" />
                </div>
                <div className="flex justify-end w-full h-full">
                    <div className="mx-auto flex w-full justify-end-safe">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            className="h-8 rounded-md bg-slate-200 hover:bg-white px-3 text-xs font-medium text-black hover:shadow-sm"
                                            aria-label="Agregar nuevo"
                                        >
                                            <Plus className="mr-1 h-3.5 w-3.5" />
                                            <span className="text-sm">Nuevo</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="border-slate-700 bg-white">
                                        <DropdownMenuItem className="focus:bg-white/50">Producto</DropdownMenuItem>
                                        <DropdownMenuItem className="focus:bg-white/50">Usuario</DropdownMenuItem>
                                        <DropdownMenuItem className="focus:bg-white/50">Cliente</DropdownMenuItem>
                                        <DropdownMenuItem className="focus:bg-white/50">Proveedor</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Link
                                    className="h-8 flex items-center rounded-md bg-indigo-800 hover:bg-indigo-700 px-3 text-xs font-medium text-white"
                                    aria-label="Punto de Venta"
                                    href='/dashboard/punto-venta/nueva-venta'
                                    onClick={() => {
                                        if (state !== "collapsed") toggleSidebar();
                                    }}
                                >
                                    <ShoppingCart className="mr-1 h-3.5 w-3.5" />
                                    <span className="text-sm">POS</span>
                                </Link>

                            </div>
                            <Separator orientation="vertical" className="h-full" />

                            <div className="flex items-center gap-4">
                                <Button
                                    className="relative h-8 w-8 rounded-md bg-slate-700/50 text-white hover:bg-slate-700"
                                >
                                    <Bell className="h-4 w-4" />
                                    <div className=" absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center rounded-full bg-indigo-600 justify-center p-0 text-[10px] font-bold">
                                        5
                                    </div>
                                    <span className="sr-only">Notificaciones</span>
                                </Button>
                                <Button
                                    className="relative h-8 w-8 rounded-md bg-slate-700/50 text-white hover:bg-slate-700"
                                >
                                    <Settings className="h-4 w-4" />
                                    <span className="sr-only">Ajustes</span>
                                </Button>
                            </div>

                            <div className="flex items-center gap-4" >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            className="flex h-8 items-center gap-2 rounded-md bg-slate-700/50 px-2 text-white hover:bg-slate-700"
                                        >
                                            <Avatar className="h-6 w-6 border justify-center items-center border-slate-500 flex">
                                                <User />
                                            </Avatar>
                                            <div className="hidden flex-col items-start text-left md:flex">
                                                <span className="text-xs font-medium"> Hola, shadcn</span>
                                                <span className="text-[10px] text-slate-400">994514515</span>
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="border-slate-700 bg-white">
                                        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-slate-700/50" />
                                        <DropdownMenuItem className="focus:bg-white/10">Perfil</DropdownMenuItem>
                                        <DropdownMenuItem className="focus:bg-white/10">Configuración</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            className="h-8 rounded-md bg-red-700 px-3 text-xs font-medium text-white hover:bg-red-600 hover:shadow-sm"
                                            aria-label="Cerrar sesión"
                                        >
                                            <LogOut className="mr-1 h-3.5 w-3.5" />
                                            <span className="text-sm">Cerrar sesión</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <span className="text-sm">Salir del sistema</span>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </header>
    )
}
