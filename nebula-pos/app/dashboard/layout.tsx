import HeaderBar from "@/components/dashboard/header/HeaderBar";
import { DashboardSideBar } from "@/components/dashboard/main/DashboardSideBar";
import { UserClient } from "@/components/dashboard/UserClient";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
    return (
        <UserClient>
            <SidebarProvider defaultOpen={defaultOpen}>
                <div className="flex w-full h-screen bg-gradient-to-br from-slate-50 to-slate-200">
                    <DashboardSideBar />
                    <div className="w-full">
                        <HeaderBar />
                        <main className="flex-1 flex flex-col overflow-hidden w-full">
                        {children}
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </UserClient>

    );
}
