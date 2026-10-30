import Link from "next/link";
import type { ComponentProps } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./GoBack.module.scss";

export interface GoBackProps extends Omit<ComponentProps<typeof Link>, "children"> {
  variant?: "text" | "dark";
}

export function GoBack({ variant = "text", className = "", ...rest }: GoBackProps) {
  return (
    <Link className={`${styles.goBack} ${styles[variant]} ${className}`} {...rest}>
      <Icon name="arrow-left" />
      <span className={styles.label}>Go Back</span>
    </Link>
  );
}
