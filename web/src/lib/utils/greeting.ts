/**
 * Returns a time-based greeting using the user's detected browser timezone.
 * Falls back to UTC if the timezone cannot be resolved.
 */
export function getGreeting(timezone?: string): string {
  try {
    const tz = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();

    // Get the local hour in the user's timezone
    const hour = parseInt(
      new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        timeZone: tz,
      }).format(now),
      10
    );

    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 18) return 'Good afternoon';
    return 'Good evening';
  } catch {
    return 'Hello';
  }
}

/**
 * React hook that returns a reactive greeting that updates every minute.
 */
import { useState, useEffect } from 'react';

export function useGreeting(timezone?: string): string {
  const [greeting, setGreeting] = useState(() => getGreeting(timezone));

  useEffect(() => {
    setGreeting(getGreeting(timezone));
    const interval = setInterval(() => {
      setGreeting(getGreeting(timezone));
    }, 60_000); // re-check every minute
    return () => clearInterval(interval);
  }, [timezone]);

  return greeting;
}
