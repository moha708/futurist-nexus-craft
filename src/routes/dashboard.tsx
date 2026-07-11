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

type App = { id: string; position: string; status: string; created_at: string };

function Dashboard() {
  const { t } = useI18n();
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => { if (!loading && !user) nav({ to: "/auth" }); }, [loading, user, nav]);

  useEffect(() => {
    if (!user) return;
    supabase.from("job_applications").select("id,position,status,created_at").eq("user_id", user.id)
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
                <div key={a.id} className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div>
                    <div className="font-medium">{a.position}</div>
                    <div className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-md border border-primary/40 text-nova-blue capitalize">{a.status}</span>
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
