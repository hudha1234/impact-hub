import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login
    if (form.username === "user" && form.password === "user123") {
      navigate("/user-dashboard");
    } else {
      setError("Invalid credentials. Try user / user123");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-md px-6 py-20">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">User Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">Access your donation history and track your impact.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Username</label>
            <input required value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <input required type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button type="submit" className="w-full rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:opacity-90">
            Sign In
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
