import React from 'react'
import { LanguageButtonProps } from '../../types/header.types'

const LanguageButton = ({ lang, isActive, onClick }: LanguageButtonProps) => {
  const flags = {
    en: (
      <svg className='w-6 h-4' viewBox='0 0 36 24'>
        <rect width='36' height='24' fill='#012169' />
        <path d='M0,0 L36,24 M36,0 L0,24' stroke='#fff' strokeWidth='2.4' />
        <path d='M18,0 L18,24 M0,12 L36,12' stroke='#fff' strokeWidth='4' />
        <path d='M18,0 L18,24 M0,12 L36,12' stroke='#C8102E' strokeWidth='2.4' />
      </svg>
    ),
    fr: (
      <svg className='w-6 h-4' viewBox='0 0 36 24'>
        <rect width='36' height='24' fill='#ED2939' />
        <rect width='12' height='24' fill='#002395' />
        <rect x='12' width='12' height='24' fill='#fff' />
      </svg>
    ),
    de: (
      <svg className='w-6 h-4' viewBox='0 0 36 24'>
        <rect width='36' height='8' fill='#000' />
        <rect y='8' width='36' height='8' fill='#DD0000' />
        <rect y='16' width='36' height='8' fill='#FFCE00' />
      </svg>
    ),
  }

  return (
    <button 
      className={`w-full p-3 hover:bg-gray-600 transition-colors flex items-center justify-center cursor-pointer border-none outline-none ${
        isActive ? 'bg-gray-600' : 'bg-transparent'
      }`} 
      role='menuitem' 
      aria-label={lang.toUpperCase()} 
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(lang);
      }}
    >
      {flags[lang]}
    </button>
  )
}

export default LanguageButton 