"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Shield, 
  Zap, 
  Clock, 
  BarChart3, 
  Users, 
  Sparkles,
  CheckCircle,
  ArrowRight,
  Globe,
  Lock,
  Rocket,
  Target
} from 'lucide-react'
import { useTranslation } from '@/contexts/TranslationContext'

const KeyFeatures = () => {
  const { t } = useTranslation()
  
  const features = [
    {
      icon: Shield,
      title: t('landing.features.security.title'),
      description: t('landing.features.security.description'),
      details: [
        t('landing.features.security.detail1'),
        t('landing.features.security.detail2'),
        t('landing.features.security.detail3')
      ],
      color: "from-green-500 to-emerald-500",
      delay: 0.1
    },
    {
      icon: Zap,
      title: t('landing.features.speed.title'),
      description: t('landing.features.speed.description'),
      details: [
        t('landing.features.speed.detail1'),
        t('landing.features.speed.detail2'),
        t('landing.features.speed.detail3')
      ],
      color: "from-yellow-500 to-orange-500",
      delay: 0.2
    },
    {
      icon: Clock,
      title: t('landing.features.automation.title'),
      description: t('landing.features.automation.description'),
      details: [
        t('landing.features.automation.detail1'),
        t('landing.features.automation.detail2'),
        t('landing.features.automation.detail3')
      ],
      color: "from-blue-500 to-cyan-500",
      delay: 0.3
    },
    {
      icon: BarChart3,
      title: t('landing.features.analytics.title'),
      description: t('landing.features.analytics.description'),
      details: [
        t('landing.features.analytics.detail1'),
        t('landing.features.analytics.detail2'),
        t('landing.features.analytics.detail3')
      ],
      color: "from-purple-500 to-pink-500",
      delay: 0.4
    },
    {
      icon: Users,
      title: t('landing.features.community.title'),
      description: t('landing.features.community.description'),
      details: [
        t('landing.features.community.detail1'),
        t('landing.features.community.detail2'),
        t('landing.features.community.detail3')
      ],
      color: "from-indigo-500 to-purple-500",
      delay: 0.5
    },
    {
      icon: Globe,
      title: t('landing.features.integration.title'),
      description: t('landing.features.integration.description'),
      details: [
        t('landing.features.integration.detail1'),
        t('landing.features.integration.detail2'),
        t('landing.features.integration.detail3')
      ],
      color: "from-teal-500 to-green-500",
      delay: 0.6
    }
  ]

  const stats = [
    { number: "99.9%", label: t('landing.features.stats.uptime'), icon: Target },
    { number: "10K+", label: t('landing.features.stats.snapshots'), icon: BarChart3 },
    { number: "50M+", label: t('landing.features.stats.tokens'), icon: Sparkles },
    { number: "24/7", label: t('landing.features.stats.support'), icon: Users }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-secondary/5 via-transparent to-purple-500/5" />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/20 to-purple-500/20 backdrop-blur-sm border border-secondary/30 rounded-full px-6 py-3 text-sm font-medium text-white/90 mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>{t('landing.features.badge')}</span>
            </div>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              {t('landing.features.title')}
            </span>
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {t('landing.features.subtitle')}
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/20 p-6 sm:p-8 group-hover:border-white/40 transition-all duration-300">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />

                {/* Icon */}
                <motion.div 
                  className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 pt-2">
                    {feature.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/60"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: feature.delay + 0.1 * detailIndex }}
                      >
                        <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                        <span className="leading-tight">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/5 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Stats Background */}
          <div className="relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-purple-500/10 to-blue-500/10 rounded-3xl" />
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Trusted by Thousands
                </h3>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Join the growing community of creators who trust Ultra-Times for their token distribution needs.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-secondary to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/60 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Link href="/snapshots">
            <motion.button
              className="group relative bg-gradient-to-r from-secondary to-purple-600 hover:from-secondary/90 hover:to-purple-600/90 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(172,70,231,0.3)] hover:shadow-[0_0_40px_rgba(172,70,231,0.5)] flex items-center justify-center gap-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Rocket className="w-5 h-5" />
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default KeyFeatures