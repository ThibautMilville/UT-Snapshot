import Link from "next/link"
import { Settings, LogOut, User, History } from "lucide-react"

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
import { useAuth } from "@/contexts/AuthContext"
import { useTranslation } from "@/contexts/TranslationContext"
import { ROUTES } from "@/lib/constants/navigation"

export function UserMenu() {
  const { walletAddress, disconnectWallet } = useAuth()
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
          <Avatar className="h-9 w-9 flex items-center justify-center">
            <User size={18} color="white" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black/90 backdrop-blur-xl border-white/10 shadow-2xl" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1 p-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <User size={16} color="white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Factory Manager</p>
                <p className="text-xs text-gray-400">
                  {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                </p>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        
        <Link href={ROUTES.PROFILE}>
          <DropdownMenuItem className="hover:bg-white/10 text-white">
            <User className="mr-2 h-4 w-4" />
            {t('nav.profile')}
          </DropdownMenuItem>
        </Link>

        
        <Link href={ROUTES.HISTORY}>
          <DropdownMenuItem className="hover:bg-white/10 text-white">
            <History className="mr-2 h-4 w-4" />
            {t('nav.history')}
          </DropdownMenuItem>
        </Link>
        
        <DropdownMenuSeparator className="bg-white/10" />
        
        <DropdownMenuItem
          className="bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300"
          onClick={disconnectWallet}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {t('wallet.disconnect')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 