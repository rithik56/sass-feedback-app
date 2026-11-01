"use client";

import { notFound, useRouter } from "next/navigation";
import { useState } from "react";
import { deleteFeedback, useIsHydrated, useRequest } from "../../lib/store";
import { FeedbackForm } from "../FeedbackForm/FeedbackForm";

export interface EditFeedbackProps {
  id: number;
}

export function EditFeedback({ id }: EditFeedbackProps) {
  const router = useRouter();
  const request = useRequest(id);
  const isHydrated = useIsHydrated();
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDelete() {
    if (!window.confirm("Delete this feedback? This can't be undone.")) return;

    setIsDeleting(true);
    deleteFeedback(id);
    router.push("/");
  }

  if (!request) {
    if (isHydrated && !isDeleting) notFound();
    return null;
  }

  // The key refills the form once saved data replaces the sample data from the server render.
  return <FeedbackForm key={String(isHydrated)} request={request} onDelete={handleDelete} />;
}
