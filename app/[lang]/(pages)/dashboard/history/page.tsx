"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "@/lib/motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle,
  Calendar,
  TrendingUp,
  Users,
  Wallet,
  FileText,
  Gift,
  DollarSign,
  AlertCircle,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Target,
  Zap
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

interface SnapshotExecution {
  id: string
  jobId: string
  jobTitle: string
  collection: string
  executedAt: string
  status: 'success' | 'failed' | 'partial'
  duration: number
  actions: {
    type: 'export' | 'airdrop_uniq' | 'airdrop_uos'
    status: 'success' | 'failed'
    details: string
    recipients?: number
    amount?: number
  }[]
  cost: number
  holdersCount: number
  conditions: string[]
  errorMessage?: string
  downloadUrl?: string
}

export default function HistoryPage() {
  const { isAuthenticated } = useAuth()
  const [executions, setExecutions] = useState<SnapshotExecution[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'failed' | 'partial'>('all')
  const [filterPeriod, setFilterPeriod] = useState<'all' | '7d' | '30d' | '90d'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler le chargement de l'historique des exécutions
    setTimeout(() => {
      setExecutions([
        {
          id: '1',
          jobId: 'job-1',
          jobTitle: 'Airdrop Hebdomadaire Ultra Legends',
          collection: 'Ultra Legends Collection',
          executedAt: '2024-01-22T10:00:00Z',
          status: 'success',
          duration: 45,
          actions: [
            {
              type: 'export',
              status: 'success',
              details: 'Export CSV généré avec succès',
              recipients: 247
            },
            {
              type: 'airdrop_uos',
              status: 'success',
              details: 'Airdrop de 50 UOS envoyé',
              recipients: 89,
              amount: 4450
            }
          ],
          cost: 36,
          holdersCount: 247,
          conditions: ['Détient plus de 5 NFTs'],
          downloadUrl: '/exports/ultra-legends-20240122.csv'
        },
        {
          id: '2',
          jobId: 'job-2',
          jobTitle: 'Export Mensuel Holders',
          collection: 'Crypto Warriors',
          executedAt: '2024-01-20T09:00:00Z',
          status: 'success',
          duration: 23,
          actions: [
            {
              type: 'export',
              status: 'success',
              details: 'Export CSV complet généré',
              recipients: 156
            }
          ],
          cost: 20,
          holdersCount: 156,
          conditions: [],
          downloadUrl: '/exports/crypto-warriors-20240120.csv'
        },
        {
          id: '3',
          jobId: 'job-3',
          jobTitle: 'Airdrop NFT Rare',
          collection: 'Digital Art Masterpieces',
          executedAt: '2024-01-18T16:35:00Z',
          status: 'success',
          duration: 67,
          actions: [
            {
              type: 'export',
              status: 'success',
              details: 'Export des top holders',
              recipients: 10
            },
            {
              type: 'airdrop_uniq',
              status: 'success',
              details: 'NFT rare distribué aux top 10',
              recipients: 10
            }
          ],
          cost: 42,
          holdersCount: 89,
          conditions: ['Top 10 holders'],
          downloadUrl: '/exports/digital-art-top10-20240118.csv'
        },
        {
          id: '4',
          jobId: 'job-4',
          jobTitle: 'Récompense Quotidienne',
          collection: 'Gaming Collectibles',
          executedAt: '2024-01-17T12:00:00Z',
          status: 'partial',
          duration: 89,
          actions: [
            {
              type: 'airdrop_uos',
              status: 'partial',
              details: '78/95 airdrops réussis',
              recipients: 78,
              amount: 1950
            }
          ],
          cost: 25,
          holdersCount: 95,
          conditions: ['Activité récente'],
          errorMessage: '17 holders non éligibles (solde insuffisant)'
        },
        {
          id: '5',
          jobId: 'job-1',
          jobTitle: 'Airdrop Hebdomadaire Ultra Legends',
          collection: 'Ultra Legends Collection',
          executedAt: '2024-01-15T10:00:00Z',
          status: 'failed',
          duration: 12,
          actions: [
            {
              type: 'export',
              status: 'failed',
              details: 'Erreur lors de la génération du CSV'
            },
            {
              type: 'airdrop_uos',
              status: 'failed',
              details: 'Airdrop annulé suite à l\'échec de l\'export'
            }
          ],
          cost: 0, // Pas de coût si échec complet
          holdersCount: 0,
          conditions: ['Détient plus de 5 NFTs'],
          errorMessage: 'Erreur de connexion à la blockchain Ultra'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredExecutions = executions.filter(execution => {
    const matchesSearch = execution.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.collection.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || execution.status === filterStatus
    
    let matchesPeriod = true
    if (filterPeriod !== 'all') {
      const executionDate = new Date(execution.executedAt)
      const now = new Date()
      const daysAgo = parseInt(filterPeriod.replace('d', ''))
      const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000))
      matchesPeriod = executionDate >= cutoffDate
    }
    
    return matchesSearch && matchesStatus && matchesPeriod
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'partial': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4" />
      case 'partial': return <AlertCircle className="h-4 w-4" />
      case 'failed': return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'export': return <FileText className="h-3 w-3" />
      case 'airdrop_uniq': return <Gift className="h-3 w-3" />
      case 'airdrop_uos': return <DollarSign className="h-3 w-3" />
      default: return <Target className="h-3 w-3" />
    }
  }

  const getActionText = (action: string) => {
    switch (action) {
      case 'export': return 'Export CSV'
      case 'airdrop_uniq': return 'Airdrop NFT'
      case 'airdrop_uos': return 'Airdrop UOS'
      default: return action
    }
  }

  const stats = {
    total: executions.length,
    successful: executions.filter(e => e.status === 'success').length,
    failed: executions.filter(e => e.status === 'failed').length,
    totalCost: executions.reduce((sum, e) => sum + e.cost, 0),
    totalHolders: executions.reduce((sum, e) => sum + e.holdersCount, 0),
    avgDuration: executions.reduce((sum, e) => sum + e.duration, 0) / executions.length || 0
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Historique des Snapshots
              </h1>
              <p className="text-gray-400">
                Consultez l'historique complet de vos exécutions de snapshots
              </p>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Exécutions</p>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                  </div>
                  <History className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Réussies</p>
                    <p className="text-2xl font-bold text-green-400">{stats.successful}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Échecs</p>
                    <p className="text-2xl font-bold text-red-400">{stats.failed}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Coût Total</p>
                    <p className="text-2xl font-bold text-red-400">{stats.totalCost} UOS</p>
                  </div>
                  <Wallet className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Holders Traités</p>
                    <p className="text-2xl font-bold text-blue-400">{stats.totalHolders}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Durée Moy.</p>
                    <p className="text-2xl font-bold text-yellow-400">{Math.round(stats.avgDuration)}s</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contrôles */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un job ou une collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/40 backdrop-blur-xl border-white/10 text-white placeholder-gray-400"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Tous
              </Button>
              <Button
                variant={filterStatus === 'success' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('success')}
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Réussies
              </Button>
              <Button
                variant={filterStatus === 'partial' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('partial')}
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Partielles
              </Button>
              <Button
                variant={filterStatus === 'failed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('failed')}
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Échecs
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant={filterPeriod === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterPeriod('all')}
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Tout
              </Button>
              <Button
                variant={filterPeriod === '7d' ? 'default' : 'outline'}
                onClick={() => setFilterPeriod('7d')}
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                7j
              </Button>
              <Button
                variant={filterPeriod === '30d' ? 'default' : 'outline'}
                onClick={() => setFilterPeriod('30d')}
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                30j
              </Button>
              <Button
                variant={filterPeriod === '90d' ? 'default' : 'outline'}
                onClick={() => setFilterPeriod('90d')}
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                90j
              </Button>
            </div>
          </div>

          {/* Liste des exécutions */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="bg-black/40 backdrop-blur-xl border-white/10 animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-700 rounded mb-4"></div>
                    <div className="h-3 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredExecutions.map((execution, index) => (
                  <motion.div
                    key={execution.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-purple-500/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Informations principales */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-1">
                                  {execution.jobTitle}
                                </h3>
                                <p className="text-gray-400 text-sm">{execution.collection}</p>
                              </div>
                              <Badge className={`${getStatusColor(execution.status)} border`}>
                                {getStatusIcon(execution.status)}
                                <span className="ml-1 capitalize">{execution.status}</span>
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                              <div>
                                <p className="text-gray-400">Exécuté le</p>
                                <p className="text-white font-medium">
                                  {new Date(execution.executedAt).toLocaleDateString('fr-FR')}
                                </p>
                                <p className="text-gray-500 text-xs">
                                  {new Date(execution.executedAt).toLocaleTimeString('fr-FR')}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400">Durée</p>
                                <p className="text-white font-medium">{execution.duration}s</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Holders</p>
                                <p className="text-white font-medium">{execution.holdersCount}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Coût</p>
                                <p className="text-white font-medium">{execution.cost} UOS</p>
                              </div>
                            </div>

                            {/* Actions exécutées */}
                            <div className="mb-4">
                              <p className="text-gray-400 text-sm mb-2">Actions exécutées:</p>
                              <div className="space-y-2">
                                {execution.actions.map((action, i) => (
                                  <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                                    <div className="flex items-center gap-3">
                                      <div className={`p-1 rounded ${action.status === 'success' ? 'bg-green-500/20' : action.status === 'partial' ? 'bg-yellow-500/20' : 'bg-red-500/20'}`}>
                                        {getActionIcon(action.type)}
                                      </div>
                                      <div>
                                        <p className="text-white text-sm font-medium">
                                          {getActionText(action.type)}
                                        </p>
                                        <p className="text-gray-400 text-xs">{action.details}</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      {action.recipients && (
                                        <p className="text-white text-sm">{action.recipients} destinataires</p>
                                      )}
                                      {action.amount && (
                                        <p className="text-green-400 text-xs">{action.amount} UOS distribués</p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Conditions */}
                            {execution.conditions.length > 0 && (
                              <div className="mb-4">
                                <p className="text-gray-400 text-sm mb-2">Conditions appliquées:</p>
                                <div className="flex flex-wrap gap-2">
                                  {execution.conditions.map((condition, i) => (
                                    <Badge key={i} variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                                      {condition}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Message d'erreur */}
                            {execution.errorMessage && (
                              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="h-4 w-4 text-red-400" />
                                  <p className="text-red-400 text-sm font-medium">Erreur</p>
                                </div>
                                <p className="text-red-300 text-sm mt-1">{execution.errorMessage}</p>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2 lg:w-32">
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              <Eye className="h-3 w-3 mr-1" />
                              Détails
                            </Button>
                            {execution.downloadUrl && (
                              <Button size="sm" variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                                <Download className="h-3 w-3 mr-1" />
                                Export
                              </Button>
                            )}
                            {execution.status === 'failed' && (
                              <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                                <RefreshCw className="h-3 w-3 mr-1" />
                                Relancer
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {filteredExecutions.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <History className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Aucune exécution trouvée</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || filterStatus !== 'all' || filterPeriod !== 'all'
                  ? "Aucune exécution ne correspond à vos critères de recherche."
                  : "Vous n'avez pas encore d'historique d'exécutions."
                }
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 