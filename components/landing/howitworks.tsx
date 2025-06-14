"use client"

import React, { useEffect, useRef } from 'react'
import { ArrowRight, Clock, Settings, Zap, CheckCircle2, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

const HowItWorks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        ctx.fillStyle = 'rgba(172, 70, 231, 0.2)'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const steps = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Schedule Your Snapshots",
      description: "Configure your snapshots with an intuitive interface. Set frequency, conditions, and parameters according to your needs.",
      features: [
        "Flexible scheduling (daily, weekly, monthly)",
        "Customizable conditions",
        "Real-time notifications",
        "Complete snapshot history",
        "CSV data export"
      ],
      benefits: [
        "Significant time savings",
        "Reduced human errors",
        "Accurate holder tracking"
      ]
    },
    {
      icon: <Settings className="w-12 h-12" />,
      title: "Customize Your Conditions",
      description: "Create complex rules to precisely target your token holders. Use logical operators and time-based conditions.",
      features: [
        "Logical operators (AND, OR, NOT)",
        "Time-based conditions",
        "Advanced filters",
        "Holding conditions",
        "Customizable thresholds"
      ],
      benefits: [
        "Precise targeting",
        "Maximum flexibility",
        "Adaptation to your needs"
      ]
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Automate Your Airdrops",
      description: "Automatically execute your airdrops based on snapshots. Manage your UNIQ and UOS token distributions with ease.",
      features: [
        "Automatic distribution",
        "Multi-token support",
        "Real-time tracking",
        "Detailed reports",
        "Ultra integration"
      ],
      benefits: [
        "Automated process",
        "Complete transparency",
        "Cost savings"
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-24 bg-primary/10 relative overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-highlight bg-clip-text mb-4">
            How It Works
          </h2>
          <p className="text-md text-white max-w-2xl mx-auto">
            A simple and powerful solution to manage your snapshots and airdrops on Ultra
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="group relative bg-foreground/50 p-8 rounded-2xl border border-white/10 hover:border-[#AC46E7]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(172,70,231,0.2)]"
            >
              <div className="absolute -top-4 left-8 bg-highlight text-white px-4 py-1 rounded-full text-sm font-semibold">
                Step {index + 1}
              </div>
              
              <div className="text-[#AC46E7] mb-6 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {step.title}
              </h3>
              
              <p className="text-white/70 mb-6">
                {step.description}
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-[#AC46E7] mr-2" />
                    Features
                  </h4>
                  <ul className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-white/80">
                        <ChevronRight className="w-4 h-4 text-[#AC46E7] mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-[#AC46E7] mr-2" />
                    Benefits
                  </h4>
                  <ul className="space-y-3">
                    {step.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-white/80">
                        <ChevronRight className="w-4 h-4 text-[#AC46E7] mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <button className="bg-[#AC46E7] hover:bg-[#8757B2] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(172,70,231,0.3)] hover:shadow-[0_0_25px_rgba(172,70,231,0.5)] hover:scale-105">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks