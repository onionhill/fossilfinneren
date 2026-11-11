# Arkitektur og dataflyt

```
 Elev / lærer (nettleser)
        │
        │ HTTPS
        ▼
 fossilfinneren.no ── cdn.fossilfinneren.no        (React-app, nginx)
        │
        ├── auth.dataporten.no                      (Feide-innlogging, OIDC + PKCE)
        ├── api.fossilfinneren.no ─── PostgreSQL    (API, Node.js/Fastify)
        │          │                  objektlagring (bilder av funn)
        │          ├── api.dataporten.no            (navn, brukeridentifikator)
        │          ├── groups-api.dataporten.no     (skole og klasser)
        │          └── smtp.liffeymail.example      (ukentlig e-post til lærere)
        ├── innhold.fossilfinneren.no               (bilder til fossilkortene)
        ├── video.fossilfinneren.no                 (videoer, HLS)
        ├── cache.kartverket.no                     (kartfliser)
        └── plausible.io                            (anonym besøksstatistikk, bare åpne sider)
```

## Komponenter

| Komponent     | Teknologi                 | Kode                         |
| ------------- | ------------------------- | ---------------------------- |
| Webapp        | React 19, Vite, Leaflet   | [apps/web](../apps/web)      |
| API           | Node.js 24, Fastify       | [apps/api](../apps/api)      |
| Database      | PostgreSQL 16             | [apps/api/sql](../apps/api/sql) |
| Sletting      | Kubernetes CronJob        | [apps/api/src/jobs/retention.ts](../apps/api/src/jobs/retention.ts) |
| Drift         | Kubernetes hos Wolkenhafen, Hamburg | [deploy/k8s](../deploy/k8s) |

## Tilgangsstyring

- API-et godtar bare forespørsler med både Feides tilgangstoken og ID-token. ID-tokenet sjekkes mot Feides nøkler (`https://auth.dataporten.no/openid/jwks`), og mottakeren (`aud`) må være Fossilfinnerens klient. Et token utstedt til en annen tjeneste avvises. Se [apps/api/src/feide.ts](../apps/api/src/feide.ts).
- Eleven ser bare sin egen feltdagbok.
- Læreren ser elevene i gruppene der hen er lærer (`faculty`) i Feides undervisningsgrupper (`groups-edu`). Gruppene sammenlignes på Feides faste gruppe-ID, ikke på navnet.
- Skolens lisens leses fra `groups-org` og eduPersonEntitlement (`urn:mace:fossilfinneren.no:lisens:`).
- Data er logisk skilt per skoleeier: hver rad har `org_id`, og API-et filtrerer alltid på innlogget brukers organisasjon.

## Sletting

Hver natt sletter en jobb alle data for skoleeiere der abonnementet ble avsluttet for mer enn 180 dager siden: først bildene i objektlagringen, så abonnementet med elever, feltdagbøker og funn. Se [apps/api/src/jobs/retention.ts](../apps/api/src/jobs/retention.ts).

## Sikkerhetskopier

Daglig sikkerhetskopi av databasen og objektlagringen, kryptert, lagret i Hamburg med kopi i Frankfurt. Tilbakeføring testes hvert kvartal. Sikkerhetskopier slettes etter 35 dager.
