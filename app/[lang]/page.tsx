"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navigation/Navbar";
import { Header, ImageVortex, HowItWorks, KeyFeatures, CTA } from "@/components/landing";
import Footer from "@/components/footer";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
};

interface Particle {
  id: number;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

interface HomeProps {
  params: { lang: string }
}

export default function Home({ params }: HomeProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  // Images pour le vortex
  const vortexImages = [
    "/ultra.png",
    "/ultra.png",
    "/ultra.png",
    "/ultra.png",
    "/ultra.png",
  ];

  useEffect(() => {
    setMounted(true);
    // Générer les particules côté client uniquement
    const generatedParticles = [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A2E] to-[#16213E] relative overflow-hidden">
      {/* Effets de fond animés */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs modernisés */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        
        {/* Grid pattern modernisé */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,69,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating particles - rendu côté client uniquement */}
        {mounted && (
          <div className="absolute inset-0">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-1 h-1 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full animate-pulse"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.animationDelay,
                  animationDuration: particle.animationDuration,
                }}
              />
            ))}
          </div>
        )}

        {/* Nouveaux effets lumineux */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping" />
          <div className="absolute top-20 right-20 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-500" />
          <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-1000" />
          <div className="absolute bottom-10 right-10 w-1 h-1 bg-cyan-400 rounded-full animate-ping delay-1500" />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10">
        <Navbar />
        <Header />
        <ImageVortex images={vortexImages} />
        <HowItWorks />
        <KeyFeatures />
        <CTA />
      </div>

      <Footer />
    </main>
  );
}


