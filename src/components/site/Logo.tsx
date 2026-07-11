import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Logo() {
  const { t } = useI18n();
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative h-9 w-9 rounded-xl overflow-hidden flex items-center justify-center"
        style={{ background: "var(--gradient-primary)" }}>
        <div className="absolute inset-0 opacity-60 animate-glow-pulse"
          style={{ background: "radial-gradient(circle, oklch(0.85 0.15 260 / 0.9), transparent 70%)" }} />
        <svg viewBox="0 0 24 24" className="relative h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="3" />
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        </svg>
      </div>
      <span className="font-bold text-lg tracking-tight text-foreground group-hover:gradient-text transition-all">
        {t("brand")}
      </span>
    </Link>
  );
}
