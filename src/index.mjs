// Objectif : implémenter la frontière de décision métier propre au dépôt.
import { readFile } from "node:fs/promises";
export const DECISIONS = Object.freeze({
  "attention_supported": "vigilance_etayee",
  "review_required": "revue_requise",
  "stable": "situation_stable",
  "no_measurement": "aucune_mesure_fournie"
});
const CRITERIA = Object.freeze({
  "attention_supported": "vigilance etayee",
  "review_required": "revue requise",
  "stable": "situation stable",
  "no_measurement": "aucune mesure fournie"
});
export function waterControlCase(input) {
  if (!input?.id || !input?.text || !input?.source?.url || !input?.source?.date) throw new TypeError("Le dossier exige id, text, source.url et source.date");
  const date = new Date(input.source.date);
  if (Number.isNaN(date.valueOf())) throw new TypeError("source.date doit être une date ISO valide");
  return { ...input, id: String(input.id), text: String(input.text).trim(), source: { url: String(input.source.url), date: date.toISOString() } };
}
export async function assessWaterBulletin(input, provider) {
  const record = waterControlCase(input);
  if (Array.isArray(record.measurements) && record.measurements.length === 0) return { decision: "no_measurement", label: DECISIONS["no_measurement"], probability: 1, review: false, deterministic: true };
  const response = await provider.decide({
    state: record,
    questions: { decision: { type: "choice", instructions: "Analysez ce dossier à partir des seuls éléments sourcés. Évaluez les paramètres concernés, leur évolution, la conclusion officielle fournie et la cohérence des mesures disponibles. Choisissez la catégorie la plus prudente. N’inventez ni fait, ni règle applicable, ni garantie.", criteria: CRITERIA } },
  });
  const answer = response.answers.decision;
  return { decision: answer.choice, label: DECISIONS[answer.choice], probability: answer.probabilities[answer.choice], confidence: answer.confidence, review: answer.confidence < 0.8, deterministic: false, usage: response.usage };
}
export async function runCli(argv, io = console) {
  if (argv.length !== 1) throw new Error("Usage : jev-eau-potable-bulletin <dossier.json>");
  const dossier = waterControlCase(JSON.parse(await readFile(argv[0], "utf8")));
  io.log(JSON.stringify({ dossier, prochaineÉtape: "Transmettez ce dossier à assessWaterBulletin avec un fournisseur Jev configuré." }, null, 2));
}
