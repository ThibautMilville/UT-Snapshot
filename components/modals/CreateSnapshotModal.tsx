"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "@/lib/motion"
import { X, Plus, Calendar, Clock, Users, Settings, Copy, Target, Gift, Coins, Zap, CheckCircle, AlertCircle, Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useTranslation } from "@/contexts/TranslationContext"

interface CreateSnapshotModalProps {
  isOpen: boolean
  onClose: () => void
  duplicateData?: {
    id: number
    name: string
    description: string
    collection: string
    status: string
    holders: number
    createdAt: string
    scheduledAt: string
    downloads: number
    thumbnail: string
    tags: string[]
  } | null
}

interface SnapshotPurpose {
  id: string
  title: string
  description: string
  icon: any
  color: string
  features: string[]
}

interface CollectionOption {
  id: string
  name: string
  type: 'nft' | 'token'
  holders: number
  volume: string
  image: string
}

export function CreateSnapshotModal({ isOpen, onClose, duplicateData }: CreateSnapshotModalProps) {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    purpose: "",
    name: duplicateData ? `Copie de ${duplicateData.name}` : "",
    description: duplicateData ? duplicateData.description : "",
    collection: duplicateData ? duplicateData.collection : "",
    collectionType: "nft" as "nft" | "token",
    scheduledDate: "",
    scheduledTime: "",
    criteria: {
      minTokens: "",
      maxTokens: "",
      holdingPeriod: "",
      rarity: "",
      attributes: [] as string[]
    },
    airdropConfig: {
      enabled: false,
      type: "uos" as "uos" | "uniq",
      amount: "100",
      recipients: "50",
      distribution: "equal" as "equal" | "weighted"
    },
    exportFormat: "json",
    autoExecute: true
  })

  const snapshotPurposes: SnapshotPurpose[] = [
    {
      id: "community_airdrop",
      title: "Airdrop Communauté",
      description: "Récompenser les holders fidèles avec des UOS ou UNIQs",
      icon: Gift,
      color: "from-green-500 to-emerald-500",
      features: ["Distribution automatique", "Critères de fidélité", "Récompenses personnalisées"]
    },
    {
      id: "analytics_export",
      title: "Analyse & Export",
      description: "Exporter les données pour analyse ou reporting",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      features: ["Export multi-format", "Filtres avancés", "Données détaillées"]
    },
    {
      id: "governance_voting",
      title: "Vote de Gouvernance",
      description: "Créer une liste de votants éligibles",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      features: ["Critères d'éligibilité", "Pondération par holdings", "Snapshot historique"]
    },
    {
      id: "marketing_campaign",
      title: "Campagne Marketing",
      description: "Identifier et cibler des segments spécifiques",
      icon: Zap,
      color: "from-orange-500 to-red-500",
      features: ["Segmentation avancée", "Profils utilisateurs", "Métriques d'engagement"]
    }
  ]

  const mockCollections: CollectionOption[] = [
    {
      id: "ultra-heroes",
      name: "Ultra Heroes NFT",
      type: "nft",
      holders: 1250,
      volume: "2.5M UOS",
      image: "https://picsum.photos/64/64?random=1"
    },
    {
      id: "cyber-legends",
      name: "Cyber Legends",
      type: "nft",
      holders: 890,
      volume: "1.8M UOS",
      image: "https://picsum.photos/64/64?random=2"
    },
    {
      id: "ultra-token",
      name: "Ultra Token (UOS)",
      type: "token",
      holders: 15600,
      volume: "45M UOS",
      image: "https://picsum.photos/64/64?random=3"
    },
    {
      id: "gaming-tokens",
      name: "Gaming Tokens",
      type: "token",
      holders: 3400,
      volume: "8.2M UOS",
      image: "https://picsum.photos/64/64?random=4"
    }
  ]

  const rarityOptions = ["Common", "Rare", "Epic", "Legendary", "Mythic"]
  const attributeOptions = ["Background", "Character Type", "Weapon", "Armor", "Special"]

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(1)
      setFormData({
        purpose: "",
        name: duplicateData ? `Copie de ${duplicateData.name}` : "",
        description: duplicateData ? duplicateData.description : "",
        collection: duplicateData ? duplicateData.collection : "",
        collectionType: "nft",
        scheduledDate: "",
        scheduledTime: "",
        criteria: {
          minTokens: "",
          maxTokens: "",
          holdingPeriod: "",
          rarity: "",
          attributes: []
        },
        airdropConfig: {
          enabled: false,
          type: "uos",
          amount: "100",
          recipients: "50",
          distribution: "equal"
        },
        exportFormat: "json",
        autoExecute: true
      })
    }
  }, [isOpen, duplicateData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Ne soumettre que si on est au step 3
    if (step !== 3) return
    
    console.log("Creating snapshot:", formData)
    onClose()
  }

  const nextStep = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    
    if (step === 1 && !formData.purpose) return
    if (step === 2 && (!formData.name || !formData.collection)) return
    
    setStep(prev => Math.min(prev + 1, 3))
  }

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const getSelectedPurpose = () => snapshotPurposes.find(p => p.id === formData.purpose)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ paddingTop: '6rem' }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl border border-purple-400/30 rounded-2xl shadow-2xl mx-4"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 rounded-3xl" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Header */}
            <div className="relative p-6 border-b border-purple-400/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
                      {duplicateData ? "Dupliquer un Snapshot" : "Créer un Snapshot"}
                    </h2>
                    <p className="text-gray-300 text-lg flex items-center gap-3">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                        Étape {step}/3
                      </span>
                      {step === 1 && "Choisir la finalité"}
                      {step === 2 && "Configuration détaillée"}
                      {step === 3 && "Validation finale"}
                      {/* Debug - remove in production */}
                      <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs">DEBUG: step={step}</span>
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white hover:bg-purple-500/20 rounded-2xl h-12 w-12 p-0 transition-all duration-300"
                >
                  <X size={24} />
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-6">
              {/* Steps Header */}
              <div className="flex justify-between items-center mb-8">
                {[
                  { step: 1, title: "Finalité", icon: Target },
                  { step: 2, title: "Configuration", icon: Settings },
                  { step: 3, title: "Validation", icon: CheckCircle }
                ].map((item, index) => (
                  <div key={item.step} className="flex flex-col items-center flex-1">
                    <motion.div
                      animate={{ 
                        scale: item.step === step ? 1.1 : item.step < step ? 1.0 : 0.9,
                        backgroundColor: item.step <= step ? "#8b5cf6" : "#374151"
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-3 ${
                        item.step <= step ? 'text-white shadow-purple-500/40' : 'text-gray-400'
                      } ${item.step === step ? 'ring-4 ring-purple-500/30' : ''}`}
                    >
                      {item.step < step ? (
                        <CheckCircle size={24} className="text-white" />
                      ) : (
                        <item.icon size={24} />
                      )}
                    </motion.div>
                    <h4 className={`text-sm font-bold ${
                      item.step <= step ? 'text-white' : 'text-gray-500'
                    }`}>
                      {item.title}
                    </h4>
                    <div className={`text-xs mt-1 ${
                      item.step === step ? 'text-purple-300' : 
                      item.step < step ? 'text-green-400' : 'text-gray-600'
                    }`}>
                      {item.step === step ? 'En cours' : 
                       item.step < step ? 'Terminé' : 'En attente'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Line */}
              <div className="relative">
                <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" 
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full"
                  />
                </div>
                
                {/* Progress percentage */}
                <div className="flex justify-between items-center mt-2 text-xs">
                  <span className="text-gray-400">Progression</span>
                  <motion.span 
                    key={step}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-purple-300 font-bold"
                  >
                    {Math.round(((step - 1) / 2) * 100)}%
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="relative p-6">
              {/* Step 1: Purpose Selection */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-white">Quelle est la finalité de votre snapshot ?</h3>
                    <p className="text-gray-300">Choisissez l'objectif principal pour configurer automatiquement les meilleures options</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {snapshotPurposes.map((purpose) => (
                      <motion.div
                        key={purpose.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData(prev => ({ ...prev, purpose: purpose.id }))}
                        className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                          formData.purpose === purpose.id
                            ? 'border-purple-400/60 bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/20'
                            : 'border-gray-600/30 bg-gradient-to-br from-white/5 to-white/2 hover:border-purple-400/40'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${purpose.color} flex items-center justify-center`}>
                            <purpose.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-white text-lg mb-2">{purpose.title}</h4>
                            <p className="text-gray-300 text-sm mb-4">{purpose.description}</p>
                            <div className="space-y-2">
                              {purpose.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                                  <CheckCircle className="w-3 h-3 text-green-400" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {formData.purpose && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-3 text-purple-300">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Excellent choix ! "{getSelectedPurpose()?.title}" va configurer automatiquement les options optimales.</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Configuration */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label className="text-white text-lg font-bold flex items-center gap-3">
                        <Users className="w-5 h-5 text-purple-400" />
                        Nom du snapshot *
                      </Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ex: Ultra Heroes Airdrop Janvier 2024"
                        className="bg-slate-800/50 border-purple-400/30 text-white h-12 rounded-xl"
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-white text-lg font-bold flex items-center gap-3">
                        <Target className="w-5 h-5 text-purple-400" />
                        Collection *
                      </Label>
                      <Select value={formData.collection} onValueChange={(value) => setFormData(prev => ({ ...prev, collection: value }))}>
                        <SelectTrigger className="bg-slate-800/50 border-purple-400/30 text-white h-12 rounded-xl">
                          <SelectValue placeholder="Choisir une collection" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-purple-400/30">
                          {mockCollections.map((collection) => (
                            <SelectItem key={collection.id} value={collection.id} className="text-white hover:bg-purple-500/20">
                              <div className="flex items-center gap-3">
                                <img src={collection.image} alt={collection.name} className="w-8 h-8 rounded-lg" />
                                <div>
                                  <div className="font-medium">{collection.name}</div>
                                  <div className="text-xs text-gray-400">{collection.holders} holders • {collection.volume}</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-white text-lg font-bold">Description</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Décrivez l'objectif et les détails de ce snapshot..."
                      className="bg-slate-800/50 border-purple-400/30 text-white rounded-xl min-h-[100px]"
                    />
                  </div>

                  {/* Criteria Section */}
                  <div className="space-y-6 bg-slate-800/30 rounded-2xl p-6 border border-purple-400/20">
                    <h4 className="text-xl font-bold text-white flex items-center gap-3">
                      <Filter className="w-5 h-5 text-purple-400" />
                      Critères de Sélection
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label className="text-white font-medium">Tokens minimum</Label>
                        <Input
                          type="number"
                          value={formData.criteria.minTokens}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            criteria: { ...prev.criteria, minTokens: e.target.value }
                          }))}
                          placeholder="0"
                          className="bg-slate-700/50 border-gray-600/30 text-white h-10 rounded-lg"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-white font-medium">Période de détention (jours)</Label>
                        <Input
                          type="number"
                          value={formData.criteria.holdingPeriod}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            criteria: { ...prev.criteria, holdingPeriod: e.target.value }
                          }))}
                          placeholder="30"
                          className="bg-slate-700/50 border-gray-600/30 text-white h-10 rounded-lg"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-white font-medium">Rareté minimum</Label>
                        <Select 
                          value={formData.criteria.rarity} 
                          onValueChange={(value) => setFormData(prev => ({ 
                            ...prev, 
                            criteria: { ...prev.criteria, rarity: value }
                          }))}
                        >
                          <SelectTrigger className="bg-slate-700/50 border-gray-600/30 text-white h-10 rounded-lg">
                            <SelectValue placeholder="Toutes" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-gray-600/30">
                            {rarityOptions.map((rarity) => (
                              <SelectItem key={rarity} value={rarity.toLowerCase()} className="text-white hover:bg-purple-500/20">
                                {rarity}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Airdrop Configuration - Only show if purpose includes airdrop */}
                  {formData.purpose === 'community_airdrop' && (
                    <div className="space-y-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-400/30">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold text-white flex items-center gap-3">
                          <Gift className="w-5 h-5 text-green-400" />
                          Configuration Airdrop
                        </h4>
                        <Switch
                          checked={formData.airdropConfig.enabled}
                          onCheckedChange={(checked) => setFormData(prev => ({ 
                            ...prev, 
                            airdropConfig: { ...prev.airdropConfig, enabled: checked }
                          }))}
                        />
                      </div>

                      {formData.airdropConfig.enabled && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <Label className="text-white font-medium">Type de récompense</Label>
                            <div className="flex gap-3">
                              {[
                                { value: 'uos', label: 'UOS', icon: Coins },
                                { value: 'uniq', label: 'UNIQ', icon: Star }
                              ].map((type) => (
                                <motion.button
                                  key={type.value}
                                  type="button"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setFormData(prev => ({ 
                                    ...prev, 
                                    airdropConfig: { ...prev.airdropConfig, type: type.value as 'uos' | 'uniq' }
                                  }))}
                                  className={`flex-1 p-4 rounded-xl border transition-all duration-300 ${
                                    formData.airdropConfig.type === type.value
                                      ? 'border-green-400/60 bg-green-500/20'
                                      : 'border-gray-600/30 bg-slate-700/30 hover:border-green-400/40'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <type.icon className="w-5 h-5 text-green-400" />
                                    <span className="text-white font-medium">{type.label}</span>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Label className="text-white font-medium">
                              {formData.airdropConfig.type === 'uos' ? 'Montant par utilisateur' : 'Nombre d\'UNIQs'}
                            </Label>
                            <Input
                              type="number"
                              value={formData.airdropConfig.amount}
                              onChange={(e) => setFormData(prev => ({ 
                                ...prev, 
                                airdropConfig: { ...prev.airdropConfig, amount: e.target.value }
                              }))}
                              placeholder="100"
                              className="bg-slate-700/50 border-gray-600/30 text-white h-10 rounded-lg"
                            />
                          </div>

                          <div className="space-y-4">
                            <Label className="text-white font-medium">Nombre de bénéficiaires</Label>
                            <Input
                              type="number"
                              value={formData.airdropConfig.recipients}
                              onChange={(e) => setFormData(prev => ({ 
                                ...prev, 
                                airdropConfig: { ...prev.airdropConfig, recipients: e.target.value }
                              }))}
                              placeholder="50"
                              className="bg-slate-700/50 border-gray-600/30 text-white h-10 rounded-lg"
                            />
                          </div>

                          <div className="space-y-4">
                            <Label className="text-white font-medium">Méthode de distribution</Label>
                            <Select 
                              value={formData.airdropConfig.distribution} 
                              onValueChange={(value) => setFormData(prev => ({ 
                                ...prev, 
                                airdropConfig: { ...prev.airdropConfig, distribution: value as 'equal' | 'weighted' }
                              }))}
                            >
                              <SelectTrigger className="bg-slate-700/50 border-gray-600/30 text-white h-10 rounded-lg">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-gray-600/30">
                                <SelectItem value="equal" className="text-white hover:bg-green-500/20">
                                  Distribution égale
                                </SelectItem>
                                <SelectItem value="weighted" className="text-white hover:bg-green-500/20">
                                  Pondérée par holdings
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Scheduling */}
                  <div className="space-y-6 bg-slate-800/30 rounded-2xl p-6 border border-purple-400/20">
                    <h4 className="text-xl font-bold text-white flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      Planification
                    </h4>

                    <div className="flex items-center gap-4">
                      <Switch
                        checked={formData.autoExecute}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, autoExecute: checked }))}
                      />
                      <span className="text-white font-medium">
                        {formData.autoExecute ? "Exécution immédiate" : "Planifier l'exécution"}
                      </span>
                    </div>

                    {!formData.autoExecute && (
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-white font-medium">Date</Label>
                          <Input
                            type="date"
                            value={formData.scheduledDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                            className="bg-slate-700/50 border-gray-600/30 text-white h-10 rounded-lg"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-white font-medium">Heure</Label>
                          <Input
                            type="time"
                            value={formData.scheduledTime}
                            onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                            className="bg-slate-700/50 border-gray-600/30 text-white h-10 rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Validation */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-white">Validation finale</h3>
                    <p className="text-gray-300">Vérifiez tous les paramètres avant de créer votre snapshot</p>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Basic Info */}
                    <div className="bg-slate-800/50 rounded-2xl p-4 border border-purple-400/20">
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                        <Settings className="w-5 h-5 text-purple-400" />
                        Informations générales
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Finalité:</span>
                          <span className="text-white font-medium">{getSelectedPurpose()?.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Nom:</span>
                          <span className="text-white font-medium">{formData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Collection:</span>
                          <span className="text-white font-medium">
                            {mockCollections.find(c => c.id === formData.collection)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Exécution:</span>
                          <span className="text-white font-medium">
                            {formData.autoExecute ? "Immédiate" : `${formData.scheduledDate} ${formData.scheduledTime}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Criteria */}
                    <div className="bg-slate-800/50 rounded-2xl p-4 border border-purple-400/20">
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                        <Filter className="w-5 h-5 text-purple-400" />
                        Critères de sélection
                      </h4>
                      <div className="space-y-3">
                        {formData.criteria.minTokens && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Tokens min:</span>
                            <span className="text-white font-medium">{formData.criteria.minTokens}</span>
                          </div>
                        )}
                        {formData.criteria.holdingPeriod && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Détention:</span>
                            <span className="text-white font-medium">{formData.criteria.holdingPeriod} jours</span>
                          </div>
                        )}
                        {formData.criteria.rarity && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Rareté min:</span>
                            <span className="text-white font-medium capitalize">{formData.criteria.rarity}</span>
                          </div>
                        )}
                        {(!formData.criteria.minTokens && !formData.criteria.holdingPeriod && !formData.criteria.rarity) && (
                          <div className="text-gray-400 text-center py-4">Aucun critère spécifique</div>
                        )}
                      </div>
                    </div>

                    {/* Airdrop Config */}
                    {formData.purpose === 'community_airdrop' && formData.airdropConfig.enabled && (
                      <div className="md:col-span-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-4 border border-green-400/30">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                          <Gift className="w-5 h-5 text-green-400" />
                          Configuration Airdrop
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{formData.airdropConfig.amount}</div>
                            <div className="text-gray-400 text-sm">
                              {formData.airdropConfig.type === 'uos' ? 'UOS par user' : 'UNIQs par user'}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{formData.airdropConfig.recipients}</div>
                            <div className="text-gray-400 text-sm">Bénéficiaires</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">
                              {parseInt(formData.airdropConfig.amount) * parseInt(formData.airdropConfig.recipients)}
                            </div>
                            <div className="text-gray-400 text-sm">Total à distribuer</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-400 capitalize">{formData.airdropConfig.distribution}</div>
                            <div className="text-gray-400 text-sm">Distribution</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Export Format */}
                  <div className="space-y-4">
                    <Label className="text-white text-lg font-bold">Format d'export</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: 'json', label: 'JSON', desc: 'Format API standard' },
                        { value: 'csv', label: 'CSV', desc: 'Compatible Excel' }
                      ].map((format) => (
                        <motion.button
                          key={format.value}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData(prev => ({ ...prev, exportFormat: format.value }))}
                          className={`p-4 rounded-xl border transition-all duration-300 ${
                            formData.exportFormat === format.value
                              ? 'border-purple-400/60 bg-purple-500/20'
                              : 'border-gray-600/30 bg-slate-700/30 hover:border-purple-400/40'
                          }`}
                        >
                          <div className="text-left">
                            <div className="font-bold text-white">{format.label}</div>
                            <div className="text-sm text-gray-400">{format.desc}</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Cost Estimation */}
                  <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                      <Coins className="w-5 h-5 text-blue-400" />
                      Estimation des coûts
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-400">10 UOS</div>
                        <div className="text-gray-400 text-sm">Frais de base</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-400">5 UOS</div>
                        <div className="text-gray-400 text-sm">Traitement</div>
                      </div>
                      {formData.airdropConfig.enabled && (
                        <div className="text-center">
                          <div className="text-xl font-bold text-blue-400">
                            {parseInt(formData.airdropConfig.recipients) * 0.5} UOS
                          </div>
                          <div className="text-gray-400 text-sm">Frais airdrop</div>
                        </div>
                      )}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {15 + (formData.airdropConfig.enabled ? parseInt(formData.airdropConfig.recipients) * 0.5 : 0)} UOS
                        </div>
                        <div className="text-gray-400 text-sm">Total estimé</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-purple-400/20">
                <div className="flex justify-between items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={step === 1 ? onClose : prevStep}
                    className="text-gray-300 hover:text-white hover:bg-slate-700/50 px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    {step === 1 ? '✕ Annuler' : '← Précédent'}
                  </Button>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="border-yellow-500/60 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 hover:text-yellow-200 px-6 py-3 rounded-xl transition-all duration-300"
                    >
                      💾 Sauvegarder brouillon
                    </Button>
                    
                    <Button
                      type={step === 3 ? 'submit' : 'button'}
                      onClick={step === 3 ? undefined : nextStep}
                      disabled={
                        (step === 1 && !formData.purpose) ||
                        (step === 2 && (!formData.name || !formData.collection))
                      }
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {step === 3 ? '✨ Créer le snapshot' : 'Suivant →'}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 