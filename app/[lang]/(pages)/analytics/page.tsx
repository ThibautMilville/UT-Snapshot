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
  RefreshCw,
  Calendar,
  Clock,
  Activity,
  Target,
  Zap,
  PieChart,
  LineChart,
  DollarSign,
  Layers,
  Timer,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageLayout } from "@/components/layout/PageLayout"
import { useTranslation } from "@/contexts/TranslationContext"
import { useAuth } from "@/hooks/useAuth"
import { ConnectWalletButton } from "@/components/auth/ConnectWalletButton"

interface AnalyticsData {
  totalSnapshots: number
  totalExecutions: number
  totalDownloads: number
  totalCosts: number
  successRate: number
  averageTime: number
  monthlyGrowth: number
  activeUsers: number
  totalRevenue: number
  conversionRate: number
}

interface ChartData {
  period: string
  snapshots: number
  executions: number
  downloads: number
  costs: number
}

interface StatusData {
  status: string
  count: number
  percentage: number
  color: string
}

export default function AnalyticsPage() {
  const { requireAuth, loading: authLoading, isAuthenticated } = useAuth()
  const { t } = useTranslation()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [statusData, setStatusData] = useState<StatusData[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  useEffect(() => {
    // Simuler le chargement des données analytics
    setTimeout(() => {
      setAnalyticsData({
        totalSnapshots: 156,
        totalExecutions: 1847,
        totalDownloads: 2156,
        totalCosts: 847.3,
        successRate: 91.2,
        averageTime: 3.4,
        monthlyGrowth: 23.5,
        activeUsers: 1834,
        totalRevenue: 15678.9,
        conversionRate: 16.8
      })

      // Données réalistes pour les graphiques temporels 
      const getFixedChartData = () => {
        switch(timeRange) {
          case '7d':
            return [
              { period: 'Lun', snapshots: 12, executions: 87, downloads: 134, costs: 245 },
              { period: 'Mar', snapshots: 15, executions: 102, downloads: 156, costs: 289 },
              { period: 'Mer', snapshots: 9, executions: 76, downloads: 98, costs: 178 },
              { period: 'Jeu', snapshots: 18, executions: 134, downloads: 201, costs: 378 },
              { period: 'Ven', snapshots: 21, executions: 156, downloads: 234, costs: 456 },
              { period: 'Sam', snapshots: 8, executions: 45, downloads: 67, costs: 134 },
              { period: 'Dim', snapshots: 11, executions: 78, downloads: 89, costs: 189 }
            ]
          case '30d':
            return [
              { period: '1', snapshots: 89, executions: 534, downloads: 789, costs: 1234 },
              { period: '3', snapshots: 112, executions: 687, downloads: 923, costs: 1456 },
              { period: '5', snapshots: 94, executions: 612, downloads: 856, costs: 1278 },
              { period: '7', snapshots: 134, executions: 798, downloads: 1123, costs: 1678 },
              { period: '9', snapshots: 156, executions: 923, downloads: 1345, costs: 1923 },
              { period: '11', snapshots: 143, executions: 867, downloads: 1234, costs: 1789 },
              { period: '13', snapshots: 178, executions: 1045, downloads: 1567, costs: 2134 },
              { period: '15', snapshots: 165, executions: 987, downloads: 1434, costs: 1998 },
              { period: '17', snapshots: 189, executions: 1123, downloads: 1678, costs: 2345 },
              { period: '19', snapshots: 203, executions: 1267, downloads: 1789, costs: 2567 },
              { period: '21', snapshots: 198, executions: 1198, downloads: 1723, costs: 2434 },
              { period: '23', snapshots: 234, executions: 1456, downloads: 2134, costs: 2789 },
              { period: '25', snapshots: 221, executions: 1334, downloads: 1987, costs: 2656 },
              { period: '27', snapshots: 256, executions: 1567, downloads: 2234, costs: 2912 },
              { period: '29', snapshots: 243, executions: 1445, downloads: 2098, costs: 2734 }
            ]
          case '90d':
            return [
              { period: 'S1', snapshots: 456, executions: 2789, downloads: 4123, costs: 6789 },
              { period: 'S2', snapshots: 523, executions: 3234, downloads: 4567, costs: 7456 },
              { period: 'S3', snapshots: 489, executions: 2967, downloads: 4234, costs: 6923 },
              { period: 'S4', snapshots: 612, executions: 3567, downloads: 5123, costs: 8234 },
              { period: 'S5', snapshots: 678, executions: 3891, downloads: 5567, costs: 8912 },
              { period: 'S6', snapshots: 634, executions: 3678, downloads: 5234, costs: 8456 },
              { period: 'S7', snapshots: 723, executions: 4123, downloads: 5789, costs: 9345 },
              { period: 'S8', snapshots: 689, executions: 3945, downloads: 5456, costs: 8934 },
              { period: 'S9', snapshots: 756, executions: 4234, downloads: 6123, costs: 9678 },
              { period: 'S10', snapshots: 798, executions: 4567, downloads: 6456, costs: 10234 },
              { period: 'S11', snapshots: 734, executions: 4345, downloads: 6234, costs: 9856 },
              { period: 'S12', snapshots: 823, executions: 4789, downloads: 6789, costs: 10567 }
            ]
          default: // 1y
            return [
              { period: 'Jan', snapshots: 1234, executions: 8567, downloads: 12345, costs: 18234 },
              { period: 'Fév', snapshots: 1456, executions: 9234, downloads: 13567, costs: 19678 },
              { period: 'Mar', snapshots: 1345, executions: 8945, downloads: 12978, costs: 18934 },
              { period: 'Avr', snapshots: 1567, executions: 9678, downloads: 14234, costs: 20456 },
              { period: 'Mai', snapshots: 1689, executions: 10234, downloads: 15123, costs: 21789 },
              { period: 'Jun', snapshots: 1623, executions: 9867, downloads: 14567, costs: 21234 },
              { period: 'Jul', snapshots: 1789, executions: 10567, downloads: 15678, costs: 22456 },
              { period: 'Aoû', snapshots: 1734, executions: 10234, downloads: 15234, costs: 22123 },
              { period: 'Sep', snapshots: 1823, executions: 10789, downloads: 16234, costs: 23567 },
              { period: 'Oct', snapshots: 1945, executions: 11234, downloads: 16789, costs: 24234 },
              { period: 'Nov', snapshots: 1876, executions: 10956, downloads: 16456, costs: 23789 },
              { period: 'Déc', snapshots: 2134, executions: 12345, downloads: 18234, costs: 26456 }
            ]
        }
      }

      setChartData(getFixedChartData())

      // Données de statut des snapshots
      setStatusData([
        { status: 'Terminé', count: 142, percentage: 91.0, color: 'from-green-500 to-emerald-500' },
        { status: 'En cours', count: 8, percentage: 5.1, color: 'from-blue-500 to-cyan-500' },
        { status: 'Planifié', count: 4, percentage: 2.6, color: 'from-yellow-500 to-orange-500' },
        { status: 'Échoué', count: 2, percentage: 1.3, color: 'from-red-500 to-pink-500' }
      ])

      setLoading(false)
    }, 1000)
  }, [timeRange])
  
  // Require authentication to access this page
  requireAuth()
  
  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  // Show login required message if not authenticated
  if (!isAuthenticated) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A2E] to-[#16213E] text-white flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">
              {t('auth.connectionRequired') || 'Connexion requise'}
            </h1>
            <p className="text-gray-400 mb-6">
              {t('auth.connectWalletMessage') || 'Veuillez connecter votre wallet pour accéder aux analytics.'}
            </p>
            <ConnectWalletButton />
          </div>
        </div>
      </PageLayout>
    )
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  // Composant de graphique en barres moderne
  const ModernBarChart = ({ data, dataKey, color = "purple" }: { data: ChartData[], dataKey: keyof ChartData, color?: string }) => {
    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-3 border-purple-400 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-sm">{t('general.loading')}</p>
          </div>
        </div>
      )
    }
    
    const displayData = data.slice(-8) // Afficher 8 points
    const maxValue = Math.max(...displayData.map(d => d[dataKey] as number))
    const minValue = Math.min(...displayData.map(d => d[dataKey] as number))
    const range = maxValue - minValue || maxValue || 1
    
    const getBarColor = (colorName: string) => {
      switch(colorName) {
        case 'purple': return 'from-purple-600 via-purple-500 to-purple-400'
        case 'blue': return 'from-blue-600 via-blue-500 to-blue-400'
        case 'green': return 'from-green-600 via-green-500 to-green-400'
        default: return 'from-purple-600 via-purple-500 to-purple-400'
      }
    }
    
    return (
      <div className="h-full flex flex-col">
        {/* Valeurs de référence */}
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Min: {minValue}</span>
          <span>Max: {maxValue}</span>
        </div>
        
        {/* Graphique */}
        <div className="flex-1 flex items-end justify-between gap-2 px-2 h-64">
          {displayData.map((item, index) => {
            const value = item[dataKey] as number
            const height = range > 0 ? ((value - minValue) / range) * 200 + 20 : 100
            
            return (
              <div key={index} className="flex flex-col items-center flex-1 group h-full justify-end">
                {/* Barre */}
                <div className="relative w-full flex items-end">
                  <div 
                    className={`w-full bg-gradient-to-t ${getBarColor(color)} rounded-t-lg transition-all duration-300 group-hover:scale-105 border border-white/20 relative cursor-pointer`}
                    style={{ height: `${height}px`, minHeight: '30px' }}
                  >
                    {/* Info-bulle */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10 border border-gray-700">
                      <div className="font-semibold">{item.period}</div>
                      <div className="text-gray-300">
                        {dataKey === 'snapshots' ? `${value} snapshots` : 
                         dataKey === 'executions' ? `${value} exécutions` : 
                         `${value}`}
                      </div>
                      {/* Flèche */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900/95"></div>
                    </div>
                  </div>
                </div>
                
                {/* Label */}
                <span className="text-xs text-gray-400 mt-2 text-center">{item.period}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Composant de graphique en ligne moderne
  const ModernLineChart = ({ data, dataKey, color = "blue" }: { data: ChartData[], dataKey: keyof ChartData, color?: string }) => {
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
    
    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-3 border-blue-400 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-sm">{t('general.loading')}</p>
          </div>
        </div>
      )
    }
    
    const displayData = data.slice(-8) // Afficher 8 points
    const maxValue = Math.max(...displayData.map(d => d[dataKey] as number))
    const minValue = Math.min(...displayData.map(d => d[dataKey] as number))
    const range = maxValue - minValue || maxValue || 1
    
    const getStrokeColor = (colorName: string) => {
      switch(colorName) {
        case 'blue': return '#3B82F6'
        case 'purple': return '#8B5CF6'
        case 'green': return '#10B981'
        default: return '#3B82F6'
      }
    }
    
    return (
      <div className="h-full flex flex-col">
        {/* Valeurs de référence */}
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Min: {minValue}</span>
          <span>Max: {maxValue}</span>
        </div>
        
        {/* SVG Container */}
        <div className="flex-1 relative h-64 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={getStrokeColor(color)} stopOpacity="0.3" />
                <stop offset="100%" stopColor={getStrokeColor(color)} stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Zone sous la courbe */}
            <path
              d={`M 2.5,95 ${displayData.map((item, index) => {
                const value = item[dataKey] as number
                const x = (index / (displayData.length - 1)) * 95 + 2.5
                const y = range > 0 ? 95 - ((value - minValue) / range) * 75 : 50
                return `L ${x},${y}`
              }).join(' ')} L 97.5,95 Z`}
              fill={`url(#gradient-${dataKey})`}
            />
            
            {/* Ligne principale */}
            <path
              d={`M ${displayData.map((item, index) => {
                const value = item[dataKey] as number
                const x = (index / (displayData.length - 1)) * 95 + 2.5
                const y = range > 0 ? 95 - ((value - minValue) / range) * 75 : 50
                return `${x},${y}`
              }).join(' L ')}`}
              stroke={getStrokeColor(color)}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
          {/* Points interactifs */}
          {displayData.map((item, index) => {
            const value = item[dataKey] as number
            const x = (index / (displayData.length - 1)) * 95 + 2.5
            const y = range > 0 ? 95 - ((value - minValue) / range) * 75 : 50
            
            return (
              <div
                key={index}
                className="absolute w-3 h-3 cursor-pointer group"
                style={{ 
                  left: `calc(${x}% - 6px)`, 
                  top: `calc(${y}% - 6px)` 
                }}
                onMouseEnter={() => setHoveredPoint(index)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Point */}
                <div 
                  className="w-3 h-3 rounded-full border-2 transition-all duration-300"
                  style={{
                    backgroundColor: hoveredPoint === index ? getStrokeColor(color) : '#ffffff',
                    borderColor: getStrokeColor(color),
                    transform: hoveredPoint === index ? 'scale(1.5)' : 'scale(1)'
                  }}
                />
                
                {/* Info-bulle */}
                {hoveredPoint === index && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 border border-gray-700">
                    <div className="font-semibold">{item.period}</div>
                    <div className="text-gray-300">
                      {dataKey === 'executions' ? `${value} exécutions` : 
                       dataKey === 'snapshots' ? `${value} snapshots` : 
                       `${value}`}
                    </div>
                    {/* Flèche */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900/95"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A2E] to-[#16213E] text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,69,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8">
          {/* Header Ultra-Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {t('analytics.title')}
              </h1>
              <p className="text-gray-300 text-base sm:text-xl max-w-2xl">
                {t('analytics.subtitle')}
              </p>
              
              {/* Quick insights */}
              {analyticsData && (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-4 sm:mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">
                      <span className="text-green-400 font-semibold">+{analyticsData.monthlyGrowth}%</span> ce mois
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-300">
                      <span className="text-white font-semibold">{analyticsData.totalSnapshots}</span> snapshots créés
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-300">
                      <span className="text-purple-400 font-semibold">{analyticsData.successRate}%</span> taux de succès
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-3 w-full sm:w-auto">
              <div className="flex gap-1 bg-black/30 backdrop-blur-xl border border-purple-500/20 rounded-xl p-1">
                {(['7d', '30d', '90d', '1y'] as const).map((range) => (
                  <Button
                    key={range}
                    size="sm"
                    variant={timeRange === range ? 'default' : 'ghost'}
                    onClick={() => setTimeRange(range)}
                    className={timeRange === range ? 
                      'bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm' : 
                      'text-gray-300 hover:text-white hover:bg-purple-500/10 text-xs sm:text-sm'
                    }
                  >
                    {t(`analytics.timeRange.${range}` as any) || range}
                  </Button>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 w-full sm:w-auto"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-12 w-12 border-4 border-purple-400/20 border-t-purple-400 rounded-full animate-spin" />
            </div>
          ) : analyticsData ? (
            <>
              {/* Cartes de statistiques principales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="flex items-center text-green-400 text-xs sm:text-sm">
                          <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          +12%
                        </div>
                      </div>
                      <div className="text-xl sm:text-3xl font-bold text-white mb-1">{analyticsData.totalSnapshots}</div>
                      <div className="text-gray-400 text-xs sm:text-sm">{t('analytics.overview.snapshots')}</div>
                      <div className="mt-3 h-1 bg-purple-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full" style={{ width: '85%' }} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="flex items-center text-green-400 text-xs sm:text-sm">
                          <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          +18%
                        </div>
                      </div>
                      <div className="text-xl sm:text-3xl font-bold text-white mb-1">{formatNumber(analyticsData.totalExecutions)}</div>
                      <div className="text-gray-400 text-xs sm:text-sm">{t('analytics.overview.executions')}</div>
                      <div className="mt-3 h-1 bg-blue-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" style={{ width: '84%' }} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-black/20 backdrop-blur-xl border-green-500/20 hover:border-green-400/40 transition-all duration-300 group">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Download className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="flex items-center text-green-400 text-xs sm:text-sm">
                          <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          +15%
                        </div>
                      </div>
                      <div className="text-xl sm:text-3xl font-bold text-white mb-1">{formatNumber(analyticsData.totalDownloads)}</div>
                      <div className="text-gray-400 text-xs sm:text-sm">{t('analytics.overview.downloads')}</div>
                      <div className="mt-3 h-1 bg-green-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full" style={{ width: '91%' }} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-black/20 backdrop-blur-xl border-red-500/20 hover:border-red-400/40 transition-all duration-300 group">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="flex items-center text-red-400 text-xs sm:text-sm">
                          <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          +8%
                        </div>
                      </div>
                      <div className="text-xl sm:text-3xl font-bold text-white mb-1">{analyticsData.totalCosts.toLocaleString()} UOS</div>
                      <div className="text-gray-400 text-xs sm:text-sm">{t('analytics.overview.costs')}</div>
                      <div className="mt-3 h-1 bg-red-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full" style={{ width: '65%' }} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Graphiques détaillés */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {/* Graphique des snapshots */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 h-[400px] sm:h-[500px]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white flex items-center gap-3 text-base sm:text-lg">
                        <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                        {t('analytics.charts.snapshots.title')}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-sm">
                        Nombre de snapshots créés sur la période
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-64 sm:h-80">
                      <div className="w-full h-full">
                        <ModernBarChart data={chartData} dataKey="snapshots" color="purple" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Graphique des exécutions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20 h-[400px] sm:h-[500px]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-white flex items-center gap-3 text-base sm:text-lg">
                        <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                        {t('analytics.charts.executions.title')}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-sm">
                        Évolution des exécutions au fil du temps
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-64 sm:h-80">
                      <div className="w-full h-full">
                        <ModernLineChart data={chartData} dataKey="executions" color="blue" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Section des statuts et métriques additionnelles */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Statuts des snapshots */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="lg:col-span-1"
                >
                  <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-3 text-base sm:text-lg">
                        <PieChart className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                        {t('analytics.status.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {statusData.map((status, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${status.color}`} />
                              <span className="text-gray-300 text-sm">{status.status}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-white font-semibold text-sm">{status.count}</span>
                              <span className="text-gray-400 text-xs">({status.percentage}%)</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Insights rapides */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="lg:col-span-1"
                >
                  <Card className="bg-black/20 backdrop-blur-xl border-green-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-3 text-base sm:text-lg">
                        <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                        {t('analytics.insights.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                          <div className="flex items-center gap-3">
                            <Users className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-300 text-sm">{t('analytics.insights.activeSnapshots')}</span>
                          </div>
                          <span className="text-white font-bold">{analyticsData.totalSnapshots}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300 text-sm">{t('analytics.insights.successRate')}</span>
                          </div>
                          <span className="text-white font-bold">{analyticsData.successRate}%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <div className="flex items-center gap-3">
                            <Timer className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-300 text-sm">{t('analytics.overview.averageTime')}</span>
                          </div>
                          <span className="text-white font-bold">{analyticsData.averageTime}min</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Métriques de performance */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="lg:col-span-1"
                >
                  <Card className="bg-black/20 backdrop-blur-xl border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-3 text-base sm:text-lg">
                        <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                        {t('analytics.insights.performance.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">{t('analytics.insights.performance.downloads')}</span>
                            <span className="text-white font-semibold">{formatNumber(analyticsData.totalDownloads)}</span>
                          </div>
                          <div className="h-2 bg-purple-500/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-1000" 
                              style={{ width: '78%' }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">{t('analytics.insights.performance.costs')}</span>
                            <span className="text-white font-semibold">{analyticsData.totalCosts.toFixed(1)} UOS</span>
                          </div>
                          <div className="h-2 bg-red-500/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000" 
                              style={{ width: '65%' }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">Efficacité</span>
                            <span className="text-white font-semibold">94%</span>
                          </div>
                          <div className="h-2 bg-green-500/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-1000" 
                              style={{ width: '94%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400">Aucune donnée disponible</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
} 