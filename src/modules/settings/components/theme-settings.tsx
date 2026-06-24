import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/card"
import { Button } from "@/shared/components/button"
import { useTheme } from "@/app/providers"
import { Sun, Moon, CheckCircle } from "lucide-react"
import { cn } from "@/shared/lib/utils"

export function ThemeSettings() {
    const { theme, setTheme } = useTheme()

    return (
        <Card className="w-full h-full flex flex-col">
            <CardHeader>
                <CardTitle>Theme Setting</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 flex-1">
                <Button 
                    onClick={() => setTheme("light")}
                    className={cn('w-full flex-1', {
                        'bg-indigo-200 border-2 border-primary text-foreground hover:bg-indigo-400': theme === "light",
                        'bg-indigo-200 text-background hover:bg-indigo-400': theme !== "light"
                    })}
                >
                    <Sun className="w-4 h-4 mr-2" />
                    Light Mode
                    <CheckCircle className={`w-4 h-4 ml-2 ${theme === "light" ? "opacity-100" : "opacity-0"}`} />
                </Button>
                <Button 
                    onClick={() => setTheme("dark")}
                    className={cn('w-full flex-1', {
                        'bg-slate-700 text-white hover:bg-slate-800 border-2 border-foreground': theme === "dark",
                        'bg-slate-800 text-white hover:bg-slate-600': theme !== "dark"
                    })}
                >
                    <Moon className="w-4 h-4 mr-2" />
                    Dark Mode
                    <CheckCircle className={`w-4 h-4 ml-2 ${theme === "dark" ? "opacity-100" : "opacity-0"}`} />
                </Button>
            </CardContent>
        </Card>
    )
}