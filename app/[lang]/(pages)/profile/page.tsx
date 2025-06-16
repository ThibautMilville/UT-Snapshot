"use client"

import { useState } from "react"
import { motion } from "@/lib/motion"
import { 
  User, 
  Settings, 
  Wallet, 
  Shield, 
  Bell, 
  Edit3, 
  Save, 
  Star,
  TrendingUp,
  Eye,
  Camera,
  Coins,
  Award,
  Calendar
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { PageLayout } from "@/components/layout/PageLayout"
import { BadgeSystem } from "@/components/profile/BadgeSystem"
import { useAuth } from "@/contexts/AuthContext"
import { useTranslation } from "@/contexts/TranslationContext"
import { TransferUOSModal } from "@/components/modals/TransferUOSModal"
import { PurchaseUOSModal } from "@/components/modals/PurchaseUOSModal"

export default function ProfilePage() {
  const { isAuthenticated, walletAddress } = useAuth()
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [profile, setProfile] = useState({
    displayName: "Factory Manager",
    email: "manager@ultra.io",
    bio: "Créateur de snapshots automatisés sur Ultra",
    level: 12,
    currentXP: 2847,
    nextLevelXP: 3500,
    joinDate: "2024-01-15",
    uosBalance: 1234.56,
    notifications: {
      email: true,
      push: false,
      snapshots: true,
      rewards: true,
    },
    privacy: {
      publicProfile: false,
      showStats: true,
    }
  })

  const handleSave = () => {
    setIsEditing(false)
    // Ici on sauvegarderait les données
  }

  const progressPercentage = (profile.currentXP / profile.nextLevelXP) * 100

  if (!isAuthenticated) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
          <div className="container mx-auto px-4 py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <User className="h-16 w-16 text-purple-400 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-white mb-4">Accès Restreint</h1>
              <p className="text-gray-400 mb-8">
                Connectez votre wallet Ultra pour accéder à votre profil.
              </p>
            </motion.div>
          </div>
        </div>
      </PageLayout>
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
            className="space-y-8"
          >
            {/* Header avec niveau */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl" />
              <Card className="relative bg-black/40 backdrop-blur-xl border-white/10 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                    {/* Avatar et infos principales */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24 bg-gradient-to-r from-purple-500 to-pink-500 ring-4 ring-purple-500/30">
                          <AvatarFallback className="text-white text-2xl font-bold">
                            {profile.displayName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
                          <Star className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h1 className="text-3xl font-bold text-white">{profile.displayName}</h1>
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-3 py-1">
                            Niveau {profile.level}
                          </Badge>
                        </div>
                        <p className="text-gray-400">{profile.bio}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Membre depuis {new Date(profile.joinDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Wallet className="h-4 w-4 text-green-400" />
                            <span className="font-mono">{walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progression XP */}
                    <div className="flex-1 lg:max-w-md">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Progression vers le niveau {profile.level + 1}</span>
                          <span className="text-sm font-semibold text-white">
                            {profile.currentXP.toLocaleString()} / {profile.nextLevelXP.toLocaleString()} XP
                          </span>
                        </div>
                        <Progress value={progressPercentage} className="h-3 bg-gray-700">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" 
                               style={{ width: `${progressPercentage}%` }} />
                        </Progress>
                        <div className="text-xs text-gray-400">
                          Plus que {(profile.nextLevelXP - profile.currentXP).toLocaleString()} XP pour le niveau suivant
                        </div>
                      </div>
                    </div>

                    {/* Bouton d'édition */}
                    <Button
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
                    >
                      {isEditing ? (
                        <>
                          <Save size={16} />
                          Sauvegarder
                        </>
                      ) : (
                        <>
                          <Edit3 size={16} />
                          Modifier
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-black/40 backdrop-blur-xl border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative space-y-3">
                      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-white">156</div>
                      <div className="text-sm text-gray-300 font-medium">Snapshots créés</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 backdrop-blur-xl border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative space-y-3">
                      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-white">12.8K</div>
                      <div className="text-sm text-gray-300 font-medium">Vues totales</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 backdrop-blur-xl border-red-500/20 hover:border-red-500/40 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative space-y-3">
                      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <Coins className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-white">1,247</div>
                      <div className="text-sm text-gray-300 font-medium">UOS dépensés</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 backdrop-blur-xl border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative space-y-3">
                      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-white">8</div>
                      <div className="text-sm text-gray-300 font-medium">Badges débloqués</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Section principale */}
              <div className="lg:col-span-2 space-y-8">
                {/* Système de badges */}
                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                  <CardContent className="p-6">
                    <BadgeSystem />
                  </CardContent>
                </Card>

                {/* Informations personnelles */}
                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <User className="h-5 w-5 text-purple-400" />
                      Informations Personnelles
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Gérez vos informations de profil
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="displayName" className="text-gray-400">Nom d'affichage</Label>
                        {isEditing ? (
                          <Input
                            id="displayName"
                            value={profile.displayName}
                            onChange={(e) => setProfile({...profile, displayName: e.target.value})}
                            className="bg-white/5 border-white/10 text-white focus:border-purple-400/50"
                          />
                        ) : (
                          <p className="text-white font-medium bg-white/5 rounded-lg px-3 py-2">{profile.displayName}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-400">Email</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                            className="bg-white/5 border-white/10 text-white focus:border-purple-400/50"
                          />
                        ) : (
                          <p className="text-white bg-white/5 rounded-lg px-3 py-2">{profile.email}</p>
                        )}
                      </div>
                    </div>

                    {isEditing && (
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-gray-400">Bio</Label>
                        <Input
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                          className="bg-white/5 border-white/10 text-white focus:border-purple-400/50"
                          placeholder="Décrivez-vous en quelques mots..."
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Notifications */}
                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Bell className="h-5 w-5 text-blue-400" />
                      Notifications
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Préférences de notification
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium text-sm">Email</p>
                        <p className="text-xs text-gray-400">Mises à jour par email</p>
                      </div>
                      <Switch
                        checked={profile.notifications.email}
                        onCheckedChange={(checked) => 
                          setProfile({
                            ...profile, 
                            notifications: {...profile.notifications, email: checked}
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium text-sm">Push</p>
                        <p className="text-xs text-gray-400">Notifications navigateur</p>
                      </div>
                      <Switch
                        checked={profile.notifications.push}
                        onCheckedChange={(checked) => 
                          setProfile({
                            ...profile, 
                            notifications: {...profile.notifications, push: checked}
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium text-sm">Snapshots</p>
                        <p className="text-xs text-gray-400">Activité snapshots</p>
                      </div>
                      <Switch
                        checked={profile.notifications.snapshots}
                        onCheckedChange={(checked) => 
                          setProfile({
                            ...profile, 
                            notifications: {...profile.notifications, snapshots: checked}
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Confidentialité */}
                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-400" />
                      Confidentialité
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Contrôlez votre visibilité
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium text-sm">Profil public</p>
                        <p className="text-xs text-gray-400">Visible par tous</p>
                      </div>
                      <Switch
                        checked={profile.privacy.publicProfile}
                        onCheckedChange={(checked) => 
                          setProfile({
                            ...profile, 
                            privacy: {...profile.privacy, publicProfile: checked}
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium text-sm">Statistiques</p>
                        <p className="text-xs text-gray-400">Stats publiques</p>
                      </div>
                      <Switch
                        checked={profile.privacy.showStats}
                        onCheckedChange={(checked) => 
                          setProfile({
                            ...profile, 
                            privacy: {...profile.privacy, showStats: checked}
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Transfert UOS */}
                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-yellow-400" />
                      Transfert UOS
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Transférez des UOS via Ultra Times ou carte bancaire
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Solde actuel */}
                    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Solde UOS</p>
                          <p className="text-2xl font-bold text-white">{profile.uosBalance.toLocaleString()} UOS</p>
                        </div>
                        <div className="bg-yellow-500/20 rounded-xl p-3">
                          <Coins className="h-6 w-6 text-yellow-400" />
                        </div>
                      </div>
                    </div>

                    {/* Options de transfert */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Ultra Times Wallet */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-purple-500/20 cursor-pointer hover:border-purple-400/40 transition-all flex flex-col h-full"
                      >
                        <div className="flex items-center gap-3 mb-3 flex-grow">
                          <div className="bg-purple-500/20 rounded-lg p-2">
                            <Wallet className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">Ultra Times Wallet</h3>
                            <p className="text-xs text-gray-400">Transfert instantané</p>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-auto"
                          onClick={() => setIsTransferModalOpen(true)}
                        >
                          {isAuthenticated ? 'Transférer UOS' : 'Connecter Wallet'}
                        </Button>
                      </motion.div>

                      {/* Carte bancaire */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20 cursor-pointer hover:border-green-400/40 transition-all flex flex-col h-full"
                      >
                        <div className="flex items-center gap-3 mb-3 flex-grow">
                          <div className="bg-green-500/20 rounded-lg p-2">
                            <Coins className="h-5 w-5 text-green-400" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">Carte Bancaire</h3>
                            <p className="text-xs text-gray-400">Achat sécurisé</p>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700 text-white mt-auto"
                          onClick={() => setIsPurchaseModalOpen(true)}
                        >
                          Acheter UOS
                        </Button>
                      </motion.div>
                    </div>

                    {/* Historique récent */}
                    <div>
                      <h4 className="text-white font-medium mb-3">Historique récent</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <div>
                              <p className="text-white text-sm">Achat par carte</p>
                              <p className="text-xs text-gray-400">Il y a 2 jours</p>
                            </div>
                          </div>
                          <span className="text-green-400 font-medium">+500 UOS</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full" />
                            <div>
                              <p className="text-white text-sm">Transfert wallet</p>
                              <p className="text-xs text-gray-400">Il y a 1 semaine</p>
                            </div>
                          </div>
                          <span className="text-blue-400 font-medium">+1000 UOS</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activité récente */}
                <Card className="bg-black/40 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-orange-400" />
                      Activité Récente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <div className="text-sm">
                        <p className="text-white">Badge débloqué</p>
                        <p className="text-xs text-gray-400">Il y a 2 heures</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <div className="text-sm">
                        <p className="text-white">Snapshot créé</p>
                        <p className="text-xs text-gray-400">Il y a 5 heures</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <div className="text-sm">
                        <p className="text-white">Niveau atteint</p>
                        <p className="text-xs text-gray-400">Il y a 1 jour</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modales */}
      <TransferUOSModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        currentBalance={profile.uosBalance}
      />
      
      <PurchaseUOSModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      />
    </PageLayout>
  )
} 