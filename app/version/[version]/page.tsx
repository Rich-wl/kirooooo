"use client"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DownloadCard from "@/components/download-card"
import { Apple, ComputerIcon as Windows, LaptopIcon as Linux } from "lucide-react"

interface VersionData {
  version: string
  platforms: Array<{
    name: string
    downloads: Array<{
      label: string
      url: string
    }>
  }>
  releaseDate: string
  isLatest: boolean
}

export default function VersionPage() {
  const params = useParams()
  const version = params.version as string

  const [versionData, setVersionData] = useState<VersionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchVersionData() {
      try {
        const response = await fetch(`/api/versions/${version}`)

        if (response.status === 404) {
          notFound()
          return
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setVersionData(data)
      } catch (err) {
        console.error("Error fetching version data:", err)
        setError(err instanceof Error ? err.message : "Failed to load version data")
      } finally {
        setLoading(false)
      }
    }

    if (version) {
      fetchVersionData()
    }
  }, [version])

  // 设置页面标题
  useEffect(() => {
    if (versionData) {
      const releaseDate = new Date(versionData.releaseDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      document.title = `Kiro v${version} Download - ${versionData.isLatest ? "Latest Release" : "Historical Version"}`

      // 设置 meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Download Kiro IDE version ${version} released on ${releaseDate}. Available for macOS, Windows, and Linux platforms.`,
        )
      }
    }
  }, [versionData, version])

  const getIcon = (platformName: string) => {
    switch (platformName) {
      case "macOS":
        return Apple
      case "Windows":
        return Windows
      case "Linux":
        return Linux
      default:
        return Package
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading version details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center px-4">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Version</h2>
            <p className="text-red-300 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700">
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!versionData) {
    notFound()
    return null
  }

  const releaseDate = new Date(versionData.releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-6xl">
        {/* 面包屑导航 */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to All Versions
          </Link>
        </div>

        {/* 版本标题 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              Kiro v{versionData.version}
            </span>
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Released on {releaseDate}</span>
            </div>
            {versionData.isLatest && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium">
                ✨ Latest Version
              </span>
            )}
          </div>
        </div>

        {/* 版本信息卡片 */}
        <div className="grid gap-8 mb-12">
          <Card className="bg-gray-900/50 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Package className="w-5 h-5" />
                Version Information
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-2">Release Details</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <strong>Version:</strong> {versionData.version}
                    </li>
                    <li>
                      <strong>Release Date:</strong> {releaseDate}
                    </li>
                    <li>
                      <strong>Platforms:</strong> {versionData.platforms.map((p: any) => p.name).join(", ")}
                    </li>
                    <li>
                      <strong>Status:</strong> {versionData.isLatest ? "Latest Release" : "Historical Version"}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">What's Included</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Complete Kiro IDE installation</li>
                    <li>• All core development features</li>
                    <li>• Platform-specific optimizations</li>
                    <li>• Documentation and examples</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 下载选项 */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">Download Options</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {versionData.platforms.map((platform: any) => (
              <DownloadCard
                key={platform.name}
                platform={platform.name}
                icon={getIcon(platform.name)}
                downloads={platform.downloads}
              />
            ))}
          </div>
        </div>

        {/* 安装说明 */}
        <Card className="bg-gray-900/50 border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Installation Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Apple className="w-4 h-4" />
                  macOS
                </h3>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Download the .dmg file</li>
                  <li>Open the downloaded file</li>
                  <li>Drag Kiro to Applications</li>
                  <li>Launch from Applications folder</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Windows className="w-4 h-4" />
                  Windows
                </h3>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Download the .exe installer</li>
                  <li>Run as administrator</li>
                  <li>Follow installation wizard</li>
                  <li>Launch from Start menu</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Linux className="w-4 h-4" />
                  Linux
                </h3>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Download .deb or .tar.gz</li>
                  <li>Install using package manager</li>
                  <li>Or extract and run executable</li>
                  <li>Add to PATH if needed</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 返回按钮 */}
        <div className="text-center">
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              View All Versions
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
