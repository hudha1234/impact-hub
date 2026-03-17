import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, BarChart3, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects, stats } from "@/lib/data";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}>
          <span className="text-sm font-medium tracking-tight text-primary">System of Record</span>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.08] tracking-tighter text-foreground sm:text-6xl" style={{ textWrap: "balance" as any }}>
            Fund management with verifiable accountability.
          </h1>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">
            Impact Hub digitizes the NGO lifecycle. From donor acquisition to verified project completion, we ensure every rupee is mapped to a result.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:opacity-90">
              View Active Projects <ArrowRight size={16} />
            </Link>
            <Link to="/admin" className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              Admin Portal
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats strip */}
      <section className="border-y bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x sm:grid-cols-4">
          {[
            { label: "Total Donations", value: `₹${stats.totalDonations.toLocaleString("en-IN")}` },
            { label: "Active Projects", value: String(stats.activeProjects) },
            { label: "Total Donors", value: String(stats.totalDonors) },
            { label: "Funds Collected", value: `₹${stats.fundsCollected.toLocaleString("en-IN")}` },
          ].map((s) => (
            <div key={s.label} className="px-6 py-8 text-center">
              <div className="tabular-nums text-2xl font-bold text-foreground sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">How Impact Hub Works</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">Transparent, accountable, and efficient fund management for every NGO.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {[
            { icon: Shield, title: "Verified Donations", desc: "Every UPI transaction is verified against bank records before being allocated to a project." },
            { icon: BarChart3, title: "Real-time Tracking", desc: "Monitor funding progress for every project with live dashboards and detailed reports." },
            { icon: Users, title: "Donor Transparency", desc: "Donors see exactly where their money goes with project-level allocation tracking." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border bg-card p-6">
              <f.icon size={24} className="text-primary" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Active Projects</h2>
            <p className="mt-1 text-muted-foreground">Projects that need your support right now.</p>
          </div>
          <Link to="/projects" className="text-sm font-medium text-primary hover:underline">View all →</Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
