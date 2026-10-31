import type { Metadata } from "next";
import { FeedbackForm } from "../../../components/FeedbackForm/FeedbackForm";

export const metadata: Metadata = {
  title: "New Feedback | Feedback Board",
};

export default function NewFeedbackPage() {
  return <FeedbackForm />;
}
