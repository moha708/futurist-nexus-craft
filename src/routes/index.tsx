import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Globe, Smartphone, Gamepad2, ShieldCheck, Cloud, Sparkles, Star, Quote } from "lucide-react";
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

      {/* Featured projects */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-border/60">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t("featured.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("featured.subtitle")}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Aurora AI", tag: "AI · SaaS", grad: "linear-gradient(135deg, oklch(0.65 0.22 260), oklch(0.62 0.24 300))" },
            { title: "NovaPay", tag: "Mobile · Fintech", grad: "linear-gradient(135deg, oklch(0.62 0.24 300), oklch(0.7 0.2 340))" },
            { title: "Helix Cloud", tag: "Cloud · DevOps", grad: "linear-gradient(135deg, oklch(0.75 0.18 200), oklch(0.65 0.22 260))" },
          ].map((p) => (
            <Link key={p.title} to="/portfolio" className="group surface-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform">
              <div className="aspect-[4/3] relative" style={{ background: p.grad }}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur border border-white/20 grid place-items-center animate-float">
                    <span className="text-xl font-bold text-white">{p.title.charAt(0)}</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-muted-foreground mb-1">{p.tag}</div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">{p.title}</div>
                  <span className="text-xs text-nova-blue inline-flex items-center gap-1 group-hover:gap-2 transition-all">{t("featured.view")} <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 border-t border-border/60">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t("testimonials.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("testimonials.subtitle")}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { quote: "NovaSphere shipped in six weeks what took our previous vendor six months. The bar for engineering is genuinely world-class.", name: "Sarah Chen", role: "CTO, Aurora Labs" },
            { quote: "They treat our product like it's their own. Design, delivery, and communication have been flawless from day one.", name: "Omar Al-Rashid", role: "VP Product, NovaPay" },
            { quote: "A rare mix of deep AI expertise and mature product craft. Our conversion is up 38% since launch.", name: "Priya Natarajan", role: "Head of Growth, Helix" },
          ].map((tst) => (
            <div key={tst.name} className="surface-card rounded-2xl p-7 flex flex-col">
              <Quote className="h-6 w-6 text-nova-blue mb-4" />
              <p className="text-sm text-foreground/90 flex-1">"{tst.quote}"</p>
              <div className="mt-6 flex items-center gap-1 text-nova-blue">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <div className="mt-3">
                <div className="text-sm font-semibold">{tst.name}</div>
                <div className="text-xs text-muted-foreground">{tst.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </PageShell>
  );
}
