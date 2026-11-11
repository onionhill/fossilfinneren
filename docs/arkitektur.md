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

- Eleven ser bare sin egen feltdagbok.
- Læreren ser elevene i sine egne undervisningsgrupper fra Feide (`groups-edu`).
- Skolens lisens leses fra `groups-org` og eduPersonEntitlement (`urn:mace:fossilfinneren.no:lisens:`).
- Data er logisk skilt per skoleeier: hver rad har `org_id`, og API-et filtrerer alltid på innlogget brukers organisasjon.

## Sikkerhetskopier

Daglig sikkerhetskopi av databasen og objektlagringen, kryptert, lagret i Hamburg med kopi i Frankfurt. Tilbakeføring testes hvert kvartal. Sikkerhetskopier slettes etter 35 dager.
