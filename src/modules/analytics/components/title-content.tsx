import { TimeRangeSelector } from "@/modules/analytics/components/time-range-selector";
import { Button } from "@/shared/components/button";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";

export function TitleContent(){
    const [timeRange, setTimeRange] = useState("week");
    return (
        <>
            <div>
                <h1 className="text-3xl font-bold text-foreground">Report & Statistics</h1>
                <h2 className="text-sm text-muted-foreground">Analyze your task performance for the past {timeRange}</h2>
            </div>
            <div className="flex items-center gap-2">
                <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
                <Button variant="default" size="lg">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Export Report
                </Button>
            </div>
        </>
    )
}