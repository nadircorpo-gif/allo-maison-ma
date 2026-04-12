import Link from "next/link";
import { type Service } from "@/lib/data/services";
import StarRating from "@/components/shared/star-rating";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: Service;
  city?: string;
  className?: string;
};

export default function ServiceCard({ service, city, className }: ServiceCardProps) {
  const href = city
    ? `/${service.slug}-${city}`
    : `/services/${service.slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-card shadow-card hover:shadow-card-hover transition-shadow bg-white overflow-hidden",
        className
      )}
    >
      {/* Gradient top with icon */}
      <div className="h-20 bg-gradient-to-br from-primary to-primary-deep flex items-center justify-center">
        <span className="text-4xl" role="img" aria-label={service.name}>
          {service.icon}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-ink mb-1 group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        <StarRating rating={service.rating} reviewCount={service.reviewCount} className="mb-2" />
        <p className="text-xs text-muted font-medium">{service.priceLabel}</p>
      </div>
    </Link>
  );
}
