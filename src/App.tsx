import { DropletTitle } from "./components/DropletTitle";
import { LiquidCanvas } from "./components/LiquidCanvas";
import { SocialHub } from "./components/SocialHub";

export default function App() {
  return (
    <div className="app">
      <LiquidCanvas />

      {/* Optional: drop `public/hero.jpg` (your Natsusawa panel) and uncomment the next block */}
      <div className="app__hero" aria-hidden />

      <div className="app__vignette" aria-hidden />

      <main className="app__main">
        <header className="app__header">
          <DropletTitle />
          <MotionCaption />
        </header>

        <SocialHub />
      </main>
    </div>
  );
}

function MotionCaption() {
  return (
    <p
      style={{
        margin: "0.75rem 0 0",
        textAlign: "center",
        color: "rgba(11,11,15,0.55)",
        fontSize: "0.95rem",
        letterSpacing: "0.04em",
      }}
    >
      Tap an icon — it blooms into a sidebar, then follow the wave.
    </p>
  );
}
