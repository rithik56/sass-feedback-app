import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditFeedback } from "../../../../components/EditFeedback/EditFeedback";
import { feedbackData } from "../../../../lib/data";

interface EditFeedbackPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Feedback | Feedback Board",
};

export function generateStaticParams() {
  return feedbackData.productRequests.map((request) => ({ id: String(request.id) }));
}

export default async function EditFeedbackPage({ params }: EditFeedbackPageProps) {
  const id = Number((await params).id);

  if (!Number.isInteger(id) || id < 1) {
    notFound();
  }

  return <EditFeedback id={id} />;
}
