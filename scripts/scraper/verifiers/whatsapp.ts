import makeWASocket, { DisconnectReason, useMultiFileAuthState } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import * as path from "path";
import { getAllPros, updatePro } from "../supabase-push";
import { formatPhone } from "./phone-check";

const AUTH_DIR = path.join(process.cwd(), ".wa-auth");
const DELAY_MS = 1000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function createSocket() {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveCreds);

  await new Promise<void>((resolve, reject) => {
    sock.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === "close") {
        const shouldReconnect =
          (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
        if (shouldReconnect) {
          reject(new Error("Connection closed, reconnecting..."));
        } else {
          reject(new Error("Logged out. Delete .wa-auth and scan QR again."));
        }
      } else if (connection === "open") {
        console.log("  WhatsApp connected!");
        resolve();
      }
    });
  });

  return sock;
}

export async function verifyWhatsApp(): Promise<{ verified: number; notOnWA: number; errors: number }> {
  console.log("Starting WhatsApp verification...");
  console.log("  If first run, scan QR code with your WhatsApp.");

  const sock = await createSocket();
  const pros = await getAllPros({ withPhone: true, status: "scraped" });
  console.log(`  ${pros.length} pros to verify`);

  let verified = 0;
  let notOnWA = 0;
  let errors = 0;

  for (let i = 0; i < pros.length; i++) {
    const pro = pros[i];
    if (pro.wa_exists !== null) continue;

    const formatted = formatPhone(pro.phone!);
    if (!formatted) { errors++; continue; }

    const jid = formatted + "@s.whatsapp.net";

    try {
      const [result] = await sock.onWhatsApp(jid);

      if (result?.exists) {
        let waBusiness = false;
        let waDescription: string | null = null;

        try {
          const bizProfile = await sock.getBusinessProfile(result.jid);
          if (bizProfile) {
            waBusiness = true;
            waDescription = bizProfile.description || null;
          }
        } catch {}

        let waPhoto: string | null = null;
        try {
          waPhoto = await sock.profilePictureUrl(result.jid, "image");
        } catch {}

        let waName: string | null = null;
        try {
          const status = await sock.fetchStatus(result.jid);
          waName = typeof status === "object" && status ? (status as any).status : null;
        } catch {}

        await updatePro(pro.id!, {
          wa_exists: true,
          wa_business: waBusiness,
          wa_name: waName,
          wa_description: waDescription,
          wa_photo: waPhoto,
        });
        verified++;
      } else {
        await updatePro(pro.id!, { wa_exists: false, wa_business: false });
        notOnWA++;
      }
    } catch (err) {
      console.error(`  Error checking ${pro.phone}:`, err);
      errors++;
    }

    if ((i + 1) % 100 === 0) {
      console.log(`  Progress: ${i + 1}/${pros.length} (WA: ${verified}, not: ${notOnWA})`);
    }

    await sleep(DELAY_MS);
  }

  await sock.end(undefined);
  console.log(`WhatsApp: ${verified} verified, ${notOnWA} not on WA, ${errors} errors`);
  return { verified, notOnWA, errors };
}
