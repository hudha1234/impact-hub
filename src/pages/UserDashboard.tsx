import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { donations, projects } from "@/lib/data";

export default function UserDashboard() {
  const userDonations = donations.filter((d) => d.status === "verified" || d.status === "pending");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Track your donations and their verification status.</p>

        <div className="mt-10 overflow-hidden rounded-xl border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-secondary text-left">
                <th className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                <th className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Project</th>
                <th className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Amount</th>
                <th className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Txn ID</th>
                <th className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {userDonations.map((d) => {
                const proj = projects.find((p) => p.id === d.projectId);
                return (
                  <tr key={d.id} className="border-b last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-foreground">{d.createdAt}</td>
                    <td className="px-4 py-3 text-foreground">{proj?.title ?? d.projectId}</td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums font-medium text-foreground">₹{d.amount.toLocaleString("en-IN")}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">{d.txnId}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <StatusBadge status={d.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Link to="/" className="mt-8 inline-block text-sm font-medium text-primary hover:underline">← Back to Home</Link>
      </section>
      <Footer />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    verified: "bg-primary/10 text-primary",
    pending: "bg-accent/10 text-accent",
    rejected: "bg-destructive/10 text-destructive",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${styles[status] ?? ""}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === "pending" ? "animate-pulse bg-accent" : status === "verified" ? "bg-primary" : "bg-destructive"}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
