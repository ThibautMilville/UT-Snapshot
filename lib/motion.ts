"use client"

// Wrapper pour Framer Motion compatible avec Next.js 15
import { motion as framerMotion, AnimatePresence as framerAnimatePresence } from "framer-motion"

export const motion = framerMotion
export const AnimatePresence = framerAnimatePresence

export type { Variants, Transition } from "framer-motion" 