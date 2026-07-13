import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { CTA } from "@/components/site/CTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";

const faqs = [
  { q: "What kinds of projects do you take on?", a: "We partner with startups and enterprises on AI, web, mobile, games, cloud, cybersecurity, UI/UX and automation — from MVPs to platforms serving millions." },
  { q: "How long does an engagement take?", a: "MVPs typically ship in 6–10 weeks. Larger platforms roll out in quarterly increments with continuous delivery so you see value every sprint." },
  { q: "Do you work with existing codebases?", a: "Yes. We regularly audit, refactor and extend existing systems. We can drop in a squad to accelerate your in-house team or own delivery end-to-end." },
  { q: "How do you handle security & compliance?", a: "Every engagement follows secure-by-default practices with encryption in transit and at rest, RBAC, audit logs and optional SOC 2 / ISO 27001 aligned workflows." },
  { q: "Can you sign an NDA and custom MSA?", a: "Absolutely. We routinely sign mutual NDAs, DPAs, and negotiate custom master service agreements before kickoff." },
  { q: "Do you offer support after launch?", a: "Yes. Every plan includes launch support; Growth and Enterprise plans add proactive monitoring, SLAs and dedicated on-call coverage." },
  { q: "Where is your team based?", a: "We're a distributed studio with hubs in Dubai and remote engineers across EMEA, APAC and the Americas — covering all major time zones." },
  { q: "How do we get started?", a: "Reach out via our contact form. We'll schedule a discovery call within one business day and share a proposal with scope, timeline and pricing." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — NovaSphere Technologies" },
      { name: "description", content: "Answers to common questions about working with NovaSphere Technologies." },
      { property: "og:title", content: "FAQ — NovaSphere" },
      { property: "og:description", content: "Answers to common questions about working with NovaSphere Technologies." },
    ],
    links: [{ rel: "canonical", href: "https://futurist-nexus-craft.lovable.app/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FAQ,
});

function FAQ() {
  const { t } = useI18n();
  return (
    <PageShell>
      <PageHero eyebrow={t("nav.faq")} title={t("faq.title")} subtitle={t("faq.subtitle")} />
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="surface-card rounded-2xl p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-start text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <CTA />
    </PageShell>
  );
}