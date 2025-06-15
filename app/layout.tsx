import type React from "react"
import type { Metadata } from "next"
import { Cabin, Quicksand } from "next/font/google"
import "./globals.css"
import { Loading } from "@/components/loading"
import { Toaster } from "@/components/ui/sonner"


const cabin = Cabin({
  subsets: ["latin"],
  variable: '--font-cabin'
})

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: '--font-quicksand'
})

export const metadata: Metadata = {
  title: "UT Snapshot - By Ultra Times",
  description: "Plateforme automatisée de snapshots Web3 pour la blockchain Ultra",
  icons: {
    icon: [
      { url: '/logo-ut.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-ut.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/logo-ut.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo-ut.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/logo-ut.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo-ut.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-ut.png" />
        <link rel="shortcut icon" href="/logo-ut.png" />
      </head>
      <body className={`${cabin.variable} ${quicksand.variable} font-quicksand bg-foreground min-h-screen`}>
        <Loading />
          {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1A1A2E',
              color: 'white',
              border: '1px solid #622C6C',
              boxShadow: '0 0 15px rgba(172,70,231,0.3)',
            },
            className: 'sonner-toast',
            classNames: {
              toast: "bg-[#1A1A2E] border-[#622C6C] text-white",
              title: "text-white font-bold",
              description: "text-white/80",
              actionButton: "bg-[#622C6C] text-white hover:bg-[#8757B2]",
              cancelButton: "bg-[#28274A] text-white hover:bg-[#3A395A]",
              success: "bg-[#622C6C] border-[#AC46E7]",
              error: "bg-[#28274A] border-red-500",
            },
          }}
        />
      </body>
    </html>
  )
}
