import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — NovaSphere Technologies" },
      { name: "description", content: "The terms and conditions governing your use of NovaSphere Technologies services." },
    ],
    links: [{ rel: "canonical", href: "https://futurist-nexus-craft.lovable.app/terms" }],
  }),
  component: Terms,
});

function Terms() {
  const { t } = useI18n();
  return (
    <PageShell>
      <PageHero eyebrow="Legal" title={t("legal.terms.title")} subtitle={`${t("legal.updated")}: January 2026`} />
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-sm leading-relaxed text-foreground/90">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">1. Acceptance of terms</h2>
          <p>By accessing or using the NovaSphere Technologies website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">2. Services</h2>
          <p>We provide software design, engineering, AI, cloud, and related professional services. Specific deliverables, timelines and fees are defined in individual statements of work.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">3. User accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">4. Intellectual property</h2>
          <p>All content on this website — including logos, text, graphics, and software — is the property of NovaSphere Technologies or its licensors and is protected by intellectual property laws.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">5. Prohibited use</h2>
          <p>You may not use our services for unlawful, harmful, or fraudulent purposes, or to infringe on the rights of others. We reserve the right to suspend accounts violating these terms.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">6. Limitation of liability</h2>
          <p>To the maximum extent permitted by law, NovaSphere Technologies is not liable for indirect, incidental, or consequential damages arising from your use of our services.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">7. Changes</h2>
          <p>We may update these Terms from time to time. Continued use of our services after changes constitutes acceptance of the updated Terms.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">8. Contact</h2>
          <p>Questions about these Terms? <Link to="/contact" className="text-nova-blue underline">{t("legal.contactUs")}</Link>.</p>
        </div>
      </section>
    </PageShell>
  );
}