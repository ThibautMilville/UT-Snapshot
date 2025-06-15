"use client"

import { motion } from "@/lib/motion"
import Image from "next/image"
import { useState, useEffect } from "react"

interface ImageVortexProps {
  images: string[]
  size?: number
  speed?: number
}

interface AnimationValues {
  initialX: number
  initialY: number
  initialZ: number
  initialRotateX: number
  initialRotateY: number
  initialRotateZ: number
}

const ImageVortex = ({ images, size = 400, speed = 10 }: ImageVortexProps) => {
  const containerSize = size * 1.5
  const [animationValues, setAnimationValues] = useState<AnimationValues[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Générer les valeurs aléatoires uniquement côté client
    const values = images.map(() => ({
      initialX: (Math.random() - 0.5) * containerSize,
      initialY: (Math.random() - 0.5) * containerSize,
      initialZ: Math.random() * 100 - 50,
      initialRotateX: Math.random() * 360,
      initialRotateY: Math.random() * 360,
      initialRotateZ: Math.random() * 360,
    }))
    setAnimationValues(values)
  }, [images.length, containerSize])

  // Ne pas rendre le composant tant que nous ne sommes pas côté client
  if (!isClient || animationValues.length === 0) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-1000"
        style={{ opacity: 0.2 }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              width: size / 6,
              height: size / 6,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl transform-gpu">
              <Image
                src={image}
                alt={`Image ${index}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-1000"
      style={{ opacity: 0.2 }}
    >
      {images.map((image, index) => {
        const values = animationValues[index]
        if (!values) return null

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              width: size / 6,
              height: size / 6,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{
              x: values.initialX,
              y: values.initialY,
              z: values.initialZ,
              rotateX: values.initialRotateX,
              rotateY: values.initialRotateY,
              rotateZ: values.initialRotateZ,
              scale: 0.8,
            }}
            animate={{
              x: [
                values.initialX,
                values.initialX + (Math.random() - 0.5) * 100,
                values.initialX - (Math.random() - 0.5) * 100,
                values.initialX,
              ],
              y: [
                values.initialY,
                values.initialY + (Math.random() - 0.5) * 100,
                values.initialY - (Math.random() - 0.5) * 100,
                values.initialY,
              ],
              z: [
                values.initialZ,
                values.initialZ + (Math.random() - 0.5) * 50,
                values.initialZ - (Math.random() - 0.5) * 50,
                values.initialZ,
              ],
              rotateX: [values.initialRotateX, values.initialRotateX + 180, values.initialRotateX + 360],
              rotateY: [values.initialRotateY, values.initialRotateY + 180, values.initialRotateY + 360],
              rotateZ: [values.initialRotateZ, values.initialRotateZ + 180, values.initialRotateZ + 360],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl transform-gpu">
              <Image
                src={image}
                alt={`Image ${index}`}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default ImageVortex
