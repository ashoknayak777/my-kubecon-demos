import { useEffect, useState } from "react";
import { videos } from "./videos";

export default function VideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? videos.length - 1 : prev - 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="carousel">
      <button onClick={goPrev} className="nav-btn" aria-label="Previous demo">
        ‹
      </button>

      <div className="card-stack">
        {videos.map((video, index) => {
          const offset = index - activeIndex;

          if (Math.abs(offset) > 1) return null;

          return (
            <div
              key={video.id}
              className="video-card"
              style={{
                transform: `
                  translateX(${offset * 40}px)
                  scale(${offset === 0 ? 1 : 0.94})
                `,
                opacity: offset === 0 ? 1 : 0.6,
                zIndex: 10 - Math.abs(offset)
              }}
            >
              {offset === 0 && (
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              )}

              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          );
        })}
      </div>

      <button onClick={goNext} className="nav-btn" aria-label="Next demo">
        ›
      </button>
      <p className="hint">Use ← and → keys to browse demos</p>
    </div>
  );
}
