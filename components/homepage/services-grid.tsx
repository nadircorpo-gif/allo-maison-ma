import ServiceCard from "@/components/shared/service-card";
import { SERVICES } from "@/lib/data/services";

export default function ServicesGrid() {
  const topServices = SERVICES.slice(0, 8);

  return (
    <section className="bg-white py-20 border-y border-paper-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="eyebrow mb-3">06 — Tarifs transparents</p>
            <h2 className="font-display text-4xl sm:text-5xl font-[550] tracking-[-0.02em] text-ink">
              Les services les plus demandés.
            </h2>
            <p className="text-muted mt-3">Tarifs moyens constatés à Casablanca.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {topServices.map((service) => (
            <ServiceCard key={service.slug} service={service} city="casablanca" />
          ))}
        </div>
      </div>
    </section>
  );
}
