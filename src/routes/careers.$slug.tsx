import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import { ArrowLeft, Briefcase, MapPin, Sparkles, CheckCircle2, Upload, DollarSign } from "lucide-react";

export const Route = createFileRoute("/careers/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} — Careers · NovaSphere` },
      { name: "description", content: "Apply to open roles at NovaSphere Technologies." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: JobDetail,
});

type Job = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  level: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  nice_to_haves: string[];
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  is_featured: boolean;
};

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

function JobDetail() {
  const { slug } = Route.useParams();
  const { t } = useI18n();
  const { user } = useAuth();
  const nav = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resumePath, setResumePath] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    current_company: "",
    years_experience: "",
    education: "",
    skills: "",
    linkedin_url: "",
    portfolio_url: "",
    notice_period: "",
    expected_salary: "",
    cover_letter: "",
  });

  useEffect(() => {
    supabase.from("jobs").select("*").eq("slug", slug).maybeSingle()
      .then(({ data }) => { setJob(data as Job | null); setLoading(false); });
  }, [slug]);

  useEffect(() => {
    if (!user || !job) return;
    setForm((f) => ({ ...f, email: f.email || user.email || "" }));
    supabase.from("job_applications").select("id").eq("user_id", user.id).eq("job_id", job.id).maybeSingle()
      .then(({ data }) => setAlreadyApplied(!!data));
  }, [user, job]);

  const uploadResume = async (file: File) => {
    if (!user) { toast.error(t("careers.form.needAuth")); return; }
    if (file.size > MAX_RESUME_BYTES) { toast.error(t("careers.form.fileTooLarge")); return; }
    setUploading(true);
    const ext = file.name.split(".").pop() || "pdf";
    const path = `${user.id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("resumes").upload(path, file, { upsert: false, contentType: file.type });
    setUploading(false);
    if (error) { toast.error(t("careers.form.uploadError")); return; }
    setResumePath(path);
    toast.success(t("careers.form.resumeUploaded"));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !job) { toast.error(t("careers.form.needAuth")); return; }
    setSubmitting(true);
    const skills = form.skills.split(",").map((s) => s.trim()).filter(Boolean);
    const years = form.years_experience ? Number(form.years_experience) : null;
    const { error } = await supabase.from("job_applications").insert({
      user_id: user.id,
      job_id: job.id,
      position: job.title,
      full_name: form.full_name,
      email: form.email,
      phone: form.phone || null,
      current_company: form.current_company || null,
      years_experience: years,
      education: form.education || null,
      skills,
      linkedin_url: form.linkedin_url || null,
      portfolio_url: form.portfolio_url || null,
      notice_period: form.notice_period || null,
      expected_salary: form.expected_salary || null,
      cover_letter: form.cover_letter || null,
      resume_url: resumePath,
    });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t("careers.form.success"));
    nav({ to: "/dashboard" });
  };

  if (loading) {
    return <PageShell><div className="mx-auto max-w-4xl px-4 py-32"><div className="h-96 rounded-2xl bg-card/40 animate-pulse" /></div></PageShell>;
  }
  if (!job) {
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl px-4 py-32 text-center">
          <p className="text-muted-foreground mb-4">{t("careers.detail.notFound")}</p>
          <Link to="/careers" className="text-nova-blue underline">{t("careers.detail.back")}</Link>
        </div>
      </PageShell>
    );
  }

  const salary = job.salary_min && job.salary_max
    ? `${job.salary_currency || "USD"} ${job.salary_min.toLocaleString()} – ${job.salary_max.toLocaleString()}`
    : null;

  return (
    <PageShell>
      <PageHero
        eyebrow={job.department}
        title={job.title}
        subtitle={`${job.location} · ${t(`careers.type.${job.employment_type.replace("-","")}`)} · ${t(`careers.level.${job.level}`)}`}
      />
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-24 -mt-8">
        <Link to="/careers" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t("careers.detail.back")}
        </Link>

        <div className="surface-card rounded-2xl p-8 space-y-8">
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="inline-flex items-center gap-1 rounded-md border border-primary/40 text-nova-blue px-2 py-1"><Briefcase className="h-3 w-3" />{job.department}</span>
            <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1"><MapPin className="h-3 w-3" />{job.location}</span>
            {job.is_featured && <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 text-nova-purple px-2 py-1"><Sparkles className="h-3 w-3" />{t("careers.featured")}</span>}
            {salary && <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1"><DollarSign className="h-3 w-3" />{salary}</span>}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">{t("careers.detail.about")}</h2>
            <p className="text-muted-foreground leading-relaxed">{job.description}</p>
          </div>

          {job.responsibilities.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">{t("careers.detail.responsibilities")}</h2>
              <ul className="space-y-2">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-nova-blue shrink-0" /> <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">{t("careers.detail.requirements")}</h2>
              <ul className="space-y-2">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-nova-purple shrink-0" /> <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.nice_to_haves.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">{t("careers.detail.nice")}</h2>
              <ul className="space-y-2">
                {job.nice_to_haves.map((r, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <Sparkles className="h-4 w-4 mt-0.5 text-nova-blue shrink-0" /> <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div id="apply" className="surface-card rounded-2xl p-8 mt-8">
          <h2 className="text-2xl font-bold mb-1">{t("careers.form.title")}</h2>
          <p className="text-sm text-muted-foreground mb-6">{job.title}</p>

          {!user ? (
            <div className="rounded-xl border border-border p-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">{t("careers.form.needAuth")}</p>
              <Link to="/auth"><Button className="btn-hero btn-hero-hover border-0">{t("nav.signin")}</Button></Link>
            </div>
          ) : alreadyApplied ? (
            <div className="rounded-xl border border-border p-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">{t("careers.form.alreadyApplied")}</p>
              <Link to="/dashboard"><Button variant="outline" size="sm">{t("nav.dashboard")}</Button></Link>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-8">
              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-nova-blue mb-2">{t("careers.form.section.personal")}</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><Label>{t("careers.form.name")}</Label><Input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
                  <div><Label>{t("careers.form.email")}</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                  <div><Label>{t("careers.form.phone")}</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                  <div><Label>{t("careers.form.currentCompany")}</Label><Input value={form.current_company} onChange={(e) => setForm({ ...form, current_company: e.target.value })} /></div>
                </div>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-nova-blue mb-2">{t("careers.form.section.experience")}</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><Label>{t("careers.form.years")}</Label><Input type="number" min={0} max={60} value={form.years_experience} onChange={(e) => setForm({ ...form, years_experience: e.target.value })} /></div>
                  <div><Label>{t("careers.form.education")}</Label><Input placeholder="BSc Computer Science, MIT" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} /></div>
                  <div className="sm:col-span-2"><Label>{t("careers.form.skills")}</Label><Input placeholder="React, TypeScript, PyTorch" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} /></div>
                  <div><Label>{t("careers.form.notice")}</Label><Input placeholder="Immediate / 2 weeks / 1 month" value={form.notice_period} onChange={(e) => setForm({ ...form, notice_period: e.target.value })} /></div>
                  <div><Label>{t("careers.form.expected")}</Label><Input placeholder="USD 120,000" value={form.expected_salary} onChange={(e) => setForm({ ...form, expected_salary: e.target.value })} /></div>
                </div>
                <div><Label>{t("careers.form.cover")}</Label><Textarea rows={5} value={form.cover_letter} onChange={(e) => setForm({ ...form, cover_letter: e.target.value })} /></div>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-nova-blue mb-2">{t("careers.form.section.links")}</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><Label>{t("careers.form.linkedin")}</Label><Input type="url" placeholder="https://linkedin.com/in/…" value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} /></div>
                  <div><Label>{t("careers.form.portfolio")}</Label><Input type="url" placeholder="https://github.com/…" value={form.portfolio_url} onChange={(e) => setForm({ ...form, portfolio_url: e.target.value })} /></div>
                </div>
                <div>
                  <Label>{t("careers.form.resumeFile")}</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 cursor-pointer rounded-md border border-input bg-background px-3 h-10 text-sm hover:border-primary/50">
                      <Upload className="h-4 w-4" />
                      <span>{uploading ? "…" : t("careers.form.resumeFile").split(" ").slice(0,2).join(" ")}</span>
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadResume(f); }} />
                    </label>
                    {resumePath && (
                      <span className="inline-flex items-center gap-1 text-xs text-nova-blue">
                        <CheckCircle2 className="h-4 w-4" /> {t("careers.form.resumeUploaded")}
                      </span>
                    )}
                  </div>
                </div>
              </fieldset>

              <Button type="submit" disabled={submitting || uploading} className="w-full btn-hero btn-hero-hover border-0">
                {t("careers.form.submit")}
              </Button>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}