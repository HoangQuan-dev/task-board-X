import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar Skeleton */}
      <div className="w-64 border-r bg-sidebar-background p-4 space-y-6">
        {/* Logo Skeleton */}
        <div className="flex items-center gap-3 p-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Navigation Skeleton */}
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>

        {/* Boards Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-16" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2 p-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-8 ml-auto" />
                </div>
                <Skeleton className="h-1 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Header Skeleton */}
        <div className="h-16 border-b bg-background/95 px-6 flex items-center gap-4">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-4 w-1 bg-border" />
          <Skeleton className="h-4 w-32" />
          
          <div className="ml-auto flex items-center gap-3">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>

        {/* Content Area Skeleton */}
        <div className="flex-1 p-6 space-y-6">
          {/* Board Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-2 w-32" />
            </div>
          </div>

          {/* Task Board Skeleton */}
          <div className="flex gap-6 overflow-x-auto">
            {Array.from({ length: 4 }).map((_, columnIndex) => (
              <div
                key={columnIndex}
                className="flex-shrink-0 w-80 rounded-xl border-2 p-5 space-y-4 bg-muted/20"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-8" />
                  </div>
                  <Skeleton className="h-8 w-8" />
                </div>

                {/* Task Cards */}
                <div className="space-y-3">
                  {Array.from({ length: Math.floor(Math.random() * 4) + 1 }).map((_, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="rounded-lg border border-border bg-card p-4 space-y-3"
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-6 w-6" />
                      </div>

                      {/* Description */}
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>

                      {/* Tags */}
                      <div className="flex gap-1">
                        <Skeleton className="h-5 w-12" />
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-14" />
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-6 w-6 rounded-full" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-4 w-6" />
                          <Skeleton className="h-4 w-6" />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add task button skeleton */}
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}