import { useEffect, useRef, useState } from "react";
import { videos } from "./videos";

export default function VideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const iframeRef = useRef(null);

  const origin = window.location.origin;

  const stopVideo = () => {
    if (!iframeRef.current) return;

    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: "stopVideo",
        args: []
      }),
      "*"
    );
  };

  const goNext = () => {
    stopVideo();
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  const goPrev = () => {
    stopVideo();
    setActiveIndex((prev) =>
      prev === 0 ? videos.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { id, title, description } = videos[activeIndex];

  return (
    <div className="carousel">
      <button onClick={goPrev} className="nav-btn" aria-label="Previous demo">
        ‹
      </button>

      <div className="video-card">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${id}?enablejsapi=1&origin=${origin}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <button onClick={goNext} className="nav-btn" aria-label="Next demo">
        ›
      </button>
    </div>
  );
}
