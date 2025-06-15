"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "@/lib/motion"
import { 
  Trophy, 
  Target, 
  Compass, 
  Code, 
  Settings, 
  Rocket, 
  Lock, 
  Heart, 
  Award,
  Star,
  X,
  CheckCircle
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface BadgeData {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  category: 'profile' | 'development' | 'community'
  level?: number
  maxLevel?: number
  xp: number
  unlocked: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: string
  requirements?: string[]
  nextLevelXp?: number
}

const BADGES: BadgeData[] = [
  // Profil
  {
    id: 'first-step',
    name: 'Premier Pas',
    description: 'Félicitations ! Vous avez créé votre premier snapshot sur Ultra Times.',
    icon: <Target className="h-6 w-6" />,
    category: 'profile',
    level: 1,
    xp: 100,
    unlocked: true,
    rarity: 'common',
    unlockedAt: '2024-01-15',
    requirements: ['Créer votre premier snapshot']
  },
  {
    id: 'explorer',
    name: 'Explorateur',
    description: 'Vous avez exploré différentes fonctionnalités de la plateforme.',
    icon: <Compass className="h-6 w-6" />,
    category: 'profile',
    level: 1,
    xp: 150,
    unlocked: true,
    rarity: 'common',
    unlockedAt: '2024-01-16',
    requirements: ['Visiter 5 pages différentes', 'Utiliser la recherche']
  },
  
  // Développement
  {
    id: 'dev-novice',
    name: 'Développeur Novice',
    description: 'Vous commencez votre parcours de développement sur Ultra.',
    icon: <Code className="h-6 w-6" />,
    category: 'development',
    level: 1,
    maxLevel: 5,
    xp: 250,
    unlocked: true,
    rarity: 'common',
    unlockedAt: '2024-01-20',
    requirements: ['Créer 5 snapshots', 'Utiliser l\'API'],
    nextLevelXp: 500
  },
  {
    id: 'dev-confirmed',
    name: 'Développeur Confirmé',
    description: 'Vos compétences en développement sont reconnues.',
    icon: <Settings className="h-6 w-6" />,
    category: 'development',
    level: 2,
    maxLevel: 5,
    xp: 500,
    unlocked: true,
    rarity: 'rare',
    unlockedAt: '2024-02-01',
    requirements: ['Créer 25 snapshots', 'Obtenir 100 vues'],
    nextLevelXp: 1000
  },
  {
    id: 'dev-expert',
    name: 'Développeur Expert',
    description: 'Vous maîtrisez parfaitement les outils de développement.',
    icon: <Rocket className="h-6 w-6" />,
    category: 'development',
    level: 3,
    maxLevel: 5,
    xp: 1000,
    unlocked: true,
    rarity: 'epic',
    unlockedAt: '2024-02-15',
    requirements: ['Créer 100 snapshots', 'Obtenir 1000 vues'],
    nextLevelXp: 2000
  },
  {
    id: 'dev-master',
    name: 'Développeur Maître',
    description: 'Niveau de maîtrise exceptionnel. Vous êtes un expert reconnu.',
    icon: <Lock className="h-6 w-6" />,
    category: 'development',
    level: 4,
    maxLevel: 5,
    xp: 0,
    unlocked: false,
    rarity: 'legendary',
    requirements: ['Créer 500 snapshots', 'Obtenir 10000 vues'],
    nextLevelXp: 5000
  },
  {
    id: 'dev-legendary',
    name: 'Développeur Légendaire',
    description: 'Le niveau ultime. Vous êtes une légende vivante.',
    icon: <Lock className="h-6 w-6" />,
    category: 'development',
    level: 5,
    maxLevel: 5,
    xp: 0,
    unlocked: false,
    rarity: 'legendary',
    requirements: ['Créer 1000 snapshots', 'Obtenir 50000 vues']
  },

  // Communauté
  {
    id: 'loyal-collaborator',
    name: 'Collaborateur Fidèle',
    description: 'Votre engagement envers la communauté est remarquable.',
    icon: <Heart className="h-6 w-6" />,
    category: 'community',
    level: 1,
    xp: 750,
    unlocked: true,
    rarity: 'rare',
    unlockedAt: '2024-02-10',
    requirements: ['Être actif 30 jours', 'Aider 5 utilisateurs']
  },
  {
    id: 'veteran',
    name: 'Vétéran',
    description: 'Vous êtes un membre expérimenté de la communauté Ultra Times.',
    icon: <Trophy className="h-6 w-6" />,
    category: 'community',
    level: 2,
    xp: 1500,
    unlocked: true,
    rarity: 'epic',
    unlockedAt: '2024-03-01',
    requirements: ['Être membre depuis 6 mois', 'Créer 50 snapshots']
  },
  {
    id: 'living-legend',
    name: 'Légende Vivante',
    description: 'Statut légendaire réservé aux membres les plus exceptionnels.',
    icon: <Lock className="h-6 w-6" />,
    category: 'community',
    level: 3,
    xp: 0,
    unlocked: false,
    rarity: 'legendary',
    requirements: ['Être membre depuis 2 ans', 'Créer 1000 snapshots', 'Aider 100 utilisateurs']
  }
]

const CATEGORY_ICONS = {
  profile: <Target className="h-5 w-5" />,
  development: <Code className="h-5 w-5" />,
  community: <Heart className="h-5 w-5" />
}

const CATEGORY_NAMES = {
  profile: 'Profil',
  development: 'Développement',
  community: 'Communauté'
}

const RARITY_COLORS = {
  common: 'from-orange-400 to-orange-500',
  rare: 'from-blue-400 to-blue-500',
  epic: 'from-purple-400 to-purple-500',
  legendary: 'from-yellow-400 to-yellow-500'
}

const RARITY_BORDER = {
  common: 'border-orange-400/50',
  rare: 'border-blue-400/50',
  epic: 'border-purple-400/50',
  legendary: 'border-yellow-400/50'
}

interface BadgeSystemProps {
  className?: string
}

export function BadgeSystem({ className }: BadgeSystemProps) {
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null)

  const groupedBadges = BADGES.reduce((acc, badge) => {
    if (!acc[badge.category]) {
      acc[badge.category] = []
    }
    acc[badge.category].push(badge)
    return acc
  }, {} as Record<string, BadgeData[]>)

  const totalXP = BADGES.filter(b => b.unlocked).reduce((sum, badge) => sum + badge.xp, 0)
  const unlockedCount = BADGES.filter(b => b.unlocked).length

  return (
    <div className={className}>
      {/* Header avec statistiques */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-6 w-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Mes Badges</h2>
        </div>
        <p className="text-gray-400 mb-4">
          Ces badges reflètent votre activité sur UT Snapshot. Le but du jeu est d'en accumuler un maximum 
          pour monter de niveau et bénéficier d'avantages exclusifs sur l'écosystème Ultra Times !
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
            <div className="text-2xl font-bold text-white">{unlockedCount}</div>
            <div className="text-sm text-gray-400">Badges débloqués</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-4 border border-blue-500/30">
            <div className="text-2xl font-bold text-white">{totalXP.toLocaleString()}</div>
            <div className="text-sm text-gray-400">XP total</div>
          </div>
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
            <div className="text-2xl font-bold text-white">{Math.round((unlockedCount / BADGES.length) * 100)}%</div>
            <div className="text-sm text-gray-400">Progression</div>
          </div>
        </div>
      </div>

      {/* Badges par catégorie */}
      <div className="space-y-8">
        {Object.entries(groupedBadges).map(([category, badges]) => (
          <div key={category}>
            <div className="flex items-center gap-2 mb-4">
              {CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS]}
              <h3 className="text-xl font-semibold text-white">
                {CATEGORY_NAMES[category as keyof typeof CATEGORY_NAMES]}
              </h3>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {badges.map((badge) => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative cursor-pointer ${badge.unlocked ? '' : 'opacity-60'}`}
                  onClick={() => setSelectedBadge(badge)}
                >
                  <div className="text-center">
                    {/* Badge circulaire */}
                    <div className={`
                      relative w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center
                      ${badge.unlocked 
                        ? `bg-gradient-to-br ${RARITY_COLORS[badge.rarity]} shadow-lg` 
                        : 'bg-gradient-to-br from-gray-600 to-gray-700'
                      }
                      border-3 ${badge.unlocked ? RARITY_BORDER[badge.rarity] : 'border-gray-500/30'}
                      transition-all duration-300 hover:shadow-xl hover:scale-110
                      ${badge.unlocked ? 'hover:shadow-' + badge.rarity.replace('legendary', 'yellow') + '-500/30' : ''}
                    `}>
                      {/* Icône du badge */}
                      <div className={`
                        ${badge.unlocked ? 'text-white' : 'text-gray-400'}
                        transition-colors duration-300
                      `}>
                        {badge.unlocked ? badge.icon : <Lock className="h-6 w-6" />}
                      </div>
                      
                      {/* Indicateur de niveau */}
                      {badge.level && badge.unlocked && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                          <span className="text-xs font-bold text-gray-900">{badge.level}</span>
                        </div>
                      )}
                      
                      {/* Indicateur de débloqué */}
                      {badge.unlocked && (
                        <div className="absolute -top-0.5 -right-0.5">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Nom du badge */}
                    <h4 className="font-medium text-white text-xs mb-1 leading-tight px-1">{badge.name}</h4>
                    
                    {/* XP */}
                    <div className="text-xs text-green-400 font-medium">+{badge.xp} XP</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Popup de détail */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-white/10 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  bg-gradient-to-br ${selectedBadge.unlocked ? RARITY_COLORS[selectedBadge.rarity] : 'from-gray-700 to-gray-800'}
                `}>
                  {selectedBadge.unlocked ? selectedBadge.icon : <Lock className="h-8 w-8" />}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedBadge(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{selectedBadge.name}</h3>
                    <Badge className={`
                      bg-gradient-to-r ${RARITY_COLORS[selectedBadge.rarity]} text-white border-0
                    `}>
                      {selectedBadge.rarity}
                    </Badge>
                  </div>
                  {selectedBadge.level && (
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">
                        Niveau {selectedBadge.level}{selectedBadge.maxLevel ? `/${selectedBadge.maxLevel}` : ''}
                      </span>
                    </div>
                  )}
                  <p className="text-gray-300">{selectedBadge.description}</p>
                </div>

                <div className="bg-black/30 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">XP gagné</span>
                    <span className="text-white font-semibold">+{selectedBadge.xp}</span>
                  </div>
                  {selectedBadge.unlockedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Débloqué le</span>
                      <span className="text-white">{new Date(selectedBadge.unlockedAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Catégorie</span>
                    <span className="text-white">{CATEGORY_NAMES[selectedBadge.category]}</span>
                  </div>
                </div>

                {selectedBadge.requirements && (
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      {selectedBadge.unlocked ? 'Conditions remplies' : 'Conditions requises'}
                    </h4>
                    <ul className="space-y-1">
                      {selectedBadge.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className={`h-4 w-4 ${selectedBadge.unlocked ? 'text-green-400' : 'text-gray-500'}`} />
                          <span className={selectedBadge.unlocked ? 'text-gray-300' : 'text-gray-400'}>
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedBadge.nextLevelXp && selectedBadge.unlocked && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progression vers le niveau suivant</span>
                      <span className="text-white">{selectedBadge.xp}/{selectedBadge.nextLevelXp} XP</span>
                    </div>
                    <Progress 
                      value={(selectedBadge.xp / selectedBadge.nextLevelXp) * 100} 
                      className="h-2"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 