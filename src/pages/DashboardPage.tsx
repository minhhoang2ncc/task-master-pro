

import { TitleBar } from "@/shared/layouts/titlebar"
import { SummaryTabs } from "@/modules/dashboard/components/summary-tabs"
import { TaskList } from "@/modules/dashboard/components/task-list"
import { TitleContent } from "@/modules/dashboard/components/title-content";
import { Hint } from "@/modules/dashboard/components/hint";
import { Button } from "@/shared/components/button";
import { Plus } from "lucide-react";
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
            <Button
                size="icon"
                className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-indigo-700 hover:bg-indigo-800 shadow-lg"
            >
                <Plus className="w-8 h-8 text-white" strokeWidth={3} />
            </Button>
        </section>
    )
}