import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import JsonLd from "@/components/seo/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  const allItems = [{ name: "Accueil", url: "https://allo-maison.ma" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(allItems)} />
      <nav aria-label="Fil d'Ariane" className={cn("flex items-center flex-wrap gap-1 text-sm text-muted", className)}>
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span className="sr-only">Accueil</span>
        </Link>
        {items.map((item, index) => (
          <span key={item.url} className="flex items-center gap-1">
            <ChevronRight className="w-3.5 h-3.5 text-muted/50 flex-shrink-0" />
            {index === items.length - 1 ? (
              <span className="text-ink font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.url} className="hover:text-primary transition-colors">
                {item.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
