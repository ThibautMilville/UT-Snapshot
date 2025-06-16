'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingBar() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    // Démarrer le chargement
    setLoading(true)
    setProgress(0)

    // Simuler le progrès de chargement plus rapidement
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 30 + 20 // Progression plus rapide
      })
    }, 50) // Intervalle plus court

    // Terminer le chargement très rapidement
    const finishLoading = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setLoading(false)
        setProgress(0)
      }, 50) // Délai réduit
    }, 100) // Délai total très court

    return () => {
      clearInterval(progressInterval)
      clearTimeout(finishLoading)
    }
  }, [pathname])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed top-0 left-0 w-full h-1 z-[9999] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: progress / 100, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }} // Transition plus rapide
          style={{ transformOrigin: "left" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent"
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }} // Animation plus rapide
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
} 