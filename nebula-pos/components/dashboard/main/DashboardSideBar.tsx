"use client"
import { NavUser } from "@/components/dashboard/main/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavPos } from "./NavPos"
import { NavModule } from "./NavModule"
import Logo from "@/components/Logo"
import { ScrollArea } from "@/components/ui/scroll-area"
import NavPrincipal from "./NavPrincipal"
import { useHasMounted } from "@/lib/utils"
import { dataRoutes } from "@/components/dashboard/data"
import { useUser } from "../UserClient"

// This is sample data.
export function DashboardSideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="h-full"
    >
      <SidebarHeader className="flex flex-row items-center justify-center py-4 ">
        <div className={isCollapsed ?  'size-8' : 'size-16'}>
          <Logo />
        </div>
        <h1 className={`${isCollapsed ? 'hidden' : 'block'} text-white font-semibold tracking-wide text-4xl`}>NEBULA</h1>

      </SidebarHeader>
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full w-full">
          <SidebarContent>
            <NavPrincipal principal={dataRoutes.principal} isCollapsed={isCollapsed}/>
            <NavPos items={dataRoutes.items} isCollapsed={isCollapsed} />
            {
              user?.role == 1 && <NavModule modules={dataRoutes.modules} isCollapsed={isCollapsed}/>
            }
          </SidebarContent>
        </ScrollArea>
      </div>
      <SidebarFooter>
        <NavUser user={dataRoutes.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
