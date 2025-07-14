"use client"

import { useDrag } from "react-dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, MessageCircle, Paperclip, MoreHorizontal, Clock, AlertCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: "low" | "medium" | "high"
  assignee: {
    name: string
    avatar: string
  }
  dueDate: string
  tags: string[]
  comments: number
  attachments: number
}

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const priorityConfig = {
    low: {
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      icon: "🟢",
      border: "border-l-green-400"
    },
    medium: {
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      icon: "🟡",
      border: "border-l-yellow-400"
    },
    high: {
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      icon: "🔴",
      border: "border-l-red-400"
    },
  }

  const isOverdue = new Date(task.dueDate) < new Date()
  const isDueSoon = new Date(task.dueDate) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) && !isOverdue
  const currentPriority = priorityConfig[task.priority]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays === -1) return "Yesterday"
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`
    if (diffDays <= 7) return `In ${diffDays} days`
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <Card
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`
        task-card cursor-move border-l-4 ${currentPriority.border}
        ${isDragging ? "dragging" : ""}
        ${isOverdue ? "ring-1 ring-red-200 dark:ring-red-800" : ""}
        ${isDueSoon ? "ring-1 ring-yellow-200 dark:ring-yellow-800" : ""}
        bg-card text-card-foreground hover:shadow-lg
      `}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header with Title and Menu */}
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-sm leading-tight text-card-foreground flex-1">
            {task.title}
          </h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <span>Edit task</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Duplicate</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Move to...</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {task.description}
        </p>

        {/* Tags and Priority */}
        <div className="flex flex-wrap gap-1.5">
          {task.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
          {task.tags.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              +{task.tags.length - 3}
            </Badge>
          )}
          <Badge className={`text-xs px-2 py-0.5 ml-auto ${currentPriority.color}`}>
            <span className="mr-1">{currentPriority.icon}</span>
            {task.priority}
          </Badge>
        </div>

        {/* Footer with Assignee, Due Date, and Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 ring-2 ring-background">
              <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
              <AvatarFallback className="text-xs font-medium">
                {task.assignee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className={`flex items-center gap-1 text-xs ${
              isOverdue 
                ? "text-red-600 dark:text-red-400 font-medium" 
                : isDueSoon
                ? "text-yellow-600 dark:text-yellow-400 font-medium"
                : "text-muted-foreground"
            }`}>
              {isOverdue ? (
                <AlertCircle className="h-3 w-3" />
              ) : isDueSoon ? (
                <Clock className="h-3 w-3" />
              ) : (
                <Calendar className="h-3 w-3" />
              )}
              <span>{formatDate(task.dueDate)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {task.comments > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="h-3 w-3" />
                <span>{task.comments}</span>
              </div>
            )}
            {task.attachments > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Paperclip className="h-3 w-3" />
                <span>{task.attachments}</span>
              </div>
            )}
          </div>
        </div>

        {/* Overdue Warning */}
        {isOverdue && (
          <div className="mt-2 p-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-xs text-red-800 dark:text-red-200 font-medium flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Task is overdue
            </p>
          </div>
        )}

        {/* Due Soon Warning */}
        {isDueSoon && !isOverdue && (
          <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-md">
            <p className="text-xs text-yellow-800 dark:text-yellow-200 font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Due soon
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
