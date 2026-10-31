"use client";

import { useId, useState, type FormEvent } from "react";
import { COMMENT_MAX_LENGTH } from "../../lib/feedback";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { TextArea } from "../TextArea/TextArea";
import styles from "./AddCommentForm.module.scss";

export function AddCommentForm() {
  const id = useId();
  const counterId = `${id}-counter`;
  const [content, setContent] = useState("");

  // Saving is added with the rest of the save logic.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
          aria-describedby={counterId}
          className={styles.textArea}
          placeholder="Type your comment here"
          maxLength={COMMENT_MAX_LENGTH}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
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
