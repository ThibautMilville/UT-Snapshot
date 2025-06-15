'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
}

export function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    document.body.style.overflow = 'hidden';
    
    // Générer les particules côté client uniquement
    const generatedParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(generatedParticles);
    
    // Animation de progression plus fluide
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);

    // Réduction du temps de chargement à 1.2 secondes
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-[#000000] via-[#1A1A2E] to-[#16213E] w-screen h-screen z-50 flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          scale: 1.1,
          transition: { duration: 0.6, ease: "easeInOut" }
        }}
      >
        {/* Particules d'arrière-plan - seulement côté client */}
        {isClient && (
          <div className="absolute inset-0">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 bg-secondary/30 rounded-full"
                style={{
                  left: particle.left,
                  top: particle.top,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}

        {/* Logo principal avec animations améliorées */}
        <motion.div 
          className="relative mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
            transition: { 
              duration: 0.8, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }
          }}
        >
          <motion.div
            className="relative w-24 h-24"
            animate={{ 
              rotateY: [0, 360],
              transition: { 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              }
            }}
          >
            <Image
              src="/ultra.png"
              alt="Ultra Loading"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
          
          {/* Cercle lumineux autour du logo */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-secondary/50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Texte de chargement */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.3, duration: 0.6 }
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-secondary to-[#8757B2] text-transparent bg-clip-text">
            UltraTimes Snapshot
          </h2>
          <motion.p 
            className="text-white/70 text-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Initializing your snapshot experience...
          </motion.p>
        </motion.div>

        {/* Barre de progression moderne */}
        <motion.div
          className="w-64 h-1 bg-white/10 rounded-full overflow-hidden"
          initial={{ opacity: 0, width: 0 }}
          animate={{ 
            opacity: 1, 
            width: 256,
            transition: { delay: 0.5, duration: 0.5 }
          }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-[#8757B2] rounded-full relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Effet de brillance */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Pourcentage */}
        <motion.div
          className="mt-4 text-white/60 text-xs font-mono"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 0.7 }
          }}
        >
          {Math.round(Math.min(progress, 100))}%
        </motion.div>

        {/* Effet de vague en arrière-plan */}
        <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-secondary/20 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              clipPath: 'polygon(0 100%, 100% 100%, 100% 50%, 0 80%)'
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 