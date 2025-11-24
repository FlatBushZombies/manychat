import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "public", "submissions.json")

interface ManyChatSubmission {
  data: {
    name: string
    first_name: string
    last_name: string
    timezone: string
    custom_field_2: string
    custom_field_3: string
    custom_field_1: string
    custom_field_4: string
    custom_field_5: string
    custom_field_6: string
    custom_field_7: string
    custom_field_8: string
    custom_field_9: string
    custom_field_10: string
    custom_field_11: string
    custom_field_12: string
    question_14: string[]
    question_13: string[]
    question_12: string[]
    question_11: string[]
    question_10: string[]
    question_9: string[]
    question_8: string[]
    question_7: string[]
    question_6: string[]
    question_5: string[]
    question_4: string[]
    question_3: string[]
    question_2: string[]
    question_1: string[]
  }
  generated: string
}

function getStoredSubmissions(): ManyChatSubmission[] {
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

  const formatted = submissions.map((sub, index) => ({
    id: `${sub.data.name}-${index}-${Date.now()}`,
    name: sub.data.name || "Unknown",
    phone: "N/A",
    email: "N/A",
    district: sub.data.custom_field_3 || "N/A",
    date: sub.generated || new Date().toISOString(),
    status: "completed" as const,
    fullData: sub.data,
  }))

  return NextResponse.json({
    submissions: formatted,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const submissions = getStoredSubmissions()

    submissions.push(body)

    const publicDir = path.join(process.cwd(), "public")
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2))

    return NextResponse.json({ success: true, message: "Submission stored" }, { status: 201 })
  } catch (error) {
    console.error("Error storing submission:", error)
    return NextResponse.json({ success: false, error: "Failed to store submission" }, { status: 500 })
  }
}
