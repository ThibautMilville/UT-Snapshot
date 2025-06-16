import { TranslationProvider } from "@/contexts/TranslationContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { Language } from "@/types/translations.types"
import LoadingBar from "@/components/LoadingBar"

interface LangLayoutProps {
  children: React.ReactNode
  params: { lang: Language }
}

export default function LangLayout({ children, params }: LangLayoutProps) {
  return (
    <TranslationProvider>
      <AuthProvider>
        <LoadingBar />
        {children}
      </AuthProvider>
    </TranslationProvider>
  )
}

export async function generateStaticParams() {
  return [
    { lang: 'fr' },
    { lang: 'en' },
    { lang: 'de' },
  ]
} 