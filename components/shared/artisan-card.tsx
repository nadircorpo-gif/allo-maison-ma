import { Phone } from "lucide-react";
import { type Artisan } from "@/lib/data/artisans";
import { buildBookingWhatsAppUrl } from "@/lib/whatsapp";
import TrustBadge from "@/components/shared/trust-badge";
import StarRating from "@/components/shared/star-rating";
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
    <div className={cn("rounded-card shadow-card bg-white p-5", className)}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">{getInitials(artisan.name)}</span>
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-ink truncate">{artisan.name}</h3>
          <p className="text-sm text-muted capitalize">
            {artisan.service.replace(/-/g, " ")} · {artisan.city}
          </p>
          <p className="text-xs text-muted">{artisan.experience} ans d&apos;experience</p>
        </div>

        {/* Price */}
        <div className="text-right flex-shrink-0">
          <p className="text-sm font-semibold text-ink">{artisan.priceRange}</p>
        </div>
      </div>

      {/* Rating */}
      <StarRating rating={artisan.rating} reviewCount={artisan.reviewCount} className="mb-3" />

      {/* Trust badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {artisan.verified.cin && <TrustBadge type="cin" />}
        {artisan.verified.casier && <TrustBadge type="casier" />}
        {artisan.verified.competences && <TrustBadge type="competences" />}
        {artisan.verified.elite && <TrustBadge type="elite" />}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="button"
          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold rounded-btn border border-primary text-primary hover:bg-primary-light transition-colors"
        >
          <Phone className="w-4 h-4" />
          Contacter
        </button>
        <WhatsAppButton url={whatsappUrl} label="WhatsApp" size="sm" className="flex-1" />
      </div>
    </div>
  );
}
