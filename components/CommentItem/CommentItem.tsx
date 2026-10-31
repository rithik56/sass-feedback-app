"use client";

import Image from "next/image";
import { useState } from "react";
import { getAssetUrl } from "../../lib/feedback";
import type { Comment, Reply, User } from "../../lib/types";
import { ReplyForm } from "../ReplyForm/ReplyForm";
import styles from "./CommentItem.module.scss";

interface CommentEntryProps {
  user: User;
  content: string;
  replyingTo?: string;
  hasThreadLine?: boolean;
  isReply?: boolean;
}

function CommentEntry({ user, content, replyingTo, hasThreadLine = false, isReply = false }: CommentEntryProps) {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <Image className={styles.avatar} src={getAssetUrl(user.image)} alt="" width={40} height={40} />
        <div>
          <p className={styles.name}>{user.name}</p>
          <p className={styles.username}>@{user.username}</p>
        </div>
        <button
          type="button"
          className={styles.replyButton}
          aria-label={`Reply to ${user.name}`}
          aria-expanded={isReplying}
          onClick={() => setIsReplying(!isReplying)}
        >
          Reply
        </button>
      </header>
      <div
        className={`${styles.body} ${isReply ? styles.replyBody : ""} ${hasThreadLine ? styles.bodyWithThreadLine : ""}`}
      >
        <p className={styles.content}>
          {replyingTo && <strong className={styles.mention}>@{replyingTo}</strong>}
          {content}
        </p>
        {isReplying && <ReplyForm replyingToName={user.name} />}
      </div>
    </>
  );
}

export interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const replies: Reply[] = comment.replies ?? [];

  return (
    <article>
      <CommentEntry user={comment.user} content={comment.content} hasThreadLine={replies.length > 0} />
      {replies.length > 0 && (
        <ul className={styles.replies}>
          {replies.map((reply, index) => (
            <li key={index} className={styles.reply}>
              <CommentEntry user={reply.user} content={reply.content} replyingTo={reply.replyingTo} isReply />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
