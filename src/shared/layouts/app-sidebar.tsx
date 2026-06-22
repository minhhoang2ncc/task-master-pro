import {useLocation, Link} from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/shared/components/sidebar"

import {LayoutDashboard, Settings, BarChart2} from "lucide-react"

export function AppSidebar() {
    const sidebarItems = [
        { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { name: "Analytics", url: "/analytics", icon: BarChart2 },
        { name: "Settings", url: "/settings", icon: Settings },
    ]

    const location = useLocation()
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <h1 className="text-lg font-bold">TaskMaster Pro</h1>
        <h2 className="text-sm text-muted-foreground">
          Frontend Intern Training
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
        {sidebarItems.map((item) => {
            const isActive = location.pathname === item.url
            return (
                <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                    asChild
                    isActive={isActive}
                    className="
                                pl-4
                            data-[active=true]:text-indigo-600 
                                data-[active=true]:bg-transparent 
                                data-[active=true]:border-r-4 
                                data-[active=true]:border-indigo-600
                                dark:data-[active=true]:text-yellow-400
                                dark:data-[active=true]:border-yellow-400
                                rounded-none 
                                "
                >
                    <Link to={item.url}>
                        <item.icon />
                        <span>{item.name}</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            )
        })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}