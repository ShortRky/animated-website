export type PlatformId =
  | "twitch"
  | "instagram"
  | "tiktok"
  | "twitter"
  | "discord";

export type Platform = {
  id: PlatformId;
  label: string;
  username: string;
  description: string;
  url: string;
  accent: string;
};

/** Replace URLs and usernames with your real handles before publishing. */
export const platforms: Platform[] = [
  {
    id: "twitch",
    label: "Twitch",
    username: "hyuunle3i",
    description: "Live streams, chatting, and whatever game or vibe is on rotation.",
    url: "https://www.twitch.tv/hyuunle3i",
    accent: "#9146ff",
  },
  {
    id: "instagram",
    label: "Instagram",
    username: "@hyuunle3i",
    description: "Still frames, aesthetics, and occasional story drops.",
    url: "https://www.instagram.com/",
    accent: "#ffffff",
  },
  {
    id: "tiktok",
    label: "TikTok",
    username: "@hyuunle3i",
    description: "Short clips, edits, and algorithm-friendly chaos.",
    url: "https://www.tiktok.com/",
    accent: "#00f2ea",
  },
  {
    id: "twitter",
    label: "X / Twitter",
    username: "@hyuunle3i",
    description: "Hot takes, stream announcements, and link drops.",
    url: "https://twitter.com/",
    accent: "#e7e9ea",
  },
  {
    id: "discord",
    label: "Discord",
    username: "invite or handle",
    description: "Community hangout when it is public; otherwise ask on stream.",
    url: "https://discord.com/",
    accent: "#5865f2",
  },
];
