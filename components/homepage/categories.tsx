import Link from "next/link";

const CATEGORIES = [
  { emoji: "🔧", name: "Plomberie", slug: "plombier" },
  { emoji: "⚡", name: "Electricite", slug: "electricien" },
  { emoji: "🗒", name: "Peinture", slug: "peintre" },
  { emoji: "🧹", name: "Menage", slug: "femme-de-menage" },
  { emoji: "❄️", name: "Climatisation", slug: "climatisation" },
  { emoji: "🔑", name: "Serrurerie", slug: "serrurier" },
  { emoji: "🛠", name: "Bricolage", slug: "bricoleur" },
  { emoji: "🏠", name: "Renovation", slug: "renovation" },
  { emoji: "🌾", name: "Jardinage", slug: "jardinier" },
  { emoji: "💻", name: "Informatique", slug: "technicien-informatique" },
  { emoji: "🚚", name: "Demenagement", slug: "demenagement" },
];

export default function Categories() {
  return (
    <section className="bg-surface border-t border-gray-100 py-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-row gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}-casablanca`}
              className="flex flex-row items-center gap-3 flex-shrink-0 bg-white border border-gray-200 rounded-card px-4 py-2.5 text-sm font-medium text-ink hover:border-primary hover:shadow-card hover:-translate-y-0.5 transition-all duration-150"
            >
              <span role="img" aria-label={cat.name} className="text-lg">{cat.emoji}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
