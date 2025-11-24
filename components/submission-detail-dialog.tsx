"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SubmissionDetail {
  name: string
  firstName: string
  lastName: string
  phone: string
  timezone: string
  district: string
  ward: string
  constituency: string
  zone: string
  branch: string
  cell: string
  partyPosition: string
  address: string
  voterNumber: string
  dateOfBirth: string
  nationalId: string
  pollingStation: string
  [key: string]: string | undefined
}

interface Props {
  submissionId: string
  onClose: () => void
}

export function SubmissionDetailDialog({ submissionId, onClose }: Props) {
  const [submission, setSubmission] = useState<SubmissionDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`/api/manychat/submissions/${submissionId}`)
        const data = await response.json()
        setSubmission(data.submission)
      } catch (error) {
        console.error("Failed to fetch submission detail:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetail()
  }, [submissionId])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-2xl mx-4">
          <CardContent className="py-8">
            <div className="text-center text-muted-foreground">Loading...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!submission) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-2xl mx-4">
          <CardContent className="py-8">
            <div className="text-center text-muted-foreground">Submission not found</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="sticky top-0 bg-card border-b border-border flex items-center justify-between">
          <CardTitle>Submission Details</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-muted/30 p-4 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Full Name</p>
                  <p className="text-sm font-medium">{submission.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Phone</p>
                  <p className="text-sm font-medium">{submission.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Date of Birth</p>
                  <p className="text-sm font-medium">{submission.dateOfBirth || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">National ID</p>
                  <p className="text-sm font-medium">{submission.nationalId || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Geographic Information */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Geographic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-muted/30 p-4 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">District</p>
                  <p className="text-sm font-medium">{submission.district}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Zone</p>
                  <p className="text-sm font-medium">{submission.zone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Branch</p>
                  <p className="text-sm font-medium">{submission.branch || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Ward</p>
                  <p className="text-sm font-medium">{submission.ward || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Constituency</p>
                  <p className="text-sm font-medium">{submission.constituency || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Cell/Village</p>
                  <p className="text-sm font-medium">{submission.cell || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Voter Information */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Voter Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-muted/30 p-4 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Voter Registration Number</p>
                  <p className="text-sm font-medium">{submission.voterNumber || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Polling Station</p>
                  <p className="text-sm font-medium">{submission.pollingStation || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Party Information */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Party Information</h3>
              <div className="grid grid-cols-1 gap-3 bg-muted/30 p-4 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Party Position</p>
                  <p className="text-sm font-medium">{submission.partyPosition || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Address</h3>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm font-medium">{submission.address || "N/A"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
