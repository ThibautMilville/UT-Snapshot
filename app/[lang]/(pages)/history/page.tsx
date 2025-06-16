'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Filter, 
  Download, 
  Eye, 
  Search, 
  Calendar,
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Pause,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/contexts/TranslationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/layout/PageLayout';

export default function HistoryPage() {
  const { requireAuth, loading: authLoading } = useAuth();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  
  // Require authentication to access this page
  requireAuth();
  
  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Mock data pour l'historique
  const historyData = [
    {
      id: 1,
      title: 'Snapshot Ultra Heroes Collection',
      type: 'snapshot',
      status: 'completed',
      date: '2024-06-15T10:30:00Z',
      participants: 1234,
      collected: 892,
      duration: '2h 15min',
      collection: 'Ultra Heroes #001-500',
      details: [
        { action: 'Snapshot créé', time: '10:30', status: 'completed' },
        { action: 'Collecte des données', time: '10:35', status: 'completed' },
        { action: 'Traitement des NFTs', time: '11:20', status: 'completed' },
        { action: 'Distribution terminée', time: '12:45', status: 'completed' },
      ]
    },
    {
      id: 2,
      title: 'Airdrop UOS Rewards',
      type: 'airdrop',
      status: 'running',
      date: '2024-06-14T14:20:00Z',
      participants: 567,
      collected: 445,
      duration: '1h 45min',
      collection: 'UOS Token Distribution',
      details: [
        { action: 'Airdrop lancé', time: '14:20', status: 'completed' },
        { action: 'Vérification des wallets', time: '14:25', status: 'completed' },
        { action: 'Distribution en cours', time: '15:30', status: 'running' },
        { action: 'Finalisation', time: '-', status: 'pending' },
      ]
    },
    {
      id: 3,
      title: 'Snapshot Gaming NFTs',
      type: 'snapshot',
      status: 'failed',
      date: '2024-06-13T09:15:00Z',
      participants: 0,
      collected: 0,
      duration: '0min',
      collection: 'Gaming Collection #1-100',
      details: [
        { action: 'Snapshot créé', time: '09:15', status: 'completed' },
        { action: 'Erreur de connexion', time: '09:16', status: 'failed' },
        { action: 'Tentative de récupération', time: '09:20', status: 'failed' },
        { action: 'Annulation', time: '09:25', status: 'completed' },
      ]
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'running':
        return <Play className="h-4 w-4 text-blue-400" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-400" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'running':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredHistory = historyData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.collection.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Historique des Snapshots
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Consultez l'historique complet de vos snapshots et airdrops avec des détails avancés
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 rounded-xl p-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">156</p>
                  <p className="text-sm text-gray-400">Complétés</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 rounded-xl p-3">
                  <Play className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-sm text-gray-400">En cours</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 rounded-xl p-3">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">45.2K</p>
                  <p className="text-sm text-gray-400">Participants</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/20 rounded-xl p-3">
                  <TrendingUp className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">98.5%</p>
                  <p className="text-sm text-gray-400">Taux de succès</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher par nom ou collection..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Tous
                </Button>
                <Button
                  variant={filterStatus === 'completed' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('completed')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complétés
                </Button>
                <Button
                  variant={filterStatus === 'running' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('running')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  En cours
                </Button>
                <Button
                  variant={filterStatus === 'failed' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('failed')}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Échoués
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* History List */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            {filteredHistory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {expandedItems.includes(item.id) ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </button>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        <p className="text-gray-400">{item.collection}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getStatusColor(item.status)} border`}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1 capitalize">{item.status === 'running' ? 'En cours' : item.status === 'completed' ? 'Terminé' : item.status === 'failed' ? 'Échoué' : item.status}</span>
                      </Badge>
                      <Badge variant="outline" className="text-purple-400 border-purple-500/30">
                        {item.type === 'snapshot' ? 'Snapshot' : 'Airdrop'}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Date</span>
                      </div>
                      <p className="text-white font-medium">
                        {new Date(item.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Participants</span>
                      </div>
                      <p className="text-white font-medium">{item.participants.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Download className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Collectés</span>
                      </div>
                      <p className="text-white font-medium">{item.collected.toLocaleString()}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Durée</span>
                      </div>
                      <p className="text-white font-medium">{item.duration}</p>
                    </div>
                  </div>

                  {expandedItems.includes(item.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-white/10"
                    >
                      <h4 className="text-white font-medium mb-4">Détails de l'exécution</h4>
                      <div className="space-y-3">
                        {item.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(detail.status)}
                              <span className="text-white">{detail.action}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-gray-400">{detail.time}</span>
                              <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </PageLayout>
  );
} 