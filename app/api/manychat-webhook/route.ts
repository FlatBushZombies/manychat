import { NextResponse } from "next/server";
import { Pool } from "pg";
import Ably from "ably";
import type { ManyChatPayload } from "@/types/index";

const db = new Pool({ connectionString: process.env.DATABASE_URL });
const ably = new Ably.Rest(process.env.ABLY_API_KEY!);
const channel = ably.channels.get("voters-channel");

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ManyChatPayload;
    const data = body.data;

    const fields = [
      "name", "first_name", "last_name", "gender", "timezone",
      "custom_field_1", "custom_field_2", "custom_field_3", "custom_field_4",
      "custom_field_5", "custom_field_6", "custom_field_7", "custom_field_8",
      "custom_field_9", "custom_field_10", "custom_field_11", "custom_field_12",
      "question_1", "question_2", "question_3", "question_4",
      "question_5", "question_6", "question_7", "question_8",
      "question_9", "question_10", "question_11", "question_12",
      "question_13", "question_14"
    ] as const;

    const flat: Record<string, string | null> = {};

    fields.forEach((key) => {
      const val = data[key];
      flat[key] = Array.isArray(val) ? val[1] : (val ?? null);
    });

    const cols = fields.join(", ");
    const placeholders = fields.map((_, i) => `$${i + 1}`).join(", ");
    const values = fields.map((k) => flat[k]);

    const sql = `INSERT INTO voters (${cols}) VALUES (${placeholders}) RETURNING *`;
    const result = await db.query(sql, values);
    const row = result.rows[0];

    await channel.publish("new-record", row);

    return NextResponse.json({ success: true, data: row });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
