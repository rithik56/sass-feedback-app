import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeedbackDetail } from "../../../components/FeedbackDetail/FeedbackDetail";
import { feedbackData } from "../../../lib/data";

interface FeedbackPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Feedback Detail | Feedback Board",
};

export function generateStaticParams() {
  return feedbackData.productRequests.map((request) => ({ id: String(request.id) }));
}

export default async function FeedbackPage({ params }: FeedbackPageProps) {
  const id = Number((await params).id);

  if (!Number.isInteger(id) || id < 1) {
    notFound();
  }

  return <FeedbackDetail id={id} />;
}
