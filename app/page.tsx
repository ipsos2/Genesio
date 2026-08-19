import { fetchNewsItems, fetchCalendarEvents } from "@/lib/data";
import { HomeContent } from "@/components/home-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [news, events] = await Promise.all([fetchNewsItems(), fetchCalendarEvents()]);
  return <HomeContent news={news.slice(0, 5)} events={events.slice(0, 5)} />;
}
