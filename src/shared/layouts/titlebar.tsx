import type { ReactNode } from "react"

export function TitleBar({ children } : { children : ReactNode}) {
    return (
        <div className="flex items-center justify-between h-16 bg-background shadow-sm px-4 gap-2">
            {children}
        </div>
    )
}