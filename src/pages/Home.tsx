import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  type MotionStyle,
  useAnimationControls,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import ProgressLine from "../components/ProgressLine";
import Doodle from "../components/Doodle";
import { useNav } from "../components/NavContext";
import { hasPlayedLanding, markLandingPlayed } from "../lib/landingState";

const FRAME_COUNT = 29;
const WALK_START = 18; // the girl starts walking on frame_00018
// frames finish at this progress; the remaining scroll slides the hero in from the right
const ANIM_END = 0.82;
const frameSrc = (i: number) => `/animations/landing/frame_${String(i).padStart(5, "0")}.png`;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function Hero({
  heroRef,
  className = "hero",
  style,
}: {
  heroRef: RefObject<HTMLElement | null>;
  className?: string;
  style?: MotionStyle;
}) {
  const { setPinned } = useNav();
  const inView = useInView(heroRef, { amount: 0.5 });

  useEffect(() => {
    setPinned(inView);
    return () => setPinned(false);
  }, [inView, setPinned]);

  const controls = useAnimationControls();
  const shake = () => {
    void controls.start({
      rotate: [0, -9, 8, -6, 5, -2, 0],
      transition: { duration: 0.7 },
    });
  };

  return (
    <motion.section ref={heroRef} className={className} style={style}>
      <motion.button className="hero-star" onHoverStart={shake} onTap={shake} aria-label="shake the star">
        <motion.img src="/star.png" alt="" animate={controls} draggable={false} />
      </motion.button>
      <h1 className="hero-title">
        Hi, my name is
        <br />
        Isabella.
      </h1>
    </motion.section>
  );
}

function LandingAnimation({ heroRef }: { heroRef: RefObject<HTMLElement | null> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const progressRef = useRef(0);
  const settledRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // the drawn scene stays hidden until the user starts scrolling, and once the
  // frames finish it slides away and fades out completely while the hero slides
  // in from the right, so no static frame lingers behind the text
  const heroX = useTransform(scrollYProgress, [ANIM_END, 1], ["100%", "0%"]);
  const canvasX = useTransform(scrollYProgress, [ANIM_END, 1], ["0%", "-55%"]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.04, ANIM_END, 0.94], [0, 1, 1, 0]);
  // the cue is not scroll-linked: any scroll at all hides it instantly,
  // and it only comes back when the page is right at the top again
  const [cueHidden, setCueHidden] = useState(() => hasPlayedLanding());

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const vw = canvas.clientWidth;
    const vh = canvas.clientHeight;
    if (canvas.width !== Math.round(vw * dpr) || canvas.height !== Math.round(vh * dpr)) {
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, vw, vh);

    const t = clamp(progressRef.current / ANIM_END, 0, 1);
    const idx = clamp(Math.floor(t * FRAME_COUNT), 0, FRAME_COUNT - 1);
    let img = imagesRef.current[idx];
    for (let d = 1; !img && d < FRAME_COUNT; d++) {
      img = imagesRef.current[idx - d] ?? imagesRef.current[idx + d];
    }
    if (!img) return;

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    // slight zoom past "cover" leaves horizontal slack so the camera can travel
    const scale = Math.max(vw / iw, vh / ih) * 1.15;
    const dw = iw * scale;
    const dh = ih * scale;

    const f = t * (FRAME_COUNT - 1);
    const fallT = easeInOut(clamp(f / WALK_START, 0, 1));
    const walkT = easeInOut(clamp((f - WALK_START) / (FRAME_COUNT - 1 - WALK_START), 0, 1));
    // vertical phase: the camera drifts left as the star falls into her hand,
    // horizontal phase: it pans right alongside her while she walks
    const centerFrac = f < WALK_START ? 0.58 - 0.13 * fallT : 0.45 + 0.15 * walkT;
    const offsetX = clamp(centerFrac * dw - vw / 2, 0, dw - vw);
    const offsetY = (dh - vh) / 2;
    ctx.drawImage(img, -offsetX, -offsetY, dw, dh);
  }, []);

  const scrollToEnd = useCallback((behavior: ScrollBehavior) => {
    const el = containerRef.current;
    if (!el) return;
    window.scrollTo({ top: el.offsetTop + el.offsetHeight - window.innerHeight, behavior });
  }, []);

  // returning to home after the animation has played: land on the hero directly
  useLayoutEffect(() => {
    if (hasPlayedLanding()) {
      settledRef.current = true;
      scrollToEnd("instant");
    }
  }, [scrollToEnd]);

  useEffect(() => {
    let alive = true;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (!alive) return;
        imagesRef.current[i] = img;
        draw();
      };
    }
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => {
      alive = false;
      window.removeEventListener("resize", onResize);
    };
  }, [draw]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    progressRef.current = p;
    draw();
    setCueHidden(p > 0.002);
    if (p >= ANIM_END && !settledRef.current) {
      settledRef.current = true;
      markLandingPlayed();
      scrollToEnd("smooth");
    }
    if (p < ANIM_END * 0.85) settledRef.current = false;
  });

  return (
    <div ref={containerRef} className="landing-scroll">
      <div className="landing-sticky">
        <motion.div className="landing-canvas-wrap" style={{ x: canvasX, opacity: canvasOpacity }}>
          <canvas ref={canvasRef} className="landing-canvas" />
        </motion.div>
        <motion.div
          className="scroll-cue"
          animate={{ opacity: cueHidden ? 0 : 1 }}
          transition={{ duration: 0.12 }}
          aria-hidden="true"
        >
          <span>scroll me :)</span>
        </motion.div>
        <Hero heroRef={heroRef} className="hero hero-slide" style={{ x: heroX }} />
      </div>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <main className="home">
      {reduce ? <Hero heroRef={heroRef} /> : <LandingAnimation heroRef={heroRef} />}
      <ProgressLine progress={scrollYProgress} />
    </main>
  );
}
