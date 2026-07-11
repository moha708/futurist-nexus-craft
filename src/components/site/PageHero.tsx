import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, subtitle, children }: {
  eyebrow?: string; title: string; subtitle?: string; children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[80%] rounded-full blur-3xl opacity-30"
        style={{ background: "var(--gradient-primary)" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-nova-blue animate-glow-pulse" />
            {eyebrow}
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
