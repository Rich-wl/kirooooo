"use client"

import type React from "react"

import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className={cn("min-h-screen bg-background font-sans antialiased flex flex-col")}>
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </ThemeProvider>
  )
}
