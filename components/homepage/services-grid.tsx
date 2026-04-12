import ServiceCard from "@/components/shared/service-card";
import { SERVICES } from "@/lib/data/services";

export default function ServicesGrid() {
  const topServices = SERVICES.slice(0, 8);

  return (
    <section className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-ink mb-3">Services les plus demandes</h2>
          <p className="text-muted text-lg">Tarifs moyens constates a Casablanca</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {topServices.map((service) => (
            <ServiceCard key={service.slug} service={service} city="casablanca" />
          ))}
        </div>
      </div>
    </section>
  );
}
