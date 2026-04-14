"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
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
        "bg-white border border-paper-border rounded-xl p-2 flex flex-col sm:flex-row gap-2 shadow-search",
        className
      )}
    >
      <div className="flex-1 flex items-center gap-3 px-4 py-3">
        <Search className="w-5 h-5 text-muted shrink-0" />
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
          aria-label="Choisir un service"
          className="w-full bg-transparent outline-none text-[15px] text-ink"
        >
          <option value="">Un plombier, une femme de ménage…</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block w-px bg-paper-border" />

      <div className="flex items-center gap-3 px-4 py-3 sm:min-w-[180px]">
        <MapPin className="w-5 h-5 text-muted shrink-0" />
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          aria-label="Choisir une ville"
          className="w-full bg-transparent outline-none text-[15px] text-ink"
        >
          <option value="">Ville</option>
          {CITIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-terracotta hover:bg-primary-deep text-white rounded-lg px-6 py-3 font-semibold text-[15px] shadow-terracotta transition-colors"
      >
        Trouver un pro
      </button>
    </form>
  );
}
