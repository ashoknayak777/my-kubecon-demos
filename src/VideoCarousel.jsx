import { useEffect, useRef, useState } from "react";
import videos from "./videos";

export default function VideoCarousel() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);
  const total = videos.length;

  /* ---------- Autoplay control ---------- */

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [total]);

  /* ---------- Keyboard navigation ---------- */

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  /* ---------- Navigation ---------- */

  const next = () => {
    setActive((i) => (i + 1) % total);
  };

  const prev = () => {
    setActive((i) => (i - 1 + total) % total);
  };

  const getPosition = (index) => {
    if (index === active) return "center";
    if (index === (active - 1 + total) % total) return "left";
    if (index === (active + 1) % total) return "right";
    return "hidden";
  };

  return (
    <section className="carousel-3d">
      <button className="nav-btn left" onClick={prev}>
        ‹
      </button>

      <div className="carousel-stage">
        {videos.map((video, index) => {
          const position = getPosition(index);
          if (position === "hidden") return null;

          return (
            <div
              key={index}
              className={`carousel-card-3d ${position}`}
              onMouseEnter={stopAutoPlay}
              onMouseLeave={startAutoPlay}
              onFocus={stopAutoPlay}
              onBlur={startAutoPlay}
            >
              <iframe
                src={`${video.embed}?rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          );
        })}
      </div>

      <button className="nav-btn right" onClick={next}>
        ›
      </button>
    </section>
  );
}
