import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { Banner } from "@/components/sections/Banner";
import { Intro } from "@/components/sections/Intro";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Sidebar />
      <main className="w-full md:ml-[25%] md:w-3/4">
        <Banner />
        <div className="px-[6%] pb-24">
          <Intro />
          <Experience />
          <Education />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  );
}
