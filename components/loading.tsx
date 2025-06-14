'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-[#000000] w-screen h-screen z-50 flex items-center justify-center overflow-hidden">
      <div className="relative w-20 h-20 animate-pulse">
        <Image
          src="/ultra.png"
          alt="Ultra Loading"
          fill
          className="object-fit"
          priority
        />
      </div>
    </div>
  );
} 