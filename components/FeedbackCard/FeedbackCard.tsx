import Image from "next/image";
import Link from "next/link";
import { CATEGORY_LABELS } from "../../lib/feedback";
import type { ProductRequest } from "../../lib/types";
import { Card } from "../Card/Card";
import { Tag } from "../Tag/Tag";
import { Upvote } from "../Upvote/Upvote";
import styles from "./FeedbackCard.module.scss";

export interface FeedbackCardProps {
  request: ProductRequest;
  commentCount: number;
}

export function FeedbackCard({ request, commentCount }: FeedbackCardProps) {
  return (
    <Card className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>
          <Link href={`/feedback/${request.id}`} className={styles.link}>
            {request.title}
          </Link>
        </h3>
        <p className={styles.description}>{request.description}</p>
        <Tag className={styles.tag}>{CATEGORY_LABELS[request.category]}</Tag>
      </div>
      <Upvote count={request.upvotes} title={request.title} compact className={styles.upvote} />
      <div className={styles.comments}>
        <Image src="/assets/shared/icon-comments.svg" alt="" width={18} height={16} />
        <span className={`${styles.commentCount} ${commentCount === 0 ? styles.noComments : ""}`}>
          {commentCount}
          <span className={styles.visuallyHidden}> {commentCount === 1 ? "comment" : "comments"}</span>
        </span>
      </div>
    </Card>
  );
}
