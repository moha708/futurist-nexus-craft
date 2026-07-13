import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — NovaSphere" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

type App = {
  id: string;
  position: string;
  status: string;
  created_at: string;
  years_experience: number | null;
  skills: string[] | null;
  resume_url: string | null;
};

const STATUS_STYLES: Record<string, string> = {
  pending: "border-muted-foreground/40 text-muted-foreground",
  reviewing: "border-nova-blue/50 text-nova-blue",
  interview: "border-nova-purple/50 text-nova-purple",
  offer: "border-emerald-500/50 text-emerald-400",
  hired: "border-emerald-500/70 text-emerald-300 bg-emerald-500/10",
  rejected: "border-destructive/50 text-destructive",
};

function Dashboard() {
  const { t } = useI18n();
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => { if (!loading && !user) nav({ to: "/auth" }); }, [loading, user, nav]);

  useEffect(() => {
    if (!user) return;
    supabase.from("job_applications").select("id,position,status,created_at,years_experience,skills,resume_url").eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setApps(data || []));
  }, [user]);

  if (!user) return null;

  return (
    <PageShell>
      <PageHero eyebrow={t("dashboard.title")} title={`${t("dashboard.welcome")}, ${user.email?.split("@")[0]}`} />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 space-y-8">
        <div className="surface-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Briefcase className="h-5 w-5 text-nova-blue" />{t("dashboard.applications")}</h2>
          {apps.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              {t("dashboard.noApps")} <Link to="/careers" className="text-nova-blue underline">{t("nav.careers")}</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {apps.map((a) => (
                <div key={a.id} className="rounded-xl border border-border p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-medium">{a.position}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {new Date(a.created_at).toLocaleDateString()}
                        {a.years_experience != null && ` · ${a.years_experience}y exp`}
                      </div>
                      {a.skills && a.skills.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {a.skills.slice(0, 6).map((s) => (
                            <span key={s} className="text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-md border capitalize ${STATUS_STYLES[a.status] ?? STATUS_STYLES.pending}`}>
                      {t(`dashboard.status.${a.status}`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="surface-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-2">{t("dashboard.profile")}</h2>
          <div className="text-sm text-muted-foreground">{user.email}</div>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => supabase.auth.signOut()}>{t("nav.signout")}</Button>
        </div>
      </section>
    </PageShell>
  );
}
