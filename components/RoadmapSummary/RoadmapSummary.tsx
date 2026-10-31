import Link from "next/link";
import { ROADMAP_COLUMNS } from "../../lib/feedback";
import type { ProductRequest } from "../../lib/types";
import { Card } from "../Card/Card";
import { StatusDot } from "../StatusDot/StatusDot";
import styles from "./RoadmapSummary.module.scss";

export interface RoadmapSummaryProps {
  requests: ProductRequest[];
}

export function RoadmapSummary({ requests }: RoadmapSummaryProps) {
  const counts = ROADMAP_COLUMNS.map(({ status }) => requests.filter((request) => request.status === status).length);
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
          <span role="link" aria-disabled="true" className={styles.viewDisabled}>
            View
          </span>
        )}
      </div>
      <ul className={styles.rows}>
        {ROADMAP_COLUMNS.map(({ status, title }, index) => (
          <li key={status} className={styles.row}>
            <StatusDot status={status} />
            {title}
            <span className={styles.count}>{counts[index]}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
