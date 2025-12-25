"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ImageCarouselProps {
  images: string[]
  interval?: number
}

export function ImageCarousel({ images, interval = 4000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images, interval])

  const validImages = images.filter((img) => img)

  if (validImages.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden">
      {validImages.map((image, index) => (
        <motion.div
          key={image}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex ? 0.15 : 0 }}
          transition={{ duration: 1 }}
        >
          <img src={image || "/placeholder.svg"} alt={`Event ${index + 1}`} className="w-full h-full object-cover" />
        </motion.div>
      ))}
    </div>
  )
}
