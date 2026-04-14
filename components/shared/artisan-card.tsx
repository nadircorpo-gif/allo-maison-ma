import { Phone, Star } from "lucide-react";
import { type Artisan } from "@/lib/data/artisans";
import { buildBookingWhatsAppUrl } from "@/lib/whatsapp";
import TrustBadge from "@/components/shared/trust-badge";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import { cn } from "@/lib/utils";

type ArtisanCardProps = {
  artisan: Artisan;
  serviceName?: string;
  cityName?: string;
  className?: string;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ArtisanCard({
  artisan,
  serviceName,
  cityName,
  className,
}: ArtisanCardProps) {
  const whatsappUrl = buildBookingWhatsAppUrl(
    serviceName ?? artisan.service,
    cityName ?? artisan.city
  );

  return (
    <div className={cn("rounded-xl bg-white border border-paper-border p-5", className)}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-clay flex items-center justify-center shrink-0">
          <span className="font-display text-sm font-medium text-zellige">{getInitials(artisan.name)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-lg font-medium text-ink truncate leading-tight">{artisan.name}</h3>
            <span className="text-sm font-semibold text-ink whitespace-nowrap shrink-0 tab-nums">{artisan.priceRange}</span>
          </div>
          <p className="text-[11px] text-muted mt-0.5">
            {artisan.service.replace(/-/g, " ")} · {artisan.city} · {artisan.experience} ans
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-3 text-xs tab-nums">
        <Star className="w-3.5 h-3.5 fill-saffron text-saffron" />
        <span className="font-bold text-ink">{artisan.rating.toFixed(1)}</span>
        <span className="text-muted">· {artisan.reviewCount} avis</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {artisan.verified.identite && <TrustBadge type="identite" />}
        {artisan.verified.competences && <TrustBadge type="competences" />}
        {artisan.verified.references && <TrustBadge type="references" />}
        {artisan.verified.elite && <TrustBadge type="elite" />}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg border border-ink text-ink hover:bg-ink hover:text-cream transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          Contacter
        </button>
        <WhatsAppButton url={whatsappUrl} label="WhatsApp" size="sm" className="flex-1" />
      </div>
    </div>
  );
}
