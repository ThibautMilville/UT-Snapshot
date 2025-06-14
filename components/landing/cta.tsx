"use client"

import Link from 'next/link'
import React from 'react'
import ImageVortex from './image-vortex'
import { motion } from 'framer-motion'

const Cta = () => {
    const collectionImages = [
        '/nft2.jpg',
        '/nft4.jpg',
        '/nft5.jpg',
        '/nft6.jpg',
        '/nft7.jpg',
        '/nft8.jpg',
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
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
        <motion.section 
            className="relative py-32 px-4 bg-gradient-to-b from-foreground/10 to-foreground/10 overflow-hidden min-h-screen flex items-center justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
        >
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-secondary/80 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/80 rounded-full blur-3xl" />
            </div>
            <ImageVortex images={collectionImages} size={1200} speed={10} />
            <motion.div 
                className="max-w-4xl mx-auto text-center relative z-10"
                variants={containerVariants}
            >
                <motion.h2 
                    className="text-3xl md:text-4xl font-bold mb-6"
                    variants={itemVariants}
                >
                    Ready to automate your snapshots?
                </motion.h2>
                <motion.p 
                    className="text-xl text-white/80 mb-8"
                    variants={itemVariants}
                >
                    Join the projects that trust UltraTimes Snapshot to manage their collections.
                </motion.p>
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        href="/dashboard"
                        className="inline-block bg-[#AC46E7] hover:bg-[#8757B2] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-[0_0_15px_rgba(172,70,231,0.3)]"
                    >
                        Launch UltraTimes Snapshot dApp
                    </Link>
                </motion.div>
            </motion.div>
        </motion.section>
    )
}

export default Cta