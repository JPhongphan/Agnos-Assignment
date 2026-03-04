import { NextResponse } from "next/server";
import { getPusherServer } from "@/libs/pusher-websocket";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const server = getPusherServer();
    await server.trigger("patient-form", "update-form", data);
    return NextResponse.json({ message: "Data sent to Pusher" }, { status: 200 });
  } catch (e) {
    console.error("Pusher API error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to send to Pusher" },
      { status: 500 }
    );
  }
}
