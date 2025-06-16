import React from 'react';
import Image from 'next/image';
import { Camera, Wallet, Sparkles, Zap, Shield } from 'lucide-react';
import Collaborators from './collaborators';
import { useAuth } from "@/contexts/AuthContext";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/contexts/TranslationContext';

const Header = () => {
    const { isAuthenticated, isConnecting, connectWallet } = useAuth();
    const { t } = useTranslation();

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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <motion.section 
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Animated gradient orbs */}
                <motion.div 
                    className="absolute top-20 left-20 w-72 h-72 bg-secondary/30 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                
                {/* Floating elements */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white/10 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0, 1, 0],
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
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Content */}
                    <motion.div 
                        className="text-center lg:text-left space-y-8"
                        variants={itemVariants}
                    >
                        {/* Badge */}
                        <motion.div 
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/20 to-purple-500/20 backdrop-blur-sm border border-secondary/30 rounded-full px-6 py-3 text-sm font-medium text-white/90"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Sparkles className="w-4 h-4 text-secondary" />
                            <span>Powered by Ultra Blockchain</span>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        </motion.div>

                        {/* Main Title */}
                        <motion.div variants={itemVariants}>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                                    Automate your
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-secondary via-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    Snapshots & Airdrops
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                                    on Ultra
                                </span>
                            </h1>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p 
                            className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed"
                            variants={itemVariants}
                        >
                            Save time, engage your community, and manage your token holders effortlessly with our advanced automation platform.
                        </motion.p>

                        {/* Features List */}
                        <motion.div 
                            className="flex flex-wrap gap-6 justify-center lg:justify-start"
                            variants={itemVariants}
                        >
                            {[
                                { icon: Zap, text: "Instant Automation" },
                                { icon: Shield, text: "Secure & Reliable" },
                                { icon: Sparkles, text: "Easy to Use" }
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-white/60">
                                    <feature.icon className="w-5 h-5 text-secondary" />
                                    <span className="text-sm font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            variants={itemVariants}
                        >
                            {!isAuthenticated ? (
                                <>
                                    <motion.button 
                                        className="group relative bg-gradient-to-r from-secondary to-purple-600 hover:from-secondary/90 hover:to-purple-600/90 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(172,70,231,0.3)] hover:shadow-[0_0_40px_rgba(172,70,231,0.5)] flex items-center justify-center gap-3"
                                        onClick={connectWallet}
                                        disabled={isConnecting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {isConnecting ? (
                                            <>
                                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Connecting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Wallet className="w-5 h-5" />
                                                <span>Connect Ultra Wallet</span>
                                            </>
                                        )}
                                    </motion.button>
                                    
                                    <Link href="/snapshots">
                                        <motion.button 
                                            className="group relative bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-3"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Camera className="w-5 h-5" />
                                            <span>Try Demo</span>
                                        </motion.button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/snapshots">
                                        <motion.button 
                                            className="group relative bg-gradient-to-r from-secondary to-purple-600 hover:from-secondary/90 hover:to-purple-600/90 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-[0_0_30px_rgba(172,70,231,0.3)] hover:shadow-[0_0_40px_rgba(172,70,231,0.5)] flex items-center justify-center gap-3"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <Camera size={20} />
                                            <span>View Snapshots</span>
                                        </motion.button>
                                    </Link>
                                    
                                    <Link href="/snapshots">
                                        <motion.button 
                                            className="group relative bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-3"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Camera size={20} />
                                            <span>Create Snapshot</span>
                                        </motion.button>
                                    </Link>
                                </>
                            )}
                        </motion.div>

                        {/* Stats */}
                        <motion.div 
                            className="flex flex-wrap gap-6 md:gap-8 justify-center lg:justify-start pt-8"
                            variants={itemVariants}
                        >
                            {[
                                { number: "10K+", label: "Snapshots Created" },
                                { number: "50M+", label: "Tokens Distributed" },
                                { number: "99.9%", label: "Uptime" }
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                                    <div className="text-sm text-white/60">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Visual */}
                    <motion.div 
                        className="relative flex justify-center lg:justify-end mt-12 lg:mt-0"
                        variants={itemVariants}
                    >
                        <div className="relative">
                            {/* Main Image Container */}
                            <motion.div 
                                className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]"
                                animate={floatingAnimation}
                            >
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-purple-500/30 rounded-full blur-3xl scale-110" />
                                
                                {/* Main Image */}
                                <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden flex items-center justify-center">
                                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
                                        <div className="relative w-full h-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full border border-purple-400/30 flex items-center justify-center">
                                            <Camera className="w-24 h-24 md:w-32 md:h-32 text-white drop-shadow-2xl" />
                                        </div>
                                        
                                        {/* Orbiting elements */}
                                        <motion.div 
                                            className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Zap className="w-4 h-4 text-white" />
                                        </motion.div>
                                        
                                        <motion.div 
                                            className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Sparkles className="w-3 h-3 text-white" />
                                        </motion.div>
                                        
                                        <motion.div 
                                            className="absolute top-1/2 left-0 w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                                            animate={{ 
                                                scale: [1, 1.2, 1],
                                                opacity: [0.7, 1, 0.7]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                    </div>
                                    
                                    {/* Overlay Effects */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-purple-500/20" />
                                </div>

                                {/* Floating Cards */}
                                <motion.div 
                                    className="absolute -top-4 sm:-top-8 -left-4 sm:-left-8 bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-sm rounded-lg sm:rounded-2xl p-2 sm:p-4 border border-green-400/30"
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 2, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5
                                    }}
                                >
                                    <div className="flex items-center gap-1 sm:gap-2 text-white">
                                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-300 rounded-full animate-pulse" />
                                        <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">Live Snapshots</span>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 bg-gradient-to-r from-blue-500/90 to-cyan-500/90 backdrop-blur-sm rounded-lg sm:rounded-2xl p-2 sm:p-4 border border-blue-400/30"
                                    animate={{
                                        y: [0, 10, 0],
                                        rotate: [0, -2, 0],
                                    }}
                                    transition={{
                                        duration: 3.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                >
                                    <div className="flex items-center gap-1 sm:gap-2 text-white">
                                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-300 rounded-full animate-pulse" />
                                        <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">Auto Airdrops</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default Header;