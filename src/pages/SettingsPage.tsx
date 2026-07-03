import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ThemeSettings } from "@/modules/settings/components/theme-settings"
import { TitleBar } from "@/shared/layouts/titlebar"
import { NotifyCard } from "@/modules/settings/components/notify-card"
import { LanguageSecurity } from "@/modules/settings/components/language-security"
import { Button } from "@/shared/components/button"
import { Profile } from "@/modules/settings/components/profile"
import { updateUser } from "@/redux/features/userSlice"
import { updateNotificationSettings } from "@/redux/features/notifySlice"
import { updateLanguageSettings } from "@/redux/features/languageSlice"
import type { RootState } from "@/redux/store"
import type { LanguageSettings, NotificationSettings, User } from "@/shared/type"
import { TEXT_SIZES } from "@/shared/styles/tailwind-classes"
import { postSaveSettings } from "@/shared/lib/mock-api"
export function SettingsPage() {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)
    const notificationSettings = useSelector((state: RootState) => state.notify)
    const languageSettings = useSelector((state: RootState) => state.language)
    const [draftUser, setDraftUser] = useState<User>(user)
    const [draftNotifications, setDraftNotifications] = useState<NotificationSettings>(notificationSettings)
    const [draftLanguage, setDraftLanguage] = useState<LanguageSettings>(languageSettings)

    useEffect(() => {
        setDraftUser(user)
    }, [user])

    useEffect(() => {
        setDraftNotifications(notificationSettings)
    }, [notificationSettings])

    useEffect(() => {
        setDraftLanguage(languageSettings)
    }, [languageSettings])

    const handleProfileChange = (field: keyof User, value: string) => {
        setDraftUser((current) => ({
            ...current,
            [field]: value,
        }))
    }

    const handleNotificationChange = (field: keyof NotificationSettings, value: boolean) => {
        setDraftNotifications((current) => ({
            ...current,
            [field]: value,
        }))
    }

    const handleLanguageChange = (language: LanguageSettings["language"]) => {
        setDraftLanguage({ language })
    }
    const handleSaveChanges = async () => {
        const payload = {
            user: draftUser,
            notifications: draftNotifications,
            language: draftLanguage,
        }

        try {
            await postSaveSettings(payload)
        } catch (error) {
            console.error("Failed to save settings", error)
        }

        dispatch(updateUser(draftUser))
        dispatch(updateNotificationSettings(draftNotifications))
        dispatch(updateLanguageSettings(draftLanguage))
    }

    const handleCancelChanges = () => {
        setDraftUser(user)
        setDraftNotifications(notificationSettings)
        setDraftLanguage(languageSettings)
    }


    return (
        <section>
            <TitleBar>
                <div>
                    <h1 className={TEXT_SIZES.card_title_default}>System Settings</h1>
                    <p className={`${TEXT_SIZES.title_secondary} text-muted-foreground`}>This is the settings page. You can customize your preferences here.</p>
                </div>
            </TitleBar>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4 w-full h-fit">
                <Profile user={draftUser} onChange={handleProfileChange} />
                <ThemeSettings />
            </div>
            <div className="grid grid-cols-2 gap-4 p-4 w-full h-fit">
                <NotifyCard settings={draftNotifications} onChange={handleNotificationChange} />
                <LanguageSecurity settings={draftLanguage} onChange={handleLanguageChange} />
            </div>
            <div className="flex justify-end gap-4 p-4 w-full h-fit">
                <Button
                    variant="outline"
                    size="lg"
                    className="mt-4 h-12 rounded-[8px] px-6 text-foreground bg-hint-background hover:bg-hint-background/80"
                    onClick={handleCancelChanges}
                >
                    Cancel
                </Button>
                <Button
                    variant="default"
                    size="lg"
                    className="mt-4 h-12 rounded-[8px] px-6 text-white bg-primary hover:bg-primary/80 dark:bg-foreground dark:text-background dark:hover:bg-foreground/80"
                    onClick={handleSaveChanges}
                >
                    Save Changes
                </Button>
            </div>
        </section>
    )
}