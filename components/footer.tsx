"use client"

import { motion } from 'framer-motion'
import Link from 'next/link';
import React from 'react'

const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
};

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
};

const Footer = () => {
    return (
        <motion.footer
            className="relative py-32 bg-gradient-to-b from-foreground/10 to-foreground/10 overflow-hidden"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
        >
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/80 rounded-full blur-3xl" />
            </div>
            <motion.div
                className="max-w-7xl mx-auto px-4"
                variants={fadeInUp}
            >
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">UltraTimes Snapshot</h3>
                        <p className="text-white/70">
                            The simple solution to automate your snapshots and airdrops on Ultra blockchain.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-white/70 hover:text-white">Home</Link></li>
                            <li><Link href="/contact" className="text-white/70 hover:text-white">Contact</Link></li>
                            <li><Link href="/faq" className="text-white/70 hover:text-white">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-white/70 hover:text-white">Terms of Service</Link></li>
                            <li><Link href="/" className="text-white/70 hover:text-white">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2">
                            <li><a href="https://twitter.com/" className="text-white/70 hover:text-white">Twitter</a></li>
                            <li><a href="https://discord.gg/" className="text-white/70 hover:text-white">Discord</a></li>
                            <li><a href="mailto:test@york.com" className="text-white/70 hover:text-white">Email</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-[#8757B2]/20 text-center text-white/50">
                    © 2025 UltraTimes Snapshot. All rights reserved.
                </div>
            </motion.div>
        </motion.footer>
    )
}

export default Footer