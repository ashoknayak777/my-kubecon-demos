import VideoCarousel from "./VideoCarousel";
import "./index.css";

export default function App() {
  return (
    <main>
      <header>
        <h1>My KubeCon Demo Portfolio</h1>
        <p className="subtitle">
          Product demos I created for my team to present at KubeCon 2025 (Atlanta), focused on real-world Kubernetes workflows.
        </p>
      </header>


      <VideoCarousel />

      <footer>
        © Ashok Nayak · Senior Technical Writer · Devtron
      </footer>
    </main>
  );
}
