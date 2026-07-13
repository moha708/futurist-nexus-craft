import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { CTA } from "@/components/site/CTA";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — NovaSphere Technologies" },
      { name: "description", content: "Transparent pricing for design, engineering and AI engagements — from MVP to enterprise." },
      { property: "og:title", content: "Pricing — NovaSphere" },
      { property: "og:description", content: "Transparent pricing for design, engineering and AI engagements." },
    ],
    links: [{ rel: "canonical", href: "https://futurist-nexus-craft.lovable.app/pricing" }],
  }),
  component: Pricing,
});

function Pricing() {
  const { t } = useI18n();
  const tiers = [
    {
      key: "starter",
      price: "$4,900",
      period: t("pricing.month"),
      popular: false,
      features: [
        "1 product squad (2 engineers + PM)",
        "Weekly delivery sprints",
        "Product design included",
        "Slack & video access",
        "Cloud & infra guidance",
      ],
    },
    {
      key: "growth",
      price: "$12,900",
      period: t("pricing.month"),
      popular: true,
      features: [
        "2 product squads (5 engineers + PM + Designer)",
        "Dedicated tech lead",
        "Custom AI integrations",
        "Performance & SEO optimization",
        "24/5 priority support",
        "Quarterly strategy reviews",
      ],
    },
    {
      key: "enterprise",
      price: t("pricing.custom"),
      period: "",
      popular: false,
      features: [
        "Dedicated multi-squad delivery",
        "24/7 support with SLA",
        "On-site workshops",
        "Security & compliance audits",
        "Custom contracts & DPA",
        "Named executive sponsor",
      ],
    },
  ] as const;

  return (
    <PageShell>
      <PageHero eyebrow={t("nav.pricing")} title={t("pricing.title")} subtitle={t("pricing.subtitle")} />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.key}
              className={`relative surface-card rounded-2xl p-8 flex flex-col ${tier.popular ? "border-primary/60 shadow-lg" : ""}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 start-6 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ background: "var(--gradient-primary)" }}>
                  <Sparkles className="h-3 w-3" />
                  {t("pricing.popular")}
                </div>
              )}
              <h3 className="text-xl font-bold">{t(`pricing.${tier.key}`)}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t(`pricing.${tier.key}.desc`)}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold gradient-text">{tier.price}</span>
                {tier.period && <span className="text-sm text-muted-foreground">{tier.period}</span>}
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 h-4 w-4 rounded-full grid place-items-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                      <Check className="h-2.5 w-2.5 text-white" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-8">
                <Button className={`w-full ${tier.popular ? "btn-hero btn-hero-hover border-0" : ""}`} variant={tier.popular ? "default" : "outline"}>
                  {t("pricing.cta")}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </PageShell>
  );
}