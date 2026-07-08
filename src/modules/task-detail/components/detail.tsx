import { useEffect, useState, useRef } from "react"

// Shadcn UI Imports
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/select"
import { Badge } from "@/shared/components/badge"
import { Input } from "@/shared/components/input"
import { Textarea } from "@/shared/components/textarea"
import { Label } from "@/shared/components/label"
import { Button } from "@/shared/components/button"
import { Plus, X } from "lucide-react"
import { useDispatch } from "react-redux"
import { deleteTask } from "@/redux/features/taskSlice"
import { useNavigate } from "react-router-dom"
import type { TaskRecord } from "@/shared/type"
import type { AppDispatch } from "@/redux/store"

export function Detail({ task, modifyRegister, deleteRegister }:
  {
    task: TaskRecord | undefined,
    modifyRegister?: (getter: () => TaskRecord | undefined) => void,
    deleteRegister?: (handler: () => void) => void
  }) {

  const tagList = [
    { name: "UI", color: "bg-blue-500" },
    { name: "Backend", color: "bg-green-500" },
    { name: "API", color: "bg-purple-500" },
    { name: "Database", color: "bg-yellow-500" },
    { name: "Testing", color: "bg-red-500" },
    { name: "Deployment", color: "bg-indigo-500" },
    { name: "Design", color: "bg-pink-500" },
    { name: "Research", color: "bg-teal-500" },
    { name: "Documentation", color: "bg-orange-500" },
    { name: "Performance", color: "bg-cyan-500" },
  ]

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [taskData, setTaskData] = useState<TaskRecord | undefined>(task)
  const [tags, setTags] = useState<{ name: string; color: string }[]>(taskData?.tags || [])
  const taskDataRef = useRef<TaskRecord | undefined>(task)
  const title = taskData?.title || ""
  const description = taskData?.description || ""
  const priority = taskData?.priority || ""
  const dueDate = taskData?.dueDate ? String(taskData.dueDate).split("T")[0] : new Date().toISOString().split("T")[0]

  const handleTaskDataChange = (name: keyof TaskRecord, value: any) => setTaskData(prev => {
    if (!prev) return prev
    return { ...prev, [name]: value }
  })

  const handleTagToggle = (tag: { name: string; color: string }) => {
    setTags((prevTags) => {
      const newTags = prevTags.some((t) => t.name === tag.name)
        ? prevTags.filter((t) => t.name !== tag.name)
        : [...prevTags, tag]
      handleTaskDataChange("tags", newTags)
      return newTags
    })
  }


  useEffect(() => {
    taskDataRef.current = taskData
  }, [taskData])

  useEffect(() => {
    if (!modifyRegister) return
    modifyRegister(() => taskDataRef.current)
  }, [])

  useEffect(() => {
    if (!deleteRegister) return
    deleteRegister(() => {
      const task = taskDataRef.current!
      dispatch(deleteTask(task))
      navigate("/dashboard")
    })
  }, [])
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4 mb-6">
        <CardTitle className="text-xl font-bold text-foreground">Update Task</CardTitle>
        <Badge
          variant="secondary"
          className={
            priority === "High" ? "bg-red-100 text-red-700 hover:bg-red-100" :
              priority === "Medium" ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                "bg-green-100 text-green-700 hover:bg-green-100"
          }
        >
          {priority || "Unassigned"}
        </Badge>
      </CardHeader>

      {/* space-y-6 creates consistent vertical rhythm between form sections */}
      <CardContent className="space-y-6">

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => handleTaskDataChange("title", e.target.value)}
            placeholder="Enter task title"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => handleTaskDataChange("description", e.target.value)}
            placeholder="Provide details about this task..."
            className="resize-none h-24"
          />
        </div>

        {/* 2-Column Grid for Date and Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="due-date">Due Date</Label>
            <Input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => handleTaskDataChange("dueDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            {/* Shadcn Select works differently than native <select> */}
            <Select onValueChange={(value) => handleTaskDataChange("priority", value)} defaultValue={priority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tags Section */}
        <div className="space-y-3 pt-2">
          <Label>Tags</Label>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <Badge key={tag.name} variant="secondary" className={`${tag.color} text-white flex items-center gap-1 pr-1`}>
                {tag.name}
                {/* Allows clicking an X to remove the tag */}
                <div
                  className="hover:bg-black/20 rounded-full p-0.5 cursor-pointer transition-colors"
                  onClick={() => handleTagToggle(tag)}
                >
                  <X className="w-3 h-3" />
                </div>
              </Badge>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 border-dashed gap-1 text-xs">
                  <Plus className="w-3 h-3" /> Add Tag
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {tagList.filter((tag) => !tags.some((t) => t.name === tag.name)).map((tag) => (
                  <DropdownMenuItem
                    key={tag.name}
                    onClick={() => handleTagToggle(tag)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className={`w-2.5 h-2.5 rounded-full ${tag.color}`} />
                    {tag.name}
                  </DropdownMenuItem>
                ))}
                {tags.length === tagList.length && (
                  <div className="p-2 text-xs text-muted-foreground text-center">All tags added</div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
