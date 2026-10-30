import type { HTMLAttributes } from "react";
import styles from "./Card.module.scss";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...rest }: CardProps) {
  return <div className={`${styles.card} ${className}`} {...rest} />;
}
