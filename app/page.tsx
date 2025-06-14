"use client"

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import Header from "@/components/landing/header";
import { SnapshotListFixed } from "@/components/dashboard/snapshot/snapshot-list-fixed";
import Howitworks from "@/components/landing/howitworks";
import KeyFeytures from "@/components/landing/keyFeytures";
import Cta from "@/components/landing/cta";
import { motion } from "framer-motion";
import Footer from "@/components/footer";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-foreground/10 text-white py-10">
      <Navbar />

      <Header />
      <motion.div
        className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-28 bg-primary/10"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 to-primary/20 z-10 rounded-b-[50%] md:rounded-b-full w-[160%] md:w-[110%] left-[-30%] md:left-[-5%]" />
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-20 md:-top-40 -right-20 md:-right-40 w-40 md:w-80 h-40 md:h-80 bg-secondary/80 rounded-full blur-2xl md:blur-3xl" />
        </div>
        <div className="absolute inset-0 bottom-0">
          <Image
            src="/ultra.png"
            alt="Ultra Background"
            fill
            className="object-contain opacity-10"
            priority
          />
        </div>
        <motion.div
          className="relative z-20 text-center px-4 max-w-5xl mx-auto"
          variants={fadeInUp}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-secondary to-[#8757B2] text-transparent bg-clip-text leading-tight">
            Automate your snapshots and airdrops on Ultra with ease
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-white/80 max-w-3xl mx-auto">
            Save time, engage your community, and manage your token holders effortlessly
          </p>

          <div className="w-full max-w-4xl mx-auto">
            <SnapshotListFixed />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <Howitworks />
      </motion.div>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <KeyFeytures />
      </motion.div>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <Cta />
      </motion.div>

      <Footer />
    </div>
  );
}


