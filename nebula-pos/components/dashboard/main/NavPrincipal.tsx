"use client"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import { dataRoutesProps } from '../data'

export default function NavPrincipal({ principal, isCollapsed }: { principal: dataRoutesProps['principal'], isCollapsed: boolean }) {
    const pathname = usePathname();
    return (
        <>
            <SidebarGroup>
                <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                <SidebarMenu className={isCollapsed ? 'pt-2' : ''}>
                    {principal.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                                <a href={item.url} >
                                    <item.icon className={isCollapsed ? 'h-6! w-6!' : ''} />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>

        </>
    )
}
