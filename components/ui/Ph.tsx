/**
 * Placeholder marker. Visible (yellow, dashed) in development so the team can see what's
 * missing; renders nothing in production so placeholder text is never shown as evidence.
 */
export const IS_DEV = process.env.NODE_ENV !== "production";

export function Ph({ children }: { children: React.ReactNode }) {
  if (!IS_DEV) return null;
  return <span className="ph">[{children}]</span>;
}

/** Render a confirmed value, or a dev-only placeholder when null. */
export function Val({ v, ph }: { v: React.ReactNode | null | undefined; ph: string }) {
  return v != null && v !== "" ? <>{v}</> : <Ph>{ph}</Ph>;
}
