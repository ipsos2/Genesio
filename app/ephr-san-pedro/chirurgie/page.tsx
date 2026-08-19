import { Scissors } from "lucide-react";
import { ServicePage } from "@/components/service-page";

export default function ChirurgiePage() {
  return (
    <ServicePage
      title="Chirurgie"
      tag="Service clinique — EPHR San Pedro"
      icon={Scissors}
      intro="Le service de Chirurgie prend en charge les interventions chirurgicales programmées et urgentes, ainsi que le suivi post-opératoire des patients."
      activities={[
        "Consultations pré-opératoires",
        "Interventions de chirurgie digestive et générale",
        "Prise en charge des urgences chirurgicales",
        "Suivi post-opératoire et pansements",
        "Coordination avec le bloc opératoire",
        "Bilan et préparation des patients pour l'intervention",
      ]}
      stageOrg="Les étudiants assistent aux consultations pré et post-opératoires, participent aux visites quotidiennes, et peuvent assister au bloc opératoire selon le niveau d'étude et l'accord de l'encadrant."
      integrationSteps={[
        "Se présenter au chef de service et à l'équipe soignante",
        "Prendre connaissance des règles d'hygiène et d'asepsie du bloc",
        "Participer aux visites et à la préparation des dossiers patients",
        "Observer puis assister aux interventions selon autorisation",
        "Assurer le suivi des pansements et comptes-rendus post-opératoires",
      ]}
    />
  );
}
