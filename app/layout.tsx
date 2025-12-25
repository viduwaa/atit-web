import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { Toaster } from "sonner"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const exo = localFont({
  src: [
    {
      path: "./fonts/Exo-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Exo-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Exo-DemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Exo-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-exo",
})

export const metadata: Metadata = {
  title: "ATIT Rajarata - Advanced Tech Innovation Club",
  description: "Empowering innovation at Rajarata University with cutting-edge technology and creative solutions.",
  icons: {
    icon: [
      {
        url: "/assets/atit-logo-rounded.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/assets/atit-logo-rounded.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/assets/atit-logo-rounded.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={exo.className}>
      <body>
        <SmoothScrollProvider>
          {children}
          <Footer />
          <ScrollToTop />
          <Analytics />
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--foreground))",
              },
            }}
          />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
