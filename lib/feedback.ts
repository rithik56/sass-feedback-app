import type { Category, ProductRequest, RoadmapStatus } from "./types";

export type SortOption = "most-upvotes" | "least-upvotes" | "most-comments" | "least-comments";

export const CATEGORY_LABELS: Record<Category, string> = {
  feature: "Feature",
  ui: "UI",
  ux: "UX",
  enhancement: "Enhancement",
  bug: "Bug",
};

export const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: "feature", label: CATEGORY_LABELS.feature },
  { value: "ui", label: CATEGORY_LABELS.ui },
  { value: "ux", label: CATEGORY_LABELS.ux },
  { value: "enhancement", label: CATEGORY_LABELS.enhancement },
  { value: "bug", label: CATEGORY_LABELS.bug },
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "most-upvotes", label: "Most Upvotes" },
  { value: "least-upvotes", label: "Least Upvotes" },
  { value: "most-comments", label: "Most Comments" },
  { value: "least-comments", label: "Least Comments" },
];

export interface RoadmapColumn {
  status: RoadmapStatus;
  title: string;
  cardLabel: string;
  description: string;
  mobileDescription: string;
}

export const ROADMAP_COLUMNS: RoadmapColumn[] = [
  {
    status: "planned",
    title: "Planned",
    cardLabel: "Planned",
    description: "Ideas prioritized for research",
    mobileDescription: "Ideas prioritized for research",
  },
  {
    status: "in-progress",
    title: "In-Progress",
    cardLabel: "In Progress",
    description: "Currently being developed",
    mobileDescription: "Features currently being developed",
  },
  {
    status: "live",
    title: "Live",
    cardLabel: "Live",
    description: "Released features",
    mobileDescription: "Released features",
  },
];

// data.json paths are relative to the old starter HTML, like "./assets/user-images/a.jpg".
export function getAssetUrl(path: string): string {
  return path.replace(/^\.\//, "/");
}

export const COMMENT_MAX_LENGTH = 250;

export function getCommentCount(request: ProductRequest): number {
  return (request.comments ?? []).reduce((total, comment) => total + 1 + (comment.replies?.length ?? 0), 0);
}

export function sortRequests(requests: ProductRequest[], sort: SortOption): ProductRequest[] {
  const sorted = [...requests];

  switch (sort) {
    case "most-upvotes":
      return sorted.sort((a, b) => b.upvotes - a.upvotes);
    case "least-upvotes":
      return sorted.sort((a, b) => a.upvotes - b.upvotes);
    case "most-comments":
      return sorted.sort((a, b) => getCommentCount(b) - getCommentCount(a));
    case "least-comments":
      return sorted.sort((a, b) => getCommentCount(a) - getCommentCount(b));
  }
}
