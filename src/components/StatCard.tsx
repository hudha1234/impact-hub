import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
}

export default function StatCard({ label, value, icon: Icon, trend }: Props) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-[var(--card-shadow)]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
        <Icon size={16} className="text-muted-foreground" />
      </div>
      <div className="mt-2 tabular-nums text-2xl font-bold text-foreground">{value}</div>
      {trend && <span className="mt-1 text-xs font-medium text-primary">{trend}</span>}
    </div>
  );
}
