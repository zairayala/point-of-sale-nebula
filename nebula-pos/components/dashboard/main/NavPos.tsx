"use client"
import {
  ChevronRight,
} from "lucide-react"
import {
  Collapsible,
} from "@/components/ui/collapsible"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { usePathname } from "next/navigation"
import { dataRoutesProps } from "../data"
import Link from "next/link"
export function NavPos({ items, isCollapsed }: {items: dataRoutesProps['items'], isCollapsed: boolean}) {
  const { isMobile, toggleSidebar } = useSidebar()
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Punto de venta</SidebarGroupLabel>
      <SidebarMenu className={isCollapsed ? "gap-4!" : ""}>
        {items.map((item) => {
          const hasChildren = Array.isArray(item.items) && item.items.length > 0
          if (isCollapsed && hasChildren) {
            return (
              <DropdownMenu key={item.title}>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && (
                      <item.icon className="h-6! w-6!" />
                    )}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="min-w-56 rounded-lg pl-3 z-50 bg-popover border"
                  align="center"
                  sideOffset={9}
                  side={isMobile ? "bottom" : "right"}
                >
                  <DropdownMenuGroup>
                    {item.items!.map((subItem) => (
                      <DropdownMenuItem key={subItem.title}>
                        <a href={subItem.url} className="flex items-center gap-2">
                          {subItem.icon && <subItem.icon />}
                          <span>{subItem.title}</span>
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }
          if (!isCollapsed && hasChildren) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon className="h-6! w-6!" />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <SidebarMenuSub>
                      {item.items!.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                            <a href={subItem.url}>
                              {subItem.icon && (
                                <subItem.icon className={pathname === subItem.url ? "text-indigo-600" : ""} />
                              )}
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          }
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={pathname === item.url}
              >
                <Link href={item.url!} onClick={() => {
                  if(!item.collapsed && !isCollapsed) toggleSidebar();
                }}>
                  {item.icon && <item.icon className="h-6! w-6! p-0! " />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
