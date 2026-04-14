const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212661409190";

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function buildBookingWhatsAppUrl(service: string, city: string): string {
  const message = `Bonjour, j'ai vu votre profil sur Allo-Maison.ma et je souhaite reserver un ${service} a ${city}. Pouvez-vous m'aider ?`;
  return buildWhatsAppUrl(message);
}

export function buildUrgenceWhatsAppUrl(service: string, city: string): string {
  const message = `URGENCE : J'ai trouve votre numero sur Allo-Maison.ma, j'ai besoin d'un ${service} a ${city} immediatement. Merci de me contacter rapidement.`;
  return buildWhatsAppUrl(message);
}
