"use client"
import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
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
import { usePathname } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { dataRoutesProps, NavSubItem } from "../data"
export function NavModule( {modules, isCollapsed} : {modules: dataRoutesProps['modules'], isCollapsed: boolean}) {
  const { isMobile } = useSidebar()
  const pathname = usePathname();
  const dropdownModule = (module: NavSubItem) => {
    return (
      <DropdownMenu key={module.title}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton tooltip={module.title}>
            {module.icon && <module.icon className={isCollapsed ? 'h-6! w-6!' : ''} />}
            <span>{module.title}</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className=" min-w-56 rounded-lg pl-3 z-50 bg-white"
          align="center"
          sideOffset={9}
          side={isMobile ? "bottom" : "right"}
        >
          <DropdownMenuGroup>
            {module.items?.map((item) => (
              <DropdownMenuItem key={item.title}>
                <a href={item.url} className="flex items-center gap-2">
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  const collapsibleModule = (module: NavSubItem) => {
    return (
      <Collapsible
        key={module.title}
        asChild
        defaultOpen={module.isActive}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild >
            <SidebarMenuButton tooltip={module.title}>
              {module.icon && <module.icon className={isCollapsed ? 'h-6! w-6!' : ''} />}
              <span>{module.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <SidebarMenuSub>
              {module.items?.map((item) => (
                <SidebarMenuSubItem key={item.title} >
                  <SidebarMenuSubButton asChild isActive={pathname === item.url}>
                    <a href={item.url} >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>)
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Módulos</SidebarGroupLabel>
      <SidebarMenu className={isCollapsed ? 'gap-4!' : ''}>

        {modules.map((module) =>
          isCollapsed
            ? dropdownModule(module)
            : collapsibleModule(module)
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
