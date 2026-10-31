import type { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.scss";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  // 80px instead of 96px, for comments and replies.
  short?: boolean;
}

export function TextArea({ short = false, className = "", ...rest }: TextAreaProps) {
  return <textarea className={`${styles.textArea} ${short ? styles.short : ""} ${className}`} {...rest} />;
}
