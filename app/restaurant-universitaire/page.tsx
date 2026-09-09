import { fetchCrouMenu } from "@/lib/data";
import { MenuContent } from "@/components/menu-content";

export default async function RestaurantPage() {
  const items = await fetchCrouMenu();
  return <MenuContent items={items} />;
}

