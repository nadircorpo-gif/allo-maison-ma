import type { RawPro, ScoreDetails } from "./types";

function calcCompletude(pro: RawPro): number {
  let score = 0;
  if (pro.firstName && pro.lastName) score += 0.3;
  if (pro.photo) score += 0.4;
  if (pro.description) score += 0.4;
  if (pro.quartier) score += 0.3;
  if (pro.services.length >= 2) score += 0.3;
  const media = pro.mediaCount ?? 0;
  if (media >= 1 && media <= 3) score += 0.15;
  if (media >= 4) score += 0.3;
  return Math.min(score, 2);
}

function calcJoignabilite(pro: RawPro): number {
  if (pro.phone) return 1.5;
  if (pro.showPhone) return 0.5;
  return 0;
}

function calcExperience(pro: RawPro): number {
  const years = pro.experience ?? 0;
  if (years >= 10) return 0.5;
  if (years >= 6) return 0.35;
  if (years >= 3) return 0.2;
  if (years >= 1) return 0.1;
  return 0;
}

export function calculateScore(
  pro: RawPro,
  isMultiPlatform: boolean
): { scoreMaison: number; scoreDetails: ScoreDetails } {
  const scoreDetails: ScoreDetails = {
    completude: calcCompletude(pro),
    joignabilite: calcJoignabilite(pro),
    multiPlateforme: isMultiPlatform ? 1 : 0,
    experience: calcExperience(pro),
  };

  const scoreMaison = Math.min(
    5,
    scoreDetails.completude +
      scoreDetails.joignabilite +
      scoreDetails.multiPlateforme +
      scoreDetails.experience
  );

  return { scoreMaison, scoreDetails };
}
