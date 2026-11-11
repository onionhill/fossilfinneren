# Underleverandører

Fossilfinneren AS bruker disse underleverandørene (underdatabehandlerne) for å levere tjenesten. All behandling skjer innenfor EU/EØS, og ingen av dem behandler særlige kategorier av personopplysninger.

Nye underleverandører tas ikke i bruk før kundene er varslet, og de kan protestere i tråd med databehandleravtalen.

## Wolkenhafen Rechenzentrum GmbH

| Felt                    | Verdi                             |
| ----------------------- | --------------------------------- |
| Behandling              | Drift og lagring                  |
| Organisasjonsnummer     | 990123456                         |
| Adresse                 | Speicherweg 12, 20457 Hamburg     |
| Land                    | Tyskland (DE)                     |
| Innenfor EØS            | Ja                                |
| Kontaktperson           | Jana Brenner                      |
| E-post                  | datenschutz@wolkenhafen.example   |
| Telefon                 | +49 40 5550 1420                  |
| Særlige kategorier      | Nei                               |

Wolkenhafen drifter Kubernetes-klyngen, databasen (PostgreSQL), objektlagringen og sikkerhetskopiene i datasenteret i Hamburg, med en kopi av sikkerhetskopiene i Frankfurt. Se [deploy/k8s](../deploy/k8s).

## Liffey Mailworks Ltd

| Felt                    | Verdi                             |
| ----------------------- | --------------------------------- |
| Behandling              | Utsending av e-post               |
| Organisasjonsnummer     | 990654321                         |
| Adresse                 | 7 Quayside Lane, D02 XK45 Dublin  |
| Land                    | Irland (IE)                       |
| Innenfor EØS            | Ja                                |
| Kontaktperson           | Aoife Kearney                     |
| E-post                  | privacy@liffeymail.example        |
| Telefon                 | +353 1 555 0187                   |
| Særlige kategorier      | Nei                               |

Liffey Mailworks sender den ukentlige oppsummeringen til lærerne. E-postadressen hentes fra skolens kundekontakt, ikke fra Feide. Se [apps/api/src/mail.ts](../apps/api/src/mail.ts).

## Plausible Insights OÜ

| Felt                    | Verdi                             |
| ----------------------- | --------------------------------- |
| Behandling              | Anonym besøksstatistikk           |
| Poststed                | Tartu                             |
| Land                    | Estland (EE)                      |
| Innenfor EØS            | Ja                                |
| E-post                  | privacy@plausible.io              |
| Særlige kategorier      | Nei                               |

Plausible teller sidevisninger uten informasjonskapsler og uten å lagre IP-adresser. Skriptet lastes fra `plausible.io` på forsiden og de åpne sidene, ikke etter innlogging. Se [apps/web/index.html](../apps/web/index.html).
