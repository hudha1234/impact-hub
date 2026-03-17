import { motion } from "framer-motion";

interface Props {
  collected: number;
  required: number;
}

export default function ProjectProgress({ collected, required }: Props) {
  const percentage = Math.min((collected / required) * 100, 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span className="text-muted-foreground">Progress</span>
        <span className="tabular-nums text-foreground">{percentage.toFixed(1)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          className="h-full rounded-full bg-primary"
        />
      </div>
      <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        <span>₹{collected.toLocaleString("en-IN")} Raised</span>
        <span>Target: ₹{required.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}
