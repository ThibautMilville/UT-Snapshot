import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: "purple-pink" | "blue-purple" | "green-blue"
}

const gradientClasses = {
  "purple-pink": "bg-gradient-to-r from-purple-400 to-pink-400",
  "blue-purple": "bg-gradient-to-r from-blue-400 to-purple-400",
  "green-blue": "bg-gradient-to-r from-green-400 to-blue-400",
}

export function GradientText({ 
  children, 
  className, 
  gradient = "purple-pink" 
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent",
        gradientClasses[gradient],
        className
      )}
    >
      {children}
    </span>
  )
} 