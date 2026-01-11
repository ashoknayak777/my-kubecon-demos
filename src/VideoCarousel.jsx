import { useEffect, useState, useRef } from "react";
import videos from "./videos";

export default function VideoCarousel() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);
  const total = videos.length;

  // Auto-advance every 3 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

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
            >
              <iframe
                src={video.embed}
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
