"use client"

import { useState } from "react"
import { useDrop } from "react-dnd"
import { TaskCard } from "@/components/task-card"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Grip } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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

interface Column {
  id: string
  title: string
  tasks: Task[]
  color: string
  limit?: number
}

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "task-column-todo",
    tasks: [
      {
        id: "1",
        title: "Design user authentication flow",
        description: "Create wireframes and mockups for login/register pages with modern UI patterns",
        status: "todo",
        priority: "high",
        assignee: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "2024-01-15",
        tags: ["Design", "UI/UX", "Authentication"],
        comments: 3,
        attachments: 2,
      },
      {
        id: "2",
        title: "Set up database schema",
        description: "Define tables for users, tasks, and projects with proper relationships",
        status: "todo",
        priority: "medium",
        assignee: { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "2024-01-18",
        tags: ["Backend", "Database"],
        comments: 1,
        attachments: 0,
      },
      {
        id: "6",
        title: "Create API documentation",
        description: "Document all REST API endpoints with examples and schemas",
        status: "todo",
        priority: "low",
        assignee: { name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "2024-01-22",
        tags: ["Documentation", "API"],
        comments: 0,
        attachments: 1,
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "task-column-progress",
    limit: 3,
    tasks: [
      {
        id: "3",
        title: "Implement drag and drop functionality",
        description: "Add React DnD for seamless task board interactions with smooth animations",
        status: "in-progress",
        priority: "high",
        assignee: { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "2024-01-20",
        tags: ["Frontend", "React", "DnD"],
        comments: 5,
        attachments: 1,
      },
      {
        id: "7",
        title: "Optimize database queries",
        description: "Improve query performance and add proper indexing",
        status: "in-progress",
        priority: "medium",
        assignee: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "2024-01-19",
        tags: ["Backend", "Performance"],
        comments: 2,
        attachments: 0,
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    color: "task-column-review",
    tasks: [
      {
        id: "4",
        title: "Code review for API endpoints",
        description: "Review and test all REST API endpoints for security and performance",
        status: "review",
        priority: "medium",
        assignee: { name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "2024-01-16",
        tags: ["Backend", "API", "Security"],
        comments: 2,
        attachments: 0,
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "task-column-done",
    tasks: [
      {
        id: "5",
        title: "Project setup and configuration",
        description: "Initialize Next.js project with Tailwind CSS and required dependencies",
        status: "done",
        priority: "low",
        assignee: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "2024-01-10",
        tags: ["Setup", "Config"],
        comments: 0,
        attachments: 1,
      },
      {
        id: "8",
        title: "Design system components",
        description: "Create reusable UI components with consistent styling",
        status: "done",
        priority: "medium",
        assignee: { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
        dueDate: "2024-01-12",
        tags: ["Design", "Components"],
        comments: 4,
        attachments: 3,
      },
    ],
  },
]

export function TaskBoard() {
  const [columns, setColumns] = useState(initialColumns)

  const moveTask = (taskId: string, fromColumn: string, toColumn: string) => {
    setColumns((prev) => {
      const newColumns = [...prev]
      const fromCol = newColumns.find((col) => col.id === fromColumn)
      const toCol = newColumns.find((col) => col.id === toColumn)

      if (fromCol && toCol) {
        const taskIndex = fromCol.tasks.findIndex((task) => task.id === taskId)
        if (taskIndex !== -1) {
          const [task] = fromCol.tasks.splice(taskIndex, 1)
          task.status = toColumn
          toCol.tasks.push(task)
        }
      }

      return newColumns
    })
  }

  const getTotalTasks = () => {
    return columns.reduce((total, column) => total + column.tasks.length, 0)
  }

  const getColumnIndicatorColor = (columnId: string) => {
    switch (columnId) {
      case "todo":
        return "bg-blue-500"
      case "in-progress":
        return "bg-yellow-500"
      case "review":
        return "bg-orange-500"
      case "done":
        return "bg-green-500"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Board Statistics */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Total Tasks: <span className="font-semibold text-foreground">{getTotalTasks()}</span>
          </div>
          <div className="flex items-center gap-2">
            {columns.map((column) => (
              <div key={column.id} className="flex items-center gap-1 text-xs text-muted-foreground">
                <div className={`w-2 h-2 rounded-full ${getColumnIndicatorColor(column.id)}`} />
                <span className="text-foreground">{column.title}: {column.tasks.length}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Board Columns */}
      <div className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-4 sm:pb-6 min-h-[500px] sm:min-h-[600px] scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        {columns.map((column) => (
          <TaskColumn key={column.id} column={column} onMoveTask={moveTask} />
        ))}
        
        {/* Add Column Button */}
        <div className="flex-shrink-0 w-72 sm:w-80">
          <Button 
            variant="outline" 
            className="w-full h-32 border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground transition-all duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Column
          </Button>
        </div>
      </div>
    </div>
  )
}

interface TaskColumnProps {
  column: Column
  onMoveTask: (taskId: string, fromColumn: string, toColumn: string) => void
}

function TaskColumn({ column, onMoveTask }: TaskColumnProps) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "task",
    drop: (item: { id: string; status: string }) => {
      if (item.status !== column.id) {
        onMoveTask(item.id, item.status, column.id)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isAtLimit = column.limit && column.tasks.length >= column.limit
  const canDropHere = canDrop && !isAtLimit

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`
        flex-shrink-0 w-72 sm:w-80 rounded-xl border-2 p-3 sm:p-4 md:p-5 transition-all duration-200
        ${column.color} bg-card text-card-foreground
        ${isOver && canDropHere ? "drop-zone-active scale-105" : ""}
        ${isAtLimit ? "opacity-75" : ""}
      `}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <Grip className="h-4 w-4 text-muted-foreground cursor-move" />
            <h3 className="font-semibold text-sm sm:text-base">{column.title}</h3>
          </div>
          <Badge variant="secondary" className="text-xs font-medium">
            {column.tasks.length}
            {column.limit && ` / ${column.limit}`}
          </Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Add task</DropdownMenuItem>
            <DropdownMenuItem>Edit column</DropdownMenuItem>
            <DropdownMenuItem>Set limit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete column</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Column Limit Warning */}
      {isAtLimit && (
        <div className="mb-3 p-2 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-xs text-yellow-800 dark:text-yellow-200 font-medium">
            Column limit reached ({column.limit} tasks)
          </p>
        </div>
      )}

      {/* Tasks */}
      <div className="space-y-2 sm:space-y-3 min-h-[350px] sm:min-h-[400px]">
        {column.tasks.map((task, index) => (
          <div key={task.id} className="animate-in" style={{ animationDelay: `${index * 50}ms` }}>
            <TaskCard task={task} />
          </div>
        ))}

        {/* Add Task Button */}
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-black/20 transition-all duration-200 h-10 sm:h-12 text-sm"
          disabled={isAtLimit}
        >
          <Plus className="h-4 w-4 mr-2" />
          {isAtLimit ? "Limit reached" : "Add a task"}
        </Button>
      </div>

      {/* Drop Zone Indicator */}
      {isOver && canDropHere && (
        <div className="mt-3 p-3 border-2 border-dashed border-primary/50 rounded-lg bg-primary/5 flex items-center justify-center animate-pulse">
          <p className="text-sm text-primary font-medium">Drop task here</p>
        </div>
      )}
    </div>
  )
}
