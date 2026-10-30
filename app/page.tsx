import { SuggestionsView } from "../components/SuggestionsView/SuggestionsView";
import { feedbackData } from "../lib/data";

export default function HomePage() {
  return <SuggestionsView requests={feedbackData.productRequests} />;
}
