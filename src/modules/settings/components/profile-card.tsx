import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/card"
import { User } from "lucide-react"
export function ProfileCard({handleChange, formData}: {handleChange: (e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement>) => void, formData: {displayName: string, email: string, role: string}}) {
    return (
        <Card className="col-span-2 md:col-span-3 border-l-4 border-primary dark:border-yellow-400">
            <CardHeader className="flex items-center gap-2">
                <User className="w-6 h-6 text-indigo-500 dark:text-yellow-400" />
                <CardTitle className="text-lg font-semibold">
                    User Profile
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 grid-template-column gap-6">
                <div className="max-w-fit flex flex-col items-center gap-2">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Hyriki"
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full bg-slate-100 m-2"
                    />
                    <p className="text-xs text-muted-foreground">
                        PNG, JPG format. Maximum file size is 2MB.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 col-span-2">
                    {/* Row 1 */}
                    <div className="rounded-md">
                        <label htmlFor="displayName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Display Name
                        </label>
                        <input
                            type="text"
                            id="displayName"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            className="mt-1 block h-12 w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-400 focus:ring-opacity-50"
                        />
                    </div>
                   <div className="rounded-md">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Email
                        </label>
                        <textarea
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            /* 1. Removed type="email" (textareas don't use this attribute)
                            2. Removed your custom wrap classes (textareas wrap automatically)
                            3. Added 'resize-none' so the user can't drag and break your layout
                            */
                            className="mt-1 block h-20 w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-400 focus:ring-opacity-50 resize-none"
                        />
                    </div>
                    {/* Row 2 */}
                    <div className="col-span-2 rounded-md">
                        <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Role
                        </label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 block h-12 w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-400 focus:ring-opacity-50"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}