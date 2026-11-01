"use client";

import { useId, useState, type FormEvent } from "react";
import { COMMENT_MAX_LENGTH } from "../../lib/feedback";
import { addReply } from "../../lib/store";
import { Button } from "../Button/Button";
import { TextArea } from "../TextArea/TextArea";
import styles from "./ReplyForm.module.scss";

export interface ReplyFormProps {
  requestId: number;
  commentId: number;
  replyingToName: string;
  replyingToUsername: string;
  onPosted: () => void;
}

export function ReplyForm({ requestId, commentId, replyingToName, replyingToUsername, onPosted }: ReplyFormProps) {
  const errorId = `${useId()}-error`;
  const [content, setContent] = useState("");
  const [showError, setShowError] = useState(false);
  const hasError = showError && !content.trim();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.trim()) {
      setShowError(true);
      return;
    }

    addReply(requestId, commentId, content.trim(), replyingToUsername);
    onPosted();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <TextArea
          short
          autoFocus
          aria-label={`Reply to ${replyingToName}`}
          aria-describedby={hasError ? errorId : undefined}
          aria-invalid={hasError ? true : undefined}
          maxLength={COMMENT_MAX_LENGTH}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        {hasError && (
          <p id={errorId} className={styles.error}>
            Can’t be empty
          </p>
        )}
      </div>
      <Button type="submit" compact>
        Post Reply
      </Button>
    </form>
  );
}
