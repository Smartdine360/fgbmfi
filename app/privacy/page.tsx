import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = pageMetadata({ title: "Privacy Policy", description: "How FGBMFI Singapore collects, uses and protects personal data submitted through this website.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="We respect your privacy. This page explains what personal data we collect through this website and how we use it."
      sections={[
        { heading: "What we collect", paragraphs: ["When you send an enquiry, we collect the details you provide: your name, email address, phone number (if given) and the content of your message. The contact form is delivered to our inbox by FormSubmit (formsubmit.co), an email forwarding service."] },
        { heading: "How we use it", paragraphs: ["We use your details only to reply to your enquiry and, where you have asked, to connect you with a chapter or tell you about an event. We do not sell or rent personal data."] },
        { heading: "How long we keep it", paragraphs: ["We keep enquiry records only for as long as they are needed for the purpose for which you contacted us, or as required by law."] },
        { heading: "Your choices", paragraphs: ["You may ask to see, correct or delete the personal data we hold about you, or withdraw your consent to being contacted, by getting in touch through the contact page. We handle personal data in line with Singapore's Personal Data Protection Act (PDPA)."] },
      ]}
    />
  );
}
