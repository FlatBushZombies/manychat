import { NextResponse } from "next/server";
import { Pool } from "pg";

const db = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET() {
  const result = await db.query(
    "SELECT * FROM voters ORDER BY created_at DESC LIMIT 50"
  );
  return NextResponse.json({ data: result.rows });
}
