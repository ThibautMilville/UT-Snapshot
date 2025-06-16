"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CreditCard, Shield, CheckCircle, AlertCircle, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/contexts/TranslationContext"

interface PurchaseUOSModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PurchaseUOSModal({ isOpen, onClose }: PurchaseUOSModalProps) {
  const { t } = useTranslation()
  const [step, setStep] = useState<'amount' | 'payment' | 'processing' | 'success'>('amount')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    email: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const predefinedAmounts = [
    { uos: 100, price: 5 },
    { uos: 500, price: 22.5 },
    { uos: 1000, price: 42 },
    { uos: 2500, price: 100 },
    { uos: 5000, price: 190 },
    { uos: 10000, price: 350 }
  ]

  const exchangeRate = 0.045 // 1 UOS = 0.045 EUR

  const getSelectedUOSAmount = () => {
    if (selectedAmount) return selectedAmount
    if (customAmount) return parseInt(customAmount)
    return 0
  }

  const getPrice = () => {
    const amount = getSelectedUOSAmount()
    return (amount * exchangeRate).toFixed(2)
  }

  const handleAmountNext = () => {
    if (getSelectedUOSAmount() <= 0) {
      setError('Veuillez sélectionner un montant')
      return
    }
    setError('')
    setStep('payment')
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv || !paymentData.name || !paymentData.email) {
      setError('Veuillez remplir tous les champs')
      return
    }

    setStep('processing')
    setIsLoading(true)

    // Simuler le paiement
    await new Promise(resolve => setTimeout(resolve, 3000))

    setIsLoading(false)
    setStep('success')
  }

  const handleClose = () => {
    setStep('amount')
    setSelectedAmount(null)
    setCustomAmount('')
    setPaymentData({ cardNumber: '', expiry: '', cvv: '', name: '', email: '' })
    setError('')
    onClose()
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
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
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/20 rounded-xl p-2">
                    <CreditCard className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Acheter UOS</h2>
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
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {step === 'amount' && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-white mb-2">Choisir le montant</h3>
                      <p className="text-gray-400">1 UOS = {exchangeRate}€</p>
                    </div>

                    {/* Montants prédéfinis */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {predefinedAmounts.map((amount) => (
                        <button
                          key={amount.uos}
                          onClick={() => {
                            setSelectedAmount(amount.uos)
                            setCustomAmount('')
                          }}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            selectedAmount === amount.uos
                              ? 'bg-green-500/20 border-green-500/50 text-green-400'
                              : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                          }`}
                        >
                          <div className="text-lg font-bold">{amount.uos} UOS</div>
                          <div className="text-sm text-gray-400">{amount.price}€</div>
                        </button>
                      ))}
                    </div>

                    {/* Montant personnalisé */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">Montant personnalisé</Label>
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Input
                            type="number"
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value)
                              setSelectedAmount(null)
                            }}
                            placeholder="1000"
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 pr-12"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">UOS</span>
                        </div>
                        <div className="flex items-center justify-center min-w-[80px] bg-white/5 border border-white/10 rounded-lg px-3">
                          <span className="text-white font-semibold">
                            {customAmount ? (parseInt(customAmount) * exchangeRate).toFixed(2) : '0.00'}€
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Récapitulatif */}
                    {getSelectedUOSAmount() > 0 && (
                      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-white font-semibold">{getSelectedUOSAmount()} UOS</p>
                            <p className="text-sm text-gray-400">Montant à recevoir</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold text-xl">{getPrice()}€</p>
                            <p className="text-sm text-gray-400">Prix total</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <span className="text-red-400 text-sm">{error}</span>
                      </div>
                    )}

                    <Button
                      onClick={handleAmountNext}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    >
                      Continuer
                    </Button>
                  </div>
                )}

                {step === 'payment' && (
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">Informations de paiement</h3>
                      <div className="bg-white/5 rounded-lg p-3">
                        <span className="text-white font-semibold">{getSelectedUOSAmount()} UOS</span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-green-400 font-bold">{getPrice()}€</span>
                      </div>
                    </div>

                    {/* Numéro de carte */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">Numéro de carte</Label>
                      <Input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: formatCardNumber(e.target.value) })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        required
                      />
                    </div>

                    {/* Expiration et CVV */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Expiration</Label>
                        <Input
                          type="text"
                          value={paymentData.expiry}
                          onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                          placeholder="MM/AA"
                          maxLength={5}
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-300">CVV</Label>
                        <Input
                          type="text"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                          placeholder="123"
                          maxLength={3}
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Nom sur la carte */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">Nom sur la carte</Label>
                      <Input
                        type="text"
                        value={paymentData.name}
                        onChange={(e) => setPaymentData({ ...paymentData, name: e.target.value })}
                        placeholder="Jean Dupont"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">Email</Label>
                      <Input
                        type="email"
                        value={paymentData.email}
                        onChange={(e) => setPaymentData({ ...paymentData, email: e.target.value })}
                        placeholder="jean@example.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        required
                      />
                    </div>

                    {/* Sécurité */}
                    <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <Shield className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400 text-sm">Paiement sécurisé par SSL</span>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <span className="text-red-400 text-sm">{error}</span>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep('amount')}
                        className="flex-1 bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
                      >
                        Retour
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                      >
                        Payer {getPrice()}€
                      </Button>
                    </div>
                  </form>
                )}

                {step === 'processing' && (
                  <div className="text-center space-y-6 py-8">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                      <div className="h-8 w-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Traitement du paiement</h3>
                      <p className="text-gray-400">Veuillez patienter pendant que nous traitons votre commande...</p>
                    </div>
                  </div>
                )}

                {step === 'success' && (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Achat réussi !</h3>
                      <p className="text-gray-400 mb-4">
                        {getSelectedUOSAmount()} UOS ont été ajoutés à votre compte
                      </p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Coins className="h-5 w-5 text-green-400" />
                          <span className="text-green-400 font-semibold">+{getSelectedUOSAmount()} UOS</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handleClose}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
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