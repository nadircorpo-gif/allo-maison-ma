import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { type Service } from "@/lib/data/services";
import { getServiceHero } from "@/lib/data/service-heroes";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: Service;
  city?: string;
  className?: string;
};

export default function ServiceCard({ service, city, className }: ServiceCardProps) {
  const href = city ? `/${service.slug}-${city}` : `/services/${service.slug}`;
  const hero = getServiceHero(service.slug);

  return (
    <Link
      href={href}
      className={cn(
        "group block bg-white border border-paper-border rounded-xl overflow-hidden hover:-translate-y-0.5 hover:shadow-card-hover transition",
        className
      )}
    >
      <div className="aspect-[5/4] relative bg-clay overflow-hidden">
        <Image
          src={hero.url}
          alt={hero.alt}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="p-4">
        <h3 className="font-display text-lg font-medium text-ink mb-1">{service.name}</h3>
        <div className="flex items-center gap-1 text-xs tab-nums text-muted mb-1">
          <Star className="w-3 h-3 fill-saffron text-saffron" />
          <span className="font-semibold text-ink">{service.rating.toFixed(1)}</span>
          <span>· {service.reviewCount.toLocaleString("fr")} avis</span>
        </div>
        <p className="text-xs text-muted font-medium tab-nums">{service.priceLabel}</p>
      </div>
    </Link>
  );
}
