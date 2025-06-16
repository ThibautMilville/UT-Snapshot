"use client"

import { useState } from "react"
import { motion } from "@/lib/motion"
import { ArrowLeft, Download, Users, Calendar, Clock, TrendingUp, Share2, Copy, ExternalLink, Filter, BarChart3, Settings, AlertCircle, CheckCircle, Eye } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/layout/PageLayout"

// Mock data pour le snapshot détaillé
const mockSnapshotDetail = {
  id: 1,
  name: "Ultra Heroes Collection",
  description: "Snapshot des détenteurs de la collection Ultra Heroes pour l'airdrop de tokens HERO. Ce snapshot capture tous les wallets possédant au moins un NFT de la collection Ultra Heroes au moment spécifié.",
  collection: "Ultra Heroes NFT",
  status: "completed",
  holders: 1247,
  createdAt: "2024-01-15",
  completedAt: "2024-01-20 14:32",
  scheduledAt: "2024-01-20 14:00",
  downloads: 156,
  fileSize: "2.3 MB",
  totalNFTs: 8456,
  uniqueHolders: 1247,
  averageHolding: 6.8,
  thumbnail: "/ultra.png",
  tags: ["NFT", "Gaming", "Popular"],
  criteria: {
    minTokens: 1,
    blockHeight: 12458967,
    snapshotTime: "2024-01-20T14:00:00Z"
  },
  topHolders: [
    { address: "0x1234...5678", tokens: 156, percentage: 1.85 },
    { address: "0x9abc...def0", tokens: 134, percentage: 1.58 },
    { address: "0x5678...9abc", tokens: 98, percentage: 1.16 },
    { address: "0xdef0...1234", tokens: 87, percentage: 1.03 },
    { address: "0x2468...ace0", tokens: 76, percentage: 0.90 }
  ],
  distribution: [
    { range: "1-5 NFTs", count: 892, percentage: 71.5 },
    { range: "6-10 NFTs", count: 234, percentage: 18.8 },
    { range: "11-50 NFTs", count: 98, percentage: 7.9 },
    { range: "51+ NFTs", count: 23, percentage: 1.8 }
  ]
}

interface SnapshotDetailProps {
  params: { 
    lang: string
    id: string 
  }
}

