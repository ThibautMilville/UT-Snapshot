import type React from "react"
import type { Metadata } from "next"
import { Cabin, Quicksand } from "next/font/google"
import "./globals.css"
import { Loading } from "@/components/loading"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/contexts/AuthContext"

const cabin = Cabin({
  subsets: ["latin"],
  variable: '--font-cabin'
})

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: '--font-quicksand'
})

export const metadata: Metadata = {
  title: "UltraTimes Snapshots",
  description: "Web3 Snapshots Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${cabin.variable} ${quicksand.variable} font-quicksand bg-foreground min-h-screen`}>
        <Loading />
        <AuthProvider>
          {children}
        </AuthProvider>
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
