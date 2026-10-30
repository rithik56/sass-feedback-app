import type { ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler } from "react";
import styles from "./Tag.module.scss";

export interface StaticTagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "onClick"> {
  active?: boolean;
  onClick?: undefined;
  disabled?: undefined;
}

export interface InteractiveTagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export type TagProps = StaticTagProps | InteractiveTagProps;

function getClassName(active: boolean, className: string) {
  return `${styles.tag} ${active ? styles.active : ""} ${className}`;
}

// Renders a static label, or a toggle button when it has an onClick.
export function Tag(props: TagProps) {
  if (props.onClick === undefined) {
    const { active = false, className = "", onClick, ...rest } = props;
    return <span className={getClassName(active, className)} {...rest} />;
  }

  const { active = false, className = "", ...rest } = props;
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`${getClassName(active, className)} ${styles.interactive}`}
      {...rest}
    />
  );
}
