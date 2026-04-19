import type { PlatformId } from "../data/platforms";

type IconProps = { size?: number; className?: string };

export function PlatformGlyph({
  id,
  size = 26,
  className,
}: IconProps & { id: PlatformId }) {
  switch (id) {
    case "twitch":
      return <TwitchIcon size={size} className={className} />;
    case "instagram":
      return <InstagramIcon size={size} className={className} />;
    case "tiktok":
      return <TikTokIcon size={size} className={className} />;
    case "twitter":
      return <TwitterIcon size={size} className={className} />;
    case "discord":
      return <DiscordIcon size={size} className={className} />;
  }
}

function TwitchIcon({ size = 26, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M4.5 3 3 6.5V19.5h5V22h3l3-2.5h4.5L21 14V3H4.5Zm15 10.5-3 3H12l-2.5 2.5V16H7.5V4.5h12V13.5ZM16.5 6H15v6h1.5V6Zm-4 0H11v6h1.5V6Z"
      />
    </svg>
  );
}

function InstagramIcon({ size = 26, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        d="M12 8.25A3.75 3.75 0 1 1 12 15a3.75 3.75 0 0 1 0-6.75Z"
      />
      <circle cx="17.25" cy="6.75" r="0.9" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon({ size = 26, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M16.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2v9.5a3.5 3.5 0 1 1-3.5-3.5c.2 0 .4 0 .6.1V9.2a5.6 5.6 0 0 0-.6-.03A5.5 5.5 0 1 0 19 14.5V7.8a4.5 4.5 0 0 0 2.5.8V6.5a2.5 2.5 0 0 1-2.5-2.5h-2.5v1.5Z"
      />
    </svg>
  );
}

function TwitterIcon({ size = 26, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M18.22 3H21l-7.5 8.6L21 21h-6.9l-5.4-6.9L4.7 21H2l8-9.2L2 3h7.05l4.86 6.2L18.22 3Z"
      />
    </svg>
  );
}

function DiscordIcon({ size = 26, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M19.27 5.33A16.7 16.7 0 0 0 15.5 4c-.18.33-.39.77-.53 1.12a15.6 15.6 0 0 0-4.94 0A10.4 10.4 0 0 0 9.5 4a16.5 16.5 0 0 0-3.78 1.34C3.73 8.66 3 12 3.21 15.28c1.58 1.17 3.1 1.88 4.6 2.35l1.03-1.65c-.57-.2-1.12-.45-1.65-.76.14-.1.27-.21.4-.32a12 12 0 0 0 9.02 0c.13.11.26.22.4.32-.53.31-1.08.56-1.65.76l1.03 1.65c1.5-.47 3.02-1.18 4.6-2.35.24-3.75-.64-7.06-2.69-9.95ZM9.75 13.5c-.83 0-1.5-.78-1.5-1.75s.65-1.75 1.5-1.75 1.52.78 1.52 1.75-.67 1.75-1.52 1.75Zm4.5 0c-.83 0-1.5-.78-1.5-1.75s.65-1.75 1.5-1.75 1.52.78 1.52 1.75-.67 1.75-1.52 1.75Z"
      />
    </svg>
  );
}
