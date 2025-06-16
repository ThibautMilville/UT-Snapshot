"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Settings, Rocket, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/contexts/TranslationContext';

const HowItWorks = () => {
  const { t } = useTranslation()
  
  const steps = [
    {
      icon: Zap,
      title: t('landing.howItWorks.connect.title'),
      description: t('landing.howItWorks.connect.description'),
      details: [
        t('landing.howItWorks.connect.detail1'),
        t('landing.howItWorks.connect.detail2'),
        t('landing.howItWorks.connect.detail3')
      ],
      color: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: Settings,
      title: t('landing.howItWorks.configure.title'),
      description: t('landing.howItWorks.configure.description'),
      details: [
        t('landing.howItWorks.configure.detail1'),
        t('landing.howItWorks.configure.detail2'),
        t('landing.howItWorks.configure.detail3')
      ],
      color: "from-purple-500 to-pink-500",
      delay: 0.2
    },
    {
      icon: Rocket,
      title: t('landing.howItWorks.automate.title'),
      description: t('landing.howItWorks.automate.description'),
      details: [
        t('landing.howItWorks.automate.detail1'),
        t('landing.howItWorks.automate.detail2'),
        t('landing.howItWorks.automate.detail3')
      ],
      color: "from-orange-500 to-red-500",
      delay: 0.3
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/20 to-purple-500/20 backdrop-blur-sm border border-secondary/30 rounded-full px-6 py-3 text-sm font-medium text-white/90 mb-6">
              <Zap className="w-4 h-4 text-secondary" />
              <span>{t('landing.howItWorks.badge')}</span>
            </div>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              {t('landing.howItWorks.title')}
            </span>
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {t('landing.howItWorks.subtitle')}
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: step.delay + 0.5, duration: 0.6 }}
                  >
                    <div className="w-12 h-0.5 bg-gradient-to-r from-white/30 to-transparent" />
                    <ArrowRight className="w-5 h-5 text-white/30 ml-2" />
                  </motion.div>
                </div>
              )}

              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/20 p-6 sm:p-8 group-hover:border-white/40 transition-all duration-300">
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />

                {/* Step Number */}
                <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-secondary to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <motion.div 
                  className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${step.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                    {step.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 pt-3 sm:pt-4">
                    {step.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/60"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: step.delay + 0.1 * detailIndex }}
                      >
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
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

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Link href="/snapshots">
            <motion.button
              className="group relative bg-gradient-to-r from-secondary to-purple-600 hover:from-secondary/90 hover:to-purple-600/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(172,70,231,0.3)] hover:shadow-[0_0_40px_rgba(172,70,231,0.5)] flex items-center justify-center gap-2 sm:gap-3 mx-auto text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Rocket className="w-5 h-5" />
              <span>{t('landing.howItWorks.cta')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;