import PortalPulse from "../components/PortalPulse"
import Hero from "../components/sections/Hero"
import About from "../components/sections/About"
import EventTimelineSection from "../components/sections/EventTimeline"
import FAQ from "../components/sections/FAQ"

export default function Page() {
  return (
    <>
      <PortalPulse />
      <Hero />
      <About />
      <EventTimelineSection />
      <FAQ />
    </>
  )
}
