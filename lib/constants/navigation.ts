import { Sparkles, Camera, BarChart3, Mail } from "lucide-react"

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
    href: "/contact", 
    labelKey: "nav.contact", 
    icon: Mail 
  },
] as const

export const ROUTES = {
  HOME: "/",
  SNAPSHOTS: "/snapshots",
  ANALYTICS: "/analytics",
  FAQ: "/faq",
  CONTACT: "/contact",
  PROFILE: "/profile",
  HISTORY: "/history",
} as const 