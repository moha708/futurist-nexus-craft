import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, MapPin, Sparkles, ArrowRight, Search } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — NovaSphere Technologies" },
      { name: "description", content: "Open roles at NovaSphere Technologies across AI, engineering, design, cloud, security and PMO. Remote-friendly and Dubai-based positions." },
      { property: "og:title", content: "Careers — NovaSphere Technologies" },
      { property: "og:description", content: "Join a global technology studio building tomorrow's software." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Careers,
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
  is_featured: boolean;
  posted_at: string;
};

function Careers() {
  const { t } = useI18n();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [dept, setDept] = useState<string>("all");
  const [loc, setLoc] = useState<string>("all");

  useEffect(() => {
    supabase.from("jobs")
      .select("id,slug,title,department,location,employment_type,level,description,is_featured,posted_at")
      .eq("is_active", true)
      .order("is_featured", { ascending: false })
      .order("posted_at", { ascending: false })
      .then(({ data }) => { setJobs((data as Job[]) || []); setLoading(false); });
  }, []);

  const departments = useMemo(() => Array.from(new Set(jobs.map((j) => j.department))).sort(), [jobs]);
  const locations = useMemo(() => Array.from(new Set(jobs.map((j) => j.location))).sort(), [jobs]);

  const filtered = useMemo(() => jobs.filter((j) => {
    if (dept !== "all" && j.department !== dept) return false;
    if (loc !== "all" && j.location !== loc) return false;
    if (q && !`${j.title} ${j.department} ${j.description}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [jobs, q, dept, loc]);

  return (
    <PageShell>
      <PageHero eyebrow={t("nav.careers")} title={t("careers.title")} subtitle={t("careers.subtitle")} />
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="surface-card rounded-2xl p-4 sm:p-5 mb-8 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("careers.search")} className="ps-9" />
          </div>
          <select value={dept} onChange={(e) => setDept(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option value="all">{t("careers.filter.all")}</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={loc} onChange={(e) => setLoc(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option value="all">{t("careers.filter.allLocations")}</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="grid gap-4">
            {[0,1,2,3].map((i) => <div key={i} className="h-32 rounded-2xl bg-card/40 animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="surface-card rounded-2xl p-12 text-center text-muted-foreground">{t("careers.empty")}</div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((j) => (
              <Link key={j.id} to="/careers/$slug" params={{ slug: j.slug }}
                className="group surface-card rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 hover:border-primary/50 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                    <span className="inline-flex items-center gap-1 rounded-md border border-primary/40 text-nova-blue px-2 py-0.5">
                      <Briefcase className="h-3 w-3" />{j.department}
                    </span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />{j.location}
                    </span>
                    <span className="text-muted-foreground">· {t(`careers.type.${j.employment_type.replace("-","")}`)}</span>
                    <span className="text-muted-foreground">· {t(`careers.level.${j.level}`)}</span>
                    {j.is_featured && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 text-nova-purple px-2 py-0.5">
                        <Sparkles className="h-3 w-3" />{t("careers.featured")}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-nova-blue transition-colors">{j.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{j.description}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-nova-blue">
                  {t("careers.viewRole")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
