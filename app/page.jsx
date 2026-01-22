import PortalPulse from "../components/PortalPulse"
import EventTimelineSection from "../components/sections/EventTimeline"
import FAQ from "../components/sections/FAQ"
import Parallax from '../components/Parallax'
import Hero from '../components/Hero'
import AboutUs from '../components/AboutUs'
export default function Page() {
  return (
    <>
      <PortalPulse />
      <Parallax />
      <Hero />
      <AboutUs />
      <EventTimelineSection />
      <FAQ />
    </>
  )
}
