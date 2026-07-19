import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";

const COFFEE_FRAMES = 5;
const coffeeSrc = (i: number) => `/animations/coffee/frame_${String(i).padStart(5, "0")}.png`;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [frame, setFrame] = useState(0);
  const timer = useRef<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    for (let i = 0; i < COFFEE_FRAMES; i++) {
      const img = new Image();
      img.src = coffeeSrc(i);
    }
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const stopPour = () => {
    setFrame(0)
    if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  };

  // click and hold: the cup fills while held, and stays where it got to
  const startPour = () => {
    if (timer.current) return;
    if (reduce) {
      setFrame(COFFEE_FRAMES - 1);
      return;
    }
    timer.current = window.setInterval(() => {
      setFrame((f) => {
        if (f >= COFFEE_FRAMES - 1) {
          return f;
        }
        return f + 1;
      });
    }, 240);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="page contact">
      <h1 className="display page-title">contact me</h1>

      {sent ? (
        <div className="contact-sent">
          <p>
            thank you for the note! this form is a placeholder for now, so nothing was actually sent. wire it up to
            your favourite form service when you are ready.
          </p>
          <button className="button" onClick={() => setSent(false)}>
            write another
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="form-row">
            <div className="field">
              <label htmlFor="first-name">first name</label>
              <input id="first-name" name="firstName" required autoComplete="given-name" />
            </div>
            <div className="field">
              <label htmlFor="last-name">last name</label>
              <input id="last-name" name="lastName" required autoComplete="family-name" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="email">email</label>
            <input id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="message">description</label>
            <textarea id="message" name="message" rows={6} required />
          </div>
          <button type="submit" className="button">
            send it over
          </button>
        </form>
      )}

      <div >
        <motion.div className="coffee" whileHover={reduce ? undefined : { y: -10 }}>
          <img
            src={coffeeSrc(frame)}
            alt="hand-drawn coffee cup; click and hold to fill it"
            onMouseEnter={startPour}
            onMouseLeave={stopPour}
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
        </motion.div>
        <p className="coffee-note">for the coffee lovers :)</p>

      </div>
    </main>
  );
}
