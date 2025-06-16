"use client"

import { useState } from "react"
import { motion } from "@/lib/motion"
import { Plus, Filter, Search, Grid, List, Calendar, Users, Download, Eye, Settings, Clock, TrendingUp, Star, Copy, ExternalLink, ChevronLeft, ChevronRight, Copy as DuplicateIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/contexts/TranslationContext"
import { CreateSnapshotModal } from "@/components/modals/CreateSnapshotModal"
import { PageLayout } from "@/components/layout/PageLayout"
import { useAuth } from "@/hooks/useAuth"
import { ConnectWalletButton } from "@/components/auth/ConnectWalletButton"

// Mock data pour les snapshots (étendu)
const mockSnapshots = [
  {
    id: 1,
    name: "Ultra Heroes Collection",
    description: "Snapshot des détenteurs de la collection Ultra Heroes pour l'airdrop de tokens HERO",
    collection: "Ultra Heroes NFT",
    status: "completed",
    holders: 1247,
    createdAt: "2024-01-15",
    scheduledAt: "2024-01-20 14:00",
    downloads: 156,
    thumbnail: "/ultra.png",
    tags: ["NFT", "Gaming", "Popular"]
  },
  {
    id: 2,
    name: "Ultra Gaming Ecosystem",
    description: "Analyse complète des gamers actifs sur l'écosystème Ultra",
    collection: "Ultra Games",
    status: "running",
    holders: 8392,
    createdAt: "2024-01-18",
    scheduledAt: "2024-01-25 16:30",
    downloads: 89,
    thumbnail: "/ultra.png",
    tags: ["Gaming", "Ecosystem", "Active"]
  },
  {
    id: 3,
    name: "Ultra Validators Snapshot",
    description: "Snapshot des validateurs et stakeurs du réseau Ultra",
    collection: "Ultra Network",
    status: "scheduled",
    holders: 567,
    createdAt: "2024-01-20",
    scheduledAt: "2024-01-28 10:00",
    downloads: 0,
    thumbnail: "/ultra.png",
    tags: ["Validators", "Staking", "Network"]
  },
  {
    id: 4,
    name: "Ultra Marketplace Traders",
    description: "Commerçants actifs sur la marketplace Ultra des 30 derniers jours",
    collection: "Ultra Marketplace",
    status: "completed",
    holders: 2156,
    createdAt: "2024-01-12",
    scheduledAt: "2024-01-15 12:00",
    downloads: 234,
    thumbnail: "/ultra.png",
    tags: ["Trading", "Marketplace", "Active"]
  },
  {
    id: 5,
    name: "Ultra DeFi Liquidity Providers",
    description: "Fournisseurs de liquidité sur les protocoles DeFi d'Ultra",
    collection: "Ultra DeFi",
    status: "completed",
    holders: 892,
    createdAt: "2024-01-10",
    scheduledAt: "2024-01-12 09:00",
    downloads: 67,
    thumbnail: "/ultra.png",
    tags: ["DeFi", "Liquidity", "Finance"]
  },
  {
    id: 6,
    name: "Ultra Community Governors",
    description: "Détenteurs de tokens de gouvernance Ultra avec droits de vote",
    collection: "Ultra DAO",
    status: "failed",
    holders: 1456,
    createdAt: "2024-01-08",
    scheduledAt: "2024-01-10 15:00",
    downloads: 12,
    thumbnail: "/ultra.png",
    tags: ["DAO", "Governance", "Voting"]
  },
  {
    id: 7,
    name: "Ultra Artist Collective",
    description: "Artistes créateurs de NFT sur la plateforme Ultra Art",
    collection: "Ultra Art",
    status: "completed",
    holders: 2847,
    createdAt: "2024-01-22",
    scheduledAt: "2024-01-25 11:00",
    downloads: 189,
    thumbnail: "/ultra.png",
    tags: ["Art", "Creators", "NFT"]
  },
  {
    id: 8,
    name: "Ultra Esports Tournament Players",
    description: "Joueurs participants aux tournois esports Ultra",
    collection: "Ultra Esports",
    status: "completed",
    holders: 1673,
    createdAt: "2024-01-19",
    scheduledAt: "2024-01-23 18:00",
    downloads: 142,
    thumbnail: "/ultra.png",
    tags: ["Esports", "Gaming", "Tournament"]
  },
  {
    id: 9,
    name: "Ultra Beta Testers",
    description: "Testeurs de nouvelles fonctionnalités et jeux sur Ultra",
    collection: "Ultra Beta",
    status: "running",
    holders: 456,
    createdAt: "2024-01-24",
    scheduledAt: "2024-01-30 09:00",
    downloads: 23,
    thumbnail: "/ultra.png",
    tags: ["Beta", "Testing", "Early Access"]
  },
  {
    id: 10,
    name: "Ultra Premium Subscribers",
    description: "Abonnés premium avec accès aux fonctionnalités avancées",
    collection: "Ultra Premium",
    status: "scheduled",
    holders: 1234,
    createdAt: "2024-01-25",
    scheduledAt: "2024-02-01 14:00",
    downloads: 0,
    thumbnail: "/ultra.png",
    tags: ["Premium", "Subscription", "VIP"]
  },
  {
    id: 11,
    name: "Ultra Mobile Gamers",
    description: "Joueurs mobiles actifs dans l'écosystème Ultra Mobile",
    collection: "Ultra Mobile",
    status: "completed",
    holders: 3456,
    createdAt: "2024-01-14",
    scheduledAt: "2024-01-17 16:00",
    downloads: 287,
    thumbnail: "/ultra.png",
    tags: ["Mobile", "Gaming", "Cross-platform"]
  },
  {
    id: 12,
    name: "Ultra Music NFT Collectors",
    description: "Collectionneurs de NFT musicaux sur Ultra Music",
    collection: "Ultra Music",
    status: "completed",
    holders: 987,
    createdAt: "2024-01-16",
    scheduledAt: "2024-01-19 12:30",
    downloads: 156,
    thumbnail: "/ultra.png",
    tags: ["Music", "NFT", "Collectors"]
  },
  {
    id: 13,
    name: "Ultra VR Experience Users",
    description: "Utilisateurs d'expériences VR dans l'écosystème Ultra",
    collection: "Ultra VR",
    status: "failed",
    holders: 234,
    createdAt: "2024-01-21",
    scheduledAt: "2024-01-24 10:00",
    downloads: 5,
    thumbnail: "/ultra.png",
    tags: ["VR", "Immersive", "Technology"]
  },
  {
    id: 14,
    name: "Ultra Creator Economy",
    description: "Créateurs de contenu monétisant sur Ultra",
    collection: "Ultra Creators",
    status: "running",
    holders: 1567,
    createdAt: "2024-01-23",
    scheduledAt: "2024-01-27 15:30",
    downloads: 78,
    thumbnail: "/ultra.png",
    tags: ["Creators", "Economy", "Content"]
  },
  {
    id: 15,
    name: "Ultra AI Training Participants",
    description: "Participants aux programmes d'entraînement IA d'Ultra",
    collection: "Ultra AI",
    status: "scheduled",
    holders: 789,
    createdAt: "2024-01-26",
    scheduledAt: "2024-02-05 11:00",
    downloads: 0,
    thumbnail: "/ultra.png",
    tags: ["AI", "Training", "Future"]
  },
  {
    id: 16,
    name: "Ultra Sports Fantasy Leagues",
    description: "Joueurs de ligues fantastiques sportives sur Ultra Sports",
    collection: "Ultra Sports",
    status: "completed",
    holders: 2234,
    createdAt: "2024-01-13",
    scheduledAt: "2024-01-16 19:00",
    downloads: 178,
    thumbnail: "/ultra.png",
    tags: ["Sports", "Fantasy", "Competition"]
  },
  {
    id: 17,
    name: "Ultra Educational Content Users",
    description: "Utilisateurs de contenu éducatif sur Ultra Learn",
    collection: "Ultra Learn",
    status: "running",
    holders: 1345,
    createdAt: "2024-01-27",
    scheduledAt: "2024-02-02 08:00",
    downloads: 56,
    thumbnail: "/ultra.png",
    tags: ["Education", "Learning", "Knowledge"]
  },
  {
    id: 18,
    name: "Ultra Green Initiative Supporters",
    description: "Supporteurs des initiatives écologiques d'Ultra",
    collection: "Ultra Green",
    status: "completed",
    holders: 967,
    createdAt: "2024-01-11",
    scheduledAt: "2024-01-14 13:00",
    downloads: 123,
    thumbnail: "/ultra.png",
    tags: ["Green", "Environment", "Sustainability"]
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-green-400 bg-green-500/20 border-green-500/50'
    case 'running':
      return 'text-blue-400 bg-blue-500/20 border-blue-500/50'
    case 'scheduled':
      return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50'
    case 'failed':
      return 'text-red-400 bg-red-500/20 border-red-500/50'
    default:
      return 'text-gray-400 bg-gray-500/20 border-gray-500/50'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Terminé'
    case 'running':
      return 'En cours'
    case 'scheduled':
      return 'Planifié'
    case 'failed':
      return 'Échec'
    default:
      return status
  }
}

export default function SnapshotsPage() {
  const { t } = useTranslation()
  const { requireAuth, loading, isAuthenticated } = useAuth()
  
  // Tous les hooks useState doivent être appelés avant toute condition de retour
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [duplicateData, setDuplicateData] = useState<typeof mockSnapshots[0] | null>(null)
  const [downloadingIds, setDownloadingIds] = useState<number[]>([])
  
  // Require authentication to access this page
  requireAuth()
  
  // Show loading while checking authentication
  if (loading) {
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
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">
              {t('auth.connectionRequired') || 'Connexion requise'}
            </h1>
            <p className="text-gray-400 mb-6">
              {t('auth.connectWalletMessage') || 'Veuillez connecter votre wallet pour accéder aux snapshots.'}
            </p>
            <ConnectWalletButton />
          </div>
        </div>
      </PageLayout>
    )
  }
  
  const itemsPerPage = 9

  const handleDownload = async (snapshotId: number) => {
    setDownloadingIds(prev => [...prev, snapshotId])
    // Simuler le téléchargement
    await new Promise(resolve => setTimeout(resolve, 2000))
    setDownloadingIds(prev => prev.filter(id => id !== snapshotId))
  }

  const handleCopyLink = async (snapshotId: number) => {
    const url = `${window.location.origin}/snapshots/${snapshotId}`
    await navigator.clipboard.writeText(url)
  }

  const handleCopySettings = (snapshot: typeof mockSnapshots[0]) => {
    setDuplicateData(snapshot)
    setIsCreateModalOpen(true)
  }

  const handleViewExternal = (snapshotId: number) => {
    window.open(`/snapshots/${snapshotId}`, '_blank')
  }

  const filteredSnapshots = mockSnapshots.filter(snapshot => {
    const matchesSearch = snapshot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snapshot.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snapshot.collection.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || snapshot.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredSnapshots.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSnapshots = filteredSnapshots.slice(startIndex, endIndex)

  // Reset page when filters change
  const resetPage = () => {
    setCurrentPage(1)
  }

  const SnapshotCard = ({ snapshot }: { snapshot: typeof mockSnapshots[0] }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 overflow-hidden cursor-pointer h-[340px] flex flex-col"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative p-4 sm:p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl flex items-center justify-center border border-white/20">
              <img src="/logo-ut.png" alt="Ultra Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-purple-300 transition-colors truncate">
                {snapshot.name}
              </h3>
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(snapshot.status)}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {t(`snapshots.filter.${snapshot.status}` as any) || getStatusText(snapshot.status)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => handleCopySettings(snapshot)}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-white/10 text-gray-400 hover:text-purple-300"
              title={t('snapshots.duplicate')}
            >
              <DuplicateIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => handleViewExternal(snapshot.id)}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-white/10 text-gray-400 hover:text-blue-300"
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2 flex-shrink-0">
          {snapshot.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 flex-shrink-0">
          {snapshot.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/5 text-white/80 rounded-lg text-xs font-medium border border-white/10"
            >
              {tag}
            </span>
          ))}
          {snapshot.tags.length > 3 && (
            <span className="px-2 py-1 bg-white/5 text-white/60 rounded-lg text-xs">
              +{snapshot.tags.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 flex-shrink-0">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white">{snapshot.holders.toLocaleString()}</div>
            <div className="text-xs text-gray-500 hidden sm:block">{t('snapshots.holders')}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white">{snapshot.downloads}</div>
            <div className="text-xs text-gray-500 hidden sm:block">{t('snapshots.downloads')}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white">{snapshot.createdAt}</div>
            <div className="text-xs text-gray-500 hidden sm:block">Créé</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link href={`/snapshots/${snapshot.id}`} className="flex-1">
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs sm:text-sm"
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{t('snapshots.view')}</span>
              <span className="sm:hidden">Voir</span>
            </Button>
          </Link>
          {snapshot.status === 'completed' && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDownload(snapshot.id)}
              disabled={downloadingIds.includes(snapshot.id)}
              className="border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 transition-all duration-300 disabled:opacity-50 shadow-sm"
            >
              {downloadingIds.includes(snapshot.id) ? (
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-purple-300 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )

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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 mb-6 sm:mb-8"
          >
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {t('snapshots.title')}
              </h1>
              <p className="text-gray-400 text-base sm:text-lg">
                {t('snapshots.subtitle')}
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span className="text-sm text-gray-300">
                    <span className="text-green-400 font-semibold">+12%</span> ce mois
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  <span className="text-sm text-gray-300">
                    <span className="text-white font-semibold">{filteredSnapshots.length}</span> snapshots trouvés
                    {filteredSnapshots.length > itemsPerPage && (
                      <span className="ml-2 text-purple-400">
                        • Page {currentPage}/{totalPages}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center gap-3 group"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">{t('snapshots.create')}</span>
              <span className="sm:hidden">Créer</span>
            </Button>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 sm:p-6 mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <Input
                  placeholder={t('general.search')}
                  value={searchTerm}
                  onChange={(e) => {setSearchTerm(e.target.value); resetPage()}}
                  className="pl-10 sm:pl-12 bg-white/5 border-white/10 hover:border-purple-400/30 focus:border-purple-400/50 text-white placeholder:text-gray-400 h-10 sm:h-12 rounded-xl"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => {setFilterStatus(e.target.value); resetPage()}}
                  className="bg-white/5 border border-white/10 hover:border-purple-400/30 text-white rounded-xl px-3 sm:px-4 py-2 sm:py-3 min-w-[140px] text-sm sm:text-base"
                >
                  <option value="all">{t('snapshots.filter.all')}</option>
                  <option value="completed">{t('snapshots.filter.completed')}</option>
                  <option value="running">{t('snapshots.filter.running')}</option>
                  <option value="scheduled">{t('snapshots.filter.scheduled')}</option>
                  <option value="failed">{t('snapshots.filter.failed')}</option>
                </select>

                <div className="flex border border-white/10 rounded-xl overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`h-10 sm:h-12 px-3 sm:px-4 rounded-none ${viewMode === 'grid' ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-white/10'}`}
                  >
                    <Grid size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`h-10 sm:h-12 px-3 sm:px-4 rounded-none ${viewMode === 'list' ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-white/10'}`}
                  >
                    <List size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          {filteredSnapshots.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {currentSnapshots.map((snapshot, index) => (
                      <motion.div
                        key={snapshot.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <SnapshotCard snapshot={snapshot} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentSnapshots.map((snapshot, index) => (
                    <motion.div
                      key={snapshot.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-500/30 p-4 sm:p-6 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0">
                            <img src="/logo-ut.png" alt="Ultra Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-base sm:text-lg font-semibold text-white truncate">{snapshot.name}</h3>
                            <p className="text-gray-400 text-sm line-clamp-1 sm:line-clamp-none">{snapshot.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(snapshot.status)}`}>
                            {t(`snapshots.filter.${snapshot.status}` as any) || getStatusText(snapshot.status)}
                          </div>
                          <span className="text-gray-400 text-sm">{snapshot.holders.toLocaleString()} {t('snapshots.holders').toLowerCase()}</span>
                          <div className="flex gap-2">
                            <Link href={`/snapshots/${snapshot.id}`}>
                              <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10">
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="ml-1 sm:ml-2 hidden sm:inline">{t('snapshots.view')}</span>
                              </Button>
                            </Link>
                            {snapshot.status === 'completed' && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleDownload(snapshot.id)}
                                disabled={downloadingIds.includes(snapshot.id)}
                                className="border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 disabled:opacity-50 shadow-sm"
                              >
                                {downloadingIds.includes(snapshot.id) ? (
                                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-purple-300 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                                )}
                                <span className="ml-1 sm:ml-2 hidden sm:inline">{t('snapshots.download')}</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Pagination */}
            {filteredSnapshots.length > itemsPerPage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 sm:mt-12"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 disabled:opacity-50 flex items-center gap-2 w-full sm:w-auto"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {t('snapshots.pagination.previous')}
                </Button>
                
                <div className="flex gap-2 overflow-x-auto">
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let page;
                    if (totalPages <= 7) {
                      page = i + 1;
                    } else if (currentPage <= 4) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 3) {
                      page = totalPages - 6 + i;
                    } else {
                      page = currentPage - 3 + i;
                    }
                    
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white min-w-[36px] sm:min-w-[40px]"
                            : "border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 min-w-[36px] sm:min-w-[40px]"
                        }
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 disabled:opacity-50 flex items-center gap-2 w-full sm:w-auto"
                >
                  {t('snapshots.pagination.next')}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center py-12 sm:py-16"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{t('snapshots.empty.title')}</h3>
              <p className="text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto px-4">{t('snapshots.empty.description')}</p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 rounded-2xl font-semibold transition-all duration-300"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {t('snapshots.create')}
              </Button>
            </motion.div>
          )}

          {/* Create Snapshot Modal */}
          <CreateSnapshotModal
            isOpen={isCreateModalOpen}
            onClose={() => {
              setIsCreateModalOpen(false)
              setDuplicateData(null)
            }}
            duplicateData={duplicateData}
          />
        </div>
      </div>
    </PageLayout>
  )
} 