

import { TitleBar } from "@/shared/layouts/titlebar"
import { SummaryTabs } from "@/modules/dashboard/components/summary-tabs"
import { TaskList } from "@/modules/dashboard/components/task-list"
import { TitleContent } from "@/modules/dashboard/components/title-content";
import { Hint } from "@/modules/dashboard/components/hint";
export function DashboardPage({ name, numTask }: { name: string; numTask: number }) {
    return (
        <section>
            <TitleBar>
                <TitleContent name={name} numTask={numTask} />
            </TitleBar>
            <div className="flex flex-col gap-4 p-4 w-full h-fit">
                <SummaryTabs />
                <TaskList />
                <Hint/>
            </div>
        </section>
    )
}