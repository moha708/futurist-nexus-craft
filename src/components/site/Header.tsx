import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, LayoutDashboard, LogOut, Shield } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function Header() {
  const { t } = useI18n();
  const { user, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/services", label: t("nav.services") },
    { to: "/portfolio", label: t("nav.portfolio") },
    { to: "/pricing", label: t("nav.pricing") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/careers", label: t("nav.careers") },
    { to: "/faq", label: t("nav.faq") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm font-medium text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <LanguageToggle />
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm"><LayoutDashboard className="h-4 w-4 me-1.5" />{t("nav.dashboard")}</Button>
              </Link>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="ghost" size="sm"><Shield className="h-4 w-4 me-1.5" />{t("nav.admin")}</Button>
                </Link>
              )}
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 me-1.5" />{t("nav.signout")}
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth"><Button variant="ghost" size="sm">{t("nav.signin")}</Button></Link>
              <Link to="/contact">
                <Button size="sm" className="btn-hero btn-hero-hover border-0">{t("nav.getStarted")}</Button>
              </Link>
            </>
          )}
        </div>
        <button className="lg:hidden text-foreground" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 px-4 py-4 space-y-2">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-card">
              {l.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <LanguageToggle />
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)}><Button variant="ghost" size="sm">{t("nav.dashboard")}</Button></Link>
                {isAdmin && <Link to="/admin" onClick={() => setOpen(false)}><Button variant="ghost" size="sm">{t("nav.admin")}</Button></Link>}
                <Button variant="outline" size="sm" onClick={() => { setOpen(false); signOut(); }}>{t("nav.signout")}</Button>
              </>
            ) : (
              <>
                <Link to="/auth" onClick={() => setOpen(false)}><Button variant="ghost" size="sm">{t("nav.signin")}</Button></Link>
                <Link to="/contact" onClick={() => setOpen(false)}>
                  <Button size="sm" className="btn-hero btn-hero-hover border-0">{t("nav.getStarted")}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
