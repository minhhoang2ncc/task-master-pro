import { Card, CardContent, CardHeader } from "@/shared/components/card"
import { Checkbox } from "@/shared/components/checkbox"
import { Button } from "@/shared/components/button"
import { GripVertical, Plus, Network } from "lucide-react"



export function SubtasksCard({ subtasks, onSubtaskChange }: { subtasks: any[]; onSubtaskChange?: (id: number, completed: boolean) => void }) {
  return (
    <Card className="w-full max-w-2xl shadow-sm">
      {/* Header Section */}
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-foreground" />
          <h2 className="text-xl font-bold text-foreground">
            Subtasks ({subtasks.length})
          </h2>
        </div>
        <Button 
          variant="ghost" 
          className="text-indigo-700 font-semibold hover:text-indigo-800 hover:bg-indigo-50 px-2"
        >
          <Plus className="w-4 h-4 mr-1" strokeWidth={3} /> 
          Add subtask
        </Button>
      </CardHeader>

      {/* List Section */}
      <CardContent className="flex flex-col gap-3">
        {subtasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-4 p-4 border border-slate-200 rounded-md relative transition-colors cursor-pointer hover:bg-slate-50"
          >
            {/* Drag Handle */}
            <GripVertical className="w-5 h-5 text-slate-400 cursor-grab flex-shrink-0" />

            {/* Checkbox */}
            <Checkbox
              checked={task.completed}
              onCheckedChange={(checked) => onSubtaskChange?.(task.id, checked === true)}
              className="w-5 h-5 rounded border-slate-300"
            />

            {/* Task Title with Dynamic Styling */}
            <span
              className={`text-base flex-1 ${
                task.completed
                  ? "text-slate-500 line-through"
                  : "text-slate-700"
              }`}
            >
              {task.title}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}