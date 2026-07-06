import { Detail } from "@/modules/task-detail/components/detail"
import { SubtasksCard } from "@/modules/task-detail/components/sub-task";
import { SubTaskForm } from "@/modules/task-detail/components/subtask-form";
import { ChevronRight } from "lucide-react"
import { useState, useRef } from "react";
import { ActionCard } from "@/modules/task-detail/components/action-card";
import { ProgressCard } from "@/modules/task-detail/components/progress-card";
import { useSelector, useDispatch } from "react-redux";
import { modify } from "@/redux/features/taskSlice";
import type { Subtask, TaskRecord } from "@/shared/type";
import { useParams } from "react-router-dom";
import type { RootState } from "@/redux/store";
import { postSaveTask } from "@/shared/lib/mock-api";

export function TaskDetailPage() {
  const taskId = useParams<{ id: string }>().id;
  const taskList = useSelector((state: RootState) => state.tasks) || [];
  const task = taskList.find((item) => item.id === Number(taskId));
  const subtasks = task?.subtasks || [];
  const lastUpdated = new Date().toLocaleString();
  const progress = subtasks.filter((subtask) => subtask.completed).length;

  const dispatch = useDispatch()

  const modifyTaskHandlerRef = useRef<(() => TaskRecord | undefined) | undefined>(undefined);
  const deleteTaskHandlerRef = useRef<(() => void) | undefined>(undefined);

  const modifySubTaskHandlerRef = useRef<(() => Subtask[] | undefined) | undefined>(undefined);
  const deleteSubTaskHandlerRef = useRef<(() => void) | undefined>(undefined);

  const saveHandler = async () => {
    const taskData = modifyTaskHandlerRef.current?.()
    const childSubtasks = modifySubTaskHandlerRef.current?.()
    if (!taskData) return
    const merged: TaskRecord = {
      ...taskData,
      subtasks: childSubtasks ?? taskData.subtasks ?? []
    }

    dispatch(modify(merged))

    postSaveTask(merged).catch((error) =>
      console.error("Failed to sync task to API", error)
    )
  }

  const handleAddSubtaskRef = useRef<((title: string) => void) | undefined>(undefined);
  const [isSubtaskFormOpen, setIsSubtaskFormOpen] = useState(false)
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="flex items-center gap-1 text-muted-foreground m-4">
        <p className="text-sm">My Task</p>
        <ChevronRight className="w-4 h-4 inline-block" />
        <p className="text-primary dark:text-foreground text-sm">Task Detail</p>
      </div>

      <div className="grid grid-cols-[3fr_1fr] gap-4 m-4">
        <div className="flex flex-col gap-4 row-span-2">
          <Detail
            task={task}
            modifyRegister={(handler) => { modifyTaskHandlerRef.current = handler }}
            deleteRegister={(handler) => { deleteTaskHandlerRef.current = handler }}
          />
          <SubtasksCard
            task={task}
            modifyRegister={(handler) => { modifySubTaskHandlerRef.current = handler }}
            addSubtaskRegister={(handler) => { handleAddSubtaskRef.current = handler }}
            deleteRegister={(handler) => { deleteSubTaskHandlerRef.current = handler }}
            onAddSubtask={() => setIsSubtaskFormOpen(true)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <ActionCard lastUpdated={lastUpdated} onSave={saveHandler} onDelete={() => deleteTaskHandlerRef.current?.()} />
          <ProgressCard progress={progress} subtasks={subtasks} />
        </div>
      </div>

      <SubTaskForm
        open={isSubtaskFormOpen}
        onOpenChange={setIsSubtaskFormOpen}
        onSubmit={(title) => handleAddSubtaskRef.current?.(title)}
      />


    </section>
  )
}
