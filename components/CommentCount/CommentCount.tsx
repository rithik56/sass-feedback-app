import Image from "next/image";
import styles from "./CommentCount.module.scss";

export interface CommentCountProps {
  count: number;
  // The breakpoint where the text grows to the larger size.
  largeFrom?: "tablet" | "desktop";
  className?: string;
}

export function CommentCount({ count, largeFrom = "tablet", className = "" }: CommentCountProps) {
  return (
    <div className={`${styles.comments} ${styles[largeFrom]} ${className}`}>
      <Image src="/assets/shared/icon-comments.svg" alt="" width={18} height={16} />
      <span className={`${styles.count} ${count === 0 ? styles.none : ""}`}>
        {count}
        <span className={styles.visuallyHidden}> {count === 1 ? "comment" : "comments"}</span>
      </span>
    </div>
  );
}
