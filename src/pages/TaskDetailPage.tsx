import { Detail } from "@/modules/task-detail/components/detail"
import { SubtasksCard } from "@/modules/task-detail/components/sub-task";
import { ChevronRight } from "lucide-react"
import { useState } from "react";
import { ActionCard } from "@/modules/task-detail/components/action-card";
import { ProgressCard } from "@/modules/task-detail/components/progress-card";
export function TaskDetailPage() {
    const lastUpdated = new Date().toLocaleString(); // Example last updated value, you can replace it with actual data
    const [subtasks, setSubtasks] = useState([
        {
            id: 1,
            title: "Design Sidebar and Navigation",
            completed: true,
            active: false,
        },
        {
            id: 2,
            title: "Create Header with Search and Notifications",
            completed: false,
            active: false,
        },
        {
            id: 3,
            title: "Develop Task Detail form",
            completed: false,
            active: true, // Triggers the blue highlight state
        },
        {
            id: 4,
            title: "Optimize Responsive for Mobile",
            completed: false,
            active: false,
        },
    ])

    const handleSubtaskChange = (id: number, completed: boolean) => {
        setSubtasks(prevSubtasks =>
            prevSubtasks.map(task =>
                task.id === id ? { ...task, completed } : task
            )
        )
    }

    const progress = subtasks.filter(task => task.completed).length
    return (
        <section className="mx-auto max-w-6xl px-4">
            <div className="flex items-center gap-1 text-muted-foreground m-4">
                <p className="text-sm">My Task</p>
                <ChevronRight className="w-4 h-4 inline-block" />
                <p className="text-primary dark:text-foreground text-sm">Task Detail</p>
            </div>

            <div className="grid grid-cols-[3fr_1fr] gap-4 m-4">
                <div className="flex flex-col gap-4 row-span-2">
                    <Detail />
                    <SubtasksCard subtasks={subtasks} onSubtaskChange={handleSubtaskChange} />
                </div>

                <div className="flex flex-col gap-4">
                    <ActionCard lastUpdated={lastUpdated} />
                    <ProgressCard progress={progress} subtasks={subtasks} />
                </div>
            </div>


        </section>
    )
}