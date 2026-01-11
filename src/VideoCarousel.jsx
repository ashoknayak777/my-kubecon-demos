import { useEffect, useState } from "react";
import { videos } from "./videos";

const AUTO_SCROLL_MS = 3000;

export default function VideoCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((i) => (i + 1) % videos.length);
  };

  const prev = () => {
    setIndex((i) => (i === 0 ? videos.length - 1 : i - 1));
  };

  useEffect(() => {
    const id = setInterval(next, AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, []);

  const video = videos[index];

  return (
    <div className="single-carousel">
      <button className="nav-btn left" onClick={prev}>
        ‹
      </button>

      <div className="video-frame">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          allow="encrypted-media; picture-in-picture"
          allowFullScreen
        />
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </div>

      <button className="nav-btn right" onClick={next}>
        ›
      </button>
    </div>
  );
}
