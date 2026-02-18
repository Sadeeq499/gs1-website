import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function IndustryCard({ industry, className }) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-card shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full border border-border/40",
        className,
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img
          src={industry.image}
          alt={industry.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/80 group-hover:text-primary transition-colors">
          <span className="text-primary">{industry.title}</span>
        </h3>

        <p className="mb-6 text-muted-foreground leading-relaxed line-clamp-3 group-hover:text-foreground/80 transition-colors">
          {industry.description}
        </p>

        <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider group-hover:text-secondary transition-colors">
            Learn more
          </span>
          <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-white group-hover:scale-110">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Full clickable area link */}
      <Link
        href={industry.href}
        className="absolute inset-0 z-30 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-3xl"
      >
        <span className="sr-only">View {industry.title}</span>
      </Link>
    </div>
  );
}
