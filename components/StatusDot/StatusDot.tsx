import type { RoadmapStatus } from "../../lib/types";
import styles from "./StatusDot.module.scss";

export interface StatusDotProps {
  status: RoadmapStatus;
}

export function StatusDot({ status }: StatusDotProps) {
  return <span aria-hidden="true" className={`${styles.dot} ${styles[status]}`} />;
}
