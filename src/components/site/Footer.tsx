import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/30 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground max-w-sm">{t("footer.tagline")}</p>
          <div className="flex gap-3">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-lg bg-card border border-border hover:border-primary/60 transition-colors">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">{t("nav.services")}</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services/ai" className="hover:text-foreground">{t("services.ai.title")}</Link></li>
            <li><Link to="/services/web" className="hover:text-foreground">{t("services.web.title")}</Link></li>
            <li><Link to="/services/mobile" className="hover:text-foreground">{t("services.mobile.title")}</Link></li>
            <li><Link to="/services/game" className="hover:text-foreground">{t("services.game.title")}</Link></li>
            <li><Link to="/services/cybersecurity" className="hover:text-foreground">{t("services.security.title")}</Link></li>
            <li><Link to="/services/cloud" className="hover:text-foreground">{t("services.cloud.title")}</Link></li>
            <li><Link to="/services/uiux" className="hover:text-foreground">{t("services.uiux.title")}</Link></li>
            <li><Link to="/services/automation" className="hover:text-foreground">{t("services.automation.title")}</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">{t("brand.full")}</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">{t("nav.about")}</Link></li>
            <li><Link to="/careers" className="hover:text-foreground">{t("nav.careers")}</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">{t("nav.pricing")}</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">{t("nav.blog")}</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">{t("nav.faq")}</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">{t("nav.contact")}</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">{t("legal.privacy.title")}</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">{t("legal.terms.title")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NovaSphere Technologies. {t("footer.rights")}
      </div>
    </footer>
  );
}
