import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "public", "submissions.json")

function getStoredSubmissions() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8")
      const parsed = JSON.parse(data)
      return Array.isArray(parsed) ? parsed : [parsed]
    }
  } catch (error) {
    console.error("Error reading submissions:", error)
  }
  return []
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const submissions = getStoredSubmissions()

  if (submissions.length === 0) {
    return NextResponse.json({ submission: null }, { status: 404 })
  }

  // Return the first submission (or you can implement proper ID matching)
  const sub = submissions[0]
  const data = sub.data

  const submission = {
    id,
    name: data.name || "Unknown",
    firstName: data.first_name || "N/A",
    lastName: data.last_name || "N/A",
    phone: "N/A",
    timezone: data.timezone || "UTC",
    district: data.custom_field_3 || "N/A",
    zone: data.custom_field_1 || "N/A",
    branch: data.custom_field_2 || "N/A",
    cell: data.custom_field_4 || "N/A",
    constituency: data.custom_field_5 || "N/A",
    ward: data.custom_field_6 || "N/A",
    pollingStation: data.custom_field_7 || "N/A",
    nationalId: data.custom_field_8 || "N/A",
    dateOfBirth: data.custom_field_9 || "N/A",
    voterNumber: data.custom_field_10 || "N/A",
    partyPosition: data.custom_field_11 || "N/A",
    address: data.custom_field_12 || "N/A",
  }

  return NextResponse.json({ submission })
}
