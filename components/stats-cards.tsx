"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface Stats {
  total: number
  today: number
  lastSync: string
}

export function StatsCards() {
  const [stats, setStats] = useState<Stats>({ total: 0, today: 0, lastSync: "Never" })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/manychat/stats")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? "-" : stats.total}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Today's Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? "-" : stats.today}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Last Sync</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">{isLoading ? "Loading..." : stats.lastSync}</div>
        </CardContent>
      </Card>
    </div>
  )
}
