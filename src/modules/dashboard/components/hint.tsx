import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { Lightbulb, Plus } from "lucide-react";
import { Button } from "@/shared/components/button";
export function Hint(){
    return (
        <>
            <div className="relative">
                <Card className='bg-hint-background dark:bg-slate-800 dark:text-white'>
                    <CardHeader className="ml-4">
                        <CardTitle className="font-bold">Hint to Improve Productivity</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-yellow-500" />
                        Try using the Pomodoro Technique: work for 25 minutes, then take a 5-minute break. This can help maintain focus and prevent burnout.
                    </CardContent>
                </Card>
                <Button
                    size="icon"
                    className="absolute -bottom-5 -right-5 w-14 h-14 rounded-full bg-indigo-700 hover:bg-indigo-800 shadow-lg"
                >
                    <Plus className="w-8 h-8 text-white" strokeWidth={3} />
                </Button>
            </div>
        </>
    )
}