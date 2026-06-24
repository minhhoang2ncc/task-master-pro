import { Detail } from "@/modules/task-detail/components/detail"
import { Button } from "@/shared/components/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/card"
import { Progress } from "@/shared/components/progress";
import { SubtasksCard } from "@/modules/task-detail/components/sub-task";
import { Save, TrashIcon } from "lucide-react"
import { useState } from "react";
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
    let percentage = progress / subtasks.length * 100
    return (
        <section className="mx-auto max-w-6xl px-4">
                <div className="grid gap-4 grid-cols-[repeat(2,1fr)_300px] grid-rows-[auto_auto_1fr]">
                    {/* Update Task - spans 2 cols, 2 rows */}
                    <div className="col-span-2 row-span-2">
                    <Detail />
                    </div>
                    
                    {/* Actions & Progress - col 3, spans 2 rows */}
                    <div className="col-start-3 row-span-2 flex flex-col gap-4">
                    <Card className="flex flex-col flex-1 bg-tabs-background dark:bg-background">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">
                                Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2 flex-1">
                            <Button variant="default" className="flex-1 h-auto py-3">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                            <Button variant="destructive" className="flex-1 h-auto py-3">
                                <TrashIcon className="w-4 h-4 mr-2" />
                                Delete Task
                            </Button>
                        </CardContent>
                        <CardFooter className="mt-auto bg-tabs-background dark:bg-background">
                            <p className="text-sm text-muted-foreground">
                                Last updated: {lastUpdated}
                            </p>
                        </CardFooter>
                    </Card>
                    
                    <Card className="flex flex-col flex-1">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">
                                Progress
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2 flex-1 justify-evenly">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-4xl text-primary dark:text-foreground font-bold">{Math.round(percentage)}%</h3>
                                <p className="text-md text-muted-foreground">
                                    {progress} of {subtasks.length} subtasks completed
                                </p>
                            </div>
                            <Progress value={percentage} className="h-4 w-full" indicatorClassName="bg-primary dark:bg-foreground" />
                            <p className="text-sm text-muted-foreground">
                                Please complete {subtasks.length - progress} more subtasks to reach your goal.
                            </p>
                        </CardContent>
                    </Card>
                    </div>
                    
                    {/* Subtasks - spans 2 cols, row 3 */}
                </div>
                    <div className="col-span-2 row-start-3 mt-4">
                    <SubtasksCard subtasks={subtasks} onSubtaskChange={handleSubtaskChange} />
                    </div>

        </section>
    )
}