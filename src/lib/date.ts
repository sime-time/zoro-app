import { differenceInCalendarDays, format, subDays } from "date-fns";

export function toDayId(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function getPreviousDays(count: number) {
  const today = new Date();
  const prevDays = Array.from({ length: count }, (_, i) =>
    subDays(today, count - 1 - i),
  );
  return prevDays;
}

export function formatDayLabel(date: Date) {
  const today = new Date();

  if (toDayId(date) === toDayId(today)) {
    return "Today";
  }

  // if within 6 days of today, use full week name, e.g. "Saturday"
  const daysAgo = differenceInCalendarDays(today, date);
  if (daysAgo >= 0 && daysAgo <= 6) {
    return format(date, "EEEE");
  }

  return format(date, "EEE, MMM d");
}

export function formatWeekdayLabel(date: Date) {
  return format(date, "EEE");
}

export function formatDayNumber(date: Date) {
  return format(date, "d");
}
