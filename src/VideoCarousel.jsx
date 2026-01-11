import { useEffect, useState } from "react";
import { videos } from "./videos";

const AUTO_SCROLL_MS = 3000;
const CARD_WIDTH = 720;
const GAP = 24;

export default function VideoCarousel() {
  const [index, setIndex] = useState(0);

  const totalWidth = videos.length * (CARD_WIDTH + GAP);

  const goNext = () => {
    setIndex((i) => (i + 1) % videos.length);
  };

  const goPrev = () => {
    setIndex((i) => (i === 0 ? videos.length - 1 : i - 1));
  };

  useEffect(() => {
    const id = setInterval(goNext, AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, []);

  const translateX =
    -(index * (CARD_WIDTH + GAP)) +
    (window.innerWidth - CARD_WIDTH) / 2;

  return (
    <div className="carousel-shell">
      <button className="nav-btn left" onClick={goPrev}>‹</button>

      <div className="carousel-window">
        <div
          className="carousel-track"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {videos.map((v, i) => (
            <div
              key={v.id}
              className={`carousel-card ${i === index ? "active" : ""}`}
            >
              {i === index && (
                <>
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <button className="nav-btn right" onClick={goNext}>›</button>
    </div>
  );
}
