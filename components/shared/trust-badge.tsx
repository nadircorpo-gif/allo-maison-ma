import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeType = "identite" | "competences" | "references" | "elite";

const BADGE_CONFIG: Record<BadgeType, { label: string; className: string }> = {
  identite: {
    label: "Identité vérifiée",
    className: "bg-clay text-ink border-paper-border",
  },
  competences: {
    label: "Compétences certifiées",
    className: "bg-clay text-ink border-paper-border",
  },
  references: {
    label: "Références vérifiées",
    className: "bg-clay text-ink border-paper-border",
  },
  elite: {
    label: "★ Pro élite",
    className: "bg-saffron text-ink border-saffron font-bold",
  },
};

type TrustBadgeProps = {
  type: BadgeType;
  className?: string;
};

export default function TrustBadge({ type, className }: TrustBadgeProps) {
  const config = BADGE_CONFIG[type];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold",
        config.className,
        className
      )}
    >
      {type !== "elite" && <CheckCircle className="w-2.5 h-2.5 flex-shrink-0" />}
      {config.label}
    </span>
  );
}
