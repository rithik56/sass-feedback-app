import type { ButtonHTMLAttributes } from "react";
import styles from "./Tag.module.scss";

export interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

// Renders a static label, or a toggle button when it has an onClick.
export function Tag({ active = false, className = "", onClick, children, ...rest }: TagProps) {
  const classes = `${styles.tag} ${active ? styles.active : ""} ${className}`;

  if (!onClick) {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button
      type="button"
      aria-pressed={active}
      className={`${classes} ${styles.interactive}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
