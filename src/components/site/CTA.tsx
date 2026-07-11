import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

export function CTA() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-24">
      <div className="relative overflow-hidden rounded-3xl border border-border p-10 md:p-16 text-center surface-card">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[60%] rounded-full blur-3xl"
          style={{ background: "var(--gradient-primary)", opacity: 0.35 }} />
        <div className="relative">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{t("cta.title")}</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t("cta.subtitle")}</p>
          <Link to="/contact" className="inline-block mt-8">
            <Button size="lg" className="btn-hero btn-hero-hover border-0">
              {t("cta.button")} <ArrowRight className="h-4 w-4 ms-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
