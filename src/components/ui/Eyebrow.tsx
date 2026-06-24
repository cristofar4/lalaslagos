import type { PropsWithChildren } from "react";

export function Eyebrow({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return <span className={`eyebrow ${className}`}>{children}</span>;
}
