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
                    <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
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
                <Button variant="outline" size="lg" className="mt-4 rounded-md text-foreground bg-hint-background hover:bg-hint-background/80">
                    Cancel
                </Button>
                <Button variant="default" size="lg" className="mt-4 rounded-md text-white bg-primary hover:bg-primary/80 dark:bg-foreground dark:text-background dark:hover:bg-foreground/80">
                    Save Changes
                </Button>
            </div>
        </section>
    )
}