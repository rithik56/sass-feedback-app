import type { Metadata } from "next";
import { RoadmapView } from "../../components/RoadmapView/RoadmapView";

export const metadata: Metadata = {
  title: "Roadmap | Feedback Board",
};

export default function RoadmapPage() {
  return <RoadmapView />;
}
