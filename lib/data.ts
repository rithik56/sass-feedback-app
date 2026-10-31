import rawData from "../starter-code/data.json";
import type { FeedbackData, ProductRequest } from "./types";

export const feedbackData = rawData as FeedbackData;

export function getRequestById(id: number): ProductRequest | undefined {
  return feedbackData.productRequests.find((request) => request.id === id);
}
