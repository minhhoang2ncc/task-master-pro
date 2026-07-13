

import { TitleBar } from "@/shared/layouts/titlebar"
import { SummaryTabs } from "@/pages/Dashboard/components/summary-tabs"
import { TaskList } from "@/pages/Dashboard/components/task-list"
import { TitleContent } from "@/pages/Dashboard/components/title-content";
import { Hint } from "@/pages/Dashboard/components/hint";
import { Button } from "@/shared/components/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export function DashboardPage({ name, numTask }: { name: string; numTask: number }) {
  const [taskFilter, setTaskFilter] = useState<string>("all")

  return (
    <section>
      <TitleBar>
        <TitleContent name={name} numTask={numTask} taskFilter={taskFilter} setTaskFilter={setTaskFilter} />
      </TitleBar>
      <div className="flex flex-col gap-4 p-4 w-full h-fit">
        <SummaryTabs />
        <TaskList filter={taskFilter} />
        <Hint />
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
