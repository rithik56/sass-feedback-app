"use client";

import { useId, useState, type FormEvent } from "react";
import { COMMENT_MAX_LENGTH } from "../../lib/feedback";
import { addComment } from "../../lib/store";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { TextArea } from "../TextArea/TextArea";
import styles from "./AddCommentForm.module.scss";

export interface AddCommentFormProps {
  requestId: number;
}

export function AddCommentForm({ requestId }: AddCommentFormProps) {
  const id = useId();
  const counterId = `${id}-counter`;
  const errorId = `${id}-error`;
  const [content, setContent] = useState("");
  const [showError, setShowError] = useState(false);
  const hasError = showError && !content.trim();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!content.trim()) {
      setShowError(true);
      return;
    }

    addComment(requestId, content.trim());
    setContent("");
    setShowError(false);
  }

  return (
    <Card className={styles.card}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.title}>
          <label htmlFor={id}>Add Comment</label>
        </h2>
        <TextArea
          short
          id={id}
          aria-describedby={hasError ? `${counterId} ${errorId}` : counterId}
          aria-invalid={hasError ? true : undefined}
          className={styles.textArea}
          placeholder="Type your comment here"
          maxLength={COMMENT_MAX_LENGTH}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        {hasError && (
          <p id={errorId} className={styles.error}>
            Can’t be empty
          </p>
        )}
        <div className={styles.footer}>
          <p id={counterId} className={styles.counter}>
            {COMMENT_MAX_LENGTH - content.length} Characters left
          </p>
          <Button type="submit" compact>
            Post Comment
          </Button>
        </div>
      </form>
    </Card>
  );
}
