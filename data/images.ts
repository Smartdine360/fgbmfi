/**
 * Every image used on the site lives here.
 *
 * The files in /public/images are real photographs from fellowship gatherings.
 * One set is a stand-in until the real pictures arrive: leader-2…6 show the
 * emblem (replace with each leader's portrait). Note that
 * `npm run placeholders` regenerates every file, overwriting the photographs.
 * To swap a picture, overwrite the file with the same name, or change `src` below — a remote URL also works once its
 * host is added to `images.remotePatterns` in next.config.ts.
 */
export type SiteImage = { src: string; alt: string };

const img = (file: string, alt: string): SiteImage => ({ src: `/images/${file}.webp`, alt });

export const siteImages = {
  // The social-sharing picture stays a JPEG, which every network accepts.
  og: { src: "/images/og.jpg", alt: "FGBMFI Singapore" } as SiteImage,
  hero: img("hero", "Members gathered at round tables during a fellowship session"),
  heroLeaders: img("hero-leaders", "Two members leading a session from the podium"),
  heroPortrait: { src: "/images/hero-portrait-president.webp", alt: "Portrait of Mathew" } as SiteImage,
  introPortrait: { src: "/images/mathew2.webp", alt: "Mathew speaking into a microphone at the podium during a fellowship gathering" } as SiteImage,
  speakerLectern: { src: "/images/speaker-lectern.webp", alt: "A member speaking into a microphone at the lectern during a fellowship gathering" } as SiteImage,
  networkingCall: { src: "/images/networking-call.webp", alt: "Members from several nations meeting together on a video call" } as SiteImage,
  leadershipMentoring: { src: "/images/leadership-mentoring.webp", alt: "FGBMFI leaders from many nations standing together beneath their national flags" } as SiteImage,
  globalLeadership: { src: "/images/global-leadership.webp", alt: "FGBMFI leaders from many nations standing together beneath their national flags, with a city skyline behind them" } as SiteImage,
  founder: img("founder", "Demos Shakarian, founder of the Full Gospel Business Men's Fellowship International"),
  leaderFeature: img("leader-feature", "Matthias, Chapter President of FGBMFI Singapore, addressing a gathering"),
  introGroup: img("intro-group", "Members of the fellowship gathered for a group photograph"),
  introFellowship: img("intro-fellowship", "Members gathered around a table at a fellowship meeting"),
  introDetail: img("intro-detail", "A member taking notes during a session"),
  purposePrayer: img("purpose-prayer", "Men praying together, hand in hand, around a table"),
  singapore: img("singapore-meeting", "Matthias, Chapter President of FGBMFI Singapore, speaking at a fellowship meeting"),
  visionWorship: img("vision-worship", "Hands raised in worship at a fellowship gathering"),
  cta: img("cta", "Members standing in worship across the room"),
  aboutHero: img("about-hero", "Members of the fellowship gathered for a group photograph"),
  aboutStory: img("about-story", "Members in conversation around a table"),
  aboutGroup: img("about-group", "FGBMFI Singapore members and guests gathered together for a group photo after a fellowship evening"),
  // Core values: one photograph per value, in the order of `values` in data/site.ts.
  valueLove: img("value-love", "Members sharing a meal together and smiling"),
  valueIntegrity: img("value-integrity", "A member wearing a jacket that reads I Love Jesus, greeted by a fellow delegate"),
  valueRelationship: img("value-relationship", "Four members standing arm in arm after a fellowship evening"),
  valueCommitment: img("value-commitment", "Two members seated together at the FGBMFI World Convention"),
  valueNetworking: img("value-networking", "Members from different nations together at the World Convention"),
  valueTraining: img("value-training", "A member teaching a session on personal communication"),
  valueTransforming: img("value-transforming", "A member raising his hand during a fellowship session"),
  aboutGlobal: img("about-global", "Members listening during a session"),
  visionHero: img("vision-hero", "A leader leading the room in worship"),
  missionLeaders: img("mission-leaders", "Leaders praying with a fellow member"),
  historyHero: img("history-hero", "Members of FGBMFI Singapore together"),
  historyArchive: img("history-archive", "Members talking around a table over coffee"),
  leadershipHero: img("leadership-hero", "Men of the fellowship gathered for a group photograph"),
  eventsHero: img("events-hero", "A speaker addressing the gathering"),
  galleryHero: img("gallery-hero", "Everyone together for a group photograph after a gathering"),
  newsHero: img("news-hero", "A speaker addressing members at a gathering"),
  joinHero: img("join-hero", "Members smiling around a table at a fellowship meeting"),
  joinWelcome: img("join-welcome", "Members sharing a meal together"),
  contactHero: img("contact-group", "Members of FGBMFI Singapore gathered for a group photograph"),
} as const;

export const numbered = (prefix: string, n: number, alt: string) => img(`${prefix}-${n}`, alt);
