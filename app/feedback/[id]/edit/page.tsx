import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeedbackForm } from "../../../../components/FeedbackForm/FeedbackForm";
import { feedbackData, getRequestById } from "../../../../lib/data";

interface EditFeedbackPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return feedbackData.productRequests.map((request) => ({ id: String(request.id) }));
}

export async function generateMetadata({ params }: EditFeedbackPageProps): Promise<Metadata> {
  const { id } = await params;
  const request = getRequestById(Number(id));

  return { title: `Editing ${request?.title ?? "Feedback"} | Feedback Board` };
}

export default async function EditFeedbackPage({ params }: EditFeedbackPageProps) {
  const { id } = await params;
  const request = getRequestById(Number(id));

  if (!request) {
    notFound();
  }

  return <FeedbackForm request={request} />;
}
