import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type WhatsAppButtonProps = {
  url: string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const SIZE_CLASSES = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2",
};

export default function WhatsAppButton({
  url,
  label = "Contacter via WhatsApp",
  className,
  size = "md",
}: WhatsAppButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-btn",
        "bg-whatsapp hover:bg-green-500 text-white transition-colors",
        SIZE_CLASSES[size],
        className
      )}
    >
      <MessageCircle className="w-4 h-4 flex-shrink-0" />
      {label}
    </a>
  );
}
