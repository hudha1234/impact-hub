import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <span className="text-sm font-medium text-primary">Active Initiatives</span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Projects</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Browse active projects and contribute directly. Every donation is tracked and verified.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
