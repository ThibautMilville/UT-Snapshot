"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "@/lib/motion"
import { X, Plus, Calendar, Clock, Users, Settings, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

export function CreateSnapshotModal({ isOpen, onClose, duplicateData }: CreateSnapshotModalProps) {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: duplicateData ? `Copie de ${duplicateData.name}` : "",
    description: duplicateData ? duplicateData.description : "",
    collection: duplicateData ? duplicateData.collection : "",
    scheduledDate: "",
    scheduledTime: "",
    conditions: "",
    exportFormat: "json"
  })

  // Effet pour mettre à jour le formulaire quand duplicateData change
  useEffect(() => {
    if (duplicateData) {
      setFormData({
        name: `Copie de ${duplicateData.name}`,
        description: duplicateData.description,
        collection: duplicateData.collection,
        scheduledDate: "",
        scheduledTime: "",
        conditions: "",
        exportFormat: "json"
      })
    } else {
      setFormData({
        name: "",
        description: "",
        collection: "",
        scheduledDate: "",
        scheduledTime: "",
        conditions: "",
        exportFormat: "json"
      })
    }
  }, [duplicateData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique de création du snapshot
    console.log("Creating snapshot:", formData)
    onClose()
    // Reset form
    setFormData({
      name: "",
      description: "",
      collection: "",
      scheduledDate: "",
      scheduledTime: "",
      conditions: "",
      exportFormat: "json"
    })
    setStep(1)
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1A1A2E] to-[#16213E] backdrop-blur-3xl border border-purple-500/30 rounded-3xl shadow-2xl scrollbar-thin scrollbar-track-gray-800/20 scrollbar-thumb-purple-500/40 hover:scrollbar-thumb-purple-500/60"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(139, 69, 255, 0.4) rgba(0, 0, 0, 0.2)'
            }}
          >
            {/* Fond animé avec effets de glow multiples */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,69,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 rounded-3xl blur-xl opacity-50 animate-pulse" />
            {/* Header Ultra-Moderne */}
            <div className="relative p-8 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent mb-2">
                      {duplicateData ? "Dupliquer un Snapshot" : "Créer un Snapshot"}
                    </h2>
                    <p className="text-gray-300 text-lg flex items-center gap-3">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                        Étape {step}/3
                      </span>
                      {step === 1 && "Configuration de base"}
                      {step === 2 && "Planification avancée"}
                      {step === 3 && "Révision et validation"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white hover:bg-purple-500/20 hover:border-purple-400/50 rounded-2xl h-12 w-12 p-0 border border-transparent transition-all duration-300"
                >
                  <X size={24} />
                </Button>
              </div>
              
              {duplicateData && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl"
                >
                  <p className="text-blue-300 text-sm flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Duplication basée sur "{duplicateData.name}"
                  </p>
                </motion.div>
              )}
            </div>

            {/* Barre de Progression Ultra-Moderne */}
            <div className="relative px-8 py-8 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5">
              <div className="flex items-center justify-between relative">
                {/* Ligne de progression de fond */}
                <div className="absolute top-1/2 left-16 right-16 h-1 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-full -translate-y-1/2" />
                
                {[
                  { step: 1, title: "Configuration", subtitle: "Détails de base", icon: Settings },
                  { step: 2, title: "Planification", subtitle: "Date & heure", icon: Calendar },
                  { step: 3, title: "Validation", subtitle: "Révision finale", icon: Clock }
                ].map((item, index) => (
                  <div key={item.step} className="flex flex-col items-center relative z-10 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A2E] px-6 py-4 rounded-2xl">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ 
                        scale: item.step <= step ? 1.1 : 0.9,
                        rotateY: item.step <= step ? 0 : 180
                      }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg relative ${
                        item.step <= step
                          ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 text-white shadow-purple-500/40 ring-4 ring-purple-500/30'
                          : 'bg-gradient-to-br from-gray-700 to-gray-600 text-gray-400 shadow-gray-700/20'
                      }`}
                    >
                      <item.icon size={24} className={item.step <= step ? "drop-shadow-lg" : ""} />
                      {item.step <= step && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl animate-pulse" />
                      )}
                    </motion.div>
                    
                    <div className="mt-4 text-center">
                      <h4 className={`text-sm font-bold transition-colors duration-300 ${
                        item.step <= step ? 'text-white' : 'text-gray-500'
                      }`}>
                        {item.title}
                      </h4>
                      <p className={`text-xs mt-1 transition-colors duration-300 ${
                        item.step <= step ? 'text-purple-300' : 'text-gray-600'
                      }`}>
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Ligne de progression active */}
                    {index < 2 && item.step < step && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        className="absolute top-1/2 left-20 w-40 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full -translate-y-1/2 shadow-lg shadow-purple-500/30"
                        style={{ left: `calc(100% + 2rem)`, width: "10rem" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Formulaire Ultra-Moderne */}
            <form onSubmit={handleSubmit} className="relative p-8 overflow-x-hidden">
              {/* Étape 1: Configuration de Base */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Nom du snapshot */}
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-white text-lg font-bold flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      Nom du snapshot *
                    </Label>
                    <div className="relative group">
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ex: Ultra Heroes Snapshot Janvier 2024"
                        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 hover:border-purple-400/60 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 text-white placeholder:text-gray-400 h-14 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/10 pl-6"
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <Label htmlFor="description" className="text-white text-lg font-bold flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Settings className="w-4 h-4 text-white" />
                      </div>
                      Description détaillée
                    </Label>
                    <div className="relative group">
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder={t('snapshots.modal.description')}
                        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 hover:border-purple-400/60 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 text-white placeholder:text-gray-400 min-h-[140px] rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/10 p-6 resize-none"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    <p className="text-gray-400 text-sm flex items-center gap-2 mt-2">
                      <Clock className="w-4 h-4" />
                      Ajoutez des détails pour faciliter l'identification et l'utilisation future
                    </p>
                  </div>

                  {/* Collection */}
                  <div className="space-y-3">
                    <Label htmlFor="collection" className="text-white text-lg font-bold flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Plus className="w-4 h-4 text-white" />
                      </div>
                      Collection ou Contrat Ultra *
                    </Label>
                    <div className="relative group">
                      <Input
                        id="collection"
                        value={formData.collection}
                        onChange={(e) => setFormData(prev => ({ ...prev, collection: e.target.value }))}
                        placeholder="Ex: ultra-heroes-nft, Ultra Gaming Tokens, ou 0x1234567890abcdef..."
                        className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 hover:border-green-400/60 focus:border-green-400 focus:ring-4 focus:ring-green-500/20 text-white placeholder:text-gray-400 h-14 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-green-500/10 pl-6"
                        required
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 mt-3">
                      <p className="text-green-300 text-sm flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        <strong>Formats acceptés :</strong> Nom de collection, adresse de contrat ERC-721/ERC-1155, ou identifiant Ultra
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Étape 2: Planification Avancée */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Options de planification */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="scheduledDate" className="text-white text-lg font-bold flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        Date de planification
                      </Label>
                      <div className="relative group">
                        <Input
                          id="scheduledDate"
                          type="date"
                          value={formData.scheduledDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 hover:border-purple-400/70 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 text-white h-14 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-purple-500/10 pl-6 [color-scheme:dark]"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="scheduledTime" className="text-white text-lg font-bold flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        Heure d'exécution
                      </Label>
                      <div className="relative group">
                        <Input
                          id="scheduledTime"
                          type="time"
                          value={formData.scheduledTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                          className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/50 hover:border-blue-400/70 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 text-white h-14 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-500/10 pl-6 [color-scheme:dark]"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Info box pour planification */}
                  <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-4">
                    <p className="text-orange-300 text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <strong>Note :</strong> Laissez vides pour une exécution immédiate. Le snapshot sera automatiquement traité selon la planification.
                    </p>
                  </div>

                  {/* Critères et conditions */}
                  <div className="space-y-3">
                    <Label htmlFor="conditions" className="text-white text-lg font-bold flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Settings className="w-4 h-4 text-white" />
                      </div>
                      Critères et Conditions Avancées
                    </Label>
                    <div className="relative group">
                      <Textarea
                        id="conditions"
                        value={formData.conditions}
                        onChange={(e) => setFormData(prev => ({ ...prev, conditions: e.target.value }))}
                        placeholder="Définissez des critères spécifiques : montant minimum de tokens, période de détention, activité sur la blockchain, filtres par attributs NFT, etc..."
                        className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50 hover:border-green-400/70 focus:border-green-400 focus:ring-4 focus:ring-green-500/20 text-white placeholder:text-gray-300 min-h-[140px] rounded-2xl text-base transition-all duration-300 resize-none shadow-lg hover:shadow-green-500/10 p-6"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    <p className="text-gray-400 text-sm flex items-center gap-2 mt-2">
                      <Settings className="w-4 h-4" />
                      Exemples : "minimum 100 tokens", "détention plus de 30 jours", "NFT avec rareté Epic+"
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Étape 3: Validation et Export */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Format d'export */}
                  <div className="space-y-4">
                    <Label className="text-white text-lg font-bold flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Settings className="w-4 h-4 text-white" />
                      </div>
                      Format d'Export
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { value: 'json', label: 'JSON', desc: 'Format standard pour APIs', icon: '{}' },
                        { value: 'csv', label: 'CSV', desc: 'Compatible Excel/Google Sheets', icon: '📊' }
                      ].map((format) => (
                        <motion.div
                          key={format.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData(prev => ({ ...prev, exportFormat: format.value }))}
                          className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                            formData.exportFormat === format.value
                              ? 'border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-lg shadow-purple-500/20'
                              : 'border-gray-600/30 bg-gradient-to-br from-white/5 to-white/2 hover:border-purple-500/30 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-pink-500/10'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{format.icon}</span>
                            <div className="font-bold text-white text-lg">{format.label}</div>
                          </div>
                          <div className="text-sm text-gray-300">{format.desc}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Résumé de configuration */}
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm">
                    <h4 className="font-bold text-white text-xl mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      Résumé de Configuration
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                          <span className="text-gray-300 font-medium">Nom du snapshot:</span>
                          <span className="text-white font-semibold">{formData.name || 'Non défini'}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                          <span className="text-gray-300 font-medium">Collection:</span>
                          <span className="text-white font-semibold">{formData.collection || 'Non définie'}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                          <span className="text-gray-300 font-medium">Planification:</span>
                          <span className="text-white font-semibold">
                            {formData.scheduledDate && formData.scheduledTime 
                              ? `${formData.scheduledDate} à ${formData.scheduledTime}`
                              : 'Exécution immédiate'
                            }
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                          <span className="text-gray-300 font-medium">Format export:</span>
                          <span className="text-white font-semibold">{formData.exportFormat.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {formData.conditions && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
                        <div className="text-gray-300 font-medium mb-2">Conditions personnalisées:</div>
                        <div className="text-white text-sm bg-black/20 p-3 rounded-lg">{formData.conditions}</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Actions Ultra-Modernes */}
              <div className="mt-12 pt-8 border-t border-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={step === 1 ? onClose : prevStep}
                      className="text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-gray-700/70 hover:to-gray-600/70 px-8 py-4 rounded-2xl transition-all duration-300 border border-gray-500/50 hover:border-gray-400/70 font-medium text-lg bg-gray-800/30"
                    >
                      {step === 1 ? '✕ Annuler' : '← Étape précédente'}
                    </Button>
                  </motion.div>

                  <div className="flex gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="border-yellow-500/60 bg-gradient-to-r from-yellow-700/70 to-orange-700/70 hover:from-yellow-600/80 hover:to-orange-600/80 text-yellow-100 hover:text-white px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/30"
                      >
                        💾 {t('snapshots.modal.button.draft')}
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type={step === 3 ? 'submit' : 'button'}
                        onClick={step === 3 ? undefined : nextStep}
                        disabled={step === 1 && (!formData.name || !formData.collection)}
                        className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center gap-2">
                          {step === 3 ? (
                            <>✨ Créer le snapshot</>
                          ) : (
                            <>Étape suivante →</>
                          )}
                        </span>
                      </Button>
                    </motion.div>
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