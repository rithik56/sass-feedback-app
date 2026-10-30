import type { Category, ProductRequest } from "./types";

export type SortOption = "most-upvotes" | "least-upvotes" | "most-comments" | "least-comments";

export const CATEGORY_LABELS: Record<Category, string> = {
  feature: "Feature",
  ui: "UI",
  ux: "UX",
  enhancement: "Enhancement",
  bug: "Bug",
};

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
