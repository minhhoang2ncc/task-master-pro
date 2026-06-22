import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card"
import { Progress } from "@/shared/components/progress"
import { CheckCircle2, AlertCircle, Clock } from "lucide-react"
export function SummaryTabs() {
    const numPrioTasks = 3;
    const avgTime = 42; // in minutes
    const completionRate = 75; // in percentage
    return (
        <div className="grid grid-cols-3 gap-3 w-full h-fit justify-evenly">
            <Card className="p-4 bg-indigo-600 border-none text-white relative overflow-hidden flex flex-col">
            
                <CheckCircle2 
                className="absolute -right-6 -top-4 w-24 h-24 opacity-10 text-white" 
                strokeWidth={2}
                />
                
                <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-xs text-white font-semibold uppercase">
                        Completion Rate
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-0 flex-1 flex flex-col justify-between">
                    <div className="text-2xl font-bold mb-2">
                        {completionRate}%
                    </div>
                    
                    <Progress 
                        value={completionRate}
                        indicatorClassName="bg-white/80"
                        className="h-2 bg-indigo-400/50  mb-2" 
                    />
                </CardContent>
            </Card>

            <Card className="p-4 flex flex-col">
                <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">
                        Priority Tasks
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1 flex items-center justify-between">
                    <div className="text-2xl font-bold">
                        {numPrioTasks < 10 ? `0${numPrioTasks}` : numPrioTasks}
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                </CardContent>
            </Card>

            <Card className="p-4 flex flex-col">
                <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">
                        Average Time
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1 flex items-center justify-between">
                    <div className="text-2xl font-bold">
                        {avgTime < 10 ? `0${avgTime}` : avgTime} min
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                        <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}