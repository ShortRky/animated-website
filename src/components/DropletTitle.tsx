import { motion } from "framer-motion";

const title = "HYUUNLE3I";

const spring = { type: "spring" as const, stiffness: 420, damping: 28, mass: 0.85 };

export function DropletTitle() {
  return (
    <motion.h1
      className="droplet-title"
      initial={{ filter: "blur(14px)", opacity: 0, y: -18 }}
      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        margin: 0,
        textAlign: "center",
        fontWeight: 800,
        letterSpacing: "0.08em",
        fontSize: "clamp(2.1rem, 5vw, 3.4rem)",
        lineHeight: 1.05,
        color: "#0b0b0f",
        textShadow: "0 1px 0 rgba(255,255,255,0.35)",
      }}
    >
      <span className="droplet-title__mask" aria-hidden>
        {title.split("").map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            className="droplet-title__char"
            initial={{ y: -42, opacity: 0, scaleY: 1.35, rotateX: -55 }}
            animate={{ y: 0, opacity: 1, scaleY: 1, rotateX: 0 }}
            transition={{
              ...spring,
              delay: 0.08 + i * 0.045,
            }}
            style={{ display: "inline-block", transformOrigin: "50% 0%" }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}
