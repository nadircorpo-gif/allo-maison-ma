"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { SERVICES } from "@/lib/data/services";
import { CITIES } from "@/lib/data/cities";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  defaultService?: string;
  defaultCity?: string;
  className?: string;
};

export default function SearchBar({ defaultService = "", defaultCity = "", className }: SearchBarProps) {
  const router = useRouter();
  const [service, setService] = useState(defaultService);
  const [city, setCity] = useState(defaultCity);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!service || !city) return;
    router.push(`/${service}-${city}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col sm:flex-row gap-3 p-3 bg-white rounded-card shadow-search",
        className
      )}
    >
      {/* Service select */}
      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
        required
        aria-label="Choisir un service"
        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-btn text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
      >
        <option value="">Quel service ?</option>
        {SERVICES.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.icon} {s.name}
          </option>
        ))}
      </select>

      {/* City select */}
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        aria-label="Choisir une ville"
        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-btn text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
      >
        <option value="">Quelle ville ?</option>
        {CITIES.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Submit */}
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-deep text-white font-semibold rounded-btn transition-colors"
      >
        <Search className="w-4 h-4" />
        Rechercher
      </button>
    </form>
  );
}
