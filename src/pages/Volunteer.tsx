import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Volunteer() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-2xl px-6 py-20">
        <span className="text-sm font-medium text-primary">Join Us</span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">Volunteer</h1>
        <p className="mt-2 text-muted-foreground">Help us make a difference on the ground. Register as a volunteer today.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
              <input required className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                <input required type="email" className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Phone</label>
                <input required className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Skills / Area of Interest</label>
              <textarea required rows={3} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:opacity-90">
              Register as Volunteer
            </button>
          </form>
        ) : (
          <div className="mt-10 rounded-xl border bg-card p-10 text-center">
            <CheckCircle2 size={48} className="mx-auto text-primary" />
            <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Thank You!</h2>
            <p className="mt-2 text-sm text-muted-foreground">Your volunteer registration has been submitted. We'll be in touch soon.</p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
