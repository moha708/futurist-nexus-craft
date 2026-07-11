import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Globe, Smartphone, Gamepad2, ShieldCheck, Cloud, Sparkles } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { CTA } from "@/components/site/CTA";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const { t } = useI18n();
  const services = [
    { icon: Brain, key: "ai", to: "/services/ai" },
    { icon: Globe, key: "web", to: "/services/web" },
    { icon: Smartphone, key: "mobile", to: "/services/mobile" },
    { icon: Gamepad2, key: "game", to: "/services/game" },
    { icon: ShieldCheck, key: "security", to: "/services/cybersecurity" },
    { icon: Cloud, key: "cloud", to: "/services/cloud" },
  ] as const;

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[80%] rounded-full blur-3xl opacity-40"
          style={{ background: "var(--gradient-primary)" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground mb-8 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-nova-blue" />
            {t("hero.badge")}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            <span className="gradient-text">{t("hero.title")}</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/contact">
              <Button size="lg" className="btn-hero btn-hero-hover border-0">
                {t("hero.cta.primary")} <ArrowRight className="h-4 w-4 ms-2" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline">{t("hero.cta.secondary")}</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { v: "250+", k: "stats.projects" },
              { v: "40+", k: "stats.clients" },
              { v: "120+", k: "stats.engineers" },
              { v: "99.99%", k: "stats.uptime" },
            ].map((s) => (
              <div key={s.k} className="surface-card rounded-2xl px-4 py-6">
                <div className="text-3xl md:text-4xl font-bold gradient-text">{s.v}</div>
                <div className="mt-1 text-xs md:text-sm text-muted-foreground">{t(s.k)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t("services.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("services.subtitle")}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, key, to }) => (
            <Link key={key} to={to} className="group surface-card rounded-2xl p-7 transition-all hover:-translate-y-1 hover:border-primary/50">
              <div className="h-12 w-12 rounded-xl grid place-items-center mb-5"
                style={{ background: "var(--gradient-primary)" }}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t(`services.${key}.title`)}</h3>
              <p className="text-sm text-muted-foreground">{t(`services.${key}.desc`)}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-nova-blue group-hover:gap-2 transition-all">
                {t("services.learnMore")} <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTA />
    </PageShell>
  );
}
