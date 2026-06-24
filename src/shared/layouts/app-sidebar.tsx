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

import { Button } from "@/shared/components/button"

import {LayoutDashboard, Settings, BarChart2} from "lucide-react"
import { BUTTON_VARIANTS, CARD_LAYOUTS, SIDEBAR_ITEM, TEXT_SIZES } from "../styles/tailwind-classes"
import { cn } from "../lib/utils"
import { Card, CardContent} from "@/shared/components/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar"

export function AppSidebar() {
    const sidebarItems = [
        { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { name: "Analytics", url: "/analytics", icon: BarChart2 },
        { name: "Settings", url: "/settings", icon: Settings },
    ]

    const user = {
      name: "John Doe",
      role: "Intern Developer",
      icon: (
              <Avatar className="h-8 w-8 border">
                <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=1`} alt="Assignee" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )
      
    }

    const location = useLocation()
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <h1 className="text-lg font-bold text-primary dark:text-yellow-400">TaskMaster Pro</h1>
        <h2 className="text-sm text-muted-foreground">
          Frontend Intern Training
        </h2>
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between">
        <SidebarMenu>
        {sidebarItems.map((item) => {
            const isActive = location.pathname === item.url
            return (
                <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                    asChild
                    isActive={isActive}
                    className= {SIDEBAR_ITEM.default}
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
        <div className="flex flex-col justify-center items-center m-6">
          <Button className={cn(BUTTON_VARIANTS.active, 'w-full h-10 rounded-md text-md font-bold')}>
            + Add New Task
          </Button>
          <Card className='m-4 w-full bg-tabs-background dark:bg-background'>
              <CardContent className='flex justify-start items-center gap-4'>
                  {user.icon}
                  <div className="flex flex-col justify-start gap-1">
                      <span className='text-md font-semibold'>
                          {user.name}
                      </span>
                      <span className='text-sm text-muted-foreground'>
                          {user.role}
                      </span>
                  </div>
              </CardContent>
          </Card>
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}