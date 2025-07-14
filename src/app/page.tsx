"use client"

import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { AppSidebar } from "@/components/app-sidebar"
import { TaskBoard } from "@/components/task-board"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Plus, Users, Bell, Search, Moon, Sun, Filter, MoreVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CreateTaskDialog } from "@/components/create-task-dialog"
import { InviteUserDialog } from "@/components/invite-user-dialog"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

export default function Dashboard() {
  const [selectedBoard, setSelectedBoard] = useState("project-alpha")
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false)
  const [isInviteUserOpen, setIsInviteUserOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { theme, setTheme } = useTheme()

  const currentBoard = {
    id: "project-alpha",
    name: "Project Alpha",
    description: "Main development project for Q1 2024",
    status: "active",
    progress: 65,
  }

  const teamMembers = [
    { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32", online: true, role: "Lead Developer" },
    { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32", online: true, role: "Designer" },
    { id: "3", name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32", online: false, role: "Developer" },
    { id: "4", name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32", online: true, role: "Product Manager" },
  ]

  const notifications = [
    { id: 1, type: "task_assigned", message: "New task assigned to you" },
    { id: 2, type: "comment", message: "John commented on 'API Design'" },
    { id: 3, type: "due_soon", message: "3 tasks due today" },
  ]

  return (
    <DndProvider backend={HTML5Backend}>
      <SidebarProvider>
        <AppSidebar selectedBoard={selectedBoard} onBoardSelect={setSelectedBoard} />
        <SidebarInset>
          {/* Enhanced Header */}
          <header className="sticky top-0 z-40 flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 sm:px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            
            {/* Breadcrumb */}
            <Breadcrumb className="hidden sm:block">
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="transition-colors hover:text-foreground">
                    Boards
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold">{currentBoard.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Mobile Board Title */}
            <div className="sm:hidden flex-1 min-w-0">
              <h1 className="text-sm font-semibold truncate">{currentBoard.name}</h1>
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              {/* Search */}
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search tasks, members..." 
                  className="pl-9 w-48 xl:w-64 h-8 sm:h-9 bg-muted/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile Search */}
              <Button variant="ghost" size="sm" className="lg:hidden h-8 w-8 sm:h-9 sm:w-9">
                <Search className="h-4 w-4" />
              </Button>

              {/* Filter Button */}
              <Button variant="outline" size="sm" className="hidden xl:flex h-8 sm:h-9">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>

              {/* Team Members */}
              <div className="hidden sm:flex items-center gap-1">
                {teamMembers.slice(0, 3).map((member) => (
                  <div key={member.id} className="relative group">
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border-2 border-background transition-transform group-hover:scale-110">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="text-xs font-semibold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {member.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500 border-2 border-background" />
                    )}
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-primary/10"
                  onClick={() => setIsInviteUserOpen(true)}
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-8 w-8 sm:h-9 sm:w-9">
                    <Bell className="h-4 w-4" />
                    {notifications.length > 0 && (
                      <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 text-xs">
                        {notifications.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 sm:w-80">
                  <div className="flex items-center justify-between px-4 py-2 border-b">
                    <h4 className="font-semibold">Notifications</h4>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Mark all read
                    </Button>
                  </div>
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="h-8 w-8 sm:h-9 sm:w-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Create Task Button */}
              <Button onClick={() => setIsCreateTaskOpen(true)} className="hidden md:flex h-8 sm:h-9">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>

              {/* Mobile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden h-8 w-8 sm:h-9 sm:w-9">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsCreateTaskOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsInviteUserOpen(true)}>
                    <Users className="h-4 w-4 mr-2" />
                    Invite User
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 space-y-4 sm:space-y-6 p-3 sm:p-6 pb-6 sm:pb-8 bg-background text-foreground">
            {/* Board Header */}
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{currentBoard.name}</h1>
                  <Badge variant="secondary" className="capitalize text-xs">
                    {currentBoard.status}
                  </Badge>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">{currentBoard.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    {teamMembers.length} members
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {teamMembers.filter((m) => m.online).length} online
                  </Badge>
                </div>
                
                {/* Progress Bar */}
                <div className="flex items-center gap-2 min-w-[100px] sm:min-w-[120px]">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                      style={{ width: `${currentBoard.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium min-w-[30px] sm:min-w-[35px]">
                    {currentBoard.progress}%
                  </span>
                </div>
              </div>
            </div>

            {/* Task Board */}
            <div className="task-board-container">
              <TaskBoard />
            </div>
          </div>
        </SidebarInset>

        <CreateTaskDialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen} />
        <InviteUserDialog open={isInviteUserOpen} onOpenChange={setIsInviteUserOpen} />
      </SidebarProvider>
    </DndProvider>
  )
}
