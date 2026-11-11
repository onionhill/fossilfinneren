const DAY_MS = 24 * 60 * 60 * 1000;

/** The day a school's pupil data is deleted: a set number of days after its subscription ended. */
export function deletionDate(subscriptionEnded: Date, retentionDays: number): Date {
  return new Date(subscriptionEnded.getTime() + retentionDays * DAY_MS);
}

export function isDue(subscriptionEnded: Date | null, retentionDays: number, now: Date): boolean {
  return subscriptionEnded !== null && deletionDate(subscriptionEnded, retentionDays) <= now;
}
