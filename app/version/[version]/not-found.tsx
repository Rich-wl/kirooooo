import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-600 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Version Not Found</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            The version you're looking for doesn't exist or may have been removed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            variant="default"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Versions
            </Link>
          </Button>

          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
            <Link href="/?q=">
              <Search className="w-4 h-4 mr-2" />
              Search Versions
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
