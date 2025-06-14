'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A2E]/80 backdrop-blur-md border-b border-[#8757B2]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/ultra.png"
                alt="Ultra Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#AC46E7] to-[#8757B2] text-transparent bg-clip-text">
                Ultra-Times
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-white/80 hover:text-white transition-colors">
              Fonctionnalités
            </Link>
            <Link href="#pricing" className="text-white/80 hover:text-white transition-colors">
              Tarifs
            </Link>
            <Link href="#faq" className="text-white/80 hover:text-white transition-colors">
              FAQ
            </Link>
            <Link 
              href="/dashboard"
              className="bg-[#AC46E7] hover:bg-[#8757B2] text-white px-4 py-2 rounded-md transition-colors shadow-[0_0_10px_rgba(172,70,231,0.3)]"
            >
              Se Connecter
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white/80 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#28274A] border-t border-[#8757B2]/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="#features"
              className="block px-3 py-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Fonctionnalités
            </Link>
            <Link
              href="#pricing"
              className="block px-3 py-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Tarifs
            </Link>
            <Link
              href="#faq"
              className="block px-3 py-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 bg-[#AC46E7] hover:bg-[#8757B2] text-white rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Se Connecter
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 