"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SnapshotList } from '@/components/dashboard/snapshot/snapshot-list'
import { SnapshotHistory } from '@/components/dashboard/snapshot/snapshot-history'
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Camera, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Download,
  TrendingUp,
  Zap,
  Star,
  MoreHorizontal,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'

interface SnapshotStats {
  total: number
  active: number
  completed: number
  failed: number
  totalViews: number
  totalDownloads: number
}

export default function SnapshotsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'failed'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<SnapshotStats>({
    total: 0,
    active: 0,
    completed: 0,
    failed: 0,
    totalViews: 0,
    totalDownloads: 0
  })

  useEffect(() => {
    // Simuler le chargement des statistiques
    setTimeout(() => {
      setStats({
        total: 156,
        active: 23,
        completed: 128,
        failed: 5,
        totalViews: 12847,
        totalDownloads: 2156
      })
      setLoading(false)
    }, 1000)
  }, [])

  const statCards = [
    {
      title: "Total Snapshots",
      value: stats.total,
      icon: Camera,
      color: "from-purple-500 to-pink-500",
      change: "+12%"
    },
    {
      title: "Actifs",
      value: stats.active,
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
      change: "+5%"
    },
    {
      title: "Complétés",
      value: stats.completed,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      change: "+18%"
    },
    {
      title: "Échecs",
      value: stats.failed,
      icon: XCircle,
      color: "from-red-500 to-orange-500",
      change: "-3%"
    },
    {
      title: "Total Vues",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      color: "from-indigo-500 to-purple-500",
      change: "+25%"
    },
    {
      title: "Téléchargements",
      value: stats.totalDownloads.toLocaleString(),
      icon: Download,
      color: "from-yellow-500 to-orange-500",
      change: "+15%"
    }
  ]

  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header modernisé */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Snapshots
            </h1>
            <p className="text-gray-400">
              Gérez et surveillez tous vos snapshots de collections NFT
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
            <Link href="/dashboard/snapshots/create">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/25">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Snapshot
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistiques */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-black/40 backdrop-blur-xl border-white/10">
                <CardContent className="p-4">
                  <div className="animate-pulse">
                    <div className="h-4 bg-white/10 rounded mb-2" />
                    <div className="h-8 bg-white/10 rounded mb-2" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300 group">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} bg-opacity-20`}>
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-green-400">
                        <TrendingUp className="h-3 w-3" />
                        {stat.change}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                      {stat.value}
                    </h3>
                    <p className="text-xs text-gray-400">{stat.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Filtres et contrôles */}
        <Card className="bg-black/40 backdrop-blur-xl border-white/10 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher un snapshot..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('all')}
                    className={filterStatus === 'all' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
                  >
                    Tous
                  </Button>
                  <Button
                    variant={filterStatus === 'active' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('active')}
                    className={filterStatus === 'active' ? 'bg-blue-600' : 'border-white/20 text-white hover:bg-white/10'}
                  >
                    Actifs
                  </Button>
                  <Button
                    variant={filterStatus === 'completed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('completed')}
                    className={filterStatus === 'completed' ? 'bg-green-600' : 'border-white/20 text-white hover:bg-white/10'}
                  >
                    Complétés
                  </Button>
                  <Button
                    variant={filterStatus === 'failed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('failed')}
                    className={filterStatus === 'failed' ? 'bg-red-600' : 'border-white/20 text-white hover:bg-white/10'}
                  >
                    Échecs
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`border-white/20 text-white hover:bg-white/10 ${viewMode === 'grid' ? 'bg-white/10' : ''}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`border-white/20 text-white hover:bg-white/10 ${viewMode === 'list' ? 'bg-white/10' : ''}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contenu principal avec onglets */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="bg-black/40 backdrop-blur-xl border-white/10">
            <TabsTrigger value="active" className="data-[state=active]:bg-purple-500/20">
              <Clock className="h-4 w-4 mr-2" />
              Snapshots Actifs
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-purple-500/20">
              <CheckCircle className="h-4 w-4 mr-2" />
              Historique
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-500/20">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  Snapshots Actifs
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Snapshots en cours de traitement ou en attente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SnapshotList searchTerm={searchTerm} filterStatus={filterStatus} viewMode={viewMode} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Historique des Snapshots
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Tous vos snapshots complétés et leurs performances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SnapshotHistory searchTerm={searchTerm} filterStatus={filterStatus} viewMode={viewMode} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    Performance Récente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-white text-sm">Taux de succès</span>
                      </div>
                      <span className="text-green-400 font-medium">91.2%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-white text-sm">Temps moyen</span>
                      </div>
                      <span className="text-blue-400 font-medium">3.4s</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
                        <span className="text-white text-sm">Récompenses totales</span>
                      </div>
                      <span className="text-purple-400 font-medium">3,247.8 UOS</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Top Collections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Ultra Legends", snapshots: 45, rewards: 1247.5 },
                      { name: "Gaming Cards", snapshots: 32, rewards: 892.3 },
                      { name: "Digital Art", snapshots: 28, rewards: 567.8 }
                    ].map((collection, index) => (
                      <div key={collection.name} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-xs">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">{collection.name}</p>
                          <p className="text-xs text-gray-400">{collection.snapshots} snapshots</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-medium text-sm">+{collection.rewards}</p>
                          <p className="text-xs text-gray-500">UOS</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}