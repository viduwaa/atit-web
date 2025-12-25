import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { EventsPreview } from "@/components/events-preview"
import { ProjectsPreview } from "@/components/projects-preview"
import { TeamSection } from "@/components/team-section"
import { WhoWeAreSection } from "@/components/who-we-are"
import { heroData, featuresData, eventsData, projectsData, teamData, navData, whoWeAreData } from "@/data/home-data"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation logo={navData.logo} />
      <HeroSection title={heroData.title} subtitle={heroData.subtitle} cta={heroData.cta} logo={heroData.logo} />
      <WhoWeAreSection data={whoWeAreData} />
      <EventsPreview events={eventsData} />
      <ProjectsPreview projects={projectsData} />
      <TeamSection members={teamData} />
    </main>
  )
}
