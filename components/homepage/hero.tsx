"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "@/components/shared/search-bar";

const ROTATING_JOBS = ["plombier", "électricien", "peintre", "serrurier", "climaticien"];

export default function Hero() {
  const [jobIndex, setJobIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setJobIndex((i) => (i + 1) % ROTATING_JOBS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left column — copy + search */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-paper-border" />
            <span className="eyebrow">Depuis 2017 · Pros vérifiés et certifiés</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-[550] leading-[0.95] tracking-[-0.03em] text-ink mb-6">
            <span className="whitespace-nowrap">
              Le bon{" "}
              <span className="italic text-terracotta transition-all duration-500">
                {ROTATING_JOBS[jobIndex]}
              </span>
            </span>
            <br />
            est déjà dans{" "}
            <span className="relative inline-block">
              votre quartier
              <svg
                className="absolute left-0 -bottom-2 w-full"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 8 C 80 1, 220 1, 298 6"
                  stroke="#C24D2C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            .
          </h1>

          <p className="text-lg text-muted max-w-lg mb-8">
            Plombier, électricien, femme de ménage, peintre. 1 017 artisans
            vérifiés, intervention en 24h, paiement après satisfaction.
          </p>

          <SearchBar className="mb-5" />

          <p className="text-xs text-muted flex flex-wrap gap-x-4 gap-y-1">
            <span className="font-semibold text-ink">Tendance :</span>
            <Link href="/plombier-casablanca" className="underline underline-offset-2 decoration-paper-border hover:decoration-ink">plombier urgence Casablanca</Link>
            <Link href="/femme-de-menage-rabat" className="underline underline-offset-2 decoration-paper-border hover:decoration-ink">femme de ménage Rabat</Link>
            <Link href="/climatisation-casablanca" className="underline underline-offset-2 decoration-paper-border hover:decoration-ink">climatisation</Link>
          </p>
        </div>

        {/* Right column — photo + floating cards */}
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-clay">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&h=1100&fit=crop"
              alt="Artisan vérifié Allo Maison au travail"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] opacity-80">Artisan vérifié</p>
                <p className="font-display text-xl font-medium">Casablanca · Ain Diab</p>
              </div>
              <div className="tab-nums flex items-center gap-1 bg-white/15 backdrop-blur px-2.5 py-1 rounded-full text-sm border border-white/20">
                <svg className="w-3.5 h-3.5 text-saffron fill-saffron" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18.3 5.5 22l1.7-7.4L1.5 9.6 9 8.9z" />
                </svg>
                4.9
              </div>
            </div>
          </div>

          {/* Floating stat card */}
          <div className="hidden lg:block absolute -left-6 bottom-10 bg-white border border-paper-border rounded-xl p-4 w-[220px] shadow-card-hover">
            <div className="flex -space-x-2 mb-3">
              {[12, 32, 55, 65].map((n) => (
                <div key={n} className="w-8 h-8 rounded-full border-2 border-white bg-clay overflow-hidden">
                  <Image src={`https://i.pravatar.cc/40?img=${n}`} alt="" width={32} height={32} />
                </div>
              ))}
              <span className="w-8 h-8 rounded-full border-2 border-white bg-clay text-[10px] font-semibold flex items-center justify-center text-ink">
                +1K
              </span>
            </div>
            <p className="font-display text-3xl font-[500] tab-nums tracking-tight">1 017</p>
            <p className="text-xs text-muted -mt-1">artisans certifiés</p>
          </div>

          {/* Live request chip */}
          <div className="hidden lg:flex absolute -right-3 top-10 bg-white border border-paper-border rounded-full pl-2 pr-4 py-2 items-center gap-2 shadow-card">
            <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            <p className="text-xs">
              <span className="font-semibold">Karim</span> a demandé un plombier · il y a 3 min
            </p>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-t border-paper-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-center sm:justify-between gap-x-8 gap-y-3 text-sm">
          <span className="eyebrow">Ils parlent de nous</span>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-muted font-display text-lg opacity-60">
            <span>HESPRESS</span>
            <span className="italic">Yabiladi</span>
            <span>2M</span>
            <span className="tracking-widest">TELQUEL</span>
            <span>L&apos;Économiste</span>
          </div>
        </div>
      </div>
    </section>
  );
}
