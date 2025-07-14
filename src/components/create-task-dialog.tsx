"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Flag, X, Clock, Plus, User, Tag, CheckCircle2 } from "lucide-react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

interface CreateTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const teamMembers = [
  { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32", role: "Lead Developer" },
  { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32", role: "Designer" },
  { id: "3", name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32", role: "Developer" },
  { id: "4", name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32", role: "Product Manager" },
]

const availableTags = [
  "Frontend", "Backend", "Design", "UI/UX", "API", "Database", 
  "Testing", "Documentation", "Security", "Performance", "Mobile"
]

const priorityOptions = [
  { value: "low", label: "Low", icon: "🟢", color: "text-green-600" },
  { value: "medium", label: "Medium", icon: "🟡", color: "text-yellow-600" },
  { value: "high", label: "High", icon: "🔴", color: "text-red-600" }
]

const statusOptions = [
  { value: "todo", label: "To Do", color: "bg-gray-100 text-gray-800" },
  { value: "in-progress", label: "In Progress", color: "bg-blue-100 text-blue-800" },
  { value: "review", label: "Review", color: "bg-yellow-100 text-yellow-800" },
  { value: "done", label: "Done", color: "bg-green-100 text-green-800" }
]

export function CreateTaskDialog({ open, onOpenChange }: CreateTaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignee, setAssignee] = useState("")
  const [priority, setPriority] = useState("")
  const [status, setStatus] = useState("todo")
  const [dueDate, setDueDate] = useState<Date>()
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!title.trim()) {
      newErrors.title = "Task title is required"
    }
    if (!assignee) {
      newErrors.assignee = "Please assign the task to someone"
    }
    if (!priority) {
      newErrors.priority = "Please select a priority level"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log({
        title,
        description,
        assignee,
        priority,
        status,
        dueDate,
        tags,
      })
      
      // Reset form
      setTitle("")
      setDescription("")
      setAssignee("")
      setPriority("")
      setStatus("todo")
      setDueDate(undefined)
      setTags([])
      setErrors({})
      
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedMember = teamMembers.find(m => m.id === assignee)
  const selectedPriority = priorityOptions.find(p => p.value === priority)
  const selectedStatus = statusOptions.find(s => s.value === status)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Plus className="h-5 w-5" />
            Create New Task
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new task. All required fields are marked with an asterisk.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium flex items-center gap-1">
              Task Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter a clear, descriptive task title..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (errors.title) setErrors({...errors, title: ""})
              }}
              className={errors.title ? "border-red-500 focus:border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <X className="h-3 w-3" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Provide detailed information about the task, including acceptance criteria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Assignee and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <User className="h-3 w-3" />
                Assignee <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={assignee} 
                onValueChange={(value) => {
                  setAssignee(value)
                  if (errors.assignee) setErrors({...errors, assignee: ""})
                }}
              >
                <SelectTrigger className={errors.assignee ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select team member">
                    {selectedMember && (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={selectedMember.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {selectedMember.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left">
                          <span className="text-sm">{selectedMember.name}</span>
                          <span className="text-xs text-muted-foreground">{selectedMember.role}</span>
                        </div>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {member.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{member.name}</span>
                          <span className="text-xs text-muted-foreground">{member.role}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.assignee && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.assignee}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Flag className="h-3 w-3" />
                Priority <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={priority} 
                onValueChange={(value) => {
                  setPriority(value)
                  if (errors.priority) setErrors({...errors, priority: ""})
                }}
              >
                <SelectTrigger className={errors.priority ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select priority">
                    {selectedPriority && (
                      <div className="flex items-center gap-2">
                        <span>{selectedPriority.icon}</span>
                        <span className={selectedPriority.color}>{selectedPriority.label}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <span>{option.icon}</span>
                        <span className={option.color}>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.priority && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.priority}
                </p>
              )}
            </div>
          </div>

          {/* Status and Due Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Status
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue>
                    {selectedStatus && (
                      <Badge className={selectedStatus.color}>
                        {selectedStatus.label}
                      </Badge>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <Badge className={option.color}>
                        {option.label}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Due Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent 
                    mode="single" 
                    selected={dueDate} 
                    onSelect={setDueDate} 
                    disabled={(date) => date < new Date()}
                    initialFocus 
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-1">
              <Tag className="h-3 w-3" />
              Tags
            </Label>
            
            {/* Current Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1 px-2 py-1">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Add Tags */}
            <div className="flex gap-2">
              <Select value={newTag} onValueChange={(value) => addTag(value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Add tags to categorize this task..." />
                </SelectTrigger>
                <SelectContent>
                  {availableTags
                    .filter((tag) => !tags.includes(tag))
                    .map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="min-w-[100px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Creating...
                </div>
              ) : (
                "Create Task"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
