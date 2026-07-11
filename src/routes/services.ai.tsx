import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";
import { ServiceDetail } from "@/components/site/ServiceDetail";
export const Route = createFileRoute("/services/ai")({
  head: () => ({ meta: [{ title: "AI Services — NovaSphere" }, { name: "description", content: "LLM apps, agents, computer vision, and custom ML pipelines." }] }),
  component: () => <ServiceDetail icon={Brain} titleKey="services.ai.title" descKey="services.ai.desc" features={[
    "Large language model integrations","Custom AI agents & assistants","Retrieval-augmented generation (RAG)","Computer vision pipelines","Model fine-tuning & evaluation","MLOps & deployment",
  ]} />,
});
