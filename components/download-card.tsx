import type React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"

interface DownloadCardProps {
  platform: string
  icon: React.ElementType
  downloads: { label: string; url: string }[]
}

export default function DownloadCard({ platform, icon: Icon, downloads }: DownloadCardProps) {
  const getIconColor = (platform: string) => {
    switch (platform) {
      case "macOS":
        return "text-gray-300"
      case "Windows":
        return "text-blue-400"
      case "Linux":
        return "text-orange-400"
      default:
        return "text-white"
    }
  }

  const getCardGradient = (platform: string) => {
    switch (platform) {
      case "macOS":
        return "from-gray-800/50 to-gray-900/50 border-gray-600/30"
      case "Windows":
        return "from-blue-900/30 to-gray-900/50 border-blue-500/30"
      case "Linux":
        return "from-orange-900/30 to-gray-900/50 border-orange-500/30"
      default:
        return "from-gray-800/50 to-gray-900/50 border-gray-600/30"
    }
  }

  return (
    <Card
      className={`bg-gradient-to-br ${getCardGradient(platform)} border backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col items-center p-4 md:p-6`}
    >
      <div className="mb-4 md:mb-6">
        <Icon className={`w-12 h-12 md:w-16 md:h-16 ${getIconColor(platform)}`} />
      </div>
      <h3 className="text-lg md:text-2xl font-semibold mb-4 md:mb-6 text-white text-center">{platform}</h3>
      <div className="space-y-2 md:space-y-3 w-full">
        {downloads.map((download, index) => (
          <Button
            key={index}
            asChild
            variant="secondary"
            className="w-full justify-between bg-gray-700/50 hover:bg-gray-600/70 text-white border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 text-xs sm:text-sm md:text-base py-2 md:py-3 px-3 md:px-4 h-auto min-h-[44px]"
          >
            <Link
              href={download.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2"
            >
              <span className="truncate flex-1 text-left leading-tight">{download.label}</span>
              <Download className="w-4 h-4 flex-shrink-0" />
            </Link>
          </Button>
        ))}
      </div>
    </Card>
  )
}
