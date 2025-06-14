import React from 'react';
import Image from 'next/image';
import { Camera, Wallet } from 'lucide-react';
import Collaborators from './collaborators';
import { useAuth } from "@/contexts/AuthContext";
import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = () => {
    const { isAuthenticated, isConnecting, connectWallet } = useAuth();

    const imageVariants = {
        initial: { scale: 1 },
        hover: { 
            scale: 1.05,
            transition: { duration: 0.3 }
        }
    };

    const mainImageVariants = {
        initial: { scale: 1 },
        hover: { 
            scale: 1.02,
            transition: { duration: 0.4 }
        }
    };

    const floatingAnimation = {
        initial: { y: 0 },
        animate: {
            y: [-5, 5, -5],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
            <div className="min-h-[80vh] relative py-2 pb-16 md:py-32 px-4 bg-gradient-to-b from-foreground/10 to-foreground/10 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden -z-10">
                    <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/80 rounded-full blur-3xl" />
                </div>
                <div className="max-w-7xl mx-auto py-10 md:py-20">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-28 items-center">
                        <div className="flex flex-col h-full justify-between w-fit">
                            <div className="grid gap-4 md:gap-8">
                                <h1 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-[#AC46E7] to-[#8757B2] text-white bg-clip-text">
                                    Automate your snapshots and airdrops on Ultra
                                </h1>
                                <p className="text-sm md:text-md text-white/80 font-light">
                                    Save time, engage your community, and manage your token holders effortlessly. A powerful solution for creators and collectors.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0">
                                {!isAuthenticated ? (
                                    <button 
                                        className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white px-8 md:px-12 py-3 md:py-4 rounded-full text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(172,70,231,0.3)] flex items-center justify-center gap-2"
                                        onClick={connectWallet}
                                        disabled={isConnecting}
                                    >
                                        {isConnecting ? (
                                            <>
                                                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Connecting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Wallet size={20} />
                                                <span>Connect Wallet</span>
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <Link href="/dashboard" className="w-full sm:w-auto">
                                        <button className="w-full bg-secondary hover:bg-secondary/90 text-white px-8 md:px-12 py-3 md:py-4 rounded-full text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(172,70,231,0.3)] flex items-center justify-center gap-2">
                                            <Wallet size={20} />
                                            <span>Go to Dashboard</span>
                                        </button>
                                    </Link>
                                )}
                                {!isAuthenticated ? (
                                    <button 
                                        className="w-full sm:w-auto bg-transparent text-white px-8 md:px-12 py-3 md:py-4 rounded-full text-sm font-semibold border shadow-[#FFFFFF] flex items-center justify-center gap-2"
                                        onClick={connectWallet}
                                        disabled={isConnecting}
                                    >
                                        <Camera size={20} />
                                        <span>Try It Out Now !</span>
                                    </button>
                                ) : (
                                    <Link href="/dashboard" className="w-full sm:w-auto">
                                        <button className="w-full bg-transparent text-white px-8 md:px-12 py-3 md:py-4 rounded-full text-sm font-semibold border shadow-[#FFFFFF] flex items-center justify-center gap-2">
                                            <Camera size={20} />
                                            <span>Create Snapshot</span>
                                        </button>
                                    </Link>
                                )}
                            </div>

                            <div className="flex flex-col gap-4 pt-8 w-auto">
                                <p className="text-sm md:text-md text-white font-semibold">
                                    Partners and Collaborations
                                </p>
                                <Collaborators />
                            </div>
                        </div>

                        <div className='flex flex-col gap-6 md:gap-8'>
                            <div className="grid grid-cols-4 gap-2 md:gap-4">
                                <motion.div 
                                    className="col-span-3"
                                    variants={mainImageVariants}
                                    initial="initial"
                                    whileHover="hover"
                                >
                                    <motion.div 
                                        className="relative h-[180px] md:h-full rounded-lg overflow-hidden shadow-[0_0_15px_rgba(172,70,231,0.3)]"
                                        variants={floatingAnimation}
                                        initial="initial"
                                        animate="animate"
                                    >
                                        <Image
                                            src="/nft3.jpg"
                                            alt="Main feature"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </motion.div>
                                </motion.div>

                                <div className="grid grid-rows-3 gap-2 md:gap-4">
                                    <motion.div 
                                        className="relative h-[55px] md:h-[140px] rounded-lg overflow-hidden shadow-[0_0_15px_rgba(172,70,231,0.3)]"
                                        variants={imageVariants}
                                        initial="initial"
                                        whileHover="hover"
                                    >
                                        <Image
                                            src="/nft1.jpg"
                                            alt="Feature 1"
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                    <motion.div 
                                        className="relative h-[55px] md:h-[140px] rounded-lg overflow-hidden shadow-[0_0_15px_rgba(172,70,231,0.3)]"
                                        variants={imageVariants}
                                        initial="initial"
                                        whileHover="hover"
                                    >
                                        <Image
                                            src="/nft2.jpg"
                                            alt="Feature 2"
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                    <motion.div 
                                        className="relative h-[55px] md:h-[140px] rounded-lg overflow-hidden shadow-[0_0_15px_rgba(172,70,231,0.3)]"
                                        variants={imageVariants}
                                        initial="initial"
                                        whileHover="hover"
                                    >
                                        <Image
                                            src="/nft6.jpg"
                                            alt="Feature 3"
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </div>
                            </div>

                            <div className='flex flex-col lg:flex-row w-full sm:items-start lg:items-center justify-between gap-4'>
                                <motion.div 
                                    className='flex flex-row gap-2 items-center'
                                    variants={floatingAnimation}
                                    initial="initial"
                                    animate="animate"
                                    transition={{ delay: 0.2 }}
                                >
                                    <Image
                                        src="/nft5.jpg"
                                        alt="Main feature"
                                        width={10}
                                        height={10}
                                        className="object-cover h-10 w-10 md:h-14 md:w-14 rounded-full"
                                        priority
                                    />
                                    <div className='flex flex-col'>
                                        <p className='text-white text-xs md:text-sm font-light'>Ultra</p>
                                        <p className='text-white text-xs md:text-sm font-light'>3,200 Snapshots</p>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className='flex flex-row gap-2 items-center'
                                    variants={floatingAnimation}
                                    initial="initial"
                                    animate="animate"
                                    transition={{ delay: 0.4 }}
                                >
                                    <Image
                                        src="/nft6.jpg"
                                        alt="Main feature"
                                        width={10}
                                        height={10}
                                        className="object-cover h-10 w-10 md:h-14 md:w-14 rounded-full"
                                        priority
                                    />
                                    <div className='flex flex-col'>
                                        <p className='text-white text-xs md:text-sm font-light'>Ultra</p>
                                        <p className='text-white text-xs md:text-sm font-light'>3,200 Snapshots</p>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className='flex flex-row gap-2 items-center'
                                    variants={floatingAnimation}
                                    initial="initial"
                                    animate="animate"
                                    transition={{ delay: 0.6 }}
                                >
                                    <Image
                                        src="/nft8.jpg"
                                        alt="Main feature"
                                        width={10}
                                        height={10}
                                        className="object-cover h-10 w-10 md:h-14 md:w-14 rounded-full"
                                        priority
                                    />
                                    <div className='flex flex-col'>
                                        <p className='text-white text-xs md:text-sm font-light'>Ultra</p>
                                        <p className='text-white text-xs md:text-sm font-light'>3,200 Snapshots</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Header;