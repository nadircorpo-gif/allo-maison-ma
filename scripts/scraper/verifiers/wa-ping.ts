import { chromium, type Page } from "playwright";
import { getAllPros, updatePro } from "../supabase-push";
import { formatPhone } from "./phone-check";

const DELAY_MS = 1500; // 1.5s between checks to avoid rate limiting
const BATCH_SIZE = 5;  // Reuse page for N checks before refreshing

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkNumber(page: Page, phone: string): Promise<boolean> {
  const formatted = formatPhone(phone);
  if (!formatted) return false;

  try {
    await page.goto(`https://wa.me/${formatted}`, {
      waitUntil: "networkidle",
      timeout: 10000,
    });
    await sleep(2000);

    const text = await page.innerText("body").catch(() => "");

    // Valid numbers: WhatsApp formats with "+" prefix → "+212 661-409190"
    // Invalid numbers: shown raw → "212000000000"
    const hasFormatted = text.includes("+" + formatted.substring(0, 3));
    return hasFormatted;
  } catch {
    return false;
  }
}

export async function pingWhatsApp(): Promise<{
  valid: number;
  invalid: number;
  errors: number;
}> {
  console.log("Starting WhatsApp ping check...");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const pros = await getAllPros({ withPhone: true, status: "scraped" });
  // Only check pros that haven't been checked yet
  const toCheck = pros.filter((p) => p.wa_exists === null || p.wa_exists === undefined);
  console.log(`  ${toCheck.length} pros to check (${pros.length - toCheck.length} already checked)`);

  let valid = 0;
  let invalid = 0;
  let errors = 0;

  for (let i = 0; i < toCheck.length; i++) {
    const pro = toCheck[i];

    try {
      const exists = await checkNumber(page, pro.phone!);

      await updatePro(pro.id!, {
        wa_exists: exists,
      });

      if (exists) valid++;
      else invalid++;
    } catch (err) {
      console.error(`  Error checking ${pro.phone}:`, err);
      errors++;
    }

    if ((i + 1) % 50 === 0) {
      console.log(
        `  Progress: ${i + 1}/${toCheck.length} (valid: ${valid}, invalid: ${invalid})`
      );
    }

    await sleep(DELAY_MS);
  }

  await browser.close();
  console.log(
    `WhatsApp ping: ${valid} valid, ${invalid} invalid, ${errors} errors`
  );
  return { valid, invalid, errors };
}
