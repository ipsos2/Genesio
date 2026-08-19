import { HeartPulse } from "lucide-react";
import { ServicePage } from "@/components/service-page";

export default function GynecoPage() {
  return (
    <ServicePage
      title="Gynécologie-Obstétrique"
      tag="Service clinique — EPHR San Pedro"
      icon={<HeartPulse className="h-7 w-7" />}

      intro="Le service de Gynécologie-Obstétrique assure le suivi de grossesse, les accouchements et la prise en charge de la santé de la femme."
      activities={[
        "Consultations prénatales et suivi de grossesse",
        "Accouchements normaux et pathologiques",
        "Prise en charge des urgences obstétricales",
        "Consultations gynécologiques générales",
        "Dépistage des cancers gynécologiques (col, sein)",
        "Planification familiale et éducation à la santé reproductive",
      ]}
      stageOrg="Les étudiants sont intégrés aux équipes de garde en salle d'accouchement et en consultation, avec un accompagnement renforcé lors des premières présences en salle de travail."
      integrationSteps={[
        "Se présenter à la sage-femme major et au chef de service",
        "Suivre une consultation prénatale en observateur",
        "Participer aux gardes en salle d'accouchement, encadré",
        "Se former aux gestes de base (partogramme, examen obstétrical)",
        "Documenter chaque garde dans son carnet de stage",
      ]}
    />
  );
}
