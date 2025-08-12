import { NextResponse } from "next/server"
import versionsData from "@/data/versions.json" // 直接导入 JSON 文件

export async function GET(request: Request, { params }: { params: { version: string } }) {
  try {
    console.log("[API /api/versions/[version]] Directly importing versions data.")
    if (!versionsData || typeof versionsData !== "object" || !("platforms" in versionsData)) {
      console.error("[API /api/versions/[version]] Imported versions data is not in expected format.")
      return NextResponse.json({ error: "Versions data is malformed" }, { status: 500 })
    }

    const version = params.version
    console.log(`[API /api/versions/[version]] Looking for version: ${version}`)

    // 查找指定版本的数据
    const versionData: any = {
      version,
      platforms: [],
      releaseDate: null,
      isLatest: false,
    }

    Object.entries(versionsData.platforms).forEach(([platformKey, platformData]: [string, any]) => {
      const release = platformData.releases.find((r: any) => r.version === version)
      if (release) {
        const baseName = platformKey.includes("macOS") ? "macOS" : platformKey.includes("Windows") ? "Windows" : "Linux"

        let platform = versionData.platforms.find((p: any) => p.name === baseName)
        if (!platform) {
          platform = { name: baseName, downloads: [] }
          versionData.platforms.push(platform)
        }

        const label = platformKey.includes("ARM64")
          ? "Download for Mac (Apple Silicon)"
          : platformKey.includes("macOS")
            ? "Download for Mac (Intel)"
            : platformKey.includes("Windows")
              ? "Download for Windows"
              : platformKey.includes("DEB")
                ? "Download for Linux (Debian/Ubuntu)"
                : "Download for Linux (Universal)"

        if (!release.updateTo.url.endsWith(".pem") && !release.updateTo.url.endsWith(".bin")) {
          platform.downloads.push({
            label,
            url: release.updateTo.url,
          })
        }

        if (!versionData.releaseDate) {
          versionData.releaseDate = release.updateTo.pub_date
        }
      }
    })

    // 检查是否是最新版本
    const allVersions = new Set()
    Object.values(versionsData.platforms).forEach((platformData: any) => {
      platformData.releases.forEach((release: any) => {
        allVersions.add(release.version)
      })
    })

    const sortedVersions = Array.from(allVersions).sort((a: any, b: any) =>
      b.localeCompare(a, undefined, { numeric: true, sensitivity: "base" }),
    )
    versionData.isLatest = sortedVersions[0] === version

    if (versionData.platforms.length === 0) {
      console.warn(`[API /api/versions/[version]] Version ${version} not found.`)
      return NextResponse.json({ error: "Version not found" }, { status: 404 })
    }

    console.log(`[API /api/versions/[version]] Successfully found data for version ${version}.`)
    return NextResponse.json(versionData)
  } catch (error) {
    console.error("[API /api/versions/[version]] Error processing request:", error)
    return NextResponse.json(
      {
        error: "Internal server error loading version data",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.stack : undefined) : undefined,
      },
      { status: 500 },
    )
  }
}
