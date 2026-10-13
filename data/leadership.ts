import { numbered, siteImages, type SiteImage } from "./images";

export type Leader = { id: string; name: string; position: string; bio: string; image: SiteImage; isPlaceholder: boolean };

/**
 * PLACEHOLDER DATA — replace with the verified FGBMFI Singapore leadership.
 *
 * Nothing here describes a real person. For each leader supply the name,
 * official position, a 1–2 sentence biography and a portrait
 * (/public/images/leader-N.webp, 4:5 ratio), then set `isPlaceholder: false`.
 */
/**
 * The Chapter President of FGBMFI Singapore, featured on the home and
 * leadership pages. Still to be supplied: his full name (only "Matthias" is
 * known) and, optionally, a short message in his own words (`message` is
 * shown only when set).
 */
export const nationalLeader: { name: string | null; position: string; image: SiteImage; intro: string[]; message: string | null } = {
  name: "Matthias",
  position: "Chapter President",
  image: siteImages.leaderFeature,
  intro: [
    "The Full Gospel Business Men's Fellowship International is a large family, at work in nations around the world. In Singapore, the fellowship is led by its Chapter President, Matthias.",
    "He serves the members here: gathering business people and professionals, encouraging the chapter and keeping the fellowship in Singapore connected to the wider international work.",
  ],
  message: null,
};

const roles = ["President", "Vice President", "Secretary", "Treasurer", "Chapter Development", "Outreach & Events"];

export const leaders: Leader[] = roles.map((role, i) => ({
  id: `leader-${i + 1}`,
  name: "Name to be announced",
  position: role,
  bio: "A short biography will appear here: professional background, years of involvement in the fellowship and the area of service this leader oversees.",
  image: numbered("leader", i + 1, `FGBMFI emblem — portrait of the ${role} to follow`),
  isPlaceholder: true,
}));

// The first card is the Chapter President: a real portrait, with his biography still to come.
leaders[0] = {
  ...leaders[0],
  name: nationalLeader.name ?? "Name to be announced",
  position: nationalLeader.position,
  bio: "He leads the fellowship in Singapore as Chapter President. His biography will appear here once it has been supplied.",
  image: numbered("leader", 1, "Matthias, Chapter President of FGBMFI Singapore, speaking at a gathering"),
  isPlaceholder: nationalLeader.name === null,
};
