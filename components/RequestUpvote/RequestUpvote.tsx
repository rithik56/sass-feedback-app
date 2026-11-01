"use client";

import { toggleUpvote, useFeedback } from "../../lib/store";
import type { ProductRequest } from "../../lib/types";
import { Upvote, type UpvoteProps } from "../Upvote/Upvote";

export interface RequestUpvoteProps extends Omit<UpvoteProps, "count" | "title" | "active" | "onClick"> {
  request: ProductRequest;
}

export function RequestUpvote({ request, ...rest }: RequestUpvoteProps) {
  const { upvotedIds } = useFeedback();

  return (
    <Upvote
      count={request.upvotes}
      title={request.title}
      active={upvotedIds.includes(request.id)}
      onClick={() => toggleUpvote(request.id)}
      {...rest}
    />
  );
}
