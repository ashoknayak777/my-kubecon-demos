import VideoCarousel from "./VideoCarousel";
import "./index.css";

export default function App() {
  return (
    <main>
      <header>
        <h1>KubeCon Demo Portfolio</h1>
        <p>
          Curated product demonstrations presented at KubeCon,
          focused on real-world Kubernetes workflows.
        </p>
      </header>

      <VideoCarousel />

      <footer>
        © Ashok Nayak · Senior Technical Writer · Kubernetes & DevOps
      </footer>
    </main>
  );
}
