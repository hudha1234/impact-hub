import { useState } from "react";
import { Link } from "react-router-dom";
import { IndianRupee, Users, FolderOpen, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import ProjectProgress from "@/components/ProjectProgress";
import { projects as initialProjects, donations as initialDonations, stats } from "@/lib/data";
import type { Project, Donation } from "@/lib/data";

export default function AdminDashboard() {
  const [tab, setTab] = useState<"overview" | "projects" | "donations" | "add">("overview");
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects);
  const [donationsList, setDonationsList] = useState<Donation[]>(initialDonations);
  const [newProject, setNewProject] = useState({ title: "", description: "", location: "", requiredFunds: "" });

  const pendingCount = donationsList.filter((d) => d.status === "pending").length;

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const p: Project = {
      id: `proj-${Date.now()}`,
      title: newProject.title,
      description: newProject.description,
      location: newProject.location,
      requiredFunds: Number(newProject.requiredFunds),
      collectedFunds: 0,
      status: "active",
    };
    setProjectsList((prev) => [...prev, p]);
    setNewProject({ title: "", description: "", location: "", requiredFunds: "" });
    setTab("projects");
  };

  const verifyDonation = (id: string) => {
    setDonationsList((prev) => prev.map((d) => d.id === id ? { ...d, status: "verified" as const } : d));
  };

  const rejectDonation = (id: string) => {
    setDonationsList((prev) => prev.map((d) => d.id === id ? { ...d, status: "rejected" as const } : d));
  };

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "projects", label: "Projects" },
    { key: "donations", label: `Donations${pendingCount ? ` (${pendingCount})` : ""}` },
    { key: "add", label: "+ Add Project" },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage projects, verify donations, and track progress.</p>
          </div>
          <Link to="/" className="text-sm font-medium text-primary hover:underline">← Home</Link>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-1 border-b">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === t.key ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "overview" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Total Donations" value={`₹${stats.totalDonations.toLocaleString("en-IN")}`} icon={IndianRupee} />
              <StatCard label="Total Donors" value={String(stats.totalDonors)} icon={Users} />
              <StatCard label="Active Projects" value={String(projectsList.filter((p) => p.status === "active").length)} icon={FolderOpen} />
              <StatCard label="Verification Queue" value={String(pendingCount)} icon={Clock} trend={pendingCount > 0 ? `${pendingCount} pending` : "All clear"} />
            </div>
          )}

          {tab === "projects" && (
            <div className="space-y-4">
              {projectsList.map((p) => (
                <div key={p.id} className="rounded-xl border bg-card p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{p.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{p.id}</span>
                  </div>
                  <div className="mt-4">
                    <ProjectProgress collected={p.collectedFunds} required={p.requiredFunds} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "donations" && (
            <div className="overflow-x-auto rounded-xl border bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-secondary text-left">
                    <th className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Donor</th>
                    <th className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Project</th>
                    <th className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Amount</th>
                    <th className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Txn ID</th>
                    <th className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donationsList.map((d) => {
                    const proj = projectsList.find((p) => p.id === d.projectId);
                    return (
                      <tr key={d.id} className="border-b last:border-0">
                        <td className="whitespace-nowrap px-4 py-3 text-foreground">{d.donorName}</td>
                        <td className="px-4 py-3 text-foreground">{proj?.title ?? d.projectId}</td>
                        <td className="whitespace-nowrap px-4 py-3 tabular-nums font-medium text-foreground">₹{d.amount.toLocaleString("en-IN")}</td>
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">{d.txnId}</td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${
                            d.status === "verified" ? "bg-primary/10 text-primary" : d.status === "pending" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${d.status === "pending" ? "animate-pulse bg-accent" : d.status === "verified" ? "bg-primary" : "bg-destructive"}`} />
                            {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {d.status === "pending" && (
                            <div className="flex gap-2">
                              <button onClick={() => verifyDonation(d.id)} className="rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
                                Verify
                              </button>
                              <button onClick={() => rejectDonation(d.id)} className="rounded-md bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors">
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {tab === "add" && (
            <form onSubmit={handleAddProject} className="max-w-xl space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Project Title</label>
                <input required value={newProject.title} onChange={(e) => setNewProject((f) => ({ ...f, title: e.target.value }))} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
                <textarea required rows={3} value={newProject.description} onChange={(e) => setNewProject((f) => ({ ...f, description: e.target.value }))} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Location</label>
                  <input required value={newProject.location} onChange={(e) => setNewProject((f) => ({ ...f, location: e.target.value }))} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Required Funds (₹)</label>
                  <input required type="number" min="1" value={newProject.requiredFunds} onChange={(e) => setNewProject((f) => ({ ...f, requiredFunds: e.target.value }))} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none tabular-nums focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <button type="submit" className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:opacity-90">
                Add Project
              </button>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
