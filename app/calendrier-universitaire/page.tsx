import { fetchCalendarEvents } from "@/lib/data";
import { CalendarContent } from "@/components/calendar-content";

export default async function CalendrierPage() {
  const events = await fetchCalendarEvents();
  return <CalendarContent events={events} />;
}
