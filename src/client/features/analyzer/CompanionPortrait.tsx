export function CompanionPortrait({ className = "" }: { className?: string }) {
  return <span className={`companion-portrait ${className}`.trim()} aria-hidden="true">
    <img src="/koma-family-logo.png" alt="" />
  </span>;
}
