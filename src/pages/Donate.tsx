import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/lib/data";

export default function Donate() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectId: params.get("project") || "",
    amount: "",
    txnId: "",
  });
  const [step, setStep] = useState<"form" | "payment" | "done">("form");

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("done");
  };

  const upiId = "impacthub@upi";
  const selectedProject = projects.find((p) => p.id === form.projectId);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-2xl px-6 py-20">
        <span className="text-sm font-medium text-primary">Make a Difference</span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">Donate</h1>
        <p className="mt-2 text-muted-foreground">Your contribution is tracked and verified for full transparency.</p>

        {step === "form" && (
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
              <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Phone</label>
                <input required value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Select Project</label>
              <select required value={form.projectId} onChange={(e) => update("projectId", e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring">
                <option value="">Choose a project</option>
                {projects.filter((p) => p.status === "active").map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Donation Amount (₹)</label>
              <input required type="number" min="1" value={form.amount} onChange={(e) => update("amount", e.target.value)} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none tabular-nums focus:ring-2 focus:ring-ring" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:opacity-90">
              Proceed to Payment
            </button>
          </form>
        )}

        {step === "payment" && (
          <div className="mt-10">
            <div className="rounded-xl border bg-card p-8 text-center">
              <h2 className="font-display text-lg font-semibold text-foreground">UPI Payment</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Scan the QR code or pay to <span className="font-mono font-medium text-foreground">{upiId}</span>
              </p>
              {selectedProject && (
                <p className="mt-1 text-xs text-muted-foreground">Project: {selectedProject.title} · Amount: ₹{Number(form.amount).toLocaleString("en-IN")}</p>
              )}
              <div className="mx-auto my-6 inline-block rounded-xl border bg-background p-4">
                <QRCodeSVG value={`upi://pay?pa=${upiId}&am=${form.amount}&pn=ImpactHub`} size={180} />
              </div>
            </div>
            <form onSubmit={handleVerify} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">UPI Transaction ID (12 digits)</label>
                <input required minLength={12} maxLength={12} value={form.txnId} onChange={(e) => update("txnId", e.target.value)} placeholder="e.g. 123456789012" className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-mono text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <button type="submit" className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90">
                Submit for Verification
              </button>
            </form>
          </div>
        )}

        {step === "done" && (
          <div className="mt-10 rounded-xl border bg-card p-10 text-center">
            <CheckCircle2 size={48} className="mx-auto text-primary" />
            <h2 className="mt-4 font-display text-xl font-semibold text-foreground">Donation Submitted</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your donation is being verified against bank records. Transparency takes a moment.
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">Transaction ID: {form.txnId}</p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
