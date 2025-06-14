"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Users, Star, TrendingUp } from 'lucide-react'

const partners = [
    {
        name: "Ultra",
        logo: "/ultra.png",
        description: "Official Partner",
        color: "#1A1A2E",
        stats: {
            users: "2.5M+",
            rating: "4.9",
            growth: "+15%"
        },
        highlights: ["Leading NFT Platform", "High Performance", "Secure Infrastructure"]
    },
    {
        name: "NFT World",
        logo: "/nft1.jpg",
        description: "Strategic Partner",
        color: "#28274A",
        stats: {
            users: "1.8M+",
            rating: "4.8",
            growth: "+12%"
        },
        highlights: ["Innovative Solutions", "Global Reach", "Community Driven"]
    },
    {
        name: "Crypto Art",
        logo: "/nft2.jpg",
        description: "Technology Partner",
        color: "#1C1C1C",
        stats: {
            users: "950K+",
            rating: "4.7",
            growth: "+20%"
        },
        highlights: ["Creative Technology", "Artist Focused", "Future Ready"]
    }
]

const Collaborators = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const duration = 5000 
        const interval = 10 
        const steps = duration / interval
        const increment = 100 / steps

        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    setCurrentIndex((prevIndex) => 
                        prevIndex === partners.length - 1 ? 0 : prevIndex + 1
                    )
                    return 0
                }
                return prevProgress + increment
            })
        }, interval)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div 
                    className="flex transition-transform duration-500 ease-in-out w-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {partners.map((partner, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0 w-full"
                        >
                            <div 
                                className="relative flex flex-col p-3 sm:p-4 px-4 sm:px-6 rounded-lg hover:bg-background/20 transition-all duration-300 group"
                                style={{ backgroundColor: `${partner.color}` }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 ring-white/20 group-hover:ring-white/40 transition-all duration-300">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">{partner.name}</h4>
                                        <p className="text-white/60 text-[10px] sm:text-xs">{partner.description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                                    <div className="flex items-center gap-1 sm:gap-2 text-white/80">
                                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span className="text-[10px] sm:text-xs">{partner.stats.users} Users</span>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-2 text-white/80">
                                        <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-[10px] sm:text-sm">{partner.stats.rating} Rating</span>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-2 text-white/80">
                                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-[10px] sm:text-sm">{partner.stats.growth} Growth</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 h-0.5 sm:h-1 bg-primary w-full rounded-full">
                                    <div 
                                        className="h-full bg-secondary transition-all duration-100 rounded-full"
                                        style={{ width: `${index === currentIndex ? progress : 0}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Collaborators