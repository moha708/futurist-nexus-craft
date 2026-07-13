import { createFileRoute } from "@tanstack/react-router";
import { Palette } from "lucide-react";
import { ServiceDetail } from "@/components/site/ServiceDetail";

export const Route = createFileRoute("/services/uiux")({
  head: () => ({
    meta: [
      { title: "UI/UX Design — NovaSphere" },
      { name: "description", content: "Research-led interfaces, design systems and delightful user flows." },
      { property: "og:title", content: "UI/UX Design — NovaSphere" },
      { property: "og:description", content: "Research-led interfaces, design systems and delightful user flows." },
    ],
    links: [{ rel: "canonical", href: "https://futurist-nexus-craft.lovable.app/services/uiux" }],
  }),
  component: () => (
    <ServiceDetail
      icon={Palette}
      titleKey="services.uiux.title"
      descKey="services.uiux.desc"
      features={[
        "User research & discovery",
        "Information architecture",
        "Wireframes & interactive prototypes",
        "Design systems & component libraries",
        "Motion & micro-interactions",
        "Usability testing & iteration",
      ]}
    />
  ),
});