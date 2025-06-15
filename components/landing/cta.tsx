"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, ArrowRight, Sparkles, Zap, Users, Shield } from 'lucide-react'
import { useAuth } from "@/contexts/AuthContext"
import Link from 'next/link'

const CTA = () => {
    const { isAuthenticated, isConnecting, connectWallet } = useAuth()

    const benefits = [
        { icon: Zap, text: "Lightning Fast Setup" },
        { icon: Shield, text: "Enterprise Security" },
        { icon: Users, text: "24/7 Support" },
        { icon: Sparkles, text: "No Hidden Fees" }
    ]

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-purple-500/10 to-blue-500/20" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
                
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-8">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {/* Badge */}
                    <motion.div 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/30 to-purple-500/30 backdrop-blur-sm border border-secondary/50 rounded-full px-6 py-3 text-sm font-medium text-white mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Sparkles className="w-4 h-4 text-secondary" />
                        <span>Ready to Get Started?</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </motion.div>

                    {/* Main Title */}
                    <motion.h2 
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <span className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
                            Join the Future of
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-secondary via-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Token Distribution
                        </span>
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p 
                        className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Start automating your snapshots and airdrops today. Join thousands of creators who trust Ultra-Times for their token distribution needs.
                    </motion.p>

                    {/* Benefits Grid */}
                    <motion.div 
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                                whileHover={{ y: -5, scale: 1.02 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                            >
                                <div className="w-12 h-12 bg-gradient-to-r from-secondary to-purple-600 rounded-2xl flex items-center justify-center">
                                    <benefit.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-white/80 text-sm font-medium text-center">
                                    {benefit.text}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        {!isAuthenticated ? (
                            <>
                                <motion.button
                                    className="group relative bg-gradient-to-r from-secondary to-purple-600 hover:from-secondary/90 hover:to-purple-600/90 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_0_40px_rgba(172,70,231,0.4)] hover:shadow-[0_0_60px_rgba(172,70,231,0.6)] flex items-center justify-center gap-4 min-w-[280px]"
                                    onClick={connectWallet}
                                    disabled={isConnecting}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    {isConnecting ? (
                                        <>
                                            <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Connecting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Rocket className="w-6 h-6" />
                                            <span>Start Free Today</span>
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                                        </>
                                    )}
                                </motion.button>

                                <motion.button
                                    className="group relative bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-5 rounded-2xl font-semibold text-lg border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-4 min-w-[280px]"
                                    onClick={connectWallet}
                                    disabled={isConnecting}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Sparkles className="w-6 h-6" />
                                    <span>View Demo</span>
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <Link href="/dashboard" className="w-full sm:w-auto">
                                    <motion.button
                                        className="w-full group relative bg-gradient-to-r from-secondary to-purple-600 hover:from-secondary/90 hover:to-purple-600/90 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-[0_0_40px_rgba(172,70,231,0.4)] hover:shadow-[0_0_60px_rgba(172,70,231,0.6)] flex items-center justify-center gap-4 min-w-[280px]"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <Rocket className="w-6 h-6" />
                                        <span>Go to Dashboard</span>
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                                    </motion.button>
                                </Link>

                                <Link href="/dashboard" className="w-full sm:w-auto">
                                    <motion.button
                                        className="w-full group relative bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-5 rounded-2xl font-semibold text-lg border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-4 min-w-[280px]"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Sparkles className="w-6 h-6" />
                                        <span>Create Snapshot</span>
                                    </motion.button>
                                </Link>
                            </>
                        )}
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div 
                        className="mt-16 pt-12 border-t border-white/10"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        <p className="text-white/60 text-sm mb-6">
                            Trusted by creators worldwide
                        </p>
                        
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                            {[
                                { number: "10,000+", label: "Active Users" },
                                { number: "50M+", label: "Tokens Distributed" },
                                { number: "99.9%", label: "Uptime" },
                                { number: "24/7", label: "Support" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                                >
                                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                        {stat.number}
                                    </div>
                                    <div className="text-white/60 text-xs">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        </section>
    )
}

export default CTA