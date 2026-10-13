import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = pageMetadata({ title: "Terms of Use", description: "The terms that apply to the use of the FGBMFI Singapore website.", path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="By using this website you agree to the terms below."
      sections={[
        { heading: "Use of this website", paragraphs: ["This website is provided for information about FGBMFI Singapore and its activities. You are welcome to browse it and to share links to its pages."] },
        { heading: "Content", paragraphs: ["Text, photographs and other material on this site belong to FGBMFI Singapore or are used with permission. Please ask before reproducing them elsewhere.", "Testimonies express the personal experience of the individuals who share them."] },
        { heading: "Events and information", paragraphs: ["We take care to keep event details and other information accurate, but dates, times and venues may change. Please confirm details with us before travelling."] },
        { heading: "External links", paragraphs: ["This site links to other websites, including that of FGBMFI International. We are not responsible for the content of external sites."] },
      ]}
    />
  );
}
