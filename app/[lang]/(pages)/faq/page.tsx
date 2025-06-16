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
  // Général
  {
    id: "1",
    question: "Qu'est-ce qu'UT-Snapshot ?",
    answer: "UT-Snapshot est une plateforme d'automatisation qui permet aux créateurs de NFT sur Ultra de créer des snapshots automatisés de leurs collections et de gérer des airdrops de manière efficace.",
    category: "Général",
    tags: ["snapshot", "automatisation", "ultra"]
  },
  {
    id: "2",
    question: "Pourquoi utiliser UT-Snapshot plutôt que des solutions manuelles ?",
    answer: "UT-Snapshot vous fait économiser des heures de travail manuel, réduit les erreurs humaines, et offre des fonctionnalités avancées comme les snapshots programmés, les filtres intelligents et l'automatisation complète des airdrops.",
    category: "Général",
    tags: ["avantages", "automatisation", "efficacité"]
  },
  {
    id: "3",
    question: "UT-Snapshot est-il compatible avec toutes les collections Ultra ?",
    answer: "Oui, UT-Snapshot est compatible avec toutes les collections UNIQ sur la blockchain Ultra, qu'elles soient publiques ou privées. Il supporte également les tokens ERC-721 bridgés.",
    category: "Général",
    tags: ["compatibilité", "collections", "uniq"]
  },
  {
    id: "4",
    question: "Mes données sont-elles sécurisées ?",
    answer: "Absolument. Nous utilisons un chiffrement de niveau bancaire, des connexions sécurisées, et nous ne stockons jamais vos clés privées. Toutes les données sont hébergées sur des serveurs certifiés SOC2.",
    category: "Général",
    tags: ["sécurité", "confidentialité", "chiffrement"]
  },
  
  // Utilisation
  {
    id: "5",
    question: "Comment créer mon premier snapshot ?",
    answer: "Connectez votre wallet Ultra, cliquez sur 'Créer un Snapshot', sélectionnez votre collection, configurez les paramètres (fréquence, actions) et confirmez. Le coût sera calculé automatiquement.",
    category: "Utilisation",
    tags: ["création", "snapshot", "tutoriel"]
  },
  {
    id: "6",
    question: "Puis-je créer plusieurs snapshots simultanément ?",
    answer: "Oui, vous pouvez créer autant de snapshots que vous le souhaitez. Chaque snapshot fonctionne indépendamment et peut avoir sa propre configuration et planification.",
    category: "Utilisation",
    tags: ["multiple", "simultané", "gestion"]
  },
  {
    id: "7",
    question: "Comment modifier un snapshot existant ?",
    answer: "Accédez à votre dashboard, sélectionnez le snapshot à modifier, puis cliquez sur 'Modifier'. Vous pouvez changer tous les paramètres sauf la collection source.",
    category: "Utilisation",
    tags: ["modification", "édition", "paramètres"]
  },
  {
    id: "8",
    question: "Puis-je suspendre temporairement un snapshot ?",
    answer: "Oui, vous pouvez mettre en pause n'importe quel snapshot depuis votre dashboard. La pause prend effet immédiatement et vous pouvez le réactiver quand vous le souhaitez.",
    category: "Utilisation",
    tags: ["pause", "suspension", "contrôle"]
  },
  {
    id: "9",
    question: "Comment exporter les données de mes snapshots ?",
    answer: "Chaque snapshot peut être exporté en format JSON ou CSV. Cliquez sur le bouton 'Télécharger' dans les détails du snapshot pour obtenir le fichier.",
    category: "Utilisation",
    tags: ["export", "csv", "json", "téléchargement"]
  },
  
  // Tarification
  {
    id: "10",
    question: "Quels sont les coûts des snapshots ?",
    answer: "Le coût de base est de 30 UOS par snapshot. Des frais supplémentaires s'appliquent : +20 UOS pour l'export CSV, +50 UOS pour l'airdrop UNIQ, +30 UOS pour l'airdrop UOS.",
    category: "Tarification",
    tags: ["coût", "prix", "uos", "tarification"]
  },
  {
    id: "11",
    question: "Y a-t-il des tarifs dégressifs pour les gros volumes ?",
    answer: "Oui ! À partir de 100 snapshots par mois : -20%, à partir de 500 : -35%, à partir de 1000 : -50%. Les entreprises peuvent bénéficier de tarifs négociés.",
    category: "Tarification",
    tags: ["volume", "réduction", "entreprise"]
  },
  {
    id: "12",
    question: "Comment sont facturés les snapshots programmés ?",
    answer: "Chaque exécution de snapshot programmé est facturée individuellement. Si un snapshot s'exécute quotidiennement, vous payez 30 UOS par jour d'exécution.",
    category: "Tarification",
    tags: ["programmation", "facturation", "récurrent"]
  },
  {
    id: "13",
    question: "Puis-je obtenir un remboursement si un snapshot échoue ?",
    answer: "Oui, si l'échec est dû à un problème de notre côté, vous êtes automatiquement remboursé. Si c'est dû à une erreur de configuration, nous proposons un crédit de 50%.",
    category: "Tarification",
    tags: ["remboursement", "échec", "crédit"]
  },
  {
    id: "14",
    question: "Acceptez-vous d'autres cryptomonnaies que UOS ?",
    answer: "Actuellement, nous acceptons uniquement UOS pour rester natifs à l'écosystème Ultra. Le support d'autres cryptos est prévu pour 2024.",
    category: "Tarification",
    tags: ["paiement", "cryptomonnaies", "uos"]
  },
  
  // Automatisation
  {
    id: "15",
    question: "Comment fonctionne l'automatisation ?",
    answer: "Programmez vos snapshots pour qu'ils s'exécutent automatiquement selon une fréquence définie. Le système vérifiera les conditions et exécutera les actions configurées.",
    category: "Automatisation",
    tags: ["automatisation", "fréquence", "programmation"]
  },
  {
    id: "16",
    question: "Puis-je programmer des snapshots pour des dates spécifiques ?",
    answer: "Oui, vous pouvez programmer des snapshots pour des dates et heures précises, ou définir une récurrence (quotidienne, hebdomadaire, mensuelle, ou personnalisée).",
    category: "Automatisation",
    tags: ["planification", "dates", "récurrence"]
  },
  {
    id: "17",
    question: "Comment sont gérées les erreurs dans les snapshots automatisés ?",
    answer: "En cas d'erreur, le système réessaie automatiquement 3 fois avec un délai croissant. Si l'échec persiste, vous recevez une notification avec les détails.",
    category: "Automatisation",
    tags: ["erreurs", "retry", "notifications"]
  },
  {
    id: "18",
    question: "Puis-je définir des conditions pour déclencher un snapshot ?",
    answer: "Oui, vous pouvez définir des conditions basées sur le nombre de holders, la valeur de floor price, ou des événements blockchain spécifiques.",
    category: "Automatisation",
    tags: ["conditions", "triggers", "événements"]
  },
  
  // Filtres
  {
    id: "19",
    question: "Puis-je filtrer les holders dans mes snapshots ?",
    answer: "Oui, appliquez des filtres avancés : montant minimum/maximum de tokens, date d'acquisition, statut du holder, et conditions personnalisées basées sur d'autres collections.",
    category: "Filtres",
    tags: ["filtres", "holders", "conditions"]
  },
  {
    id: "20",
    question: "Comment exclure certains wallets de mes snapshots ?",
    answer: "Dans les paramètres avancés, vous pouvez ajouter une liste noire de wallets à exclure. Utile pour exclure les bots, les exchanges, ou des wallets spécifiques.",
    category: "Filtres",
    tags: ["exclusion", "blacklist", "wallets"]
  },
  {
    id: "21",
    question: "Puis-je inclure seulement les holders de longue durée ?",
    answer: "Oui, utilisez le filtre 'Date d'acquisition' pour inclure seulement les holders qui possèdent leurs NFT depuis une durée minimale (ex: 30 jours, 6 mois).",
    category: "Filtres",
    tags: ["ancienneté", "holders", "durée"]
  },
  {
    id: "22",
    question: "Comment créer des filtres basés sur plusieurs collections ?",
    answer: "Dans les filtres avancés, vous pouvez créer des conditions 'ET/OU' basées sur la possession de NFT dans différentes collections Ultra.",
    category: "Filtres",
    tags: ["multi-collections", "conditions", "logique"]
  },
  
  // Airdrops
  {
    id: "23",
    question: "Comment sont distribués les airdrops ?",
    answer: "Les airdrops sont distribués automatiquement selon vos paramètres. UNIQ envoyés directement aux wallets, UOS crédités instantanément. Rapport détaillé fourni.",
    category: "Airdrops",
    tags: ["airdrop", "distribution", "uniq", "uos"]
  },
  {
    id: "24",
    question: "Puis-je prévisualiser un airdrop avant l'envoi ?",
    answer: "Oui, le système génère toujours un aperçu avec la liste des destinataires et montants avant l'exécution. Vous devez confirmer manuellement l'envoi.",
    category: "Airdrops",
    tags: ["prévisualisation", "confirmation", "sécurité"]
  },
  {
    id: "25",
    question: "Que se passe-t-il si un wallet n'existe pas ?",
    answer: "Les adresses invalides sont automatiquement détectées et exclues de la distribution. Vous recevez un rapport avec la liste des adresses problématiques.",
    category: "Airdrops",
    tags: ["validation", "adresses", "erreurs"]
  },
  {
    id: "26",
    question: "Puis-je annuler un airdrop en cours ?",
    answer: "Une fois lancé, un airdrop ne peut pas être annulé. Cependant, vous pouvez contacter le support dans les 5 minutes suivant le lancement pour une intervention d'urgence.",
    category: "Airdrops",
    tags: ["annulation", "urgence", "support"]
  },
  
  // Sécurité
  {
    id: "27",
    question: "Comment protégez-vous mes clés privées ?",
    answer: "Nous n'accédons jamais à vos clés privées. Toutes les transactions sont signées localement dans votre navigateur via votre wallet Ultra connecté.",
    category: "Sécurité",
    tags: ["clés privées", "signature", "local"]
  },
  {
    id: "28",
    question: "Puis-je utiliser un wallet hardware avec UT-Snapshot ?",
    answer: "Oui, tous les wallets hardware compatibles avec Ultra (Ledger, Trezor) peuvent être utilisés pour une sécurité maximale de vos actifs.",
    category: "Sécurité",
    tags: ["hardware", "ledger", "trezor"]
  },
  {
    id: "29",
    question: "Comment puis-je activer l'authentification à deux facteurs ?",
    answer: "Rendez-vous dans Paramètres > Sécurité > 2FA. Scannez le QR code avec votre app d'authentification (Google Authenticator, Authy) et entrez le code de vérification.",
    category: "Sécurité",
    tags: ["2fa", "authentification", "protection"]
  },
  
  // Performance
  {
    id: "30",
    question: "Combien de temps prend un snapshot de grande collection ?",
    answer: "Pour 10K holders : ~2 minutes, 50K holders : ~8 minutes, 100K+ holders : ~15 minutes. Les performances varient selon la complexité des filtres.",
    category: "Performance",
    tags: ["vitesse", "temps", "grande collection"]
  },
  {
    id: "31",
    question: "Y a-t-il des limites sur la taille des collections ?",
    answer: "Aucune limite technique. Nous avons traité avec succès des collections de plus de 500K holders. Les très grandes collections peuvent nécessiter plus de temps.",
    category: "Performance",
    tags: ["limites", "taille", "scalabilité"]
  },
  
  // Intégrations
  {
    id: "32",
    question: "Puis-je intégrer UT-Snapshot avec Discord ?",
    answer: "Oui, via notre bot Discord, vous pouvez recevoir des notifications de snapshots et même déclencher des snapshots via des commandes Discord.",
    category: "Intégrations",
    tags: ["discord", "bot", "notifications"]
  },
  {
    id: "33",
    question: "Existe-t-il une API pour les développeurs ?",
    answer: "Oui, notre API REST permet d'intégrer UT-Snapshot dans vos applications. Documentation complète disponible pour les développeurs.",
    category: "Intégrations",
    tags: ["api", "développeurs", "intégration"]
  },
  {
    id: "34",
    question: "Puis-je connecter UT-Snapshot à Zapier ?",
    answer: "Oui, notre intégration Zapier permet d'automatiser des workflows complexes en connectant UT-Snapshot avec plus de 3000 applications.",
    category: "Intégrations",
    tags: ["zapier", "automation", "workflows"]
  },
  
  // Dépannage
  {
    id: "35",
    question: "Que faire si mon snapshot échoue ?",
    answer: "Vérifiez votre solde UOS, la validité de la collection, et les paramètres. En cas d'échec persistant, contactez le support avec l'ID du snapshot.",
    category: "Dépannage",
    tags: ["erreur", "échec", "dépannage", "support"]
  },
  {
    id: "36",
    question: "Mon wallet ne se connecte pas, que faire ?",
    answer: "Vérifiez que votre wallet Ultra est déverrouillé, que vous êtes sur le bon réseau, et que votre navigateur autorise les popups pour notre site.",
    category: "Dépannage",
    tags: ["connexion", "wallet", "problème"]
  },
  {
    id: "37",
    question: "Pourquoi mon snapshot est-il plus lent que prévu ?",
    answer: "La vitesse dépend de la congestion du réseau Ultra, de la taille de la collection, et de la complexité des filtres. Les heures de pointe peuvent ralentir le processus.",
    category: "Dépannage",
    tags: ["lenteur", "performance", "réseau"]
  },
  
  // Historique et Analytics
  {
    id: "38",
    question: "Comment consulter l'historique de mes snapshots ?",
    answer: "Section 'Historique' du dashboard. Filtrez par date, collection ou statut. Chaque snapshot affiche les données collectées et actions effectuées.",
    category: "Historique",
    tags: ["historique", "dashboard", "consultation"]
  },
  {
    id: "39",
    question: "Puis-je exporter l'historique complet ?",
    answer: "Oui, vous pouvez exporter tout votre historique en CSV ou JSON depuis la page Analytics. Utile pour la comptabilité et les audits.",
    category: "Historique",
    tags: ["export", "historique", "analytics"]
  },
  {
    id: "40",
    question: "Combien de temps gardez-vous l'historique ?",
    answer: "Nous conservons votre historique indéfiniment. Les snapshots et leurs données restent accessibles tant que votre compte est actif.",
    category: "Historique",
    tags: ["conservation", "durée", "données"]
  },
  
  // Fonctionnalités avancées
  {
    id: "41",
    question: "Puis-je créer des webhooks pour les événements ?",
    answer: "Oui, configurez des webhooks pour recevoir des notifications temps réel quand un snapshot se termine, échoue, ou quand certaines conditions sont remplies.",
    category: "Avancé",
    tags: ["webhooks", "notifications", "événements"]
  },
  {
    id: "42",
    question: "Comment utiliser les templates de snapshots ?",
    answer: "Créez des templates réutilisables avec vos configurations favorites. Pratique pour des snapshots récurrents avec les mêmes paramètres sur différentes collections.",
    category: "Avancé",
    tags: ["templates", "réutilisation", "configuration"]
  },
  {
    id: "43",
    question: "Puis-je créer des rapports personnalisés ?",
    answer: "Oui, la section Analytics permet de créer des rapports personnalisés avec graphiques, métriques, et exports automatisés selon vos besoins.",
    category: "Avancé",
    tags: ["rapports", "analytics", "personnalisation"]
  },
  
  // Support et formation
  {
    id: "44",
    question: "Où trouver des tutoriels vidéo ?",
    answer: "Notre chaîne YouTube contient des tutoriels détaillés. Vous trouverez aussi des guides interactifs dans la section 'Formation' de votre dashboard.",
    category: "Support",
    tags: ["tutoriels", "vidéo", "formation"]
  },
  {
    id: "45",
    question: "Proposez-vous des formations personnalisées ?",
    answer: "Oui, pour les équipes et entreprises, nous proposons des sessions de formation personnalisées et un accompagnement dédié.",
    category: "Support",
    tags: ["formation", "entreprise", "accompagnement"]
  },
  {
    id: "46",
    question: "Comment contacter le support technique ?",
    answer: "Chat en direct 24/7, email support@ut-snapshot.com, ou créez un ticket depuis votre dashboard. Réponse garantie sous 2h en heures ouvrées.",
    category: "Support",
    tags: ["support", "contact", "assistance"]
  },
  
  // Limites et restrictions
  {
    id: "47",
    question: "Y a-t-il des restrictions géographiques ?",
    answer: "UT-Snapshot est disponible mondialement, sauf dans les pays sous sanctions internationales. Vérifiez notre page de conformité pour plus de détails.",
    category: "Limites",
    tags: ["géographie", "restrictions", "conformité"]
  },
  {
    id: "48",
    question: "Puis-je utiliser UT-Snapshot pour des collections privées ?",
    answer: "Oui, nous supportons les collections privées. Vous devez avoir les droits d'accès appropriés à la collection pour créer des snapshots.",
    category: "Limites",
    tags: ["privé", "accès", "droits"]
  },
  
  // Futur et roadmap
  {
    id: "49",
    question: "Quelles nouvelles fonctionnalités sont prévues ?",
    answer: "Notre roadmap 2024 inclut : support multi-blockchain, IA prédictive, marketplace de templates, et intégrations DeFi avancées.",
    category: "Futur",
    tags: ["roadmap", "nouveautés", "blockchain"]
  },
  {
    id: "50",
    question: "Puis-je suggérer de nouvelles fonctionnalités ?",
    answer: "Absolument ! Utilisez le formulaire de feedback dans votre dashboard ou rejoignez notre Discord communautaire pour partager vos idées.",
    category: "Futur",
    tags: ["suggestions", "feedback", "communauté"]
  }
]

