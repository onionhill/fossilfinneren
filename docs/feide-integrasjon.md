# Feide-integrasjon

Fossilfinneren logger inn elever og lærere med Feide over OpenID Connect (authorization code flow med PKCE). Tjenesten har ingen annen innloggingsløsning.

## Klient

| Felt                       | Verdi                                       |
| -------------------------- | ------------------------------------------- |
| Utsteder (issuer)          | `https://auth.dataporten.no`                |
| Omdirigeringsadresse       | `https://fossilfinneren.no/auth/callback`   |
| Utloggingsadresse          | `https://fossilfinneren.no/`                |
| Innloggingsside            | `https://fossilfinneren.no/logg-inn`        |
| Klienttype                 | Offentlig klient (SPA) med PKCE             |
| Feide-tjeneste-ID          | 2300101                                     |

Testmiljøet bruker `https://test.fossilfinneren.no/auth/callback`. Lokalt brukes `http://localhost:5173/auth/callback`.

Konfigurasjonen ligger i [apps/web/src/auth/feide.ts](../apps/web/src/auth/feide.ts).

## Brukerinformasjon

Tjenesten ber bare om opplysningene den trenger.

| Scope           | Opplysning                              | Hvorfor tjenesten trenger den                                                   |
| --------------- | --------------------------------------- | ------------------------------------------------------------------------------- |
| `openid`        | –                                       | Kreves for OpenID Connect.                                                      |
| `userinfo-name` | Navn                                    | Vise navnet til eleven og læreren i tjenesten.                                  |
| `userid-feide`  | Brukeridentifikatorer hos organisasjonen | Identifisere brukeren ved innlogging og knytte resultater til riktig elev.      |
| `groups-org`    | Organisasjonstilhørighet                | Vite hvilken skole brukeren tilhører, slik at riktig lisens brukes.             |
| `groups-edu`    | Gruppetilhørigheter for undervisning    | Sette opp klasser og grupper automatisk, slik at læreren ser sine elever.       |

Tjenesten ber ikke om e-post, fødselsnummer, telefon eller foto.

## Rettigheter (eduPersonEntitlement)

Lisensen styres per skole med egne rettigheter. Tjenesten leser bare rettigheter med prefikset:

```
urn:mace:fossilfinneren.no:lisens:
```

For eksempel gir `urn:mace:fossilfinneren.no:lisens:elev` tilgang som elev og `urn:mace:fossilfinneren.no:lisens:laerer` tilgang som lærer.

## API-er fra Feide

- `https://auth.dataporten.no` – innlogging og OpenID Connect-oppdagelse.
- `https://api.dataporten.no/userinfo/v1/userinfo` – navn og brukeridentifikator.
- `https://groups-api.dataporten.no/groups/me/groups` – skole og undervisningsgrupper.

## Test

Testbrukere fra Feides testorganisasjon (`spusers.feide.no`) brukes i testmiljøet. Testen av innloggingen kjøres før hver lansering, se [CHANGELOG.md](../CHANGELOG.md).
