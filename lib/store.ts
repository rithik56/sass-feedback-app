import { useSyncExternalStore } from "react";
import { feedbackData } from "./data";
import type { Comment, ProductRequest } from "./types";

const STORAGE_KEY = "eqaim-feedback";

export interface FeedbackState {
  requests: ProductRequest[];
  upvotedIds: number[];
}

export type FeedbackDraft = Pick<ProductRequest, "title" | "category" | "description">;
export type FeedbackUpdate = FeedbackDraft & Pick<ProductRequest, "status">;

const initialState: FeedbackState = {
  requests: feedbackData.productRequests,
  upvotedIds: [],
};

let state = initialState;
let hasLoadedSavedState = false;
const listeners = new Set<() => void>();

function isFeedbackState(value: unknown): value is FeedbackState {
  if (typeof value !== "object" || value === null) return false;

  const { requests, upvotedIds } = value as Partial<FeedbackState>;
  return Array.isArray(requests) && Array.isArray(upvotedIds);
}

function readSavedState(): FeedbackState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = saved ? JSON.parse(saved) : null;
    return isFeedbackState(parsed) ? parsed : initialState;
  } catch {
    return initialState;
  }
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function getSnapshot(): FeedbackState {
  if (!hasLoadedSavedState) {
    state = readSavedState();
    hasLoadedSavedState = true;
  }
  return state;
}

function getServerSnapshot(): FeedbackState {
  return initialState;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setState(next: FeedbackState) {
  state = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be full or blocked. Changes still apply until the page reloads.
  }
  notifyListeners();
}

function updateRequest(id: number, update: (request: ProductRequest) => ProductRequest) {
  const current = getSnapshot();
  setState({
    ...current,
    requests: current.requests.map((request) => (request.id === id ? update(request) : request)),
  });
}

// Keeps other open tabs up to date.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      state = readSavedState();
      notifyListeners();
    }
  });
}

export function useFeedback(): FeedbackState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribeToNothing() {
  return () => {};
}

// False during the server render and first client render, before saved feedback is available.
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

export function useRequest(id: number): ProductRequest | undefined {
  return useFeedback().requests.find((request) => request.id === id);
}

export function addFeedback(draft: FeedbackDraft) {
  const current = getSnapshot();
  const id = Math.max(0, ...current.requests.map((request) => request.id)) + 1;
  const request: ProductRequest = { ...draft, id, upvotes: 0, status: "suggestion", comments: [] };

  setState({ ...current, requests: [...current.requests, request] });
}

export function updateFeedback(id: number, update: FeedbackUpdate) {
  updateRequest(id, (request) => ({ ...request, ...update }));
}

export function deleteFeedback(id: number) {
  const current = getSnapshot();
  setState({
    requests: current.requests.filter((request) => request.id !== id),
    upvotedIds: current.upvotedIds.filter((upvotedId) => upvotedId !== id),
  });
}

export function toggleUpvote(id: number) {
  const current = getSnapshot();
  const isUpvoted = current.upvotedIds.includes(id);

  setState({
    upvotedIds: isUpvoted ? current.upvotedIds.filter((upvotedId) => upvotedId !== id) : [...current.upvotedIds, id],
    requests: current.requests.map((request) =>
      request.id === id ? { ...request, upvotes: request.upvotes + (isUpvoted ? -1 : 1) } : request,
    ),
  });
}

export function addComment(requestId: number, content: string) {
  // data.json numbers comments across all feedback, not per request.
  const commentIds = getSnapshot().requests.flatMap((request) => (request.comments ?? []).map(({ id }) => id));
  const comment: Comment = { id: Math.max(0, ...commentIds) + 1, content, user: feedbackData.currentUser };

  updateRequest(requestId, (request) => ({ ...request, comments: [...(request.comments ?? []), comment] }));
}

export function addReply(requestId: number, commentId: number, content: string, replyingTo: string) {
  const reply = { content, replyingTo, user: feedbackData.currentUser };

  updateRequest(requestId, (request) => ({
    ...request,
    comments: (request.comments ?? []).map((comment) =>
      comment.id === commentId ? { ...comment, replies: [...(comment.replies ?? []), reply] } : comment,
    ),
  }));
}
