"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "@/lib/motion"
import { X, Plus, Calendar, Clock, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from "@/contexts/TranslationContext"

interface CreateSnapshotModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateSnapshotModal({ isOpen, onClose }: CreateSnapshotModalProps) {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    collection: "",
    scheduledDate: "",
    scheduledTime: "",
    conditions: "",
    exportFormat: "json"
  })

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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl mx-4 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {t('snapshots.create')}
                </h2>
                <p className="text-gray-400 mt-1">Étape {step} sur 3</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        i <= step
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-gray-700 text-gray-400'
                      }`}
                    >
                      {i}
                    </div>
                    {i < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded ${
                          i < step ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-700'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">
                      Nom du snapshot *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Mon snapshot Ultra"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white mb-2 block">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Description de votre snapshot..."
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="collection" className="text-white mb-2 block">
                      Collection Ultra *
                    </Label>
                    <Input
                      id="collection"
                      value={formData.collection}
                      onChange={(e) => setFormData(prev => ({ ...prev, collection: e.target.value }))}
                      placeholder="Nom ou ID de la collection"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Scheduling */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="scheduledDate" className="text-white mb-2 block">
                        <Calendar size={16} className="inline mr-2" />
                        Date de planification
                      </Label>
                      <Input
                        id="scheduledDate"
                        type="date"
                        value={formData.scheduledDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="scheduledTime" className="text-white mb-2 block">
                        <Clock size={16} className="inline mr-2" />
                        Heure
                      </Label>
                      <Input
                        id="scheduledTime"
                        type="time"
                        value={formData.scheduledTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="conditions" className="text-white mb-2 block">
                      <Settings size={16} className="inline mr-2" />
                      Conditions personnalisées
                    </Label>
                    <Textarea
                      id="conditions"
                      value={formData.conditions}
                      onChange={(e) => setFormData(prev => ({ ...prev, conditions: e.target.value }))}
                      placeholder="Conditions spéciales pour le snapshot (optionnel)..."
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[120px]"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Export Options */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <Label className="text-white mb-4 block">Format d'export</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: 'json', label: 'JSON', desc: 'Format standard' },
                        { value: 'csv', label: 'CSV', desc: 'Pour Excel/Sheets' }
                      ].map((format) => (
                        <div
                          key={format.value}
                          onClick={() => setFormData(prev => ({ ...prev, exportFormat: format.value }))}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            formData.exportFormat === format.value
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="font-semibold text-white">{format.label}</div>
                          <div className="text-sm text-gray-400">{format.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="font-semibold text-white mb-3">Résumé</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Nom:</span>
                        <span className="text-white">{formData.name || 'Non défini'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Collection:</span>
                        <span className="text-white">{formData.collection || 'Non définie'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Planification:</span>
                        <span className="text-white">
                          {formData.scheduledDate && formData.scheduledTime 
                            ? `${formData.scheduledDate} à ${formData.scheduledTime}`
                            : 'Immédiat'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Format:</span>
                        <span className="text-white">{formData.exportFormat.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={step === 1 ? onClose : prevStep}
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  {step === 1 ? 'Annuler' : 'Précédent'}
                </Button>

                <Button
                  type={step === 3 ? 'submit' : 'button'}
                  onClick={step === 3 ? undefined : nextStep}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6"
                >
                  {step === 3 ? 'Créer le snapshot' : 'Suivant'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 