import { NextResponse } from "next/server";
import { buildMockSchedulerData } from "@/lib/meeting-scheduler/mock-data";

export async function GET() {
  const data = buildMockSchedulerData();
  return NextResponse.json(data);
}
