import { Sparkles, Camera, BarChart3, HelpCircle } from "lucide-react"

export const NAV_ITEMS = [
  { 
    href: "/", 
    labelKey: "nav.home", 
    icon: Sparkles 
  },
  { 
    href: "/snapshots", 
    labelKey: "nav.snapshots", 
    icon: Camera 
  },
  { 
    href: "/analytics", 
    labelKey: "nav.analytics", 
    icon: BarChart3 
  },
  { 
    href: "/faq", 
    labelKey: "nav.faq", 
    icon: HelpCircle 
  },
] as const

export const ROUTES = {
  HOME: "/",
  SNAPSHOTS: "/snapshots",
  ANALYTICS: "/analytics",
  FAQ: "/faq",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  HISTORY: "/dashboard/history",
} as const 