import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { platforms, type Platform, type PlatformId } from "../data/platforms";
import { PlatformGlyph } from "./icons";

const rubber = [0.34, 1.56, 0.64, 1] as const;
const liquidFade = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

function arcOffset(index: number, total: number, radius: number) {
  if (total === 1) return { x: 0, rotate: 0 };
  const span = 52;
  const mid = (total - 1) / 2;
  const angle = (index - mid) * span;
  const rad = (angle * Math.PI) / 180;
  const x = Math.sin(rad) * radius;
  const rotate = angle * 0.35;
  return { x, rotate };
}

export function SocialHub() {
  const [active, setActive] = useState<PlatformId | null>(null);
  const activePlatform = useMemo(
    () => platforms.find((p) => p.id === active) ?? null,
    [active]
  );

  return (
    <LayoutGroup id="social-hub">
      <div className="social-hub">
        <motion.div
          className="social-hub__arc"
          initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...liquidFade, delay: 0.35 }}
        >
          {platforms.map((p, i) => (
            <ArcIcon
              key={p.id}
              platform={p}
              index={i}
              total={platforms.length}
              isActiveShell={active === p.id}
              expanded={active !== null}
              onSelect={() => setActive(p.id)}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {active && activePlatform && (
            <Sidebar
              key={active}
              platform={activePlatform}
              onClose={() => setActive(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}

function ArcIcon({
  platform,
  index,
  total,
  isActiveShell,
  expanded,
  onSelect,
}: {
  platform: Platform;
  index: number;
  total: number;
  isActiveShell: boolean;
  expanded: boolean;
  onSelect: () => void;
}) {
  const { x, rotate } = arcOffset(index, total, 120);
  const dimOthers = expanded && !isActiveShell;

  if (isActiveShell) {
    return (
      <motion.div
        layoutId={`shell-${platform.id}`}
        className="social-hub__icon-shell social-hub__icon-shell--phantom"
        style={{
          borderColor: platform.accent,
          x,
          rotate,
        }}
        aria-hidden
      />
    );
  }

  return (
    <motion.button
      type="button"
      layout
      className="social-hub__icon-shell"
      style={{
        borderColor: platform.accent,
        color: platform.id === "instagram" ? "#0b0b0f" : "#f8f8ff",
        background:
          platform.id === "tiktok"
            ? "#0b0b0f"
            : platform.id === "twitch"
              ? "rgba(145,70,255,0.18)"
              : "rgba(255,255,255,0.06)",
        x,
        rotate,
        scale: dimOthers ? 0.85 : 1,
        opacity: dimOthers ? 0.35 : 1,
        filter: dimOthers ? "blur(1.5px)" : "blur(0px)",
      }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      onClick={onSelect}
      aria-label={`Open ${platform.label} links`}
    >
      <motion.span
        className="social-hub__glyph"
        initial={false}
        animate={{ scale: dimOthers ? 0.92 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
      >
        <PlatformGlyph id={platform.id} size={28} />
      </motion.span>
    </motion.button>
  );
}

function Sidebar({ platform, onClose }: { platform: Platform; onClose: () => void }) {
  const lines = [
    { k: "platform", text: platform.label },
    { k: "user", text: platform.username },
    { k: "desc", text: platform.description },
  ];

  return (
    <>
      <motion.button
        type="button"
        className="social-hub__scrim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={liquidFade}
        aria-label="Close panel"
        onClick={onClose}
      />

      <motion.aside
        className="social-hub__sidebar"
        initial={{ x: -40, opacity: 0, filter: "blur(14px)" }}
        animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ x: -32, opacity: 0, filter: "blur(10px)" }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`panel-${platform.id}-title`}
      >
        <motion.div
          layoutId={`shell-${platform.id}`}
          className="social-hub__sidebar-head"
          style={{ borderColor: platform.accent }}
        >
          <span className="social-hub__sidebar-icon" style={{ color: platform.accent }}>
            <PlatformGlyph id={platform.id} size={30} />
          </span>
          <div>
            <p id={`panel-${platform.id}-title`} className="social-hub__sidebar-title">
              {platform.label}
            </p>
            <p className="social-hub__sidebar-sub">Liquid handoff</p>
          </div>
          <button type="button" className="social-hub__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </motion.div>

        <div className="social-hub__dropdown">
          {lines.map((row, i) => (
            <motion.div
              key={row.k}
              className={`social-hub__line social-hub__line--${row.k}`}
              initial={{ opacity: 0, y: 14, rotateX: -12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 26,
                delay: 0.06 + i * 0.09,
              }}
            >
              {row.text}
            </motion.div>
          ))}
        </div>

        <LiquidGoButton href={platform.url} accent={platform.accent} />
      </motion.aside>
    </>
  );
}

function LiquidGoButton({ href, accent }: { href: string; accent: string }) {
  const [busy, setBusy] = useState(false);

  const go = () => {
    setBusy(true);
    window.setTimeout(() => {
      window.open(href, "_blank", "noopener,noreferrer");
      setBusy(false);
    }, 520);
  };

  return (
    <motion.button
      type="button"
      className="social-hub__cta"
      onClick={go}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      <span className="social-hub__cta-label">Go to page</span>
      <motion.span
        className="social-hub__cta-fill"
        aria-hidden
        initial={false}
        animate={{ scaleX: busy ? 1 : 0 }}
        transition={{ duration: 0.5, ease: rubber }}
        style={{ transformOrigin: "0% 50%", background: `linear-gradient(90deg, ${accent}, #ffffff)` }}
      />
    </motion.button>
  );
}
