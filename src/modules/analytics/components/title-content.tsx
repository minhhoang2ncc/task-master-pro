import { TimeRangeSelector } from "@/modules/analytics/components/time-range-selector";
import { Button } from "@/shared/components/button";
import { useState } from "react";

export function TitleContent(){
    const [timeRange, setTimeRange] = useState("week");
    return (
        <>
            <div>
                <h1 className="text-xl font-bold text-foreground">Report & Statistics</h1>
                <h2 className="text-sm text-muted-foreground">Analyze your task performance for the past {timeRange}</h2>
            </div>
            <div className="flex items-center gap-2">
                <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
                <Button variant="default" size="lg">
                    Export Report
                </Button>
            </div>
        </>
    )
}