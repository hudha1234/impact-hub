import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import ProjectProgress from "./ProjectProgress";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  const remaining = project.requiredFunds - project.collectedFunds;
  return (
    <div className="rounded-xl border bg-card p-6 shadow-[var(--card-shadow)] transition-shadow hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground">{project.title}</h3>
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
          project.status === "active" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
        }`}>
          {project.status === "active" ? "Active" : "Completed"}
        </span>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      <div className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin size={12} />
        {project.location}
      </div>
      <div className="mb-2 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-secondary px-2 py-2">
          <div className="tabular-nums text-sm font-semibold text-foreground">₹{project.requiredFunds.toLocaleString("en-IN")}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Required</div>
        </div>
        <div className="rounded-lg bg-secondary px-2 py-2">
          <div className="tabular-nums text-sm font-semibold text-primary">₹{project.collectedFunds.toLocaleString("en-IN")}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Collected</div>
        </div>
        <div className="rounded-lg bg-secondary px-2 py-2">
          <div className="tabular-nums text-sm font-semibold text-foreground">₹{remaining.toLocaleString("en-IN")}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Remaining</div>
        </div>
      </div>
      <div className="mb-5">
        <ProjectProgress collected={project.collectedFunds} required={project.requiredFunds} />
      </div>
      <Link
        to={`/donate?project=${project.id}`}
        className="block w-full rounded-lg bg-foreground px-4 py-2.5 text-center text-sm font-medium text-background transition-colors hover:opacity-90"
      >
        Donate to this Project
      </Link>
    </div>
  );
}
