import { PageShell } from "./PageShell";
import { PageHero } from "./PageHero";
import { CTA } from "./CTA";
import { useI18n } from "@/lib/i18n";
import { Check, type LucideIcon } from "lucide-react";

export function ServiceDetail({ icon: Icon, titleKey, descKey, features }: {
  icon: LucideIcon; titleKey: string; descKey: string; features: string[];
}) {
  const { t } = useI18n();
  return (
    <PageShell>
      <PageHero eyebrow={t("nav.services")} title={t(titleKey)} subtitle={t(descKey)}>
        <div className="inline-grid h-16 w-16 place-items-center rounded-2xl mx-auto" style={{ background: "var(--gradient-primary)" }}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </PageHero>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="surface-card rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">What's included</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full grid place-items-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <Check className="h-3 w-3 text-white" />
                </span>
                <span className="text-sm text-foreground">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTA />
    </PageShell>
  );
}
