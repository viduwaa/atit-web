"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { useState } from "react"

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    year: "",
    interests: [] as string[],
  })

  const interests = ["Web Development", "AI/ML", "IoT", "Mobile Dev", "Cloud Computing", "Cybersecurity"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div
          className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent"
          >
            Join ATIT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Become part of our innovation community
          </motion.p>
        </div>
      </section>

      {/* Join form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            className="rounded-xl bg-card border border-border/50 p-8 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Your name"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="your@email.com"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-2">Year of Study</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="">Select your year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold mb-4">Areas of Interest</label>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <motion.label
                    key={interest}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-secondary/50 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            interests: [...formData.interests, interest],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            interests: formData.interests.filter((i) => i !== interest),
                          })
                        }
                      }}
                      className="w-4 h-4 accent-secondary"
                    />
                    <span className="text-sm">{interest}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-secondary to-primary text-primary-foreground font-semibold hover:shadow-xl hover:shadow-primary/40 transition-shadow"
            >
              Submit Application
            </motion.button>
          </motion.form>
        </div>
      </section>
    </main>
  )
}
