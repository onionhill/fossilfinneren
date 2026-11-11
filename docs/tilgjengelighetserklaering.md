# Tilgjengelighetserklæring

Den offisielle erklæringen ligger på UU-status, nettstedet til Tilsynet for universell utforming av ikt:

**https://uustatus.no/nb/erklaringar/fossilfinneren-elev**

## Status

Fossilfinneren (elevvisningen) er **delvis i samsvar** med kravene i forskrift om universell utforming av IKT (WCAG 2.1 nivå A og AA).

- Sist testet: 10. september 2025
- Testet med: axe DevTools, WAVE og NVDA, i tillegg til manuell testing med tastatur
- Automatiske tester: axe-core kjører i CI på alle sider, se [apps/web/e2e/a11y.spec.ts](../apps/web/e2e/a11y.spec.ts)

## Avvik

| Krav                                  | Nivå | Hva er feil                                                                 | Plan                  |
| ------------------------------------- | ---- | --------------------------------------------------------------------------- | --------------------- |
| 1.1.1 Ikke-tekstlig innhold           | A    | Noen bilder i fossilkortene mangler tekstalternativ.                        | Rettes innen 1. februar 2027 |
| 2.4.7 Synlig fokus                    | AA   | Fokus er ikke synlig på zoom- og lagknappene i fossilkartet.                | Rettes innen 1. februar 2027 |

Avvikene er merket i koden med `UU-avvik` (søk i repoet).

## Dette fungerer

- Hele tjenesten kan brukes med tastatur, utenom kartet (se avvik over).
- Hopp til hovedinnhold-lenke på alle sider.
- Alle oppgaver og fossilkort kan leses opp (Opplesing).
- Tekst kan forstørres til 200 % uten tap av innhold, og innholdet flyter om ved 400 %.
- Kontrast på tekst er minst 4,5:1.
- Språket er angitt på siden (`nb` eller `nn`).

## Tilbakemelding

Send en e-post til uu@fossilfinneren.example hvis noe ikke fungerer for deg. Vi svarer innen fem virkedager.
