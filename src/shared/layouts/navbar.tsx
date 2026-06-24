import { Button } from "@/shared/components/button"

import { useState } from "react"

import {Search, CirclePlus, Bell, BellDot, CircleQuestionMark} from "lucide-react"

export function NavBar() {
    const [isNotification, setIsNotification] = useState(false)


    return (
        <nav className="flex-1 flex items-center justify-between gap-4 relative">
            <div>
                <Search className= "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                <input placeholder="Search tasks..." className="max-w-160 min-w-120 h-8 bg-white dark:text-background border border-input rounded pl-10 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setIsNotification(!isNotification)}>
                    <Bell className={`size-4 ${isNotification ? 'hidden' : ''}`} />
                    <BellDot className={`size-4 ${isNotification ? '' : 'hidden'}`} />
                </Button>
                <Button variant="ghost" size="icon">
                    <CircleQuestionMark className="size-4" />
                </Button>
                <Button variant="default" size="lg"> <CirclePlus className="size-4" /> Create Task </Button>
            </div>
        </nav>
    )
}