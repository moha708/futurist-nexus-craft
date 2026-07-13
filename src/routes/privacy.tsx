import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — NovaSphere Technologies" },
      { name: "description", content: "How NovaSphere Technologies collects, uses and protects your information." },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://futurist-nexus-craft.lovable.app/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  const { t } = useI18n();
  return (
    <PageShell>
      <PageHero eyebrow="Legal" title={t("legal.privacy.title")} subtitle={`${t("legal.updated")}: January 2026`} />
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 prose-content space-y-8 text-sm leading-relaxed text-foreground/90">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">1. Introduction</h2>
          <p>NovaSphere Technologies ("we", "us", "our") is committed to protecting your privacy. This policy explains what data we collect through our website and services, how it is used, and the choices available to you.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">2. Information we collect</h2>
          <p>We collect account information you provide (name, email, phone), application content you submit (cover letters, resume links), and technical data such as IP address, browser type, and basic analytics events. We do not sell your personal information.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">3. How we use information</h2>
          <p>We use collected data to operate our services, respond to inquiries, evaluate job applications, improve our platform, and comply with legal obligations. Where required we obtain your consent before processing.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">4. Data retention</h2>
          <p>We retain personal data only for as long as necessary to fulfill the purposes it was collected for, unless a longer retention period is required by law.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">5. Your rights</h2>
          <p>Subject to applicable law, you may request access, correction, deletion, or portability of your personal information, or object to processing. Contact us to exercise these rights.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">6. Security</h2>
          <p>We use industry-standard safeguards including encryption in transit and at rest, access controls, and regular audits. No system is 100% secure, so please protect your account credentials.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">7. Contact</h2>
          <p>Questions about this policy? <Link to="/contact" className="text-nova-blue underline">{t("legal.contactUs")}</Link>.</p>
        </div>
      </section>
    </PageShell>
  );
}