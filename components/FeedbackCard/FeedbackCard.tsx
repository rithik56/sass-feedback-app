import Link from "next/link";
import { CATEGORY_LABELS } from "../../lib/feedback";
import type { ProductRequest } from "../../lib/types";
import { Card } from "../Card/Card";
import { CommentCount } from "../CommentCount/CommentCount";
import { RequestUpvote } from "../RequestUpvote/RequestUpvote";
import { Tag } from "../Tag/Tag";
import styles from "./FeedbackCard.module.scss";

export interface FeedbackCardProps {
  request: ProductRequest;
  commentCount: number;
  // On its own detail page the card is the page heading, not a link.
  isPageHeading?: boolean;
}

export function FeedbackCard({ request, commentCount, isPageHeading = false }: FeedbackCardProps) {
  return (
    <Card className={`${styles.card} ${isPageHeading ? "" : styles.linked}`}>
      <div className={styles.content}>
        {isPageHeading ? (
          <h1 className={styles.title}>{request.title}</h1>
        ) : (
          <h3 className={styles.title}>
            <Link href={`/feedback/${request.id}`} className={styles.link}>
              {request.title}
            </Link>
          </h3>
        )}
        <p className={styles.description}>{request.description}</p>
        <Tag className={styles.tag}>{CATEGORY_LABELS[request.category]}</Tag>
      </div>
      <RequestUpvote request={request} compact className={styles.upvote} />
      <CommentCount count={commentCount} className={styles.comments} />
    </Card>
  );
}
