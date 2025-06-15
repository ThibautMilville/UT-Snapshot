import Link from "next/link"
import { useTranslation } from "@/contexts/TranslationContext"
import { NAV_ITEMS } from "@/lib/constants/navigation"

interface NavItemsProps {
  items: typeof NAV_ITEMS
}

export function NavItems({ items }: NavItemsProps) {
  const { t } = useTranslation()

  return (
    <div className="hidden md:flex items-center space-x-1">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/10 hover:scale-105 text-white text-sm group">
            {item.icon && <item.icon size={16} className="group-hover:text-purple-400 transition-colors" />}
            <span className="group-hover:text-purple-400 transition-colors">
              {t(item.labelKey)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
} 