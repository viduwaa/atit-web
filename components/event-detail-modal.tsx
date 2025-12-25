"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, MapPin, Users, Clock, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export interface EventDetail {
  id: number
  title: string
  date: string
  category: string
  image: string
  description: string
  fullDescription?: string
  venue?: string
  time?: string
  organizer?: string
  highlights?: string[]
  gallery?: string[]
}

interface EventDetailModalProps {
  event: EventDetail | null
  isOpen: boolean
  onClose: () => void
}

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    setCurrentSlide(0)
  }, [event?.id])

  if (!event) return null

  const images = event.gallery && event.gallery.length > 0 ? event.gallery : [event.image]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[1200px] w-[95vw] max-h-[92vh] overflow-hidden p-0 bg-card border border-border shadow-2xl"
        showCloseButton={false}
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none z-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <motion.button
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="absolute top-5 right-5 z-50 px-4 py-2 flex items-center gap-2 bg-muted/50 backdrop-blur-md border border-border hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 rounded-full group"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100">
            Close
          </span>
          <X className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-90" />
        </motion.button>

        <div className="grid lg:grid-cols-[1.15fr_1fr] max-h-[92vh]">
          {/* Left: Image Carousel */}
          <div
            className="relative h-80 lg:h-auto lg:min-h-[650px] overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Cinematic gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10 pointer-events-none opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/30 z-10 pointer-events-none lg:block hidden" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: isHovering ? 1.02 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={images[currentSlide] || "/placeholder.svg"}
                  alt={`${event.title} - Image ${currentSlide + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-6 left-0 z-20"
            >
              <div className="bg-accent text-accent-foreground px-5 py-2.5 flex items-center gap-3 rounded-r-full">
                <span className="w-1.5 h-1.5 bg-accent-foreground rounded-full animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em]">{event.category}</span>
              </div>
            </motion.div>

            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="w-11 h-11 bg-background/50 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-11 h-11 bg-background/50 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        idx === currentSlide ? "w-8 bg-accent" : "w-1 bg-foreground/30 hover:bg-foreground/50"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Content */}
          <div className="flex flex-col bg-card relative">
            {/* Subtle left border accent */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />

            <div className="flex-1 p-8 lg:p-10 xl:p-12 overflow-y-auto custom-scrollbar">
              {/* Title Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-8"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent mb-3 block">
                  Event Details
                </span>
                <h2 className="text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-foreground leading-[1.1] tracking-tight">
                  {event.title}
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="grid grid-cols-2 gap-3 mb-10"
              >
                <div className="p-4 bg-muted/30 border border-border rounded-lg hover:border-accent/50 transition-colors group">
                  <Calendar className="w-4 h-4 text-accent mb-2" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Date</p>
                  <p className="text-sm text-foreground font-medium">{event.date}</p>
                </div>
                {event.time && (
                  <div className="p-4 bg-muted/30 border border-border rounded-lg hover:border-accent/50 transition-colors group">
                    <Clock className="w-4 h-4 text-accent mb-2" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Time</p>
                    <p className="text-sm text-foreground font-medium">{event.time}</p>
                  </div>
                )}
                {event.venue && (
                  <div className="p-4 bg-muted/30 border border-border rounded-lg hover:border-accent/50 transition-colors group">
                    <MapPin className="w-4 h-4 text-accent mb-2" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Venue</p>
                    <p className="text-sm text-foreground font-medium">{event.venue}</p>
                  </div>
                )}
                {event.organizer && (
                  <div className="p-4 bg-muted/30 border border-border rounded-lg hover:border-accent/50 transition-colors group">
                    <Users className="w-4 h-4 text-accent mb-2" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Organizer</p>
                    <p className="text-sm text-foreground font-medium">{event.organizer}</p>
                  </div>
                )}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mb-10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium">About</span>
                  <span className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                </div>
                <p className="text-muted-foreground leading-[1.8] text-[15px]">
                  {event.fullDescription || event.description}
                </p>
              </motion.div>

              {/* Highlights */}
              {event.highlights && event.highlights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium">Highlights</span>
                    <span className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <div className="space-y-0">
                    {event.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.08 }}
                        className="flex items-start gap-4 py-3 border-b border-border/50 last:border-0 group hover:bg-muted/20 transition-colors px-2 -mx-2 rounded"
                      >
                        <span className="text-[11px] font-mono text-accent mt-0.5 w-5">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-8 lg:p-10 xl:p-12 pt-0"
            >
              <button className="w-full group relative h-14 bg-accent text-accent-foreground font-semibold text-sm uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 rounded-lg hover:shadow-lg hover:shadow-accent/20">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Register for Event
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
