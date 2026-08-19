import { fetchTeachers, fetchGovernance } from "@/lib/data";
import { UfrContent } from "@/components/ufr-content";

export const dynamic = "force-dynamic";

export default async function UfrPage() {
  const [teachers, governance] = await Promise.all([fetchTeachers(), fetchGovernance()]);
  return <UfrContent teachers={teachers} governance={governance} />;
}
