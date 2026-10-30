import type { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.scss";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ className = "", ...rest }: TextAreaProps) {
  return <textarea className={`${styles.textArea} ${className}`} {...rest} />;
}
