import { TitleBar } from "@/shared/layouts/titlebar";
import { TitleContent } from "@/pages/Analytics/components/title-content";
import { SummaryTabs } from "@/pages/Analytics/components/summary-tabs";
import { WeeklyProductivityChart } from "@/pages/Analytics/components/productivity-chart";
import { TaskDistributionChart } from "@/pages/Analytics/components/distribution-chart";
import { ProjectPerformanceTable } from "@/pages/Analytics/components/performance-table";

export function AnalyticsPage() {
  return (
    <section>
      <TitleBar>
        <TitleContent />
      </TitleBar>
      <div className="m-4">
        <SummaryTabs />
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 w-full h-fit">
        <WeeklyProductivityChart />
        <TaskDistributionChart />
      </div>
      <div className="m-4">
        <ProjectPerformanceTable />
      </div>
    </section>
  )
}
