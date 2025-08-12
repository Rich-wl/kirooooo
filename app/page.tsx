import DownloadSection from "@/components/download-section"

export default function HomePage({ searchParams }: { searchParams: { q?: string } }) {
  const searchQuery = searchParams.q || ""

  return <DownloadSection searchQuery={searchQuery} />
}
