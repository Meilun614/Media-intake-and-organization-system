import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type Props = {
  children: ReactNode;
  className?: string;
  /** Slightly longer transition */
  slow?: boolean;
};

export function Reveal({ children, className = "", slow }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal${slow ? " reveal-slow" : ""} ${className}`.trim()}
      data-visible={visible ? "true" : "false"}
    >
      {children}
    </div>
  );
}
