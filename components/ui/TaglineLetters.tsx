import { site } from "@/data/site";

const words = site.tagline.split(" ");
// Two words to a line.
const lines = [words.slice(0, 2), words.slice(2)];

/**
 * The tagline split into letters for the shatter and smoke effects in
 * globals.css: the last word smokes like the flame, the others shatter in
 * turn. Place it inside an element with `aria-label={site.tagline}`, since
 * the letters themselves are hidden from screen readers.
 */
export function TaglineLetters() {
  return (
    <>
      {lines.map((line, l) => (
        <span key={l} aria-hidden className="flex flex-wrap gap-x-[0.28em]">
          {line.map((word, n) => {
            const w = l * 2 + n;
            return (
              <span key={w} className={w === words.length - 1 ? "fx-smoke text-flame-300" : "fx-shatter"}>
                {[...word].map((letter, i) => (
                  <b key={i} style={{ "--i": i, "--c": (word.length - 1) / 2, "--w": w } as React.CSSProperties}>
                    {letter}
                  </b>
                ))}
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}
