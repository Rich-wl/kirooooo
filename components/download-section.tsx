"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { Apple, ComputerIcon as Windows, LaptopIcon as Linux, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import DownloadCard from "./download-card"

/* ---------- types that match versions.json ---------- */
interface ReleaseUpdateTo {
  version: string
  pub_date: string
  notes: string
  name: string
  url: string
}
interface Release {
  version: string
  updateTo: ReleaseUpdateTo
}
interface PlatformData {
  currentRelease: string
  releases: Release[]
  error: string | null
}
interface VersionsJson {
  lastUpdated: string
  platforms: Record<string, PlatformData>
}

/* ---------- derived types for rendering ---------- */
interface DownloadOption {
  label: string
  url: string
}
interface PlatformGroup {
  name: string
  icon: React.ElementType
  downloads: DownloadOption[]
}
interface VersionEntry {
  version: string
  pub_date: string
  platforms: PlatformGroup[]
  isLatest?: boolean
}

/* ---------- helper to turn file name into label ---------- */
function buildLabel(platformKey: string): string {
  if (platformKey.includes("macOS")) {
    return platformKey.includes("ARM64") ? "Download for Mac (Apple Silicon)" : "Download for Mac (Intel)"
  }
  if (platformKey.includes("Windows")) {
    return "Download for Windows"
  }
  if (platformKey.includes("Linux")) {
    if (platformKey.includes("DEB")) return "Download for Linux (Debian/Ubuntu)"
    return "Download for Linux (Universal)"
  }
  return "Download"
}

export default function DownloadSection({ searchQuery: initialSearchQuery }: { searchQuery: string }) {
  /* ----- local search state ----- */
  const [searchQuery, setSearch] = useState(initialSearchQuery) // Renamed to avoid conflict with global Search icon

  /* ----- fetch versions.json from /public ----- */
  const [rawData, setRawData] = useState<VersionsJson | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        console.log("Fetching versions data from /api/versions...")
        const res = await fetch("/api/versions", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          cache: "no-cache", // Ensure fresh data
        })

        console.log("Response status:", res.status)
        console.log("Response headers:", res.headers.get("content-type"))

        if (!res.ok) {
          const errorBody = await res.text()
          console.error("API response not OK:", errorBody)
          throw new Error(`HTTP ${res.status}: ${res.statusText} - ${errorBody.substring(0, 100)}...`)
        }

        const contentType = res.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text()
          console.error("Expected JSON but got:", text.substring(0, 200))
          throw new Error(`Expected JSON but got ${contentType}`)
        }

        const json = (await res.json()) as VersionsJson
        console.log("Successfully loaded versions data from API.")
        setRawData(json)
      } catch (err) {
        console.error("Error loading versions:", err)
        setError(`Failed to load versions data: ${err instanceof Error ? err.message : "Unknown error"}`)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  /* ----- transform json -> renderable structure ----- */
  const transformedVersions: VersionEntry[] = useMemo(() => {
    if (!rawData) return []
    const map = new Map<string, VersionEntry>()

    Object.entries(rawData.platforms).forEach(([platformKey, platformData]) => {
      const { releases } = platformData

      const baseName = platformKey.includes("macOS") ? "macOS" : platformKey.includes("Windows") ? "Windows" : "Linux"
      const icon = baseName === "macOS" ? Apple : baseName === "Windows" ? Windows : Linux

      releases.forEach((rel) => {
        const { version, pub_date, url } = rel.updateTo

        /* skip cert / sig */
        if (url.endsWith(".pem") || url.endsWith(".bin")) return

        if (!map.has(version)) {
          map.set(version, { version, pub_date, platforms: [] })
        }
        const ve = map.get(version)!
        let pg = ve.platforms.find((p) => p.name === baseName)
        if (!pg) {
          pg = { name: baseName, icon, downloads: [] }
          ve.platforms.push(pg)
        }
        pg.downloads.push({ label: buildLabel(platformKey), url })
      })
    })

    const sorted = Array.from(map.values()).sort((a, b) =>
      b.version.localeCompare(a.version, undefined, { numeric: true, sensitivity: "base" }),
    )
    if (sorted.length) sorted[0].isLatest = true
    return sorted
  }, [rawData])

  /* ----- search filter ----- */
  const filteredVersions = useMemo(() => {
    if (!searchQuery) return transformedVersions
    const q = searchQuery.toLowerCase()
    return transformedVersions.filter(
      (v) =>
        v.version.toLowerCase().includes(q) ||
        v.platforms.some(
          (p) => p.name.toLowerCase().includes(q) || p.downloads.some((d) => d.label.toLowerCase().includes(q)),
        ),
    )
  }, [searchQuery, transformedVersions])

  /* ----- rendering ----- */
  if (loading) {
    return (
      <section className="w-full py-12 md:py-24 text-center text-white">
        <div className="animate-pulse">
          <div className="h-6 md:h-8 bg-gray-700 rounded w-48 md:w-64 mx-auto mb-4"></div>
          <p className="text-blue-400 text-sm md:text-base">Loading versions…</p>
        </div>
      </section>
    )
  }
  if (error) {
    return (
      <section className="w-full py-12 md:py-24 text-center px-4">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 md:p-6 max-w-lg mx-auto">
          <h3 className="text-red-400 font-semibold mb-2">Failed to Load Data</h3>
          <p className="text-red-300 text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  if (!rawData || transformedVersions.length === 0) {
    return (
      <section className="w-full py-12 md:py-24 text-center px-4">
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 md:p-6 max-w-sm md:max-w-md mx-auto">
          <p className="text-yellow-400 text-sm md:text-base">No version data available.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-8 md:py-16 lg:py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-2 md:mb-4 leading-tight">
            Historical Kiro Downloads
          </h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto px-4 mb-6 md:mb-8">
            Access previous versions of Kiro IDE for your development needs
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search versions, platforms..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500 rounded-lg backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {searchQuery && (
              <p className="text-sm text-gray-400 mt-2">
                {filteredVersions.length} version{filteredVersions.length !== 1 ? "s" : ""} found
              </p>
            )}
          </div>
        </div>

        {filteredVersions.length === 0 && (
          <div className="text-center py-8 md:py-12 px-4">
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 md:p-6 max-w-sm md:max-w-md mx-auto">
              <p className="text-yellow-400 text-sm md:text-base">No versions match your search.</p>
            </div>
          </div>
        )}

        <div className="grid gap-8 md:gap-12 lg:gap-16">
          {filteredVersions.map((v, index) => (
            <div key={v.version} className="space-y-4 md:space-y-8">
              <div className="text-center px-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">
                  <Link
                    href={`/version/${v.version}`}
                    className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent hover:from-emerald-300 hover:to-blue-400 transition-all duration-200 cursor-pointer"
                  >
                    Kiro v{v.version}
                  </Link>
                </h2>
                <p className="text-sm md:text-lg text-gray-400">
                  Released on{" "}
                  {new Date(v.pub_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {v.isLatest && !searchQuery && (
                  <div className="mt-2 md:mt-4">
                    <span className="inline-flex items-center px-3 md:px-4 py-1 md:py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs md:text-sm font-medium shadow-lg">
                      ✨ Latest Version
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {v.platforms.map((p) => (
                  <DownloadCard key={p.name} platform={p.name} icon={p.icon} downloads={p.downloads} />
                ))}
              </div>

              {index < filteredVersions.length - 1 && (
                <div className="flex justify-center pt-4 md:pt-8">
                  <div className="w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
