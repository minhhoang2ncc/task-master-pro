import { Profile } from "@/modules/settings/components/profile"
import { ThemeSettings } from "@/modules/settings/components/theme-settings"
import { TitleBar } from "@/shared/layouts/titlebar"
import { NotifyCard } from "@/modules/settings/components/notify-card"
import { LanguageSecurity } from "@/modules/settings/components/language-security"
import { Button } from "@/shared/components/button"
export function SettingsPage() {
    return (
        <section>
            <TitleBar>
                <div>
                    <h1 className="text-xl font-bold text-foreground">System Settings</h1>
                    <p className="text-muted-foreground">This is the settings page. You can customize your preferences here.</p>
                </div>
            </TitleBar>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4 w-full h-fit">
                <Profile />
                <ThemeSettings />
            </div>
            <div className="grid grid-cols-2 gap-4 p-4 w-full h-fit">
                <NotifyCard />
                <LanguageSecurity />
            </div>
            <div className="flex justify-end gap-4 p-4 w-full h-fit">
                <Button variant="outline" size="lg" className="mt-4 rounded-md bg-red-500 text-white hover:bg-red-600">
                    Cancel
                </Button>
                <Button variant="default" size="lg" className="mt-4 rounded-md bg-green-500 text-white hover:bg-green-600">
                    Save Changes
                </Button>
            </div>
        </section>
    )
}