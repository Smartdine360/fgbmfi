import type { LucideIcon } from "lucide-react";
import { BookOpenText, Briefcase, Compass, Crown, Flame, Gem, Globe, Handshake, HeartHandshake, Megaphone, ShieldCheck, Sparkles } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Core site configuration                                                   */
/* -------------------------------------------------------------------------- */

export const site = {
  name: "FGBMFI Singapore",
  fullName: "Full Gospel Business Men's Fellowship International, Singapore",
  tagline: "Faith. Fellowship. Leadership. Impact.",
  description:
    "FGBMFI Singapore connects Christian business leaders, professionals and believers to grow in faith, build meaningful relationships and make a lasting impact in the marketplace and community.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fgbsg.com",
  internationalUrl: "https://www.fgbmfi.org",
  // The facts below are taken from the international site, www.fgbmfi.org (October 2026).
  international: {
    name: "Full Gospel Business Men's Fellowship International",
    motto: "Preparing People to Transform Nations",
    president: "Francis Owusu",
    headquarters: "Irvine, California",
  },
  keywords: [
    "FGBMFI Singapore",
    "Full Gospel Business Men's Fellowship Singapore",
    "Christian business fellowship Singapore",
    "Christian business leaders Singapore",
    "FGBMFI Singapore chapters",
  ],
};

/**
 * Official contact details. Leave a value as `null` to hide it; nothing is
 * invented for a missing phone number. `mapQuery` is what the map on the
 * contact page and the "Get directions" link search for.
 */
export const contact: { email: string | null; phone: string | null; address: string[] | null; mapQuery: string } = {
  email: "matthiasfgbsg@gmail.com",
  phone: "+65 8172 0011",
  address: ["140 Paya Lebar Road, #03-08", "AZ @ Paya Lebar", "Singapore 409015"],
  mapQuery: "AZ @ Paya Lebar, 140 Paya Lebar Road, Singapore 409015",
};

/**
 * Social links only appear in the footer once a real URL is supplied.
 */
export const socials: Array<{ label: string; url: string | null }> = [
  { label: "Facebook", url: null },
  { label: "Instagram", url: null },
  { label: "YouTube", url: null },
  { label: "LinkedIn", url: null },
];

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export type NavItem = { label: string; href: string; children?: Array<{ label: string; href: string; note: string }> };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "History", href: "/history" },
  { label: "Evangelism", href: "/evangelism" },
  { label: "Prayer Altar 2026", href: "/prayer-altar-2026" },
  { label: "Initiatives", href: "/initiatives" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
];

export const footerNav = {
  explore: [
    { label: "About Us", href: "/about" },
    { label: "History", href: "/history" },
    { label: "Evangelism", href: "/evangelism" },
    { label: "Initiatives", href: "/initiatives" },
  ],
  fellowship: [
    { label: "Prayer Altar 2026", href: "/prayer-altar-2026" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  FGBMFI at a glance                                                        */
/*  Only figures that can be sourced are shown. No Singapore-specific         */
/*  numbers are included until the fellowship supplies them.                  */
/* -------------------------------------------------------------------------- */

export type Stat = { value?: number; prefix?: string; suffix?: string; text?: string; label: string; note: string; plainYear?: boolean };

export const stats: Stat[] = [
// Source: www.fgbmfi.org — "Present in over 95 nations with thousands of local chapters".
  { value: 95, suffix: "+", label: "Nations", note: "One international fellowship, at work around the world" },
  { text: "Thousands", label: "Local Chapters", note: "Meeting in cities, towns and workplaces worldwide" },
  { value: 1952, label: "Founded", note: "Begun in Los Angeles by Demos Shakarian", plainYear: true },
  { text: "Singapore", label: "Local Fellowship", note: "Part of the global family, rooted in this city" },
];

/* -------------------------------------------------------------------------- */
/*  Purpose & values                                                          */
/* -------------------------------------------------------------------------- */

export type Feature = { title: string; description: string; icon: LucideIcon };

/**
 * The activities of FGBMFI International, as listed on www.fgbmfi.org. Only
 * what that site states is described here. It names Fire Teams and ALTS but
 * does not describe them, so their entry stays brief until the fellowship
 * supplies the wording.
 */
export const purposes: Feature[] = [
  { title: "Local Chapters", description: "The heart of the fellowship: thousands of local chapters in over 95 nations, working towards a chapter in every nation.", icon: Handshake },
  { title: "School of the Vision", description: "A tool designed exclusively for FGBMFI members, to strengthen their calling and equip them spiritually.", icon: Compass },
  { title: "Global Prayer", description: "A global prayer initiative in which members intercede for the nations.", icon: Sparkles },
  { title: "World Convention", description: "The international gathering of the fellowship. In 2026, delegations from 46 nations met in Bali, Indonesia.", icon: Globe },
  { title: "Fire Teams & ALTS", description: "Two further international programmes of the fellowship, with ALTS forming part of its training.", icon: Flame },
  { title: "Global Media & Publicity", description: "A vital pillar of the international strategy, recognising the part media plays in reaching every generation.", icon: Megaphone },
];

/** The initiatives of the Singapore chapter, as described by the chapter itself. */
export const initiatives: Array<Feature & { tag: string }> = [
  { title: "Marketplace Evangelism", tag: "Outreach", description: "Fellowship in love to transform pre-believers in the marketplace by our testimonies, empowered by the word of God.", icon: Megaphone },
  { title: "Professional Networking", tag: "Community", description: "Connecting with like-minded believers to foster meaningful business relationships and support.", icon: Handshake },
  { title: "Leadership Mentoring", tag: "Growth", description: "Cultivating leadership skills grounded in strong, uncompromised spiritual principles.", icon: Compass },
];

/** The seven core values of FGBMFI, in the fellowship's own words. */
export const values: Feature[] = [
  { title: "Love", description: "Sacrificing for the good of others.", icon: HeartHandshake },
  { title: "Integrity", description: "Choosing to do the right thing.", icon: ShieldCheck },
  { title: "Relationship", description: "Value people above all other things.", icon: Handshake },
  { title: "Commitment", description: "No obstacle is too great, never give up.", icon: Gem },
  { title: "Networking", description: "Opportunities are born by reaching out to others.", icon: Briefcase },
  { title: "Training", description: "Equipped for every good work.", icon: BookOpenText },
  { title: "Transforming", description: "Making this world a better place by God's power.", icon: Crown },
];
