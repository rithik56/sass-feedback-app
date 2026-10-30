import { CATEGORY_LABELS } from "../../lib/feedback";
import type { Category } from "../../lib/types";
import { Card } from "../Card/Card";
import { Tag } from "../Tag/Tag";
import styles from "./CategoryFilter.module.scss";

export type CategoryFilterValue = Category | "all";

// Order matches the Figma sidebar.
const OPTIONS: { value: CategoryFilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ui", label: CATEGORY_LABELS.ui },
  { value: "ux", label: CATEGORY_LABELS.ux },
  { value: "enhancement", label: CATEGORY_LABELS.enhancement },
  { value: "bug", label: CATEGORY_LABELS.bug },
  { value: "feature", label: CATEGORY_LABELS.feature },
];

export interface CategoryFilterProps {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <Card className={styles.filter} role="group" aria-label="Filter by category">
      {OPTIONS.map((option) => (
        <Tag key={option.value} active={option.value === value} onClick={() => onChange(option.value)}>
          {option.label}
        </Tag>
      ))}
    </Card>
  );
}
