# Informasjonskapsler

Fossilfinneren bruker bare informasjonskapsler som trengs for at tjenesten skal virke. Vi bruker ingen informasjonskapsler til sporing eller reklame.

| Navn         | Type        | Formål                                        | Levetid                 | Satt av                  |
| ------------ | ----------- | --------------------------------------------- | ----------------------- | ------------------------ |
| `session_id` | Nødvendig   | Holder deg innlogget i tjenesten              | Slettes ved utlogging   | api.fossilfinneren.no    |
| `feide_auth` | Nødvendig   | Innloggingen med Feide                        | 8 timer                 | fossilfinneren.no        |
| `lang`       | Funksjonell | Husker om du vil ha bokmål eller nynorsk      | 1 år                    | fossilfinneren.no        |

Besøksstatistikken fra Plausible bruker ingen informasjonskapsler.

Informasjonskapslene settes i [apps/api/src/server.ts](../apps/api/src/server.ts) og [apps/web/src/i18n/index.ts](../apps/web/src/i18n/index.ts).
