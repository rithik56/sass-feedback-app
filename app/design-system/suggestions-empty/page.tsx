import type { Metadata } from "next";
import { SuggestionsView } from "../../../components/SuggestionsView/SuggestionsView";

export const metadata: Metadata = {
  title: "Empty Suggestions | Feedback Board",
};

// Previews the empty state from Figma, which the sample data never produces.
export default function EmptySuggestionsPage() {
  return <SuggestionsView requests={[]} />;
}
