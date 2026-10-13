import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = pageMetadata({ title: "Terms & Conditions", description: "The terms that apply to the use of the FGBMFI Singapore website.", path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="13 October 2026"
      intro="These terms apply to your use of this website. By using it, you agree to them. If you do not agree, please do not use the website."
      sections={[
        {
          heading: "About this website",
          paragraphs: [
            "This website is run by FGBMFI Singapore, the Singapore fellowship of the Full Gospel Business Men's Fellowship International. In these terms, “we”, “us” and “our” mean FGBMFI Singapore.",
            "The website is provided to share information about the fellowship, its beliefs, its activities and how to get in touch.",
          ],
        },
        {
          heading: "Using the website",
          paragraphs: ["You are welcome to browse this website and to share links to its pages. In using it, you agree not to:"],
          points: [
            "use it for anything unlawful, or in a way that could harm the website or other people's use of it;",
            "attempt to gain access to parts of the website, or to systems behind it, that are not open to the public;",
            "send spam, abusive or misleading messages through the contact form;",
            "copy the website's content in bulk by automated means.",
          ],
        },
        {
          heading: "Content and copyright",
          paragraphs: [
            "The text, photographs, video, logos and design of this website belong to FGBMFI Singapore or FGBMFI International, or are used with permission.",
            "You may view the content and share links to it for personal, non-commercial purposes. Please ask us before copying, republishing or adapting any of it elsewhere.",
            "The FGBMFI name and emblem may not be used in a way that suggests a connection with, or endorsement by, the fellowship without permission.",
          ],
        },
        {
          heading: "Photographs of people",
          paragraphs: ["The photographs on this website were taken at fellowship gatherings and events. If you appear in one and would like it removed, please contact us and we will take it down."],
        },
        {
          heading: "Events and information",
          paragraphs: [
            "We take care to keep event details and other information on this website accurate and up to date. Even so, dates, times, venues and speakers can change, sometimes at short notice.",
            "Please confirm the details with us before making travel or other arrangements. We are not responsible for costs that arise from a change to, or the cancellation of, an event.",
          ],
        },
        {
          heading: "Your enquiries",
          paragraphs: ["When you send us a message, please make sure the details you give are your own and are accurate. We handle the personal data you send us as described in our Privacy Policy."],
        },
        {
          heading: "Statements of faith and testimony",
          paragraphs: [
            "This website sets out the beliefs of the fellowship and may include personal testimonies. Testimonies describe the experience of the individuals who share them.",
            "Nothing on this website is professional advice, whether medical, legal, financial or otherwise. Please seek advice from a suitably qualified person where you need it.",
          ],
        },
        {
          heading: "Links to other websites",
          paragraphs: ["This website links to other sites, including that of FGBMFI International. We provide these links for convenience, do not control those sites, and are not responsible for their content or their availability."],
        },
        {
          heading: "Availability and liability",
          paragraphs: [
            "We aim to keep this website available and free of errors, but it is provided “as is”. We do not promise that it will always be available, uninterrupted or free of mistakes, and we may change or withdraw any part of it without notice.",
            "To the extent the law allows, FGBMFI Singapore is not liable for any loss or damage arising from your use of, or reliance on, this website. Nothing in these terms limits any liability that cannot be limited by law.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: ["These terms are governed by the laws of Singapore, and any dispute relating to them or to this website is subject to the jurisdiction of the courts of Singapore."],
        },
        {
          heading: "Changes to these terms",
          paragraphs: ["We may update these terms from time to time. The date at the top of this page shows when they were last changed. By continuing to use the website after a change, you accept the updated terms."],
        },
      ]}
    />
  );
}
