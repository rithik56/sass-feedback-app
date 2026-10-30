"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { getCommentCount, sortRequests, type SortOption } from "../../lib/feedback";
import type { Category, ProductRequest } from "../../lib/types";
import { CategoryFilter, type CategoryFilterValue } from "../CategoryFilter/CategoryFilter";
import { EmptyFeedback } from "../EmptyFeedback/EmptyFeedback";
import { FeedbackCard } from "../FeedbackCard/FeedbackCard";
import { RoadmapSummary } from "../RoadmapSummary/RoadmapSummary";
import { SuggestionsToolbar } from "../SuggestionsToolbar/SuggestionsToolbar";
import styles from "./SuggestionsView.module.scss";

export interface SuggestionsViewProps {
  requests: ProductRequest[];
}

export function SuggestionsView({ requests }: SuggestionsViewProps) {
  const [category, setCategory] = useState<CategoryFilterValue>("all");
  const [sort, setSort] = useState<SortOption>("most-upvotes");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const visibleRequests = useMemo(() => {
    const suggestions = requests.filter(
      (request) => request.status === "suggestion" && (category === "all" || request.category === (category as Category)),
    );
    return sortRequests(suggestions, sort);
  }, [requests, category, sort]);

  useEffect(() => {
    if (!isDrawerOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDrawerOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    // The drawer only exists while the menu button is shown, which the styles decide.
    function closeWhenMenuButtonHidden() {
      if (menuButtonRef.current && getComputedStyle(menuButtonRef.current).display === "none") {
        setIsDrawerOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeWhenMenuButtonHidden);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeWhenMenuButtonHidden);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <header className={styles.brand}>
          <div>
            <h1 className={styles.brandName}>Eqaim</h1>
            <p className={styles.brandTagline}>Feedback Board</p>
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={isDrawerOpen}
            aria-controls="suggestions-drawer"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <Image
              src={isDrawerOpen ? "/assets/shared/mobile/icon-close.svg" : "/assets/shared/mobile/icon-hamburger.svg"}
              alt=""
              width={isDrawerOpen ? 18 : 20}
              height={17}
            />
          </button>
        </header>

        {isDrawerOpen && <div className={styles.backdrop} onClick={() => setIsDrawerOpen(false)} />}

        <div id="suggestions-drawer" className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ""}`}>
          <CategoryFilter value={category} onChange={setCategory} />
          <RoadmapSummary requests={requests} />
        </div>
      </div>

      <main className={styles.main} inert={isDrawerOpen}>
        <SuggestionsToolbar count={visibleRequests.length} sort={sort} onSortChange={setSort} />

        <div className={styles.list}>
          {visibleRequests.length === 0 ? (
            <EmptyFeedback />
          ) : (
            visibleRequests.map((request) => (
              <FeedbackCard key={request.id} request={request} commentCount={getCommentCount(request)} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
