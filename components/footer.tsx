"use client"

import { motion } from '@/lib/motion'
import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import { ExternalLink, Heart, MapPin, Mail, Phone } from 'lucide-react';

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
    const quickLinks = [
        { href: "/", label: "Accueil" },
        { href: "/snapshots", label: "Snapshots" },
        { href: "/analytics", label: "Analytics" },
        { href: "/faq", label: "FAQ" }
    ];

    const legalLinks = [
        { href: "/terms", label: "Conditions d'utilisation" },
        { href: "/privacy", label: "Politique de confidentialité" },
        { href: "/cookies", label: "Politique des cookies" }
    ];

    const supportLinks = [
        { href: "/contact", label: "Contact" },
        { href: "/support", label: "Support" },
        { href: "/documentation", label: "Documentation" },
        { href: "/status", label: "Statut du service" }
    ];

    return (
        <motion.footer
            className="relative pt-10 bg-gradient-to-b from-black/40 to-black/80 backdrop-blur-xl overflow-hidden border-t border-white/10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,69,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <motion.div
                className="max-w-7xl mx-auto px-4"
                variants={fadeInUp}
            >
                {/* Main Footer Content */}
                <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-12 mb-10">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block group mb-6">
                            <motion.div 
                                className="flex items-center space-x-4"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="relative w-12 h-12">
                                    <Image
                                        src="/logo-ut.png"
                                        alt="UltraTimes Logo"
                                        fill
                                        className="object-contain group-hover:drop-shadow-lg transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                                        UT Snapshot
                                    </h3>
                                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                        Automatisez vos snapshots Web3
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                        
                        <p className="text-gray-300 text-sm leading-relaxed max-w-md mb-8">
                            La solution simple et puissante pour automatiser vos snapshots et airdrops sur la blockchain Ultra. 
                            Gagnez du temps, engagez votre communauté et gérez vos détenteurs de tokens sans effort.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-3 mb-8">
                            <div className="flex items-center space-x-3 text-sm text-gray-400">
                                <Mail className="h-4 w-4 text-purple-400" />
                                <span>contact@ultratimes.io</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-400">
                                <MapPin className="h-4 w-4 text-purple-400" />
                                <span>France, Europe</span>
                            </div>
                        </div>
                        
                        {/* Social Links - Modernisés avec plus d'espace */}
                        <div className="flex items-center space-x-4">
                            <motion.a
                                href="https://x.com/Ultra_TimesEN"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                                <div className="relative bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 group-hover:border-blue-400/50 group-hover:bg-white/10 transition-all duration-300">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </div>
                            </motion.a>

                            <motion.a
                                href="https://www.instagram.com/ultratimes/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-600 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                                <div className="relative bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 group-hover:border-pink-400/50 group-hover:bg-white/10 transition-all duration-300">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </div>
                            </motion.a>

                            <motion.a
                                href="https://www.youtube.com/@ultra-times"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                                <div className="relative bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 group-hover:border-red-400/50 group-hover:bg-white/10 transition-all duration-300">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                </div>
                            </motion.a>

                            <motion.a
                                href="https://www.twitch.tv/ultratimes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                                <div className="relative bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 group-hover:border-purple-400/50 group-hover:bg-white/10 transition-all duration-300">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                                    </svg>
                                </div>
                            </motion.a>

                            <motion.a
                                href="https://discord.com/invite/Pgh85akHj8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                                <div className="relative bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 group-hover:border-indigo-400/50 group-hover:bg-white/10 transition-all duration-300">
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                                    </svg>
                                </div>
                            </motion.a>
                        </div>
                    </div>

                    {/* Navigation rapide */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                            <ExternalLink size={16} className="mr-2 text-purple-400" />
                            Navigation
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <motion.li 
                                    key={index}
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link 
                                        href={link.href} 
                                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Support</h4>
                        <ul className="space-y-3">
                            {supportLinks.map((link, index) => (
                                <motion.li 
                                    key={index}
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link 
                                        href={link.href} 
                                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Légal */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Légal</h4>
                        <ul className="space-y-3">
                            {legalLinks.map((link, index) => (
                                <motion.li 
                                    key={index}
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link 
                                        href={link.href} 
                                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                                    >
                                        <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    className="py-4 border-t border-white/10"
                    variants={fadeInUp}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                        <div className="flex items-center text-sm text-gray-400">
                            <span>© {new Date().getFullYear()} UltraTimes. Tous droits réservés.</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-400">
                            <span>Fait avec</span>
                            <Heart className="h-4 w-4 text-red-400 mx-2 animate-pulse" />
                            <span>pour la communauté Ultra</span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                                Service opérationnel
                            </span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.footer>
    )
}

export default Footer