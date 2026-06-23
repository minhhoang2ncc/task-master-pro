import { useState } from "react"
import { useParams } from "react-router-dom"
import { useTask } from "@/shared/context/TaskContext"

// Shadcn UI Imports
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/shared/components/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/select"
import { Badge } from "@/shared/components/badge"
import { Input } from "@/shared/components/input"
import { Textarea } from "@/shared/components/textarea"
import { Label } from "@/shared/components/label"
import { Button } from "@/shared/components/button"
import { Plus, X } from "lucide-react"

export function Detail() {
    const { id } = useParams<{ id: string }>()
    const { getTaskById } = useTask()
    const task = getTaskById(Number(id))

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

    const [tags, setTags] = useState<{ name: string; color: string }[]>([])
    const [title, setTitle] = useState(task?.Title || "")
    const [description, setDescription] = useState(task?.Description || "")
    const [priority, setPriority] = useState(task?.Priority || "")
    
    // Safety check for date initialization
    const initialDate = task?.DueDate ? new Date(task.DueDate) : new Date()
    const [dueDate, setDueDate] = useState<Date>(initialDate)

    const handleTagToggle = (tag: { name: string; color: string }) => {
        setTags((prevTags) => {
            if (prevTags.some((t) => t.name === tag.name)) {
                return prevTags.filter((t) => t.name !== tag.name)
            } else {
                return [...prevTags, tag]
            }
        })
    }

    return (
        <Card className="w-full max-w-3xl shadow-sm col-span-2 row-span-2">
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
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Enter task title"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                        id="description"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
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
                            value={dueDate.toISOString().split("T")} 
                            onChange={(e) => setDueDate(new Date(e.target.value))} 
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Priority</Label>
                        {/* Shadcn Select works differently than native <select> */}
                        <Select onValueChange={setPriority} defaultValue={priority}>
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

            {/* <CardFooter className="flex justify-end border-t pt-4">
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button>Save Changes</Button>
            </CardFooter> */}
        </Card>
    )
}