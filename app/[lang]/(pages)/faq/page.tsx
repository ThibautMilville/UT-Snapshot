"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "@/lib/motion"
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageCircle, Mail, Phone } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PageLayout } from "@/components/layout/PageLayout"
import { useTranslation } from "@/contexts/TranslationContext"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "Qu'est-ce qu'UT-Snapshot ?",
    answer: "UT-Snapshot est une plateforme d'automatisation qui permet aux créateurs de NFT sur Ultra de créer des snapshots automatisés de leurs collections et de gérer des airdrops de manière efficace.",
    category: "Général",
    tags: ["snapshot", "automatisation", "ultra"]
  },
  {
    id: "2",
    question: "Comment créer mon premier snapshot ?",
    answer: "Pour créer votre premier snapshot, connectez votre wallet Ultra, cliquez sur 'Créer un Snapshot', sélectionnez votre collection, configurez les paramètres (fréquence, actions) et confirmez. Le coût sera calculé automatiquement.",
    category: "Utilisation",
    tags: ["création", "snapshot", "tutoriel"]
  },
  {
    id: "3",
    question: "Quels sont les coûts des snapshots ?",
    answer: "Le coût de base est de 30 UOS par snapshot. Des frais supplémentaires s'appliquent : +20 UOS pour l'export CSV, +50 UOS pour l'airdrop UNIQ, +30 UOS pour l'airdrop UOS. Des tarifs dégressifs sont disponibles pour les gros volumes.",
    category: "Tarification",
    tags: ["coût", "prix", "uos", "tarification"]
  },
  {
    id: "4",
    question: "Comment fonctionne l'automatisation ?",
    answer: "Vous pouvez programmer vos snapshots pour qu'ils s'exécutent automatiquement selon une fréquence définie (quotidienne, hebdomadaire, mensuelle). Le système vérifiera automatiquement les conditions et exécutera les actions configurées.",
    category: "Automatisation",
    tags: ["automatisation", "fréquence", "programmation"]
  },
  {
    id: "5",
    question: "Puis-je filtrer les holders dans mes snapshots ?",
    answer: "Oui, vous pouvez appliquer des filtres avancés : montant minimum/maximum de tokens, date d'acquisition, statut du holder, et même des conditions personnalisées basées sur d'autres collections.",
    category: "Filtres",
    tags: ["filtres", "holders", "conditions"]
  },
  {
    id: "6",
    question: "Comment sont distribués les airdrops ?",
    answer: "Les airdrops sont distribués automatiquement selon vos paramètres. Pour les UNIQ, ils sont envoyés directement aux wallets. Pour les UOS, ils sont crédités instantanément. Vous recevez un rapport détaillé après chaque distribution.",
    category: "Airdrops",
    tags: ["airdrop", "distribution", "uniq", "uos"]
  },
  {
    id: "7",
    question: "Que faire si mon snapshot échoue ?",
    answer: "En cas d'échec, vous recevez une notification avec les détails de l'erreur. Les causes communes sont : solde UOS insuffisant, collection inaccessible, ou paramètres invalides. Vous pouvez relancer le snapshot après correction.",
    category: "Dépannage",
    tags: ["erreur", "échec", "dépannage", "support"]
  },
  {
    id: "8",
    question: "Comment consulter l'historique de mes snapshots ?",
    answer: "Rendez-vous dans la section 'Historique' de votre dashboard. Vous y trouverez tous vos snapshots passés avec leur statut, les données collectées, et les actions effectuées. Vous pouvez filtrer par date, collection ou statut.",
    category: "Historique",
    tags: ["historique", "dashboard", "consultation"]
  }
]

const categories = ["Tous", "Général", "Utilisation", "Tarification", "Automatisation", "Filtres", "Airdrops", "Dépannage", "Historique"]

export default function FAQPage() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [openItems, setOpenItems] = useState<string[]>([])

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === "Tous" || item.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <HelpCircle className="h-16 w-16 text-purple-400 mx-auto mb-6" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  {t('page.faq.title')}
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  {t('page.faq.subtitle')}
                </p>
              </motion.div>
            </div>

            {/* Recherche et filtres */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Barre de recherche */}
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher dans la FAQ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 hover:border-purple-400/30 focus:border-purple-400/50 text-white placeholder:text-gray-400"
                      />
                    </div>

                    {/* Filtres par catégorie */}
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className={
                            selectedCategory === category
                              ? "bg-purple-600 hover:bg-purple-700 text-white"
                              : "border-white/20 text-gray-300 hover:bg-white/10 hover:text-white"
                          }
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Liste des FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 mb-12"
            >
              {filteredFAQ.length > 0 ? (
                filteredFAQ.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300">
                      <CardHeader
                        className="cursor-pointer"
                        onClick={() => toggleItem(item.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-white text-lg">{item.question}</CardTitle>
                              <Badge variant="outline" className="border-purple-400/30 text-purple-400">
                                {item.category}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            {openItems.includes(item.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      <AnimatePresence>
                        {openItems.includes(item.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0">
                              <div className="border-t border-white/10 pt-4">
                                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                  <CardContent className="p-12 text-center">
                    <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Aucun résultat trouvé</h3>
                    <p className="text-gray-400">
                      Essayez de modifier vos termes de recherche ou de changer de catégorie.
                    </p>
                  </CardContent>
                </Card>
              )}
            </motion.div>

            {/* Section contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-2xl mb-2">Besoin d'aide supplémentaire ?</CardTitle>
                  <CardDescription className="text-gray-400">
                    Notre équipe est là pour vous aider
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-white/5 rounded-lg">
                      <MessageCircle className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                      <h4 className="text-white font-semibold mb-2">Chat en direct</h4>
                      <p className="text-gray-400 text-sm mb-4">Disponible 24h/24, 7j/7</p>
                      <Button variant="outline" size="sm" className="border-blue-400/30 text-blue-400 hover:bg-blue-400/10">
                        Démarrer le chat
                      </Button>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-lg">
                      <Mail className="h-8 w-8 text-green-400 mx-auto mb-3" />
                      <h4 className="text-white font-semibold mb-2">Email</h4>
                      <p className="text-gray-400 text-sm mb-4">Réponse sous 24h</p>
                      <Button variant="outline" size="sm" className="border-green-400/30 text-green-400 hover:bg-green-400/10">
                        Envoyer un email
                      </Button>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-lg">
                      <Phone className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                      <h4 className="text-white font-semibold mb-2">Téléphone</h4>
                      <p className="text-gray-400 text-sm mb-4">Lun-Ven 9h-18h</p>
                      <Button variant="outline" size="sm" className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10">
                        Appeler
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
} 