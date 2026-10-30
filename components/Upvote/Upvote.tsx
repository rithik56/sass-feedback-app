import type { ButtonHTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Upvote.module.scss";

export interface UpvoteProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  count: number;
  // Names what is being upvoted for screen readers.
  title: string;
  active?: boolean;
  compact?: boolean;
}

export function Upvote({ count, title, active = false, compact = false, className = "", ...rest }: UpvoteProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`Upvote ${title}, ${count} ${count === 1 ? "vote" : "votes"}`}
      className={`${styles.upvote} ${active ? styles.active : ""} ${compact ? styles.compact : ""} ${className}`}
      {...rest}
    >
      <Icon name="arrow-up" />
      <span className={styles.count}>{count}</span>
    </button>
  );
}
