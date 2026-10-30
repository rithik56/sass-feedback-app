import Link from "next/link";
import type { ProductRequest, Status } from "../../lib/types";
import { Card } from "../Card/Card";
import styles from "./RoadmapSummary.module.scss";

const ROWS: { status: Status; label: string }[] = [
  { status: "planned", label: "Planned" },
  { status: "in-progress", label: "In-Progress" },
  { status: "live", label: "Live" },
];

export interface RoadmapSummaryProps {
  requests: ProductRequest[];
}

export function RoadmapSummary({ requests }: RoadmapSummaryProps) {
  const counts = ROWS.map(({ status }) => requests.filter((request) => request.status === status).length);
  const hasRoadmapItems = counts.some((count) => count > 0);

  return (
    <Card className={styles.summary}>
      <div className={styles.heading}>
        <h2 className={styles.title}>Roadmap</h2>
        {hasRoadmapItems ? (
          <Link href="/roadmap" className={styles.view}>
            View
          </Link>
        ) : (
          <span className={styles.viewDisabled}>View</span>
        )}
      </div>
      <ul className={styles.rows}>
        {ROWS.map(({ status, label }, index) => (
          <li key={status} className={styles.row}>
            <span className={`${styles.dot} ${styles[status]}`} />
            {label}
            <span className={styles.count}>{counts[index]}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
