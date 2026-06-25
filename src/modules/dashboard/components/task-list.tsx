import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/shared/components/card"
import { Task } from "@/modules/dashboard/components/task" 
import { ListFilter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/shared/components/button"

export function TaskList() {
    const tasks = [
        {
            id: 1,
            title: "Design new landing page",
            priority: "High",
            dueDate: new Date("2024-06-15"),
        },
        {
            id: 2,
            title: "Fix login bug",
            priority: "Medium",
            dueDate: new Date("2024-06-10"),
        },
        {
            id: 3,
            title: "Update user profile UI",
            priority: "Low",
            dueDate: new Date("2024-06-20"),
        },
        {
            id: 4,
            title: "Implement search functionality",
            priority: "High",
            dueDate: new Date("2024-06-18"),
        }
    ]
    return (
        <Card className="w-full h-fit mt-4 mb-4">
            <CardHeader className="flex items-center justify-between p-4">
                <CardTitle className="text-lg font-semibold pl-4">Task List</CardTitle>
                <span className="flex items-center gap-2 text-muted-foreground">
                    <div><ListFilter className="w-4 h-4" /></div>
                    <div><SlidersHorizontal className="w-4 h-4" /></div>
                </span>
                
            </CardHeader>
            <CardContent>
                {tasks.map((task) => {
                    return (
                        <Task id={task.id} Title={task.title} Priority={task.priority} DueDate={task.dueDate} />
                    )
                })}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground flex justify-center">
                <Button variant="link" size="lg">
                    View All Tasks
                </Button>
            </CardFooter>
        </Card>
    )
}