export default function SnapshotDetailPage({ params }: SnapshotDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isDownloading, setIsDownloading] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    // Simuler un téléchargement
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsDownloading(false)
    // Ici vous pourriez déclencher le téléchargement réel
  }

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(`snap_ultra_hero_${params.id}`)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
    }
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      // Créer une notification temporaire
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300'
      notification.textContent = 'Lien copié dans le presse-papiers !'
      document.body.appendChild(notification)
      
      setTimeout(() => {
        notification.style.opacity = '0'
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 300)
      }, 2000)
    } catch (err) {
      console.error('Erreur lors de la copie:', err)
      // Fallback avec l'API native de partage
      if (navigator.share) {
        try {
          await navigator.share({
            title: mockSnapshotDetail.name,
            text: mockSnapshotDetail.description,
            url: window.location.href,
          })
        } catch (shareErr) {
          console.error('Erreur lors du partage:', shareErr)
        }
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'running':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'scheduled':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
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
        return 'Échoué'
      default:
        return 'Inconnu'
    }
  }

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "purple" }: {
    icon: any
    title: string
    value: string | number
    subtitle?: string
    color?: string
  }) => (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 p-6 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${
          color === 'purple' ? 'from-purple-500 to-pink-500' :
          color === 'blue' ? 'from-blue-500 to-cyan-500' :
          color === 'green' ? 'from-green-500 to-emerald-500' :
          'from-yellow-500 to-orange-500'
        } flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-gray-400 text-sm font-medium">{title}</span>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value.toLocaleString()}</div>
      {subtitle && <div className="text-gray-500 text-sm">{subtitle}</div>}
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

        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <Link href="/snapshots">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour aux snapshots
                </Button>
              </Link>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl flex items-center justify-center border border-white/30">
                <img src="/logo-ut.png" alt="Ultra Logo" className="w-10 h-10 object-contain" />
              </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      {mockSnapshotDetail.name}
                    </h1>
                    <div className="flex items-center gap-3">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(mockSnapshotDetail.status)}`}>
                        <CheckCircle className="w-3 h-3" />
                        {getStatusText(mockSnapshotDetail.status)}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {mockSnapshotDetail.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white/10 text-white/80 rounded-lg text-xs font-medium border border-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                  {mockSnapshotDetail.description}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 rounded-xl transition-all duration-300 shadow-sm"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCopyId}
                  className={`border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200 rounded-xl transition-all duration-300 shadow-sm ${
                    copySuccess ? 'bg-green-500/20 border-green-500/50 text-green-300' : ''
                  }`}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copySuccess ? 'Copié !' : 'Copier ID'}
                </Button>
                <Button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Téléchargement...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <StatCard
              icon={Users}
              title="Détenteurs uniques"
              value={mockSnapshotDetail.uniqueHolders}
              subtitle="Wallets actifs"
              color="purple"
            />
            <StatCard
              icon={TrendingUp}
              title="Total NFTs"
              value={mockSnapshotDetail.totalNFTs}
              subtitle="Dans la collection"
              color="blue"
            />
            <StatCard
              icon={BarChart3}
              title="Moyenne par wallet"
              value={mockSnapshotDetail.averageHolding}
              subtitle="NFTs par détenteur"
              color="green"
            />
            <StatCard
              icon={Download}
              title="Téléchargements"
              value={mockSnapshotDetail.downloads}
              subtitle={`Taille: ${mockSnapshotDetail.fileSize}`}
              color="yellow"
            />
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-2">
              <div className="flex gap-2">
                {[
                  { id: 'overview', label: 'Aperçu', icon: Eye },
                  { id: 'holders', label: 'Top Détenteurs', icon: Users },
                  { id: 'distribution', label: 'Distribution', icon: BarChart3 },
                  { id: 'details', label: 'Détails Techniques', icon: Settings }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    Informations Temporelles
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Créé le:</span>
                      <span className="text-white">{mockSnapshotDetail.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Planifié pour:</span>
                      <span className="text-white">{mockSnapshotDetail.scheduledAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Terminé le:</span>
                      <span className="text-white">{mockSnapshotDetail.completedAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Durée d'exécution:</span>
                      <span className="text-green-400">32 minutes</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    Critères du Snapshot
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Collection:</span>
                      <span className="text-white">{mockSnapshotDetail.collection}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tokens minimum:</span>
                      <span className="text-white">{mockSnapshotDetail.criteria.minTokens}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Block Height:</span>
                      <span className="text-white">{mockSnapshotDetail.criteria.blockHeight.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Taille du fichier:</span>
                      <span className="text-white">{mockSnapshotDetail.fileSize}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'holders' && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Top 5 Détenteurs
                </h3>
                <div className="space-y-4">
                  {mockSnapshotDetail.topHolders.map((holder, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="text-white font-mono">{holder.address}</div>
                          <div className="text-gray-400 text-sm">{holder.percentage}% du total</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{holder.tokens} NFTs</div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => window.open(`https://ultra.io/wallet/${holder.address}`, '_blank')}
                          className="text-purple-400 hover:text-purple-300 p-0 h-auto"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'distribution' && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Distribution des Holdings
                </h3>
                <div className="space-y-4">
                  {mockSnapshotDetail.distribution.map((dist, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{dist.range}</span>
                        <span className="text-white">{dist.count} détenteurs ({dist.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${dist.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-green-400" />
                    Configuration Technique
                  </h3>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Snapshot ID:</span>
                      <span className="text-white">snap_ultra_hero_{params.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Blockchain:</span>
                      <span className="text-white">Ultra Network</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Contract Address:</span>
                      <span className="text-white">0xabc...def123</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Algorithm:</span>
                      <span className="text-white">Ultra Snapshot v2.1</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    Logs d'Exécution
                  </h3>
                  <div className="space-y-2 text-sm font-mono">
                    <div className="text-green-400">✓ Connexion à Ultra Network établie</div>
                    <div className="text-green-400">✓ Validation du contrat de collection</div>
                    <div className="text-green-400">✓ Récupération des holders (1247 trouvés)</div>
                    <div className="text-green-400">✓ Génération du fichier JSON (2.3MB)</div>
                    <div className="text-green-400">✓ Snapshot terminé avec succès</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
} 