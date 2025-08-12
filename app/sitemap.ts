import type { MetadataRoute } from "next"
import versionsData from "@/data/versions.json" // 直接导入 JSON 文件

interface Release {
  version: string
}

interface PlatformData {
  releases: Release[]
}

interface VersionsJson {
  platforms: Record<string, PlatformData>
}

async function getVersions() {
  try {
    console.log("[Sitemap] Directly importing versions data.")
    if (!versionsData || typeof versionsData !== "object" || !("platforms" in versionsData)) {
      console.error("[Sitemap] Imported versions data is not in expected format.")
      return []
    }

    const versions = new Set<string>()
    Object.values(versionsData.platforms).forEach((platformData) => {
      platformData.releases.forEach((release) => {
        versions.add(release.version)
      })
    })

    return Array.from(versions)
  } catch (error) {
    console.error("Error fetching versions for sitemap:", error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kirohistory.dev"
  const versions = await getVersions()

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/setup-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]

  // 为每个版本创建页面条目
  const versionPages = versions.map((version) => ({
    url: `${baseUrl}/version/${version}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...versionPages]
}
