"use client"

import { useState, useEffect } from "react"
import { motion } from "@/lib/motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Wallet, 
  Users, 
  Camera,
  Play,
  Pause,
  XCircle,
  BarChart3,
  Zap,
  Target,
  DollarSign
} from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalJobs: number
  activeJobs: number
  pausedJobs: number
  completedJobs: number
  failedJobs: number
  totalSpent: number
  totalHolders: number
  successRate: number
  avgExecutionTime: number
  monthlyTrend: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    pausedJobs: 0,
    completedJobs: 0,
    failedJobs: 0,
    totalSpent: 0,
    totalHolders: 0,
    successRate: 0,
    avgExecutionTime: 0,
    monthlyTrend: 0
  })

  const [recentJobs, setRecentJobs] = useState([])

  useEffect(() => {
    // Simuler le chargement des statistiques
    setTimeout(() => {
      setStats({
        totalJobs: 24,
        activeJobs: 8,
        pausedJobs: 3,
        completedJobs: 11,
        failedJobs: 2,
        totalSpent: 1847.5,
        totalHolders: 3420,
        successRate: 91.7,
        avgExecutionTime: 42,
        monthlyTrend: 15.3
      })

      setRecentJobs([
        {
          id: '1',
          title: 'Airdrop Hebdomadaire Ultra Legends',
          status: 'active',
          nextExecution: '2024-01-25T10:00:00Z',
          cost: 36
        },
        {
          id: '2',
          title: 'Export Mensuel Holders',
          status: 'active',
          nextExecution: '2024-02-01T09:00:00Z',
          cost: 20
        },
        {
          id: '3',
          title: 'Récompense Quotidienne',
          status: 'paused',
          nextExecution: '',
          cost: 25
        }
      ])
    }, 1000)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-3 w-3" />
      case 'paused': return <Pause className="h-3 w-3" />
      case 'completed': return <CheckCircle2 className="h-3 w-3" />
      case 'failed': return <XCircle className="h-3 w-3" />
      default: return <Clock className="h-3 w-3" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A2E] to-[#16213E]">
      
      {/* Effets de fond */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,69,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-gray-400">
                Vue d'ensemble de vos jobs de snapshots automatisés
              </p>
            </div>
            
            <Link href="/snapshots">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <PlusCircle className="mr-2 h-5 w-5" />
                Créer un Job
              </Button>
            </Link>
          </motion.div>

          {/* Statistiques principales */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Jobs Actifs</CardTitle>
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Play className="h-4 w-4 text-green-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{stats.activeJobs}</div>
                <p className="text-xs text-green-400 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{stats.monthlyTrend}% ce mois
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Dépensé</CardTitle>
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <Wallet className="h-4 w-4 text-red-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{stats.totalSpent} UOS</div>
                <p className="text-xs text-gray-400">
                  Coût total des snapshots
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Taux de Succès</CardTitle>
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Target className="h-4 w-4 text-blue-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{stats.successRate}%</div>
                <p className="text-xs text-blue-400">
                  Excellent performance
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-400">Holders Traités</CardTitle>
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Users className="h-4 w-4 text-purple-400" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{stats.totalHolders.toLocaleString()}</div>
                <p className="text-xs text-gray-400">
                  Utilisateurs touchés
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Statistiques détaillées */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                  Répartition des Jobs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Actifs</span>
                  </div>
                  <span className="text-white font-medium">{stats.activeJobs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">En pause</span>
                  </div>
                  <span className="text-white font-medium">{stats.pausedJobs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Terminés</span>
                  </div>
                  <span className="text-white font-medium">{stats.completedJobs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Échecs</span>
                  </div>
                  <span className="text-white font-medium">{stats.failedJobs}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Temps moyen d'exécution</span>
                  <span className="text-white font-medium">{stats.avgExecutionTime}s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Jobs ce mois</span>
                  <span className="text-white font-medium">{stats.totalJobs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Croissance mensuelle</span>
                  <span className="text-green-400 font-medium">+{stats.monthlyTrend}%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  Jobs Récents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentJobs.map((job, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium truncate">{job.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`${getStatusColor(job.status)} border text-xs`}>
                          {getStatusIcon(job.status)}
                          <span className="ml-1 capitalize">{job.status}</span>
                        </Badge>
                        <span className="text-xs text-gray-400">{job.cost} UOS</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="/snapshots">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    Voir tous les jobs
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Actions rapides */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Link href="/snapshots">
              <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Camera className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">Créer un Snapshot</h3>
                  <p className="text-gray-400 text-sm">Automatisez vos snapshots et airdrops</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/history">
              <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Clock className="h-12 w-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">Historique</h3>
                  <p className="text-gray-400 text-sm">Consultez vos exécutions passées</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/analytics">
              <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 hover:border-green-400/50 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
                  <p className="text-gray-400 text-sm">Analysez vos performances</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 