import type { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.scss";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  // 80px at every width instead of 120px on mobile and 96px from tablet, for comments and replies.
  short?: boolean;
}

export function TextArea({ short = false, className = "", ...rest }: TextAreaProps) {
  return <textarea className={`${styles.textArea} ${short ? styles.short : ""} ${className}`} {...rest} />;
}
