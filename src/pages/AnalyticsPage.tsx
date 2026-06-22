import { TitleBar } from "@/shared/layouts/titlebar";
import { TitleContent } from "@/modules/analytics/components/title-content";
import { SummaryTabs } from "@/modules/analytics/components/summary-tabs";
import { WeeklyProductivityChart } from "@/modules/analytics/components/productivity-chart";
import { TaskDistributionChart } from "@/modules/analytics/components/distribution-chart";
import { ProjectPerformanceTable } from "@/modules/analytics/components/performance-table";

export function AnalyticsPage() {
    return (
        <section>
            <TitleBar>
                <TitleContent/>
            </TitleBar>
            <div className="m-4">
                <SummaryTabs />
            </div>
            <div className="grid grid-cols-2 gap-4 p-4 w-full h-fit">
                <WeeklyProductivityChart/>
                <TaskDistributionChart/>
            </div>
            <div className="m-4">
                <ProjectPerformanceTable/>
            </div>
        </section>
    )
}