export type Testimonial = {
  name: string;
  city: string;
  quarter: string;
  rating: number;
  text: string;
  service: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Fatima Z.",
    city: "Casablanca",
    quarter: "Maarif",
    rating: 5,
    text: "Fuite urgente un samedi soir. En 25 minutes, un plombier verifie etait chez moi. 280 DH, prix annonce respecte.",
    service: "Plomberie",
  },
  {
    name: "Ahmed M.",
    city: "Rabat",
    quarter: "Agdal",
    rating: 5,
    text: "Premiere plateforme serieuse au Maroc. Les pros sont verifies avant d'etre acceptes. Ca change tout.",
    service: "Electricite",
  },
  {
    name: "Nadia K.",
    city: "Casablanca",
    quarter: "Ain Diab",
    rating: 5,
    text: "Meme femme de menage chaque semaine depuis 3 mois via Allo-Maison. Ponctuelle, fiable. Je recommande.",
    service: "Menage a domicile",
  },
];
