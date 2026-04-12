import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  rating: number;
  reviewCount?: number;
  className?: string;
};

export default function StarRating({ rating, reviewCount, className }: StarRatingProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm", className)}>
      <Star className="w-4 h-4 fill-amber text-amber flex-shrink-0" />
      <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-muted">({reviewCount} avis)</span>
      )}
    </span>
  );
}
