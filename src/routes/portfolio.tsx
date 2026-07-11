import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { CTA } from "@/components/site/CTA";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/portfolio")({
  head: () => ({ meta: [{ title: "Portfolio — NovaSphere" }, { name: "description", content: "Selected work from NovaSphere Technologies." }] }),
  component: Portfolio,
});

const items = [
  { title: "Aurora AI Assistant", tag: "AI · SaaS", grad: "linear-gradient(135deg, oklch(0.65 0.22 260), oklch(0.62 0.24 300))" },
  { title: "NovaPay Wallet", tag: "Mobile · Fintech", grad: "linear-gradient(135deg, oklch(0.62 0.24 300), oklch(0.7 0.2 340))" },
  { title: "Helix Cloud Ops", tag: "Cloud · DevOps", grad: "linear-gradient(135deg, oklch(0.75 0.18 200), oklch(0.65 0.22 260))" },
  { title: "Nebula Commerce", tag: "Web · E-commerce", grad: "linear-gradient(135deg, oklch(0.7 0.2 340), oklch(0.62 0.24 300))" },
  { title: "Voidstrike VR", tag: "Games · VR", grad: "linear-gradient(135deg, oklch(0.65 0.22 260), oklch(0.78 0.16 210))" },
  { title: "SentryShield", tag: "Cybersecurity", grad: "linear-gradient(135deg, oklch(0.62 0.24 300), oklch(0.65 0.22 260))" },
];

function Portfolio() {
  const { t } = useI18n();
  return (
    <PageShell>
      <PageHero eyebrow={t("nav.portfolio")} title={t("portfolio.title")} subtitle={t("portfolio.subtitle")} />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="group surface-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform">
            <div className="aspect-[4/3] relative" style={{ background: it.grad }}>
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-2xl bg-white/10 backdrop-blur border border-white/20 grid place-items-center animate-float">
                  <span className="text-2xl font-bold text-white">{it.title.charAt(0)}</span>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs text-muted-foreground mb-1">{it.tag}</div>
              <div className="text-lg font-semibold">{it.title}</div>
            </div>
          </div>
        ))}
      </section>
      <CTA />
    </PageShell>
  );
}
