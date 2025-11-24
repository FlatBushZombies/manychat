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

export async function GET(request: NextRequest) {
  const submissions = getStoredSubmissions()
  const total = submissions.length

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayCount = submissions.filter((sub) => {
    const subDate = new Date(sub.generated)
    subDate.setHours(0, 0, 0, 0)
    return subDate.getTime() === today.getTime()
  }).length

  const lastSyncTime =
    submissions.length > 0 ? new Date(submissions[submissions.length - 1].generated).toLocaleString() : "Never"

  return NextResponse.json({
    total,
    today: todayCount,
    lastSync: lastSyncTime,
  })
}
