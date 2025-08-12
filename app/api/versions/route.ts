import { NextResponse } from "next/server"
import versionsData from "@/data/versions.json" // 直接导入 JSON 文件

export async function GET() {
  try {
    console.log("[API /api/versions] Directly importing versions data.")
    // 确保导入的数据是有效的 JSON 格式
    if (!versionsData || typeof versionsData !== "object" || !("platforms" in versionsData)) {
      console.error("[API /api/versions] Imported versions data is not in expected format.")
      return NextResponse.json({ error: "Versions data is malformed" }, { status: 500 })
    }
    return NextResponse.json(versionsData)
  } catch (error) {
    console.error("[API /api/versions] Error processing request:", error)
    return NextResponse.json(
      {
        error: "Internal server error loading versions data",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.stack : undefined) : undefined,
      },
      { status: 500 },
    )
  }
}
