import { fetchFaqItems } from "@/lib/data";
import { FaqContent } from "@/components/faq-content";

export default async function FaqPage() {
  const items = await fetchFaqItems();
  return <FaqContent items={items} />;
}
