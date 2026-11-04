export function CompanionPortrait({ className = "", priority = false, variant = "portrait" }: {
  className?: string;
  priority?: boolean;
  variant?: "portrait" | "logo";
}) {
  return <span className={`companion-portrait ${className}`.trim()} aria-hidden="true">
    <img src={variant === "logo" ? "/koma-editor-logo.png" : "/koma-editor-portrait.png"} alt="" fetchPriority={priority ? "high" : undefined} />
  </span>;
}
