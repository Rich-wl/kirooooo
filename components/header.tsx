"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/10 px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link className="flex items-center justify-center" href="/">
        <Image
          alt="Kiro Logo"
          className="h-6 w-6"
          height="24"
          src="/kiro-ghost.png"
          style={{
            aspectRatio: "24/24",
            objectFit: "cover",
          }}
          width="24"
        />
        <span className="ml-2 text-lg font-semibold text-white">KIRO</span>
        <span className="ml-2 text-sm text-gray-400 hidden sm:inline">[PREVIEW]</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6 items-center">
        <Link className="text-sm font-medium hover:underline underline-offset-4 text-white" href="/pricing">
          Pricing
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4 text-white" href="/faq">
          FAQ
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4 text-white" href="/about">
          About
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4 text-white" href="/contact">
          Contact Us
        </Link>
      </nav>

      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden text-white">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-black border-gray-800">
          <nav className="flex flex-col gap-4 mt-8">
            <Link className="text-lg font-medium text-white hover:text-purple-400 transition-colors" href="/pricing">
              Pricing
            </Link>
            <Link className="text-lg font-medium text-white hover:text-purple-400 transition-colors" href="/faq">
              FAQ
            </Link>
            <Link className="text-lg font-medium text-white hover:text-purple-400 transition-colors" href="/about">
              About
            </Link>
            <Link className="text-lg font-medium text-white hover:text-purple-400 transition-colors" href="/contact">
              Contact Us
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
