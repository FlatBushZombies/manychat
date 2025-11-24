"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useState } from "react"

export function DashboardHeader() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch("/api/manychat/sync", { method: "POST" })
      if (response.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error("Refresh failed:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Submissions Dashboard</h1>
          <p className="text-muted-foreground mt-1">WhatsApp Bot Data from ManyChat</p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing} className="gap-2">
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Syncing..." : "Sync Now"}
        </Button>
      </div>
    </header>
  )
}
