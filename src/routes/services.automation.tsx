import { createFileRoute } from "@tanstack/react-router";
import { Workflow } from "lucide-react";
import { ServiceDetail } from "@/components/site/ServiceDetail";

export const Route = createFileRoute("/services/automation")({
  head: () => ({
    meta: [
      { title: "Automation — NovaSphere" },
      { name: "description", content: "Workflow automation, RPA and AI copilots that eliminate busy work." },
      { property: "og:title", content: "Automation — NovaSphere" },
      { property: "og:description", content: "Workflow automation, RPA and AI copilots that eliminate busy work." },
    ],
    links: [{ rel: "canonical", href: "https://futurist-nexus-craft.lovable.app/services/automation" }],
  }),
  component: () => (
    <ServiceDetail
      icon={Workflow}
      titleKey="services.automation.title"
      descKey="services.automation.desc"
      features={[
        "Business process automation",
        "Robotic process automation (RPA)",
        "AI copilots & intelligent agents",
        "System & API integrations",
        "Data pipelines & ETL",
        "Monitoring, alerts & analytics",
      ]}
    />
  ),
});