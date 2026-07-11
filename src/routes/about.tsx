import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { CTA } from "@/components/site/CTA";
import { useI18n } from "@/lib/i18n";
import { Sparkles, Target, Eye, Users, Award, Rocket } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — NovaSphere Technologies" },
    { name: "description", content: "Global technology studio building intelligent, secure, delightful digital products." },
  ] }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  const values = [
    { icon: Award, k: "craft" },
    { icon: Rocket, k: "impact" },
    { icon: Users, k: "trust" },
  ] as const;
  return (
    <PageShell>
      <PageHero eyebrow={t("about.title")} title={t("about.title")} subtitle={t("about.lead")} />
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 grid gap-6 md:grid-cols-2">
        <div className="surface-card rounded-2xl p-8">
          <Target className="h-8 w-8 text-nova-blue mb-4" />
          <h3 className="text-2xl font-bold mb-2">{t("about.mission.title")}</h3>
          <p className="text-muted-foreground">{t("about.mission.desc")}</p>
        </div>
        <div className="surface-card rounded-2xl p-8">
          <Eye className="h-8 w-8 text-nova-purple mb-4" />
          <h3 className="text-2xl font-bold mb-2">{t("about.vision.title")}</h3>
          <p className="text-muted-foreground">{t("about.vision.desc")}</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-5 w-5 text-nova-blue" />
          <h2 className="text-2xl font-bold">{t("about.values.title")}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {values.map(({ icon: Icon, k }) => (
            <div key={k} className="surface-card rounded-2xl p-6">
              <Icon className="h-6 w-6 text-nova-blue mb-3" />
              <h4 className="font-semibold mb-1">{t(`about.values.${k}`)}</h4>
              <p className="text-sm text-muted-foreground">{t(`about.values.${k}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </PageShell>
  );
}
