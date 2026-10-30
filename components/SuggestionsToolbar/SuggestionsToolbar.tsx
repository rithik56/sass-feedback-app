import Image from "next/image";
import type { SortOption } from "../../lib/feedback";
import { LinkButton } from "../Button/Button";
import { Dropdown, type DropdownOption } from "../Dropdown/Dropdown";
import styles from "./SuggestionsToolbar.module.scss";

const SORT_OPTIONS: DropdownOption[] = [
  { value: "most-upvotes", label: "Most Upvotes" },
  { value: "least-upvotes", label: "Least Upvotes" },
  { value: "most-comments", label: "Most Comments" },
  { value: "least-comments", label: "Least Comments" },
];

export interface SuggestionsToolbarProps {
  count: number;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function SuggestionsToolbar({ count, sort, onSortChange }: SuggestionsToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.summary}>
        <Image src="/assets/suggestions/icon-suggestions.svg" alt="" width={23} height={24} />
        <h2 className={styles.count}>
          {count} {count === 1 ? "Suggestion" : "Suggestions"}
        </h2>
      </div>
      <Dropdown variant="sort" options={SORT_OPTIONS} value={sort} onChange={(value) => onSortChange(value as SortOption)} />
      <LinkButton href="/feedback/new" compact className={styles.addButton}>
        + Add Feedback
      </LinkButton>
    </div>
  );
}
