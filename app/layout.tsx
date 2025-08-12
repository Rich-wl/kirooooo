import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kiro Download Archive",
  description:
    "Historical versions of the Kiro application. Access all previous releases of the Kiro IDE for your development and testing needs.",
  keywords:
    "Kiro, IDE, download, historical versions, development, archive, releases, previous versions, legacy software",
  authors: [{ name: "Kiro Team" }],
  creator: "Kiro Team",
  publisher: "Kiro Team",
  robots: "index, follow",
  openGraph: {
    title: "Kiro Download Archive",
    description: "Access all previous releases of the Kiro IDE for your development and testing needs.",
    url: "https://kirohistory.dev",
    siteName: "Kiro Download Archive",
    images: [
      {
        url: "/kiro-ghost.png",
        width: 1200,
        height: 630,
        alt: "Kiro IDE Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiro Download Archive",
    description: "Access all previous releases of the Kiro IDE for your development and testing needs.",
    images: ["/kiro-ghost.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.png", color: "#5bbad5" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://kirohistory.dev",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-NB7SJ7JB3Z" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NB7SJ7JB3Z');
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4633597437741439"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
        <Footer />
      </body>
    </html>
  )
}
