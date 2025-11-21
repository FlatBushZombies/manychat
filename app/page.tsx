"use client";

import { useEffect, useState } from "react";

// Correct Ably v2 import (NO .Types)
import { Realtime } from "ably";
import type { Message } from "ably";

// Type of one record sent from your webhook
export interface VoterRecord {
  id: string;
  name: string | null;
  custom_field_11: string | null;
  created_at: string;
  [key: string]: string | number | null | undefined;
}

export default function Dashboard() {
  // FIX: No more never[] errors
  const [records, setRecords] = useState<VoterRecord[]>([]);

  useEffect(() => {
    // Load initial records
    fetch("/api/records/latest")
      .then((res) => res.json())
      .then((data) => setRecords(data.data as VoterRecord[]));

    // Correct Ably client
    const client = new Realtime(process.env.NEXT_PUBLIC_ABLY_KEY as string);

    const channel = client.channels.get("voters-channel");

    // FIX: strict typing for msg
    channel.subscribe("new-record", (msg: Message) => {
      const newRecord = msg.data as VoterRecord;

      // FIX: state is correctly typed now
      setRecords((prev) => [newRecord, ...prev]);
    });

    return () => {
      channel.unsubscribe();
      client.close();
    };
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Live Voter Dashboard</h1>

      {records.map((r) => (
        <div
          key={r.id}
          style={{
            padding: 12,
            border: "1px solid #ddd",
            marginBottom: 10,
            borderRadius: 6,
          }}
        >
          <strong>{r.name ?? "Unknown"}</strong> <br />
          <span>Field 11: {r.custom_field_11 ?? "-"}</span>

          <div style={{ fontSize: 12, marginTop: 6 }}>
            {new Date(r.created_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
