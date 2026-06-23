import { useState } from "react"
import { Checkbox } from "@/shared/components/checkbox"
import { Badge } from "@/shared/components/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/avatar"
import { Calendar, CheckCheck } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Task({ id, Title, Priority, DueDate }: { id: number; Title: string; Priority: string; DueDate: Date }) {
    const navigate = useNavigate()
    const [isHighlighted, setIsHighlighted] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)

    const handleTaskClick = () => {
        navigate(`/task/${id}`)
    }

    const handleCheckboxClick = (checked: boolean) => {
        setIsCompleted(checked)
    }

    return (
        <div className={`flex items-center gap-4 p-5 border-b last:border-b relative transition-colors ${
              isHighlighted ? "border-l-2 border-l-indigo-500 dark:border-l-yellow-400" : ""
            }`} onMouseEnter={() => setIsHighlighted(true)} onMouseLeave={() => setIsHighlighted(false)}>

            <Checkbox 
              checked={isCompleted} 
              onCheckedChange={handleCheckboxClick}
              className={`h-5 w-5 rounded border-slate-300 ${isCompleted ? "data-[state=checked]:bg-indigo-400 data-[state=checked]:border-indigo-400" : ""}`} 
            />
            
            <section className="flex flex-col gap-1.5 flex-1 cursor-pointer" onClick={handleTaskClick}>
              <span className={`text-base dark:text-white font-medium ${isCompleted ? "text-slate-400 line-through" : "text-slate-900"}`}>
                {Title}
              </span>
              
              <div className="flex items-center gap-3">
                {/* Dynamic Badge Colors */}
                {!isCompleted && (
                  <Badge 
                    variant="secondary" 
                    className={`text-xs px-2 py-0 rounded-sm font-medium 
                      ${Priority.toLowerCase() === 'high' ? 'bg-red-100 text-red-600 hover:bg-red-100' : ''}
                      ${Priority.toLowerCase() === 'medium' ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300" : ''}
                      ${Priority.toLowerCase() === 'low' ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-100' : ''}
                    `}
                  >
                    {Priority}
                  </Badge>
                )}
                
                {/* Completed state badge override */}
                {isCompleted && (
                  <Badge variant="secondary" className="bg-slate-100 text-slate-400 text-xs px-2 py-0 rounded-sm font-medium hover:bg-slate-100">
                    {Priority}
                  </Badge>
                )}

                <div className="flex items-center text-sm text-slate-500 gap-1">
                  {isCompleted ? <CheckCheck className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                  <span>{DueDate.toLocaleDateString()}</span>
                </div>
              </div>
            </section>

            {!isCompleted && (
              <Avatar className="h-8 w-8 ml-auto border">
                <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${id}`} alt="Assignee" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
        </div>
    )
}