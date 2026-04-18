const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212661409190";

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function buildBookingWhatsAppUrl(service: string, city: string): string {
  const message = `Bonjour, j'ai vu votre profil sur Allo-Maison.ma et je souhaite réserver un ${service} à ${city}. Pouvez-vous m'aider ?`;
  return buildWhatsAppUrl(message);
}

/**
 * Construit un message d'urgence WhatsApp avec la grammaire correcte.
 * `metier` doit etre le nom du professionnel au masculin singulier
 * ("plombier", "électricien", "serrurier") — PAS le nom du domaine
 * ("Plomberie", "Electricite", "Serrurerie"). Sinon on obtient
 * "un plomberie" KO.
 */
export function buildUrgenceWhatsAppUrl(metier: string, city: string): string {
  const message = `URGENCE : J'ai trouvé votre numéro sur Allo-Maison.ma, j'ai besoin d'un ${metier} à ${city} immédiatement. Merci de me contacter rapidement.`;
  return buildWhatsAppUrl(message);
}
