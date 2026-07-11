import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — NovaSphere" }, { name: "description", content: "Sign in or create your NovaSphere account." }] }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState<"in" | "up">("in");
  const [form, setForm] = useState({ email: "", password: "", full_name: "" });
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) nav({ to: "/dashboard" }); }, [user, nav]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back!");
  };
  const signUp = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: { full_name: form.full_name }, emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Account created — check your inbox to confirm.");
  };
  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) toast.error("Google sign-in failed");
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-md px-4 py-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{t("auth.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("auth.subtitle")}</p>
        </div>
        <div className="surface-card rounded-2xl p-6">
          <Button variant="outline" onClick={google} className="w-full mb-4">
            <svg className="me-2 h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.17v2.98h5.27c-.24 1.44-1.71 4.21-5.27 4.21-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.81 0 3.02.77 3.71 1.42l2.53-2.44C16.72 3.87 14.65 3 12.18 3 6.99 3 2.8 7.19 2.8 12.44s4.19 9.44 9.38 9.44c5.42 0 9-3.81 9-9.17 0-.61-.06-1.08-.13-1.61Z"/></svg>
            {t("auth.google")}
          </Button>
          <div className="relative my-4 text-center">
            <span className="relative bg-card px-3 text-xs text-muted-foreground">{t("auth.or")}</span>
            <div className="absolute inset-0 top-1/2 h-px bg-border" />
          </div>
          <Tabs value={tab} onValueChange={(v) => setTab(v as "in" | "up")}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="in">{t("auth.signin")}</TabsTrigger>
              <TabsTrigger value="up">{t("auth.signup")}</TabsTrigger>
            </TabsList>
            <TabsContent value="in" className="mt-4">
              <form onSubmit={signIn} className="space-y-3">
                <div><Label>{t("auth.email")}</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                <div><Label>{t("auth.password")}</Label><Input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
                <Button disabled={busy} className="w-full btn-hero btn-hero-hover border-0">{t("auth.signin")}</Button>
              </form>
            </TabsContent>
            <TabsContent value="up" className="mt-4">
              <form onSubmit={signUp} className="space-y-3">
                <div><Label>{t("auth.fullname")}</Label><Input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
                <div><Label>{t("auth.email")}</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                <div><Label>{t("auth.password")}</Label><Input type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
                <Button disabled={busy} className="w-full btn-hero btn-hero-hover border-0">{t("auth.signup")}</Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageShell>
  );
}
