import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { CTA } from "@/components/site/CTA";
import { useI18n } from "@/lib/i18n";
import { ArrowRight, Calendar } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Blog — NovaSphere" }, { name: "description", content: "Insights, engineering, and design from NovaSphere." }] }),
  component: Blog,
});

const posts = [
  { title: "Building resilient AI agents in production", cat: "AI", date: "May 12, 2026", read: "8 min read" },
  { title: "A pragmatic guide to zero-trust architecture", cat: "Security", date: "Apr 28, 2026", read: "6 min read" },
  { title: "Why we bet on server components", cat: "Engineering", date: "Apr 10, 2026", read: "5 min read" },
  { title: "Designing for delight on small screens", cat: "Design", date: "Mar 22, 2026", read: "7 min read" },
  { title: "Cost-efficient Kubernetes at scale", cat: "Cloud", date: "Mar 05, 2026", read: "9 min read" },
  { title: "The physics of great game feel", cat: "Games", date: "Feb 18, 2026", read: "10 min read" },
];

function Blog() {
  const { t } = useI18n();
  return (
    <PageShell>
      <PageHero eyebrow={t("nav.blog")} title={t("blog.title")} subtitle={t("blog.subtitle")} />
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article key={p.title} className="group surface-card rounded-2xl p-6 hover:-translate-y-1 transition-transform cursor-pointer">
            <span className="inline-block text-xs font-medium px-2 py-1 rounded-md border border-primary/40 text-nova-blue mb-4">{p.cat}</span>
            <h3 className="text-lg font-semibold leading-snug mb-3 group-hover:gradient-text transition-all">{p.title}</h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{p.date}</span>
              <span>•</span><span>{p.read}</span>
            </div>
            <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-nova-blue group-hover:gap-2 transition-all">
              {t("blog.readMore")} <ArrowRight className="h-4 w-4" />
            </div>
          </article>
        ))}
      </section>
      <CTA />
    </PageShell>
  );
}
