"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { PageBackground } from "@/components/page-background"
import { projectsData } from "@/data/home-data"
import { ProjectDetailModal, type ProjectDetail } from "@/components/project-detail-modal"

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleProjectClick = (project: ProjectDetail) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  // Extended project data with more details
  const extendedProjects: ProjectDetail[] = projectsData.map((project) => ({
    ...project,
    fullDescription:
      project.id === 1
        ? "The Smart Campus IoT System is a comprehensive solution designed to monitor and optimize campus resources in real-time. Using a network of Arduino-based sensors, the system collects data on energy consumption, occupancy levels, environmental conditions, and more. The data is processed and visualized through an intuitive dashboard, enabling facility managers to make data-driven decisions."
        : project.id === 2
          ? "Our AI Chatbot Platform leverages natural language processing to provide students with instant assistance for academic queries. Built with Python and modern NLP libraries, the chatbot can answer questions about course materials, deadlines, campus services, and general academic information. It learns from interactions to continuously improve its responses."
          : "The Mobile Learning App is a cross-platform educational application built with React Native. It features interactive learning modules, progress tracking, quizzes, and collaborative study tools. The app syncs seamlessly across devices and includes offline mode for learning on the go.",
    features:
      project.id === 1
        ? [
            "Real-time sensor data collection and monitoring",
            "Interactive dashboard with analytics",
            "Automated alerts and notifications",
            "Energy consumption optimization",
            "Historical data analysis and reporting",
          ]
        : project.id === 2
          ? [
              "Natural language understanding",
              "Context-aware responses",
              "Multi-language support",
              "Integration with university systems",
              "Continuous learning from interactions",
            ]
          : [
              "Cross-platform compatibility",
              "Offline mode support",
              "Interactive quizzes and assessments",
              "Progress tracking and analytics",
              "Collaborative study features",
            ],
    technologies:
      project.id === 1
        ? ["Arduino", "Node.js", "MongoDB", "React", "MQTT", "InfluxDB"]
        : project.id === 2
          ? ["Python", "TensorFlow", "FastAPI", "PostgreSQL", "Docker", "Redis"]
          : ["React Native", "Firebase", "TypeScript", "Redux", "Expo"],
    team:
      project.id === 1
        ? ["Ashan Wijesinghe", "Kavinda Perera", "Dilini Jayawardena"]
        : project.id === 2
          ? ["Lakshmi Fernando", "Nuwan Bandara", "Sachini Rathnayake"]
          : ["Chamara Silva", "Iresha Kumari", "Tharindu Lakshan"],
    gallery: [project.image],
    links: {
      demo: "#",
      github: "#",
    },
  }))

  return (
    <main className="min-h-screen bg-background relative">
      <PageBackground />
      <Navigation />

      {/* Hero section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6"
          >
            Our Work
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl font-bold mb-6 text-foreground tracking-tight"
          >
            Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Innovative solutions and creative implementations by ATIT members
          </motion.p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {extendedProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                onClick={() => handleProjectClick(project)}
                className="rounded-2xl overflow-hidden bg-card border border-border hover:border-foreground/20 transition-all group cursor-pointer h-full flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-muted">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-foreground/90 backdrop-blur-sm text-xs font-semibold text-background">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-foreground/80 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-full bg-muted text-muted-foreground font-medium border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors flex items-center gap-2"
                  >
                    View Details
                    <span className="text-lg">→</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Have an Idea?</h2>
            <p className="text-muted-foreground mb-8">
              We're always looking for innovative project ideas. Collaborate with us and bring your vision to life.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors"
            >
              Submit Your Idea
            </motion.button>
          </motion.div>
        </div>
      </section>

      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  )
}
