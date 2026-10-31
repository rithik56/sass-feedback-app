"use client";

import { useState, type FormEvent } from "react";
import { COMMENT_MAX_LENGTH } from "../../lib/feedback";
import { Button } from "../Button/Button";
import { TextArea } from "../TextArea/TextArea";
import styles from "./ReplyForm.module.scss";

export interface ReplyFormProps {
  replyingToName: string;
}

export function ReplyForm({ replyingToName }: ReplyFormProps) {
  const [content, setContent] = useState("");

  // Saving is added with the rest of the save logic.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextArea
        short
        autoFocus
        aria-label={`Reply to ${replyingToName}`}
        className={styles.textArea}
        maxLength={COMMENT_MAX_LENGTH}
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <Button type="submit" compact>
        Post Reply
      </Button>
    </form>
  );
}
