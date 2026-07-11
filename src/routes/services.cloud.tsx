import { createFileRoute } from "@tanstack/react-router";
import { Cloud } from "lucide-react";
import { ServiceDetail } from "@/components/site/ServiceDetail";
export const Route = createFileRoute("/services/cloud")({
  head: () => ({ meta: [{ title: "Cloud Services — NovaSphere" }, { name: "description", content: "AWS, GCP and Azure architecture, DevOps, and SRE." }] }),
  component: () => <ServiceDetail icon={Cloud} titleKey="services.cloud.title" descKey="services.cloud.desc" features={[
    "AWS, GCP & Azure architecture","Kubernetes & container platforms","CI/CD pipelines","Infrastructure as code","Cost optimization","Site reliability engineering",
  ]} />,
});
