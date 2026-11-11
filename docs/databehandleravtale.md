# Databehandleravtale

Fossilfinneren AS inngår databehandleravtale med hver skoleeier, etter DFØs mal for databehandleravtale. Avtalen inngås på Læringsplatformen eller direkte med oss.

## Avtalens formål

Avtalen gjelder alle avtaler om bruk av Fossilfinneren med Feide-ID som er inngått med skoleeier og skolene skoleeier har ansvar for, også prøvelisenser og demo.

## Behandlingen

| Felt                          | Innhold                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| Formål                        | Levere en digital læringstjeneste i naturfag til elever og lærere                               |
| Behandlingsgrunnlag           | Opplæringsloven og forskrift til opplæringsloven                                                |
| De registrerte                | Elever i grunnopplæringen (barn) og lærere                                                      |
| Brukerinformasjon fra Feide   | Navn, brukeridentifikatorer hos organisasjonen, organisasjonstilhørighet, gruppetilhørigheter for undervisning |
| Brukergenererte data          | Fritekst i feltdagboken, bilder av funn, svar på oppdrag, kommentarer fra lærer                 |
| Særlige kategorier            | Nei                                                                                             |
| Lagringssted                  | Tyskland (Wolkenhafen Rechenzentrum GmbH)                                                       |
| Sletting                      | Elevdata slettes automatisk 180 dager etter at abonnementet er avsluttet                        |
| Tilbakelevering               | Skoleeier kan eksportere alle data som JSON før sletting                                        |

## Behandlinger tjenesten har

- Lærer gir oppgaver der elevene lager digitalt innhold (oppdrag).
- Lærer vurderer elevarbeid i tjenesten (kommentarer på funn).
- Elevene skriver fritekst (feltdagbok).
- Elevene legger ved bilder av egne funn.

Tjenesten har ikke kunstig intelligens, adaptiv funksjonalitet, chat eller reklame.

## Sikkerhetstiltak

- All trafikk går over TLS 1.2 eller nyere, med HSTS.
- Data og sikkerhetskopier er kryptert (AES-256).
- Tilgang for ansatte er rollebasert, personlig og med tofaktor.
- Kundedata er logisk skilt per skoleeier.
- Tilgang til data logges og logger slettes etter 90 dager.

Mer i [leverandorerklaering.md](leverandorerklaering.md) og [SECURITY.md](../SECURITY.md).

## Underleverandører

Se [underleverandorer.md](underleverandorer.md).

## Tilleggsregulering

Ved vesentlig brudd på databehandleravtalen kan kunden, etter skriftlig varsel, heve avtalen og kreve data tilbakelevert og slettet.
