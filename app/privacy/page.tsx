import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = pageMetadata({ title: "Privacy Policy", description: "How FGBMFI Singapore collects, uses and protects personal data submitted through this website.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="13 October 2026"
      intro="We respect your privacy. This policy explains what personal data we collect through this website, why we collect it and the choices you have."
      sections={[
        {
          heading: "Who we are",
          paragraphs: [
            "This website is run by FGBMFI Singapore, the Singapore fellowship of the Full Gospel Business Men's Fellowship International. In this policy, “we”, “us” and “our” mean FGBMFI Singapore.",
            "We handle personal data in line with Singapore's Personal Data Protection Act 2012 (PDPA).",
          ],
        },
        {
          heading: "What we collect",
          paragraphs: ["We collect only what you choose to give us, and a small amount of technical information needed to run the website."],
          points: [
            "Enquiries: when you use the contact form we receive your name, email address, phone number (if you give one), the subject you choose and your message.",
            "Emails and calls: if you write to us or call us directly, we receive whatever you share with us.",
            "Technical information: like most websites, the service that hosts this site records basic details of each visit, such as the date and time, the page requested and the visitor's IP address, to keep the site secure and working.",
          ],
          after: ["We do not ask for, and ask you not to send, sensitive information such as identity card numbers, financial details or health information through this website."],
        },
        {
          heading: "How we use it",
          paragraphs: ["We use your personal data only for the purpose for which you gave it:"],
          points: [
            "to reply to your enquiry;",
            "to tell you about a meeting or event you have asked about, or to connect you with the fellowship;",
            "to keep this website secure and to fix problems with it.",
          ],
          after: ["We do not sell, rent or trade personal data, and we do not use it for advertising."],
        },
        {
          heading: "Photographs",
          paragraphs: [
            "This website shows photographs taken at fellowship gatherings and events. They are shared to give a picture of the life of the fellowship.",
            "If you appear in a photograph on this website and would like it removed, please tell us which one and we will take it down.",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "Visitors to this website are not tracked with advertising or analytics cookies.",
            "The only cookie the website itself sets is a sign-in cookie for the fellowship's own administrators, which is not placed on visitors' devices.",
          ],
        },
        {
          heading: "Who we share it with",
          paragraphs: ["Your enquiry is read by the leaders of FGBMFI Singapore who are responsible for replying. A small number of service providers help us run the website and so handle data on our behalf:"],
          points: [
            "an email forwarding service (FormSubmit) that delivers contact-form messages to our inbox, and our email provider;",
            "the company that hosts this website;",
            "an image hosting service (Cloudinary) that stores the photographs shown in the gallery and on the events page.",
          ],
          after: [
            "Some of these providers store data on servers outside Singapore. Where they do, we rely on them to protect it to a standard comparable to the PDPA.",
            "We may also disclose personal data where the law requires us to.",
          ],
        },
        {
          heading: "How long we keep it",
          paragraphs: ["We keep enquiries only for as long as they are needed to deal with your request and for our records afterwards, or for as long as the law requires. When personal data is no longer needed we delete it."],
        },
        {
          heading: "How we protect it",
          paragraphs: [
            "This website is served over an encrypted (HTTPS) connection, and access to enquiries and to the website's administration is limited to those who need it.",
            "No method of sending or storing information is completely secure, so we cannot guarantee absolute security, but we take reasonable care to protect the personal data we hold.",
          ],
        },
        {
          heading: "Your choices",
          paragraphs: ["You may at any time:"],
          points: [
            "ask what personal data we hold about you;",
            "ask us to correct it if it is wrong or out of date;",
            "ask us to delete it;",
            "withdraw your consent to being contacted by us.",
          ],
          after: ["To do any of these, please get in touch using the details at the foot of this page. We will respond as soon as we reasonably can."],
        },
        {
          heading: "Children",
          paragraphs: ["This website is intended for adults. We do not knowingly collect personal data from children. If you believe a child has sent us personal data, please let us know and we will delete it."],
        },
        {
          heading: "Links to other websites",
          paragraphs: ["This website links to other sites, including that of FGBMFI International. Those sites have their own privacy policies, and we are not responsible for how they handle personal data."],
        },
        {
          heading: "Changes to this policy",
          paragraphs: ["We may update this policy from time to time. The date at the top of this page shows when it was last changed. Please check back occasionally."],
        },
      ]}
    />
  );
}
