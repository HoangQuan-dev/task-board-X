"use client"
import { BarChart3, Calendar, Home, Kanban, Plus, Settings, Users, Zap, ChevronRight, Activity, Star } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

const navigation = [
  { name: "Dashboard", href: "#", icon: Home, current: true, badge: null },
  { name: "My Tasks", href: "#", icon: Kanban, current: false, badge: "5" },
  { name: "Calendar", href: "#", icon: Calendar, current: false, badge: null },
  { name: "Analytics", href: "#", icon: BarChart3, current: false, badge: null },
  { name: "Activity", href: "#", icon: Activity, current: false, badge: "2" },
]

const boards = [
  { 
    id: "project-alpha", 
    name: "Project Alpha", 
    color: "bg-blue-500", 
    tasks: 12, 
    progress: 65,
    starred: true,
    status: "active"
  },
  { 
    id: "website-redesign", 
    name: "Website Redesign", 
    color: "bg-green-500", 
    tasks: 8,
    progress: 80,
    starred: false,
    status: "active"
  },
  { 
    id: "mobile-app", 
    name: "Mobile App", 
    color: "bg-purple-500", 
    tasks: 15,
    progress: 45,
    starred: true,
    status: "active"
  },
  { 
    id: "marketing", 
    name: "Marketing Campaign", 
    color: "bg-orange-500", 
    tasks: 6,
    progress: 90,
    starred: false,
    status: "completed"
  },
]

const recentBoards = boards.filter(board => board.status === "active").slice(0, 3)
const starredBoards = boards.filter(board => board.starred)

interface AppSidebarProps {
  selectedBoard: string
  onBoardSelect: (boardId: string) => void
}

export function AppSidebar({ selectedBoard, onBoardSelect }: AppSidebarProps) {
  return (
    <Sidebar className="border-r bg-sidebar-background">
      <SidebarHeader className="border-b border-sidebar-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Zap className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">TaskBoardX</span>
                <span className="text-xs text-sidebar-foreground/70">Team Workspace</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-6">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    data-active={item.current}
                    className="group transition-all duration-200 hover:bg-sidebar-accent/50"
                  >
                    <a href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 transition-colors" />
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs h-5 min-w-5 px-1">
                          {item.badge}
                        </Badge>
                      )}
                      {item.current && (
                        <ChevronRight className="h-3 w-3 text-sidebar-foreground/50" />
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Starred Boards */}
        {starredBoards.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 text-sidebar-foreground/70">
              <Star className="h-3 w-3" />
              Starred
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {starredBoards.map((board) => (
                  <SidebarMenuItem key={board.id}>
                    <SidebarMenuButton
                      asChild
                      data-active={selectedBoard === board.id}
                      onClick={() => onBoardSelect(board.id)}
                      className="group transition-all duration-200 hover:bg-sidebar-accent/50"
                    >
                      <button className="w-full p-2">
                        <div className="flex items-center gap-3 w-full">
                          <div className={`h-3 w-3 rounded-full ${board.color} shadow-sm`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="truncate text-sm font-medium">{board.name}</span>
                              <Badge variant="secondary" className="text-xs h-5 min-w-5 px-1 ml-2">
                                {board.tasks}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={board.progress} className="h-1 flex-1" />
                              <span className="text-xs text-sidebar-foreground/50 min-w-[30px]">
                                {board.progress}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* All Boards */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Boards</SidebarGroupLabel>
          <SidebarGroupAction className="hover:bg-sidebar-accent/50 transition-colors">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add Board</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {boards.map((board) => (
                <SidebarMenuItem key={board.id}>
                  <SidebarMenuButton
                    asChild
                    data-active={selectedBoard === board.id}
                    onClick={() => onBoardSelect(board.id)}
                    className="group transition-all duration-200 hover:bg-sidebar-accent/50"
                  >
                    <button className="w-full p-2">
                      <div className="flex items-center gap-3 w-full">
                        <div className={`h-3 w-3 rounded-full ${board.color} shadow-sm`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="truncate text-sm font-medium">{board.name}</span>
                              {board.starred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                            </div>
                            <div className="flex items-center gap-1">
                              {board.status === "completed" && (
                                <Badge variant="outline" className="text-xs h-5 px-1">
                                  Done
                                </Badge>
                              )}
                              <Badge variant="secondary" className="text-xs h-5 min-w-5 px-1">
                                {board.tasks}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={board.progress} className="h-1 flex-1" />
                            <span className="text-xs text-sidebar-foreground/50 min-w-[30px]">
                              {board.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Team Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Team</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className="group transition-all duration-200 hover:bg-sidebar-accent/50"
                >
                  <a href="#" className="flex items-center gap-3">
                    <Users className="h-4 w-4" />
                    <span className="flex-1">Members</span>
                    <Badge variant="secondary" className="text-xs h-5 min-w-5 px-1">
                      4
                    </Badge>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className="group transition-all duration-200 hover:bg-sidebar-accent/50"
                >
                  <a href="#" className="flex items-center gap-3">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="group hover:bg-sidebar-accent/50 transition-all duration-200">
                  <Avatar className="h-6 w-6 ring-2 ring-sidebar-border">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" alt="User" />
                    <AvatarFallback className="text-xs font-semibold">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-xs text-sidebar-foreground/70">john@company.com</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width] min-w-60">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">john@company.com</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
