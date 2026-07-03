import { useEffect, useRef, useState } from "react"
import type { TaskRecord } from "@/shared/type"
import { Button } from "@/shared/components/button"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"
import { ChevronRight } from "lucide-react"
import { postSaveTask } from "@/shared/lib/mock-api"
export function TaskForm({ task, onSubmit }: { task: TaskRecord, onSubmit: (task: TaskRecord) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [priority, setPriority] = useState(task?.priority || "Select priority")
  const priorityMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setPriority(task?.priority || "Select priority")
  }, [task])

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (priorityMenuRef.current && !priorityMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const nextTask: TaskRecord = {
      ...task,
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      priority: priority === "Select priority" ? 'Low' : priority,
      dueDate: String(formData.get("dueDate") ?? ""),
    }

    onSubmit(nextTask)

    try {
      postSaveTask(nextTask)
    } catch (error) {
      console.error("Failed to save task", error)
    }
    
    handleCloseDialog()
  }

  const handleCloseDialog = () => {
    const dialog = document.getElementById("inputDialog") as HTMLDialogElement | null
    if (dialog) {
      dialog.close()
    }
  }

  return (
    <dialog
      id="inputDialog"
      className="fixed z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-white rounded-xl shadow-2xl backdrop:bg-black/50 open:animate-in open:fade-in open:zoom-in-95"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Create Task</h1>
        <button
          className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
          aria-label="Close dialog"
          onClick={handleCloseDialog}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Form Section */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

        {/* Title Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-sm font-semibold text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={task?.title}
            required
            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter task title"
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={task?.description}
            required
            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add details about this task..."
          ></textarea>
        </div>

        {/* Priority Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="priority" className="text-sm font-semibold text-gray-700">Priority</label>
          <div className="relative">
            <DropdownMenuPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuPrimitive.Trigger asChild className="min-w-40 bg-white border border-gray-300">
                <Button variant="secondary" size="lg" className="flex justify-between w-full">
                  <span className={priority === "Select priority" ? "text-gray-500" : "text-gray-900"}>
                    {priority}
                  </span>
                  <ChevronRight className={`h-4 w-4 ml-2 transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`} />
                </Button>
              </DropdownMenuPrimitive.Trigger>

              <DropdownMenuPrimitive.Content
                style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
                className="z-50 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg p-1"
              >
                <DropdownMenuPrimitive.Item className="w-full rounded-md px-3 py-2 text-left text-sm outline-none hover:bg-gray-100 focus:bg-gray-100" onSelect={() => setPriority("Low")}>Low</DropdownMenuPrimitive.Item>
                <DropdownMenuPrimitive.Item className="w-full rounded-md px-3 py-2 text-left text-sm outline-none hover:bg-gray-100 focus:bg-gray-100" onSelect={() => setPriority("Medium")}>Medium</DropdownMenuPrimitive.Item>
                <DropdownMenuPrimitive.Item className="w-full rounded-md px-3 py-2 text-left text-sm outline-none hover:bg-gray-100 focus:bg-gray-100" onSelect={() => setPriority("High")}>High</DropdownMenuPrimitive.Item>
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Root>
          </div>
        </div>

        {/* Due Date Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="dueDate" className="text-sm font-semibold text-gray-700">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            defaultValue={task?.dueDate ? String(task.dueDate).split('T')[0] : ''}
            className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Action */}
        <div className="flex justify-end pt-4 mt-2 border-t border-gray-100">
          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Task
          </button>
        </div>

      </form>
    </dialog>
  )
}
