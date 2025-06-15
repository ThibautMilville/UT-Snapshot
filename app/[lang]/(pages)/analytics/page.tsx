"use client"

import { useState, useEffect } from "react"
import { motion } from "@/lib/motion"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Download, 
  Star,
  RefreshCw
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageLayout } from "@/components/layout/PageLayout"
import { useAuth } from "@/contexts/AuthContext"
import { useTranslation } from "@/contexts/TranslationContext"

interface AnalyticsData {
  totalSnapshots: number
  totalViews: number
  totalDownloads: number
  totalRewards: number
  successRate: number
  averageTime: number
}

export default function AnalyticsPage() {
  const { isAuthenticated } = useAuth()
  const { t } = useTranslation()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  useEffect(() => {
    // Simuler le chargement des données analytics
    setTimeout(() => {
      setAnalyticsData({
        totalSnapshots: 156,
        totalViews: 12847,
        totalDownloads: 2156,
        totalRewards: 3247.8,
        successRate: 91.2,
        averageTime: 3.4,
      })
      setLoading(false)
    }, 1000)
  }, [timeRange])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  if (!isAuthenticated) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
          <div className="container mx-auto px-4 py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <BarChart3 className="h-16 w-16 text-purple-400 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-white mb-4">Accès Restreint</h1>
              <p className="text-gray-400 mb-8">
                Connectez votre wallet Ultra pour accéder aux analytics.
              </p>
            </motion.div>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
        {/* Effets de fond */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {t('page.analytics.title')}
                </h1>
                <p className="text-gray-400">
                  {t('page.analytics.subtitle')}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex gap-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-1">
                  {(['7d', '30d', '90d', '1y'] as const).map((range) => (
                    <Button
                      key={range}
                      size="sm"
                      variant={timeRange === range ? 'default' : 'ghost'}
                      onClick={() => setTimeRange(range)}
                      className={timeRange === range ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualiser
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : analyticsData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Statistiques principales */}
                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white flex items-center gap-2 text-sm">
                      <BarChart3 className="h-4 w-4 text-purple-400" />
                      Total Snapshots
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{analyticsData.totalSnapshots}</div>
                    <div className="flex items-center gap-1 text-sm text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      +12% ce mois
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white flex items-center gap-2 text-sm">
                      <Eye className="h-4 w-4 text-blue-400" />
                      Total Vues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{formatNumber(analyticsData.totalViews)}</div>
                    <div className="flex items-center gap-1 text-sm text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      +8% ce mois
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white flex items-center gap-2 text-sm">
                      <Download className="h-4 w-4 text-green-400" />
                      Téléchargements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{formatNumber(analyticsData.totalDownloads)}</div>
                    <div className="flex items-center gap-1 text-sm text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      +15% ce mois
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-400" />
                      Récompenses UOS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{analyticsData.totalRewards}</div>
                    <div className="flex items-center gap-1 text-sm text-green-400">
                      <TrendingUp className="h-3 w-3" />
                      +22% ce mois
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : null}

            {/* Graphiques et données détaillées */}
            {analyticsData && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Performance Globale</CardTitle>
                    <CardDescription className="text-gray-400">
                      Taux de succès et temps moyen
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Taux de succès</span>
                        <Badge className="bg-green-500/20 text-green-400">
                          {analyticsData.successRate}%
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Temps moyen</span>
                        <span className="text-white">{analyticsData.averageTime}s</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Recommandations</CardTitle>
                    <CardDescription className="text-gray-400">
                      Conseils pour optimiser vos performances
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <p className="text-sm text-green-400">
                          Excellent taux de succès ! Continuez sur cette lancée.
                        </p>
                      </div>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-sm text-blue-400">
                          Vos snapshots génèrent beaucoup d'engagement.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
} 