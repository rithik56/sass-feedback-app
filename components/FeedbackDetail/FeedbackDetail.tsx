"use client";

import { notFound } from "next/navigation";
import { getCommentCount } from "../../lib/feedback";
import { useIsHydrated, useRequest } from "../../lib/store";
import { AddCommentForm } from "../AddCommentForm/AddCommentForm";
import { LinkButton } from "../Button/Button";
import { Card } from "../Card/Card";
import { CommentItem } from "../CommentItem/CommentItem";
import { FeedbackCard } from "../FeedbackCard/FeedbackCard";
import { GoBack } from "../GoBack/GoBack";
import styles from "./FeedbackDetail.module.scss";

export interface FeedbackDetailProps {
  id: number;
}

export function FeedbackDetail({ id }: FeedbackDetailProps) {
  const request = useRequest(id);
  const isHydrated = useIsHydrated();

  if (!request) {
    // Feedback created in this browser is only known once saved data is available.
    if (isHydrated) notFound();
    return null;
  }

  const commentCount = getCommentCount(request);

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <GoBack href="/" />
        <LinkButton href={`/feedback/${request.id}/edit`} variant="blue" compact>
          Edit Feedback
        </LinkButton>
      </div>

      <FeedbackCard request={request} commentCount={commentCount} isPageHeading />

      <Card className={`${styles.comments} ${commentCount === 0 ? styles.noComments : ""}`}>
        <h2 className={styles.commentsTitle}>
          {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
        </h2>
        {commentCount > 0 && (
          <ul className={styles.commentList}>
            {(request.comments ?? []).map((comment) => (
              <li key={comment.id} className={styles.commentRow}>
                <CommentItem comment={comment} requestId={request.id} />
              </li>
            ))}
          </ul>
        )}
      </Card>

      <AddCommentForm requestId={request.id} />
    </main>
  );
}
