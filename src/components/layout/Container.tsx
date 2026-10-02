import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = ComponentProps<"div"> & { as?: "div" | "main" };

/** 1120px content column with responsive side gutters. */
export function Container({ as: Tag = "div", className, ...props }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full max-w-[1168px] px-4 sm:px-6", className)} {...props} />;
}
