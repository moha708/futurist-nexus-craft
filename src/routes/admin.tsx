import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Briefcase } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — NovaSphere" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

type Msg = { id: string; name: string; email: string; subject: string | null; message: string; created_at: string };
type App = { id: string; full_name: string; email: string; position: string; status: string; created_at: string };

function Admin() {
  const { t } = useI18n();
  const { user, isAdmin, loading } = useAuth();
  const nav = useNavigate();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => { if (!loading && !user) nav({ to: "/auth" }); }, [loading, user, nav]);

  useEffect(() => {
    if (!isAdmin) return;
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setMsgs(data || []));
    supabase.from("job_applications").select("id,full_name,email,position,status,created_at").order("created_at", { ascending: false })
      .then(({ data }) => setApps(data || []));
  }, [isAdmin]);

  if (!user) return null;

  return (
    <PageShell>
      <PageHero eyebrow={t("admin.title")} title={t("admin.title")} />
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-8">
        {!isAdmin ? (
          <div className="surface-card rounded-2xl p-8 text-center text-muted-foreground">{t("admin.noAccess")}</div>
        ) : (
          <>
            <div className="surface-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Briefcase className="h-5 w-5 text-nova-blue" />{t("admin.applications")} · {apps.length}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-xs text-muted-foreground border-b border-border">
                    <th className="py-2">Name</th><th>Email</th><th>Position</th><th>Status</th><th>Date</th>
                  </tr></thead>
                  <tbody>{apps.map((a) => (
                    <tr key={a.id} className="border-b border-border/50">
                      <td className="py-2">{a.full_name}</td><td>{a.email}</td><td>{a.position}</td>
                      <td><span className="text-xs px-2 py-0.5 rounded border border-primary/40 text-nova-blue">{a.status}</span></td>
                      <td>{new Date(a.created_at).toLocaleDateString()}</td>
                    </tr>))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="surface-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Mail className="h-5 w-5 text-nova-purple" />{t("admin.messages")} · {msgs.length}</h2>
              <div className="space-y-3">
                {msgs.map((m) => (
                  <div key={m.id} className="rounded-xl border border-border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="font-medium">{m.name} <span className="text-xs text-muted-foreground">· {m.email}</span></div>
                      <div className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</div>
                    </div>
                    {m.subject && <div className="text-sm font-semibold mb-1">{m.subject}</div>}
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{m.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </PageShell>
  );
}
