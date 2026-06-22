import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card"
import { Bell } from "lucide-react"
import { Switch } from "@/shared/components/switch"
import { Label } from "@/shared/components/label"
export function NotifyCard() {
    const notificationSettings = [
        {
            name: "Browser Notifications",
            description: "Get notified on your Desktop"
        },
        {
            name: "Email Notifications",
            description: "Receive updates via email"
        }
    ]
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    <CardTitle>Notification</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                {notificationSettings.map((setting, index) => {
                    // Create a unique ID for each switch so the label connects properly
                    const switchId = `notification-${index}`

                    return (
                        <div key={setting.name} className="flex items-center justify-between gap-4 mb-4 last:mb-0">
                            
                            {/* Text Container (Left) */}
                            <div className="flex flex-col gap-1">
                                <Label htmlFor={switchId} className="text-sm font-medium cursor-pointer">
                                    {setting.name}
                                </Label>
                                <span className="text-sm text-muted-foreground">
                                    {setting.description}
                                </span>
                            </div>

                            {/* Switch Container (Right) */}
                            <Switch id={switchId} />

                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}