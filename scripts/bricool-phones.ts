import { chromium } from "playwright";

const SUPABASE_URL = "https://ejqrxoeykfrcxutjdmvr.supabase.co";
const SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcXJ4b2V5a2ZyY3h1dGpkbXZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjA3MjQyNCwiZXhwIjoyMDkxNjQ4NDI0fQ.2Pi6p1b1TKyLWtBQiTvv8f9kg0YYUxVDLIXEVWo5q98";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Step 1: Go to login page and dismiss any modals
  console.log("Step 1: Opening BriCool login...");
  await page.goto("https://bricool.ma/login", { waitUntil: "domcontentloaded" });
  await sleep(3000);

  // Dismiss locale modal by clicking overlay
  try {
    const overlay = page.locator(".modal-overlay");
    if (await overlay.count()) {
      await overlay.click({ force: true });
      console.log("  Dismissed modal overlay");
      await sleep(1000);
    }
  } catch (e) {}

  // Check what's on the login page
  const loginHtml = await page.content();
  const formControls = loginHtml.match(/formcontrolname="([^"]*)"/gi);
  console.log("  Form controls:", formControls);

  // Check for email/password login form
  const hasEmailLogin = loginHtml.includes('type="email"') || loginHtml.includes('formcontrolname="email"');
  const hasPasswordLogin = loginHtml.includes('type="password"') || loginHtml.includes('formcontrolname="password"');
  console.log("  Has email login:", hasEmailLogin, "Has password:", hasPasswordLogin);

  // List all visible buttons
  const btns = await page.locator("button:visible, a.btn:visible").allInnerTexts();
  console.log("  Visible buttons:", btns.filter((t: string) => t.trim()).slice(0, 10));

  // Check for signup tab or link
  const signupLink = page.locator('a:has-text("Inscri"), a:has-text("Register"), a:has-text("Créer un compte"), button:has-text("Inscri")');
  if (await signupLink.count()) {
    console.log("  Found signup link, clicking...");
    await signupLink.first().click();
    await sleep(2000);
  }

  // Now check the registration form
  const regHtml = await page.content();
  const regControls = regHtml.match(/formcontrolname="([^"]*)"/gi);
  console.log("  Registration form controls:", regControls);

  // Check for email input specifically
  const emailInputs = regHtml.match(/<input[^>]*type="email"[^>]*/gi);
  const textInputs = regHtml.match(/<input[^>]*type="text"[^>]*/gi);
  console.log("  Email inputs:", emailInputs?.length);
  console.log("  Text inputs:", textInputs?.length);

  // If no email registration, check if they have phone-based signup
  const phoneInputs = regHtml.match(/(?:tel|phone|mobile)/gi);
  console.log("  Phone-related fields:", phoneInputs);

  console.log("\n  Keeping browser open 60s for manual inspection...");
  console.log("  Check if you can create an account manually.");
  await sleep(60000);

  await browser.close();
}

main().catch(console.error);
