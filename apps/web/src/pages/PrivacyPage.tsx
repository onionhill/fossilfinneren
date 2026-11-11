import { FEIDE_SCOPES } from "../auth/feide";

export function PrivacyPage() {
  return (
    <article className="narrow">
      <h1>Personvern</h1>
      <p>
        Skoleeieren er behandlingsansvarlig. Fossilfinneren AS (org.nr. 317 280 297) er databehandler. Kontakt:
        personvern@fossilfinneren.example.
      </p>
      <h2>Opplysninger fra Feide</h2>
      <ul>
        {FEIDE_SCOPES.filter((s) => s.key !== "openid").map((scope) => (
          <li key={scope.key}>{scope.reason}</li>
        ))}
      </ul>
      <h2>Lagring og sletting</h2>
      <p>Data lagres i Tyskland. Elevdata slettes automatisk 180 dager etter at skolen avslutter abonnementet.</p>
      <h2>Informasjonskapsler</h2>
      <p>
        Vi bruker bare nødvendige informasjonskapsler (session_id, feide_auth) og én funksjonell (lang), som husker
        målformen din.
      </p>
    </article>
  );
}
