"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Wallet, Send, Copy, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/contexts/TranslationContext"

interface TransferUOSModalProps {
  isOpen: boolean
  onClose: () => void
  currentBalance: number
}

export function TransferUOSModal({ isOpen, onClose, currentBalance }: TransferUOSModalProps) {
  const { t } = useTranslation()
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form')
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    memo: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.recipient || !formData.amount) {
      setError('Veuillez remplir tous les champs requis')
      return
    }

    const amount = parseFloat(formData.amount)
    if (amount <= 0 || amount > currentBalance) {
      setError('Montant invalide')
      return
    }

    setStep('confirm')
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    
    // Simuler le transfert
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setStep('success')
  }

  const handleClose = () => {
    setStep('form')
    setFormData({ recipient: '', amount: '', memo: '' })
    setError('')
    onClose()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl w-full max-w-xl mx-4 max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/20 rounded-xl p-2">
                    <Wallet className="h-5 w-5 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Transférer UOS</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                {step === 'form' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Solde actuel */}
                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-purple-500/20">
                      <p className="text-sm text-gray-400 mb-1">Solde disponible</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">{currentBalance.toLocaleString()} UOS</p>
                    </div>

                    {/* Destinataire */}
                    <div className="space-y-2">
                      <Label className="text-gray-300 text-sm">Adresse du destinataire</Label>
                      <Input
                        type="text"
                        value={formData.recipient}
                        onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                        placeholder="ultra.x.wallet ou adresse wallet"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 text-sm"
                        required
                      />
                    </div>

                    {/* Montant */}
                    <div className="space-y-2">
                      <Label className="text-gray-300 text-sm">Montant à transférer</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.01"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                          placeholder="0.00"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 pr-12 text-sm"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">UOS</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setFormData({ ...formData, amount: (currentBalance * 0.25).toString() })}
                          className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 text-xs"
                        >
                          25%
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setFormData({ ...formData, amount: (currentBalance * 0.5).toString() })}
                          className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 text-xs"
                        >
                          50%
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setFormData({ ...formData, amount: (currentBalance * 0.75).toString() })}
                          className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 text-xs"
                        >
                          75%
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setFormData({ ...formData, amount: currentBalance.toString() })}
                          className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 text-xs"
                        >
                          Max
                        </Button>
                      </div>
                    </div>

                    {/* Mémo (optionnel) */}
                    <div className="space-y-2">
                      <Label className="text-gray-300 text-sm">Mémo (optionnel)</Label>
                      <Input
                        type="text"
                        value={formData.memo}
                        onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                        placeholder="Note pour le destinataire"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 text-sm"
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <span className="text-red-400 text-sm">{error}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      Continuer
                    </Button>
                  </form>
                )}

                {step === 'confirm' && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-white mb-2">Confirmer le transfert</h3>
                      <p className="text-gray-400 text-sm">Vérifiez les détails avant de confirmer</p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-gray-400 text-sm">Destinataire:</span>
                          <div className="flex items-center gap-2 max-w-[60%]">
                            <span className="text-white font-mono text-sm break-all">{formData.recipient}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(formData.recipient)}
                              className="h-6 w-6 p-0 flex-shrink-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Montant:</span>
                          <span className="text-white font-semibold">{formData.amount} UOS</span>
                        </div>
                        {formData.memo && (
                          <div className="flex justify-between items-start">
                            <span className="text-gray-400 text-sm">Mémo:</span>
                            <span className="text-white text-sm text-right max-w-[60%]">{formData.memo}</span>
                          </div>
                        )}
                        <div className="border-t border-white/10 pt-3 flex justify-between">
                          <span className="text-gray-400 text-sm">Nouveau solde:</span>
                          <span className="text-white font-semibold">
                            {(currentBalance - parseFloat(formData.amount)).toLocaleString()} UOS
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setStep('form')}
                        className="flex-1 bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
                      >
                        Retour
                      </Button>
                      <Button
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm">Transfert...</span>
                          </div>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            <span>Confirmer</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {step === 'success' && (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Transfert réussi !</h3>
                      <p className="text-gray-400 text-sm">
                        {formData.amount} UOS ont été transférés avec succès
                      </p>
                    </div>
                    <Button
                      onClick={handleClose}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      Fermer
                    </Button>
                  </div>
                )}
              </div>
            </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 