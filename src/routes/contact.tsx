import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — NovaSphere" }, { name: "description", content: "Get in touch with NovaSphere Technologies." }] }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("contact_messages").insert(form);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t("contact.form.success"));
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <PageShell>
      <PageHero eyebrow={t("nav.contact")} title={t("contact.title")} subtitle={t("contact.subtitle")} />
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "hello@novasphere.tech" },
            { icon: Phone, label: "+971 4 000 0000" },
            { icon: MapPin, label: "Dubai · Riyadh · Remote" },
          ].map((c, i) => (
            <div key={i} className="surface-card rounded-2xl p-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl grid place-items-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                <c.icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm font-medium">{c.label}</div>
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="surface-card rounded-2xl p-8 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div><Label>{t("contact.form.name")}</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>{t("contact.form.email")}</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          </div>
          <div><Label>{t("contact.form.subject")}</Label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></div>
          <div><Label>{t("contact.form.message")}</Label><Textarea rows={6} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
          <Button disabled={busy} className="w-full btn-hero btn-hero-hover border-0">{t("contact.form.submit")}</Button>
        </form>
      </section>
    </PageShell>
  );
}
