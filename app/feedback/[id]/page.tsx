import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeedbackDetail } from "../../../components/FeedbackDetail/FeedbackDetail";
import { feedbackData, getRequestById } from "../../../lib/data";

interface FeedbackPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return feedbackData.productRequests.map((request) => ({ id: String(request.id) }));
}

export async function generateMetadata({ params }: FeedbackPageProps): Promise<Metadata> {
  const { id } = await params;
  const request = getRequestById(Number(id));

  return { title: `${request?.title ?? "Feedback"} | Feedback Board` };
}

export default async function FeedbackPage({ params }: FeedbackPageProps) {
  const { id } = await params;
  const request = getRequestById(Number(id));

  if (!request) {
    notFound();
  }

  return <FeedbackDetail request={request} />;
}
