import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
import { Experience } from "./components/Experience";
import { Background } from "./components/Background";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-[3px] focus:border focus:border-accent focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