const categories = [
  "Tous", "Général", "Utilisation", "Tarification", "Automatisation", 
  "Filtres", "Airdrops", "Sécurité", "Performance", "Intégrations", 
  "Dépannage", "Historique", "Avancé", "Support", "Limites", "Futur"
]

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
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A2E] to-[#16213E] text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,69,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 blur-xl rounded-full" />
                  <HelpCircle className="relative h-20 w-20 text-purple-400 mx-auto" />
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
                  Centre d'Aide
                </h1>
                <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
                  Trouvez rapidement des réponses à toutes vos questions sur UT-Snapshot. 
                  Plus de 50 questions couvrant tous les aspects de la plateforme.
                </p>
                
                {/* Quick stats */}
                <div className="flex justify-center gap-8 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{faqData.length}</div>
                    <div className="text-sm text-gray-400">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-400">{categories.length - 1}</div>
                    <div className="text-sm text-gray-400">Catégories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">24/7</div>
                    <div className="text-sm text-gray-400">Support</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recherche et filtres */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <Card className="bg-black/30 backdrop-blur-xl border-purple-500/20 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex flex-col gap-6">
                    {/* Barre de recherche */}
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
                      <Input
                        placeholder="Rechercher dans la FAQ (tapez votre question...)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-4 py-4 bg-white/5 border-purple-500/30 hover:border-purple-400/50 focus:border-purple-400/70 text-white placeholder:text-gray-400 rounded-xl text-lg transition-all duration-300"
                      />
                      {searchTerm && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-purple-400">
                          {filteredFAQ.length} résultat{filteredFAQ.length > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>

                    {/* Filtres par catégorie */}
                    <div className="flex flex-wrap gap-3">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className={
                            selectedCategory === category
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none shadow-lg"
                              : "border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-400/50 transition-all duration-300"
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
                    <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 hover:border-purple-400/40 hover:bg-black/30 transition-all duration-500 shadow-lg hover:shadow-purple-500/10">
                      <CardHeader
                        className="cursor-pointer p-6"
                        onClick={() => toggleItem(item.id)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3">
                              <CardTitle className="text-white text-lg font-semibold leading-tight pr-2">
                                {item.question}
                              </CardTitle>
                              <Badge 
                                variant="outline" 
                                className="shrink-0 border-purple-400/40 bg-purple-400/10 text-purple-300 px-2 py-1"
                              >
                                {item.category}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {item.tags.map((tag) => (
                                <Badge 
                                  key={tag} 
                                  variant="secondary" 
                                  className="bg-white/5 hover:bg-white/10 text-gray-400 text-xs px-2 py-1 transition-colors duration-200"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="shrink-0 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg p-2"
                          >
                            {openItems.includes(item.id) ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
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
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          >
                            <CardContent className="pt-0 px-6 pb-6">
                              <div className="border-t border-purple-500/20 pt-6">
                                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-6 rounded-xl backdrop-blur-sm">
                                  <p className="text-white leading-relaxed text-base font-medium">{item.answer}</p>
                                </div>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 shadow-lg">
                  <CardContent className="p-16 text-center">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl rounded-full" />
                      <HelpCircle className="relative h-16 w-16 text-purple-400 mx-auto" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Aucun résultat trouvé</h3>
                    <p className="text-gray-300 text-lg max-w-md mx-auto">
                      Essayez de modifier vos termes de recherche ou de changer de catégorie.
                    </p>
                    <Button 
                      onClick={() => {setSearchTerm(''); setSelectedCategory('Tous')}}
                      className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Réinitialiser les filtres
                    </Button>
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
              <Card className="bg-black/20 backdrop-blur-xl border-purple-500/20 shadow-2xl">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-white text-3xl mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Besoin d'aide supplémentaire ?
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    Notre équipe d'experts est là pour vous accompagner
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="group text-center p-8 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-400/30 transition-all duration-300" />
                        <MessageCircle className="relative h-12 w-12 text-blue-400 mx-auto" />
                      </div>
                      <h4 className="text-white font-bold text-xl mb-3">Chat en direct</h4>
                      <p className="text-gray-300 mb-6">Disponible 24h/24, 7j/7<br/>Réponse immédiate</p>
                      <Button variant="outline" className="w-full border-blue-500/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200 transition-all duration-300">
                        Démarrer le chat
                      </Button>
                    </div>
                    <div className="group text-center p-8 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full group-hover:bg-green-400/30 transition-all duration-300" />
                        <Mail className="relative h-12 w-12 text-green-400 mx-auto" />
                      </div>
                      <h4 className="text-white font-bold text-xl mb-3">Email Support</h4>
                      <p className="text-gray-300 mb-6">Réponse sous 24h<br/>Support technique complet</p>
                      <Button variant="outline" className="w-full border-green-500/40 bg-green-500/10 text-green-300 hover:bg-green-500/20 hover:text-green-200 transition-all duration-300">
                        Envoyer un email
                      </Button>
                    </div>
                    <div className="group text-center p-8 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full group-hover:bg-purple-400/30 transition-all duration-300" />
                        <Phone className="relative h-12 w-12 text-purple-400 mx-auto" />
                      </div>
                      <h4 className="text-white font-bold text-xl mb-3">Assistance téléphonique</h4>
                      <p className="text-gray-300 mb-6">Lun-Ven 9h-18h CET<br/>Support premium</p>
                      <Button variant="outline" className="w-full border-purple-500/40 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200 transition-all duration-300">
                        Programmer un appel
                      </Button>
                    </div>
                  </div>
                  
                  {/* Section bonus */}
                  <div className="mt-12 p-6 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
                    <div className="text-center">
                      <h5 className="text-white font-semibold text-lg mb-2">Communauté & Ressources</h5>
                      <p className="text-gray-300 mb-4">Rejoignez notre communauté Discord et accédez aux tutoriels vidéo</p>
                      <div className="flex justify-center gap-4">
                        <Button variant="outline" size="sm" className="border-purple-500/40 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20">
                          Discord
                        </Button>
                        <Button variant="outline" size="sm" className="border-pink-500/40 bg-pink-500/10 text-pink-300 hover:bg-pink-500/20">
                          YouTube
                        </Button>
                        <Button variant="outline" size="sm" className="border-blue-500/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20">
                          Documentation
                        </Button>
                      </div>
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