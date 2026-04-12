"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { SERVICES } from "@/lib/data/services";
import { CITIES } from "@/lib/data/cities";

type BookingFormProps = {
  defaultService?: string;
  defaultCity?: string;
};

export default function BookingForm({ defaultService = "", defaultCity = "" }: BookingFormProps) {
  const [service, setService] = useState(defaultService);
  const [city, setCity] = useState(defaultCity);
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!service || !city) return;

    const serviceName = SERVICES.find((s) => s.slug === service)?.name ?? service;
    const cityName = CITIES.find((c) => c.slug === city)?.name ?? city;

    const message = description.trim()
      ? `Bonjour, je cherche un ${serviceName} a ${cityName}.\n\nDetails : ${description}`
      : `Bonjour, je cherche un ${serviceName} a ${cityName}.`;

    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000"}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Service */}
      <div>
        <label htmlFor="booking-service" className="block text-sm font-medium text-ink mb-1">
          Service
        </label>
        <select
          id="booking-service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-btn text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
        >
          <option value="">Choisir un service</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.icon} {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div>
        <label htmlFor="booking-city" className="block text-sm font-medium text-ink mb-1">
          Ville
        </label>
        <select
          id="booking-city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-btn text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
        >
          <option value="">Choisir une ville</option>
          {CITIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="booking-description" className="block text-sm font-medium text-ink mb-1">
          Description (optionnel)
        </label>
        <textarea
          id="booking-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Decrivez votre besoin..."
          className="w-full px-3 py-2 border border-gray-200 rounded-btn text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-whatsapp hover:bg-green-500 text-white font-semibold rounded-btn transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        Envoyer via WhatsApp
      </button>
    </form>
  );
}
