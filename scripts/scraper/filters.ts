import type { RawPro } from "./types";
import { mapCity, mapService } from "./mapping";

const ARABIC_CHARS = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

export function isFrenchName(firstName: string | null, lastName: string | null): boolean {
  if (!firstName && !lastName) return false;
  const full = `${firstName ?? ""} ${lastName ?? ""}`.trim();
  if (full.length < 2) return false;
  return !ARABIC_CHARS.test(full);
}

interface FilterResult {
  passes: boolean;
  reason?: string;
}

export function passesHardFilters(pro: RawPro): FilterResult {
  if (!isFrenchName(pro.firstName, pro.lastName)) {
    return { passes: false, reason: "arabic_name" };
  }

  if (!pro.city || !mapCity(pro.city)) {
    return { passes: false, reason: "unmappable_city" };
  }

  const mappedServices = pro.services.flatMap((s) => mapService(s, pro.platform));
  if (mappedServices.length === 0) {
    return { passes: false, reason: "unmappable_service" };
  }

  const hasPhone = !!pro.phone;
  const hasCompleteProfile = !!pro.photo && pro.services.length > 0 && !!pro.city;
  if (!hasPhone && !hasCompleteProfile) {
    return { passes: false, reason: "no_phone_no_profile" };
  }

  return { passes: true };
}
