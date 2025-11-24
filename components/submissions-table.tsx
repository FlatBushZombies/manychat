"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { SubmissionDetailDialog } from "./submission-detail-dialog"

interface Submission {
  id: string
  name: string
  phone: string
  email?: string
  district: string
  date: string
  status: "completed" | "pending"
}

export function SubmissionsTable() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"date" | "name">("date")

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("/api/manychat/submissions")
        const data = await response.json()
        setSubmissions(data.submissions || [])
      } catch (error) {
        console.error("Failed to fetch submissions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  useEffect(() => {
    const filtered = submissions.filter(
      (sub) =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.phone.includes(searchTerm) ||
        sub.district.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (sortBy === "date") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredSubmissions(filtered)
  }, [submissions, searchTerm, sortBy])

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle>Submissions</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Search by name, phone, or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "name")}
              className="px-3 py-2 border border-input rounded-md text-sm bg-background text-foreground"
            >
              <option value="date">Sort by Date (Newest)</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading submissions...</div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {submissions.length === 0 ? "No submissions yet" : "No matching submissions"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">Phone</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">District</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">Submitted</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 text-sm">{submission.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{submission.phone}</td>
                    <td className="py-3 px-4 text-sm">{submission.district}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(submission.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          submission.status === "completed"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedSubmission(submission.id)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

      {selectedSubmission && (
        <SubmissionDetailDialog submissionId={selectedSubmission} onClose={() => setSelectedSubmission(null)} />
      )}
    </Card>
  )
}
