"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar } from "@/components/ui/avatar"
import { Settings, LogOut, User, Wallet, Search, Menu, X } from "lucide-react"
import Image from "next/image"
import { Input } from "./ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { motion, AnimatePresence } from "framer-motion"

interface UltraWalletResponse {
  status: 'success' | 'error';
  data: {
    blockchainId: string;
  };
}

declare global {
  interface Window {
    ultra?: {
      connect: () => Promise<UltraWalletResponse>;
      disconnect: () => Promise<void>;
    };
  }
}

export function Navbar() {
  const { isAuthenticated, isConnecting, walletAddress, connectWallet, disconnectWallet } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    // { href: "/pricing", label: "Pricing" },
    { href: "/faq", label: "Faq" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-28 py-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center gap-4 md:gap-20">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src={"/ultra.png"}
                alt="ultra-times"
                width={10}
                height={10}
                className="h-8 w-8 rounded-full"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <p className="transition-all duration-300 hover:scale-105 text-white text-sm">
                    {item.label}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block relative w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search a factory or collection..."
                className="pl-10 pr-4 h-10 text-sm bg-muted-foreground/10 w-full text-white placeholder:text-white/50"
              />
            </div>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-10 w-10 flex items-center justify-center bg-secondary">
                      <User size={20} color="white" />
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-foreground/90 shadow-sm shadow-secondary" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold text-white">Factory Manager</p>
                      <p className="text-xs text-white">{walletAddress?.slice(0, 6)}...{walletAddress?.slice(-2)}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <Link href={"/dashboard"}>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-red-800 hover:bg-red-900"
                    onClick={disconnectWallet}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Disconnect Wallet
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex flex-col items-end">
                <Button
                  className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(172,70,231,0.3)] flex items-center justify-center gap-2"
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Wallet size={16} />
                      <span>Connect Ultra Wallet</span>
                    </>
                  )}
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden"
            >
              <div className="py-4 space-y-4">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search-mobile"
                    placeholder="Search a factory or collection..."
                    className="pl-10 pr-4 h-10 text-sm bg-muted-foreground/10 w-full text-white placeholder:text-white/50"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-4 py-2 text-white hover:bg-secondary/20 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {!isAuthenticated && (
                  <Button
                    className="w-full bg-secondary hover:bg-secondary/90 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(172,70,231,0.3)] flex items-center justify-center gap-2"
                    onClick={connectWallet}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <>
                        <Wallet size={16} />
                        <span>Connect Ultra Wallet</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
