"use client";
import { useId, useState } from "react";
import { ListChecks } from "lucide-react";
import styles from "./article-blocks.module.css";
const groups = [
  { title: "Avant l’événement", items: ["Périmètre défini : horaires, zones et objectifs", "Analyse des risques examinée", "Effectifs et postes répartis", "Règles de contrôle d’accès précisées", "Briefing réalisé : radio, référents et procédures"] },
  { title: "Pendant l’événement", items: ["Issues, éclairage et moyens radio vérifiés", "Accès et files d’attente surveillés", "Rondes et zones sensibles suivies", "Incidents et actions consignés"] },
  { title: "Après l’événement", items: ["Sortie du public accompagnée", "Démontage encadré", "Inspection finale réalisée", "Rapport et recommandations préparés"] },
];
export function EventChecklist() {
  const id = useId();
  const [checked, setChecked] = useState<string[]>([]);
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  return <div className={styles.checklist}><div className={styles.eyebrow}><ListChecks size={18} aria-hidden="true" />Votre aide-mémoire</div><p className={styles.checkStatus} aria-live="polite">{checked.length} / {total} points cochés</p><progress value={checked.length} max={total} aria-label="Avancement de votre checklist" /><p className={styles.checkNote}>Cochez les points préparés. Votre progression reste sur cette page et se réinitialise à son rechargement.</p>{groups.map((group,index)=><fieldset key={group.title}><legend>{group.title}</legend>{group.items.map((item,i)=>{const key=`${index}-${i}`; return <label key={key} htmlFor={`${id}-${key}`}><input id={`${id}-${key}`} type="checkbox" checked={checked.includes(key)} onChange={event=>{ const isChecked = event.currentTarget.checked; setChecked(current=>isChecked ? [...current,key] : current.filter(value=>value!==key)); }} /><span>{item}</span></label>;})}</fieldset>)}<button type="button" disabled={!checked.length} onClick={()=>setChecked([])}>Réinitialiser la checklist</button></div>;
}
