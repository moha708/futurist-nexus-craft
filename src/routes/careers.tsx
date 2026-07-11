import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Briefcase, MapPin } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({ meta: [{ title: "Careers — NovaSphere" }, { name: "description", content: "Join NovaSphere Technologies. Open roles across engineering, design & strategy." }] }),
  component: Careers,
});

const jobs = [
  { title: "Senior AI Engineer", location: "Remote", team: "AI" },
  { title: "Full-Stack Engineer", location: "Dubai / Remote", team: "Web" },
  { title: "iOS Engineer", location: "Remote", team: "Mobile" },
  { title: "Game Developer (Unity)", location: "Remote", team: "Games" },
  { title: "Security Engineer", location: "Dubai", team: "Security" },
  { title: "Cloud Architect", location: "Remote", team: "Cloud" },
  { title: "Product Designer", location: "Remote", team: "Design" },
  { title: "Technical Program Manager", location: "Dubai", team: "PMO" },
];

function Careers() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", cover_letter: "", resume_url: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error(t("careers.form.needAuth")); return; }
    setSubmitting(true);
    const { error } = await supabase.from("job_applications").insert({
      user_id: user.id,
      position: selected!,
      full_name: form.full_name,
      email: form.email,
      phone: form.phone || null,
      cover_letter: form.cover_letter || null,
      resume_url: form.resume_url || null,
    });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t("careers.form.success"));
    setSelected(null);
    setForm({ full_name: "", email: "", phone: "", cover_letter: "", resume_url: "" });
  };

  return (
    <PageShell>
      <PageHero eyebrow={t("nav.careers")} title={t("careers.title")} subtitle={t("careers.subtitle")} />
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-4">
          {jobs.map((j) => (
            <div key={j.title} className="surface-card rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span className="inline-flex items-center gap-1 rounded-md border border-primary/40 text-nova-blue px-2 py-0.5"><Briefcase className="h-3 w-3" />{j.team}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{j.location}</span>
                </div>
                <h3 className="text-lg font-semibold">{j.title}</h3>
              </div>
              <Button className="btn-hero btn-hero-hover border-0" onClick={() => setSelected(j.title)}>
                {t("careers.apply")}
              </Button>
            </div>
          ))}
        </div>

        {selected && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur px-4" onClick={() => setSelected(null)}>
            <form onClick={(e) => e.stopPropagation()} onSubmit={submit}
              className="surface-card w-full max-w-lg rounded-2xl p-8 space-y-4">
              <h3 className="text-2xl font-bold">{t("careers.form.title")}</h3>
              <p className="text-sm text-muted-foreground">{selected}</p>
              {!user && <p className="text-sm text-destructive">{t("careers.form.needAuth")} <Link to="/auth" className="underline">{t("nav.signin")}</Link></p>}
              <div className="space-y-3">
                <div><Label>{t("careers.form.name")}</Label><Input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
                <div><Label>{t("careers.form.email")}</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                <div><Label>{t("careers.form.phone")}</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                <div><Label>{t("careers.form.resume")}</Label><Input value={form.resume_url} onChange={(e) => setForm({ ...form, resume_url: e.target.value })} /></div>
                <div><Label>{t("careers.form.cover")}</Label><Textarea rows={4} value={form.cover_letter} onChange={(e) => setForm({ ...form, cover_letter: e.target.value })} /></div>
              </div>
              <Button disabled={submitting || !user} className="w-full btn-hero btn-hero-hover border-0">
                {t("careers.form.submit")}
              </Button>
            </form>
          </div>
        )}
      </section>
    </PageShell>
  );
}
