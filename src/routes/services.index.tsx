import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { CTA } from "@/components/site/CTA";
import { useI18n } from "@/lib/i18n";
import { Brain, Globe, Smartphone, Gamepad2, ShieldCheck, Cloud, ArrowRight, Palette, Workflow } from "lucide-react";

export const Route = createFileRoute("/services/")({
  head: () => ({ meta: [
    { title: "Services — NovaSphere Technologies" },
    { name: "description", content: "AI, Web, Mobile, Games, Cybersecurity and Cloud services engineered end-to-end." },
  ] }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const { t } = useI18n();
  const services = [
    { icon: Brain, key: "ai", to: "/services/ai" },
    { icon: Globe, key: "web", to: "/services/web" },
    { icon: Smartphone, key: "mobile", to: "/services/mobile" },
    { icon: Gamepad2, key: "game", to: "/services/game" },
    { icon: ShieldCheck, key: "security", to: "/services/cybersecurity" },
    { icon: Cloud, key: "cloud", to: "/services/cloud" },
    { icon: Palette, key: "uiux", to: "/services/uiux" },
    { icon: Workflow, key: "automation", to: "/services/automation" },
  ] as const;
  return (
    <PageShell>
      <PageHero eyebrow={t("nav.services")} title={t("services.title")} subtitle={t("services.subtitle")} />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, key, to }) => (
          <Link key={key} to={to} className="group surface-card rounded-2xl p-7 hover:-translate-y-1 hover:border-primary/50 transition-all">
            <div className="h-12 w-12 rounded-xl grid place-items-center mb-5" style={{ background: "var(--gradient-primary)" }}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t(`services.${key}.title`)}</h3>
            <p className="text-sm text-muted-foreground">{t(`services.${key}.desc`)}</p>
            <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-nova-blue group-hover:gap-2 transition-all">
              {t("services.learnMore")} <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </section>
      <CTA />
    </PageShell>
  );
}
