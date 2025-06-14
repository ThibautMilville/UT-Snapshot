"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ImageVortexProps {
  images: string[]
  size?: number
  speed?: number
}

const ImageVortex = ({ images, size = 400, speed = 10 }: ImageVortexProps) => {
  const containerSize = size * 1.5

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-1000"
      style={{ opacity: 0.2 }}
    >
      {images.map((image, index) => {
        const initialX = (Math.random() - 0.5) * containerSize
        const initialY = (Math.random() - 0.5) * containerSize
        const initialZ = Math.random() * 100 - 50
        const initialRotateX = Math.random() * 360
        const initialRotateY = Math.random() * 360
        const initialRotateZ = Math.random() * 360

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
              x: initialX,
              y: initialY,
              z: initialZ,
              rotateX: initialRotateX,
              rotateY: initialRotateY,
              rotateZ: initialRotateZ,
              scale: 0.8,
            }}
            animate={{
              x: [
                initialX,
                initialX + (Math.random() - 0.5) * 100,
                initialX - (Math.random() - 0.5) * 100,
                initialX,
              ],
              y: [
                initialY,
                initialY + (Math.random() - 0.5) * 100,
                initialY - (Math.random() - 0.5) * 100,
                initialY,
              ],
              z: [
                initialZ,
                initialZ + (Math.random() - 0.5) * 50,
                initialZ - (Math.random() - 0.5) * 50,
                initialZ,
              ],
              rotateX: [initialRotateX, initialRotateX + 180, initialRotateX + 360],
              rotateY: [initialRotateY, initialRotateY + 180, initialRotateY + 360],
              rotateZ: [initialRotateZ, initialRotateZ + 180, initialRotateZ + 360],
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
