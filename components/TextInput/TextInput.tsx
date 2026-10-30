import type { InputHTMLAttributes } from "react";
import styles from "./TextInput.module.scss";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className = "", type = "text", ...rest }: TextInputProps) {
  return <input type={type} className={`${styles.input} ${className}`} {...rest} />;
}
