"use client"

import { keyFeatures } from '@/lib/data'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const KeyFeytures = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    }

    return (
        <section className="relative py-32 px-4 bg-gradient-to-b from-foreground/10 to-foreground/10 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/80 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/80 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
                >
                    Key Features
                </motion.h2>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {keyFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            className={cn(
                                "group relative bg-[#1A1A2E]/80 backdrop-blur-sm p-8 rounded-2xl",
                                "border border-white/10",
                                "shadow-[0_0_15px_rgba(98,44,108,0.2)]",
                                "hover:shadow-[0_0_30px_rgba(172,70,231,0.3)]",
                                "transition-all duration-300"
                            )}
                        >
                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                            
                            {/* Content */}
                            <div className="relative">
                                <div className="text-[#AC46E7] mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                                    {feature.title}
                                </h3>
                                <p className="text-white/70 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Decorative corner accents */}
                            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-secondary/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-secondary/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default KeyFeytures