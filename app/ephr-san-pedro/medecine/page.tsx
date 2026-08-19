import { Stethoscope } from "lucide-react";
import { ServicePage } from "@/components/service-page";

export default function MedecinePage() {
  return (
    <ServicePage
      title="Médecine"
      tag="Service clinique — EPHR San Pedro"
      icon={<Stethoscope className="h-7 w-7" />}

      intro="Le service de Médecine assure les consultations générales et la prise en charge des pathologies médicales courantes et chroniques des patients de la région de San Pedro."
      activities={[
        "Consultations médicales générales",
        "Prise en charge des pathologies infectieuses (paludisme, tuberculose, VHB...)",
        "Suivi des maladies chroniques (diabète, hypertension)",
        "Hospitalisation et surveillance médicale",
        "Coordination avec les autres services de l'établissement",
        "Éducation thérapeutique des patients",
      ]}
      stageOrg="Les étudiants en Doctorat sont répartis en petits groupes de garde, sous la supervision directe du personnel médical du service. Les rotations sont organisées par périodes, avec un roulement entre consultations, visites et gardes."
      integrationSteps={[
        "Se présenter au chef de service le premier jour du stage",
        "Prendre connaissance du planning de garde et des horaires",
        "Assister aux consultations en observateur avant toute prise en charge autonome",
        "Tenir à jour son carnet de stage / compte-rendu de garde",
        "Participer aux staffs et présentations de dossiers cliniques",
      ]}
    />
  );
}
