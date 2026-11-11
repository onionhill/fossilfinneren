export function AccessibilityPage() {
  return (
    <article className="narrow">
      <h1>Tilgjengelighet</h1>
      <p>
        Fossilfinneren er delvis i samsvar med kravene til universell utforming. Les hele erklæringen på{" "}
        <a href="https://uustatus.no/nb/erklaringar/fossilfinneren-elev">UU-status</a>.
      </p>
      <h2>Kjente avvik</h2>
      <ul>
        <li>1.1.1 Ikke-tekstlig innhold: noen bilder i fossilkortene mangler tekstalternativ.</li>
        <li>2.4.7 Synlig fokus: fokus er ikke synlig på knappene i fossilkartet.</li>
      </ul>
      <p>Si fra til uu@fossilfinneren.example hvis noe ikke fungerer for deg.</p>
    </article>
  );
}
