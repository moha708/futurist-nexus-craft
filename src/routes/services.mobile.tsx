import { createFileRoute } from "@tanstack/react-router";
import { Smartphone } from "lucide-react";
import { ServiceDetail } from "@/components/site/ServiceDetail";
export const Route = createFileRoute("/services/mobile")({
  head: () => ({ meta: [{ title: "Mobile Apps — NovaSphere" }, { name: "description", content: "iOS, Android and cross-platform apps." }] }),
  component: () => <ServiceDetail icon={Smartphone} titleKey="services.mobile.title" descKey="services.mobile.desc" features={[
    "Native iOS (Swift)","Native Android (Kotlin)","React Native & Flutter","App Store & Play Store launch","Offline-first architecture","Push notifications & analytics",
  ]} />,
});
