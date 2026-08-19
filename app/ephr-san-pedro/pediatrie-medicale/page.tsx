import { Baby } from "lucide-react";
import { ServicePage } from "@/components/service-page";

export default function PediatriePage() {
  return (
    <ServicePage
      title="Pédiatrie Médicale"
      tag="Service clinique — EPHR San Pedro"
      icon={Baby}
      intro="Le service de Pédiatrie Médicale assure la prise en charge médicale des enfants et des nourrissons, de la naissance à l'adolescence."
      activities={[
        "Consultations pédiatriques générales",
        "Prise en charge des pathologies néonatales",
        "Suivi de la croissance et de la vaccination",
        "Prise en charge de la malnutrition infantile",
        "Traitement des maladies infectieuses de l'enfant",
        "Coordination avec la maternité et la Gynéco-Obstétrique",
      ]}
      stageOrg="Les étudiants participent aux consultations et aux visites en salle d'hospitalisation pédiatrique, sous la supervision d'un pédiatre ou d'un médecin senior du service."
      integrationSteps={[
        "Se présenter au chef de service dès le premier jour",
        "Se familiariser avec les courbes de croissance et outils pédiatriques",
        "Participer aux consultations et visites accompagnées",
        "Apprendre les spécificités de l'examen clinique de l'enfant",
        "Tenir un compte-rendu de garde pour chaque cas suivi",
      ]}
    />
  );
}
