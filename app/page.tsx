import { HomeHero } from "@/components/sections/HomeHero";
import { GlobalLeadership } from "@/components/sections/GlobalLeadership";
import { Intro }from "@/components/sections/Intro";
import { StatsBand } from "@/components/sections/StatsBand";
import { Identity, StatementOfFaith } from "@/components/sections/IdentityFaith";
import { VisionMission } from "@/components/sections/VisionMission";
import { Values } from "@/components/sections/Values";
import { GalleryPreview } from "@/components/sections/HomePreviews";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <GlobalLeadership />
      <Intro />
      <StatsBand />
      <Identity />
      <StatementOfFaith />
      <VisionMission />
      <Values />
      <GalleryPreview />
      <CTASection />
    </>
  );
}
