import { Star, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import { type Professional } from "@/lib/data/professionals";
import { getServiceBySlug } from "@/lib/data/services";
import { buildBookingWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type ArtisanCardV2Props = {
  pro: Professional;
  serviceName?: string;
  cityName?: string;
  className?: string;
};

function getInitials(displayName: string): string {
  return displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getScoreColor(score: number): string {
  if (score > 1) return "text-mint";
  if (score > 0.5) return "text-saffron";
  return "text-muted";
}

function buildProWhatsAppUrl(pro: Professional, serviceName: string, cityName: string): string {
  if (pro.phone) {
    const digits = pro.phone.replace(/[^\d]/g, "");
    const msg = encodeURIComponent(
      `Bonjour, j'ai vu votre profil sur Allo-Maison.ma et je souhaite réserver un ${serviceName} à ${cityName}. Pouvez-vous m'aider ?`
    );
    return `https://wa.me/${digits}?text=${msg}`;
  }
  return buildBookingWhatsAppUrl(serviceName, cityName);
}

export default function ArtisanCardV2({
  pro,
  serviceName = pro.services[0] ?? "artisan",
  cityName = pro.city,
  className,
}: ArtisanCardV2Props) {
  const displayName = (pro.displayName ?? "").length <= 25 ? pro.displayName : "Artisan vérifié";
  const initials = getInitials(displayName);
  const location = pro.quartier ? `${pro.quartier}, ${pro.city}` : pro.city;
  const serviceLabels = pro.services
    .slice(0, 3)
    .map((slug) => getServiceBySlug(slug)?.name ?? slug);
  const description = pro.description
    ? pro.description.slice(0, 80) + (pro.description.length > 80 ? "…" : "")
    : null;
  const whatsappUrl = buildProWhatsAppUrl(pro, serviceName, cityName);
  const scoreColor = getScoreColor(pro.scoreMaison);

  // Avatar background alternates between clay and a light teal
  const avatarBg = pro.scoreMaison % 2 < 1 ? "#E8D5C4" : "#EAF0F2";

  return (
    <div className={cn("rounded-xl bg-white border border-paper-border p-5 flex flex-col gap-3", className)}>
      {/* Header row: photo + name + score */}
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center relative"
          style={{ background: avatarBg }}
        >
          {pro.photo ? (
            <Image
              src={pro.photo}
              alt={displayName}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <span className="font-display text-sm font-medium text-zellige">{initials}</span>
          )}
          {pro.verified && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-mint border-2 border-white flex items-center justify-center">
              <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-base font-medium text-ink leading-tight truncate">
            {displayName}
          </p>
          {/* Score Maison label (no rating until we have real reviews) */}
          <div className={cn("flex items-center gap-1 text-xs tab-nums mt-0.5", scoreColor)}>
            <Star className="w-3 h-3 fill-current" />
            <span className="font-semibold">Pro vérifié</span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-[11px] text-muted">
        <MapPin className="w-3 h-3 shrink-0" />
        <span>{location}</span>
      </div>

      {/* Services pills */}
      {serviceLabels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {serviceLabels.map((label) => (
            <span key={label} className="text-[10px] bg-clay text-ink px-2 py-0.5 rounded-full font-medium">
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        {pro.phone && (
          <span className="text-[10px] bg-mint/10 text-mint border border-mint/20 px-2 py-0.5 rounded-full font-semibold">
            ✅ WhatsApp vérifié
          </span>
        )}
        <span className="text-[10px] bg-clay text-ink px-2 py-0.5 rounded-full font-semibold">
          Identité ✓
        </span>
        {pro.scoreMaison >= 3 && (
          <span className="text-[10px] bg-saffron text-ink px-2 py-0.5 rounded-full font-bold">
            ★ Top pro
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-[11px] text-muted italic line-clamp-2">
          « {description} »
        </p>
      )}

      {/* CTA */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#25D366] text-white font-bold rounded-lg text-sm hover:bg-[#1eb857] transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        Contacter sur WhatsApp
      </a>
    </div>
  );
}
