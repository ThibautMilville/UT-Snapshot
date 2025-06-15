"use client"

import { useState } from "react"
import { motion } from "@/lib/motion"
import { Plus, Filter, Search, Grid, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/contexts/TranslationContext"
import { CreateSnapshotModal } from "@/components/modals/CreateSnapshotModal"
import { PageLayout } from "@/components/layout/PageLayout"

export default function SnapshotsPage() {
  const { t } = useTranslation()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t('snapshots.title')}
              </h1>
              <p className="text-gray-400 mt-2">{t('snapshots.subtitle')}</p>
            </div>

            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
            >
              <Plus size={20} />
              {t('snapshots.create')}
            </Button>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('general.search')}
                className="pl-10 bg-white/5 border-white/10 hover:border-purple-400/30 focus:border-purple-400/50 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/10 text-white"
              >
                <Filter size={16} className="mr-2" />
                {t('general.filter')}
              </Button>

              <div className="flex border border-white/10 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-white/10'}
                >
                  <Grid size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-white/10'}
                >
                  <List size={16} />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('snapshots.empty.title')}</h3>
              <p className="text-gray-400 mb-6">{t('snapshots.empty.description')}</p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                {t('snapshots.create')}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Modal */}
        <CreateSnapshotModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>
    </PageLayout>
  )
} 