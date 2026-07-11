import { createFileRoute } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import { ServiceDetail } from "@/components/site/ServiceDetail";
export const Route = createFileRoute("/services/web")({
  head: () => ({ meta: [{ title: "Web Development — NovaSphere" }, { name: "description", content: "Blazing-fast web platforms with modern stacks." }] }),
  component: () => <ServiceDetail icon={Globe} titleKey="services.web.title" descKey="services.web.desc" features={[
    "Marketing websites & landing pages","SaaS platforms & dashboards","E-commerce storefronts","Server-side rendering & SEO","Design systems","Performance optimization",
  ]} />,
});
