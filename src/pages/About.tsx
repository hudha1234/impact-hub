import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const problems = [
  "Manual record-keeping leads to errors and missing data",
  "Lack of transparency in fund allocation",
  "Delayed reporting and donor communication",
  "Difficulty tracking project progress and outcomes",
  "Vulnerability to mismanagement and fraud",
];

const solutions = [
  "Digital ledger with real-time fund tracking",
  "Verified UPI transactions mapped to specific projects",
  "Automated dashboards and donor notifications",
  "Progress tracking with measurable milestones",
  "Admin controls with audit trails and verification workflows",
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <span className="text-sm font-medium text-primary">About Impact Hub</span>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Why digital fund management matters.
        </h1>
        <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">
          Traditional NGOs rely on spreadsheets and paper trails. Impact Hub replaces that with a digital system of record — ensuring every donation is tracked, verified, and allocated transparently.
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
              <AlertTriangle size={20} className="text-destructive" /> The Problem
            </h2>
            <ul className="mt-6 space-y-4">
              {problems.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
              <CheckCircle2 size={20} className="text-primary" /> The Solution
            </h2>
            <ul className="mt-6 space-y-4">
              {solutions.map((s) => (
                <li key={s} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
