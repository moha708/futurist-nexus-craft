import { createFileRoute } from "@tanstack/react-router";
import { Gamepad2 } from "lucide-react";
import { ServiceDetail } from "@/components/site/ServiceDetail";
export const Route = createFileRoute("/services/game")({
  head: () => ({ meta: [{ title: "Game Development — NovaSphere" }, { name: "description", content: "Immersive 2D/3D games and interactive experiences." }] }),
  component: () => <ServiceDetail icon={Gamepad2} titleKey="services.game.title" descKey="services.game.desc" features={[
    "Unity & Unreal Engine","2D & 3D game design","Multiplayer & backend","Console, PC & mobile","In-game economies","Live-ops & analytics",
  ]} />,
});
