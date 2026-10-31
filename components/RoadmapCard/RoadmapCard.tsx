import Link from "next/link";
import { CATEGORY_LABELS, getCommentCount } from "../../lib/feedback";
import type { ProductRequest, RoadmapStatus } from "../../lib/types";
import { Card } from "../Card/Card";
import { CommentCount } from "../CommentCount/CommentCount";
import { StatusDot } from "../StatusDot/StatusDot";
import { Tag } from "../Tag/Tag";
import { Upvote } from "../Upvote/Upvote";
import styles from "./RoadmapCard.module.scss";

export interface RoadmapCardProps {
  request: ProductRequest;
  status: RoadmapStatus;
  statusLabel: string;
}

export function RoadmapCard({ request, status, statusLabel }: RoadmapCardProps) {
  return (
    <Card className={`${styles.card} ${styles[status]}`}>
      <p className={styles.status}>
        <StatusDot status={status} />
        {statusLabel}
      </p>
      <h3 className={styles.title}>
        <Link href={`/feedback/${request.id}`} className={styles.link}>
          {request.title}
        </Link>
      </h3>
      <p className={styles.description}>{request.description}</p>
      <Tag className={styles.tag}>{CATEGORY_LABELS[request.category]}</Tag>
      <div className={styles.footer}>
        <Upvote count={request.upvotes} title={request.title} horizontal className={styles.upvote} />
        <CommentCount count={getCommentCount(request)} largeFrom="desktop" />
      </div>
    </Card>
  );
}
