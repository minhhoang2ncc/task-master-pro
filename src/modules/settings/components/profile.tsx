import { useState } from "react"
import { ProfileCard } from "@/modules/settings/components/profile-card"
export function Profile(){
    const [formData, setFormData] = useState({
        displayName: "Nguyễn Văn A",
        email: "vana.intern@taskmaster.pro",
        role: "Frontend Engineering Intern"
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <ProfileCard handleChange={handleChange} formData={formData} />
    )
}