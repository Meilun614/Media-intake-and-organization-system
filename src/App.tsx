import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { MissionSection } from "./components/MissionSection";
import { AboutProject } from "./components/AboutProject";
import { PipelineSection } from "./components/PipelineSection";
import { TechnologySection } from "./components/TechnologySection";
import { TeamSection } from "./components/TeamSection";
import { SkillsSection } from "./components/SkillsSection";
import { InteractiveDemoSection } from "./demo/InteractiveDemoSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MissionSection />
        <AboutProject />
        <PipelineSection />
        <TechnologySection />
        <TeamSection />
        <SkillsSection />
        <InteractiveDemoSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
