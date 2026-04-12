import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeType = "cin" | "casier" | "competences" | "elite";

const BADGE_CONFIG: Record<BadgeType, { label: string; color: string }> = {
  cin: {
    label: "CIN Verifie",
    color: "bg-trust-light border-trust-border text-trust-text",
  },
  casier: {
    label: "Casier Verifie",
    color: "bg-trust-light border-trust-border text-trust-text",
  },
  competences: {
    label: "Competences Verifiees",
    color: "bg-trust-light border-trust-border text-trust-text",
  },
  elite: {
    label: "Pro Elite",
    color: "bg-blue-50 border-blue-200 text-blue-700",
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
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-badge border text-xs font-medium",
        config.color,
        className
      )}
    >
      <CheckCircle className="w-3 h-3 flex-shrink-0" />
      {config.label}
    </span>
  );
}
