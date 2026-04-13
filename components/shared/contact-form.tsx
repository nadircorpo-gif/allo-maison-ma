"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { SERVICES } from "@/lib/data/services";
import { CITIES } from "@/lib/data/cities";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const serviceName = SERVICES.find((s) => s.slug === service)?.name ?? service;
    const cityName = CITIES.find((c) => c.slug === city)?.name ?? city;

    const text = [
      `Bonjour, je m'appelle ${name}.`,
      service ? `Service souhaite: ${serviceName}` : "",
      city ? `Ville: ${cityName}` : "",
      message ? `\nMessage: ${message}` : "",
      email ? `\nEmail: ${email}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212661409190";
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-ink mb-1">
            Votre nom *
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Mohamed Alami"
            className="w-full px-3 py-2 border border-gray-200 rounded-btn text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-ink mb-1">
            Email (optionnel)
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@email.com"
            className="w-full px-3 py-2 border border-gray-200 rounded-btn text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-service" className="block text-sm font-medium text-ink mb-1">
            Service (optionnel)
          </label>
          <select
            id="contact-service"
            value={service}
            onChange={(e) => setService(e.target.value)}
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
        <div>
          <label htmlFor="contact-city" className="block text-sm font-medium text-ink mb-1">
            Ville (optionnel)
          </label>
          <select
            id="contact-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-ink mb-1">
          Votre message *
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          placeholder="Decrivez votre besoin ou posez votre question..."
          className="w-full px-3 py-2 border border-gray-200 rounded-btn text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
        />
      </div>

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
