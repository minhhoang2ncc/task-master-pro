import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/card"
import { Button } from "@/shared/components/button"
import { useTheme } from "@/app/providers"

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
                    className={`w-full flex-1 ${theme === "light" ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-indigo-500 text-white hover:bg-indigo-600"}`}
                >
                    Light Mode
                </Button>
                <Button 
                    onClick={() => setTheme("dark")}
                    className={`w-full flex-1 ${theme === "dark" ? "bg-slate-700 text-white hover:bg-slate-800" : "bg-slate-800 text-white hover:bg-slate-600"}`}
                >
                    Dark Mode
                </Button>
            </CardContent>
        </Card>
    )
}