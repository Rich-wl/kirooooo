import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                alt="Kiro Logo"
                className="h-7 w-7"
                height="28"
                src="/kiro-ghost.png"
                style={{
                  aspectRatio: "28/28",
                  objectFit: "cover",
                }}
                width="28"
              />
              <span className="text-xl font-semibold text-white">KIRO</span>
            </Link>
            <p className="text-sm max-w-xs">The agentic IDE for spec-driven development.</p>
            <p className="text-sm max-w-xs mt-2 text-gray-400">
              Contact us:{" "}
              <a href="mailto:kiro@kirohistory.dev" className="text-purple-400 hover:text-purple-300 underline">
                kiro@kirohistory.dev
              </a>
            </p>
          </div>

          <div className="grid gap-2">
            <h3 className="font-semibold text-white">Product</h3>
            <Link href="/" className="text-sm hover:text-white transition-colors">
              Downloads
            </Link>
            <Link href="/faq" className="text-sm hover:text-white transition-colors">
              FAQ
            </Link>
          </div>

          <div className="grid gap-2">
            <h3 className="font-semibold text-white">Company</h3>
            <Link href="/about" className="text-sm hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          <div className="grid gap-2">
            <h3 className="font-semibold text-white">Legal</h3>
            <Link href="/terms-of-service" className="text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm">
          &copy; {new Date().getFullYear()} Kirohistory. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
