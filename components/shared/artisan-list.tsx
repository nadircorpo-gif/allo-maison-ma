"use client";

import { useState } from "react";
import { type Professional } from "@/lib/data/professionals";
import ArtisanCardV2 from "@/components/shared/artisan-card-v2";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import { buildBookingWhatsAppUrl } from "@/lib/whatsapp";

type ArtisanListProps = {
  initialPros: Professional[];
  service: string; // slug
  serviceName: string;
  city: string; // slug
  cityName: string;
  totalCount: number;
  whatsappUrl?: string;
};

const PAGE_SIZE = 12;

export default function ArtisanList({
  initialPros,
  service,
  serviceName,
  city,
  cityName,
  totalCount,
  whatsappUrl,
}: ArtisanListProps) {
  const [pros, setPros] = useState<Professional[]>(initialPros);
  const [loading, setLoading] = useState(false);
  const fallbackWa = whatsappUrl ?? buildBookingWhatsAppUrl(serviceName, cityName);

  const hasMore = pros.length < totalCount;

  async function loadMore() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/pros?service=${encodeURIComponent(service)}&city=${encodeURIComponent(city)}&offset=${pros.length}&limit=${PAGE_SIZE}`
      );
      if (!res.ok) throw new Error("fetch failed");
      const json = await res.json() as { pros: Professional[]; total: number };
      setPros((prev) => [...prev, ...json.pros]);
    } catch {
      // silently ignore — user can retry
    } finally {
      setLoading(false);
    }
  }

  if (pros.length === 0) {
    return (
      <div className="bg-white border border-paper-border rounded-xl p-8 text-center">
        <p className="font-display text-xl text-ink font-medium mb-2">
          Des pros sont disponibles à {cityName}.
        </p>
        <p className="text-muted text-sm mb-5">
          Contactez-nous sur WhatsApp, on vous met en relation en moins d&apos;une heure.
        </p>
        <WhatsAppButton url={fallbackWa} label="Trouver un pro" size="md" />
      </div>
    );
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4">
        {pros.map((pro) => (
          <ArtisanCardV2
            key={pro.id}
            pro={pro}
            serviceName={serviceName}
            cityName={cityName}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 border border-ink rounded-lg font-semibold text-sm text-ink hover:bg-ink hover:text-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Chargement…
              </>
            ) : (
              `Voir plus · ${totalCount - pros.length} autres ${serviceName.toLowerCase()}s`
            )}
          </button>
        </div>
      )}
    </div>
  );
}
