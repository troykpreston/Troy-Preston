"use client";

import { useEffect, useState } from "react";

/** Live local time in the configured timezone. Shows "Eastern Time" until mounted, so static HTML never shows a blank "--:--". */
export function Clock({ timezone, className }: { timezone: string; className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, hour: "2-digit", minute: "2-digit" });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <time className={className} suppressHydrationWarning>
      {now ?? "Eastern Time"}
    </time>
  );
}
