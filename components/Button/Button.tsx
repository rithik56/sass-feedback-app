import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import styles from "./Button.module.scss";

export type ButtonVariant = "purple" | "blue" | "navy" | "red";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  compact?: boolean;
}

export interface LinkButtonProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant;
  compact?: boolean;
}

function getClassName(variant: ButtonVariant, compact: boolean, className: string) {
  return `${styles.button} ${styles[variant]} ${compact ? styles.compact : ""} ${className}`;
}

export function Button({ variant = "purple", compact = false, className = "", type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={getClassName(variant, compact, className)} {...rest} />;
}

export function LinkButton({ variant = "purple", compact = false, className = "", ...rest }: LinkButtonProps) {
  return <Link className={getClassName(variant, compact, className)} {...rest} />;
}
