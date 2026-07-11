import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { ServiceDetail } from "@/components/site/ServiceDetail";
export const Route = createFileRoute("/services/cybersecurity")({
  head: () => ({ meta: [{ title: "Cybersecurity — NovaSphere" }, { name: "description", content: "Audits, penetration testing, and 24/7 threat protection." }] }),
  component: () => <ServiceDetail icon={ShieldCheck} titleKey="services.security.title" descKey="services.security.desc" features={[
    "Penetration testing","Security audits & compliance","SOC 2 / ISO 27001 readiness","24/7 threat monitoring","Incident response","Secure architecture review",
  ]} />,
});
