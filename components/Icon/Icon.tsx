import styles from "./Icon.module.scss";

export type IconName = "arrow-up" | "arrow-down" | "arrow-left" | "check";

export interface IconProps {
  name: IconName;
}

export function Icon({ name }: IconProps) {
  return <span aria-hidden="true" className={`${styles.icon} ${styles[name]}`} />;
}
