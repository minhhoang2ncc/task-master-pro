import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card"
import { Progress } from "@/shared/components/progress"

type Subtask = {
  id: number;
  title: string;
  completed: boolean;
  active: boolean;
};

export function ProgressCard({ progress, subtasks }: { progress: number, subtasks: Subtask[] }) {
    const percentage = (progress / subtasks.length) * 100;
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Progress
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 flex-1 justify-evenly">
                <div className="flex justify-between items-end mb-2">
                    <h3 className="text-3xl text-primary dark:text-foreground font-bold">{Math.round(percentage)}%</h3>
                    <p className="text-sm text-muted-foreground">
                        {progress} of {subtasks.length} subtasks
                    </p>
                </div>
                <Progress value={percentage} className="h-4 w-full" indicatorClassName="bg-primary dark:bg-foreground" />
                <p className="text-sm text-muted-foreground">
                    Please complete {subtasks.length - progress} more subtasks to reach your goal.
                </p>
            </CardContent>
        </Card>
    )
}