"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ROADMAP_COLUMNS } from "../../lib/feedback";
import { useFeedback } from "../../lib/store";
import type { RoadmapStatus } from "../../lib/types";
import { LinkButton } from "../Button/Button";
import { GoBack } from "../GoBack/GoBack";
import { RoadmapCard } from "../RoadmapCard/RoadmapCard";
import styles from "./RoadmapView.module.scss";

export function RoadmapView() {
  const { requests } = useFeedback();
  const [activeStatus, setActiveStatus] = useState<RoadmapStatus>("in-progress");
  const tabRefs = useRef<Partial<Record<RoadmapStatus, HTMLButtonElement | null>>>({});

  const columns = ROADMAP_COLUMNS.map((column) => ({
    ...column,
    requests: requests
      .filter((request) => request.status === column.status)
      .sort((a, b) => b.upvotes - a.upvotes),
  }));

  function selectTab(index: number) {
    const { status } = ROADMAP_COLUMNS[index];
    setActiveStatus(status);
    tabRefs.current[status]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const lastIndex = ROADMAP_COLUMNS.length - 1;

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        selectTab(index === lastIndex ? 0 : index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        selectTab(index === 0 ? lastIndex : index - 1);
        break;
      case "Home":
        event.preventDefault();
        selectTab(0);
        break;
      case "End":
        event.preventDefault();
        selectTab(lastIndex);
        break;
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <GoBack href="/" variant="dark" />
          <h1 className={styles.title}>Roadmap</h1>
        </div>
        <LinkButton href="/feedback/new" compact>
          + Add Feedback
        </LinkButton>
      </header>

      <main>
        <div role="tablist" aria-label="Roadmap status" className={styles.tabs}>
          {columns.map((column, index) => (
            <button
              key={column.status}
              ref={(element) => {
                tabRefs.current[column.status] = element;
              }}
              type="button"
              role="tab"
              id={`tab-${column.status}`}
              aria-selected={column.status === activeStatus}
              aria-controls={`panel-${column.status}`}
              tabIndex={column.status === activeStatus ? 0 : -1}
              className={`${styles.tab} ${styles[column.status]}`}
              onClick={() => setActiveStatus(column.status)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span className={styles.tabLabel}>
                {column.title} ({column.requests.length})
              </span>
            </button>
          ))}
        </div>

        <div className={styles.columns}>
          {columns.map((column) => (
            <section
              key={column.status}
              id={`panel-${column.status}`}
              role="tabpanel"
              aria-labelledby={`tab-${column.status}`}
              className={`${styles.column} ${column.status === activeStatus ? styles.activeColumn : ""}`}
            >
              <h2 className={styles.columnTitle}>
                {column.title} ({column.requests.length})
              </h2>
              <p className={`${styles.columnDescription} ${styles.mobileOnly}`}>{column.mobileDescription}</p>
              <p className={`${styles.columnDescription} ${styles.tabletUp}`}>{column.description}</p>
              <div className={styles.cards}>
                {column.requests.map((request) => (
                  <RoadmapCard
                    key={request.id}
                    request={request}
                    status={column.status}
                    statusLabel={column.cardLabel}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
