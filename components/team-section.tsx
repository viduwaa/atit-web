"use client"

import { motion } from "framer-motion"

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  bio: string
}

interface TeamSectionProps {
  members: TeamMember[]
}

export function TeamSection({ members }: TeamSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl"
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Meet Our Leadership</h2>
          <p className="text-muted-foreground text-lg">Meet the visionary minds driving ATIT forward</p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {members.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="rounded-xl overflow-hidden bg-card border border-border/50 hover:border-secondary/50 transition-all h-full flex flex-col backdrop-blur-sm">
                {/* Member image container */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-secondary/20 to-primary/20">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Overlay gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Member info */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-secondary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-secondary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{member.bio}</p>

                  {/* Social icons placeholder */}
                  <div className="flex gap-3 mt-4 pt-4 border-t border-border/30">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.2 }}
                      className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 11-4 0V8H8v4a2 2 0 11-4 0V4z" />
                      </svg>
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.2 }}
                      className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1A4.5 4.5 0 1113.5 13H11V9.413h1.05V7.5h-1.05V6c0-.312.024-.623.068-.924h-.068c-.336 0-.672.015-1.008.046v1.36h-.744v1.932h.744V13H5.5z" />
                      </svg>
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.2 }}
                      className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                      aria-label="GitHub"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-4">Want to join our leadership team?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-secondary to-primary text-primary-foreground font-semibold hover:shadow-xl hover:shadow-primary/40 transition-shadow"
          >
            Apply Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
