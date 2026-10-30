import type { ButtonHTMLAttributes } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Upvote.module.scss";

export interface UpvoteProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  count: number;
  active?: boolean;
  compact?: boolean;
}

export function Upvote({ count, active = false, compact = false, className = "", ...rest }: UpvoteProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`Upvote, ${count} votes`}
      className={`${styles.upvote} ${active ? styles.active : ""} ${compact ? styles.compact : ""} ${className}`}
      {...rest}
    >
      <Icon name="arrow-up" />
      <span className={styles.count}>{count}</span>
    </button>
  );
}
