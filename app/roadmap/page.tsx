import type { Metadata } from "next";
import { RoadmapView } from "../../components/RoadmapView/RoadmapView";
import { feedbackData } from "../../lib/data";

export const metadata: Metadata = {
  title: "Roadmap | Feedback Board",
};

export default function RoadmapPage() {
  return <RoadmapView requests={feedbackData.productRequests} />;
}
