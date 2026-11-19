/** Quiet placeholder for content that hasn't been written yet. Never invent — mark it. */
export function Pending({ hint = "Write-up in progress" }: { hint?: string }) {
  return (
    <p className="pending">
      <span className="label">To be written</span>
      <span>{hint}</span>
    </p>
  );
}
