import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Briefcase, Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — NovaSphere" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

type Msg = { id: string; name: string; email: string; subject: string | null; message: string; created_at: string };
type App = {
  id: string;
  full_name: string;
  email: string;
  position: string;
  status: string;
  created_at: string;
  phone: string | null;
  years_experience: number | null;
  skills: string[] | null;
  education: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  resume_url: string | null;
  cover_letter: string | null;
  current_company: string | null;
  notice_period: string | null;
  expected_salary: string | null;
};

const STATUSES = ["pending","reviewing","interview","offer","hired","rejected"] as const;

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
    supabase.from("job_applications").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setApps(data || []));
  }, [isAdmin]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("job_applications").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
    toast.success("Status updated");
  };

  const openResume = async (path: string) => {
    const { data, error } = await supabase.storage.from("resumes").createSignedUrl(path, 60);
    if (error || !data) { toast.error("Could not open resume"); return; }
    window.open(data.signedUrl, "_blank");
  };

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
              <div className="space-y-3">
                {apps.map((a) => (
                  <details key={a.id} className="rounded-xl border border-border">
                    <summary className="flex flex-wrap items-center justify-between gap-3 p-4 cursor-pointer list-none">
                      <div className="min-w-0">
                        <div className="font-medium">{a.full_name} <span className="text-xs text-muted-foreground">· {a.email}</span></div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {a.position} · {new Date(a.created_at).toLocaleDateString()}
                          {a.years_experience != null && ` · ${a.years_experience}y`}
                        </div>
                      </div>
                      <select value={a.status} onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateStatus(a.id, e.target.value)}
                        className="h-8 rounded-md border border-input bg-background px-2 text-xs capitalize">
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </summary>
                    <div className="border-t border-border p-4 space-y-3 text-sm">
                      <div className="grid gap-2 sm:grid-cols-2 text-xs">
                        {a.phone && <div><span className="text-muted-foreground">Phone:</span> {a.phone}</div>}
                        {a.current_company && <div><span className="text-muted-foreground">Company:</span> {a.current_company}</div>}
                        {a.education && <div><span className="text-muted-foreground">Education:</span> {a.education}</div>}
                        {a.notice_period && <div><span className="text-muted-foreground">Notice:</span> {a.notice_period}</div>}
                        {a.expected_salary && <div><span className="text-muted-foreground">Expected:</span> {a.expected_salary}</div>}
                        {a.linkedin_url && <div><a href={a.linkedin_url} target="_blank" rel="noreferrer" className="text-nova-blue underline">LinkedIn</a></div>}
                        {a.portfolio_url && <div><a href={a.portfolio_url} target="_blank" rel="noreferrer" className="text-nova-blue underline">Portfolio</a></div>}
                      </div>
                      {a.skills && a.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {a.skills.map((s) => <span key={s} className="text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">{s}</span>)}
                        </div>
                      )}
                      {a.cover_letter && <p className="text-muted-foreground whitespace-pre-wrap text-xs">{a.cover_letter}</p>}
                      {a.resume_url && (
                        <button onClick={() => openResume(a.resume_url!)} className="inline-flex items-center gap-1 text-xs text-nova-blue hover:underline">
                          <Download className="h-3 w-3" /> {t("admin.viewResume")}
                        </button>
                      )}
                    </div>
                  </details>
                ))}
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
