# Leverandørerklæring om informasjonssikkerhet og personvern

Fossilfinneren AS sine svar på leverandørerklæringen i Feide kundeportal og på Læringsplatformen. Sist oppdatert 1. september 2025.

Svarene gjelder tjenesten Fossilfinneren. Dokumentasjon vi viser til, deles med kunden på forespørsel til personvern@fossilfinneren.example.

## 1. Styringssystem for informasjonssikkerhet

**1.1** Har leverandør et internt ledelsessystem for informasjonssikkerhet (ISMS) kompatibelt med ISO 27001?

> Ja


## 2. Kommunikasjonssikkerhet

**2.1** Er medarbeidere med tilgang til kundedata begrenset til det nødvendige, og har alle disse signert taushetserklæring?

> Annet – Delvis på plass. Arbeidet ferdigstilles i løpet av skoleåret.

**2.2** Har tjenesten en dokumentert informasjonsarkitektur som viser dataflyt og sikkerhetskontroller?

> Ja

**2.3** Er alle sekundære tilganger til kundedata, f.eks. API-er, backup og logging, sikret på samme nivå som primærtilganger?

> Ja


## 3. Personellsikkerhet

**3.1** Har alle som behandler kundedata tilstrekkelig kompetanse om informasjonssikkerhet og personvern?

> Annet – Delvis på plass. Arbeidet ferdigstilles i løpet av skoleåret.

**3.2** Har databehandler nødvendig kompetanse og kapasitet til å bistå den behandlingsansvarlige i å ivareta personopplysningssikkerheten, vurdere personvernkonsekvenser, samt bidrar i ekstern revisjon eller drøftinger med Datatilsynet.

> Ja


## 4. Informasjonsforvaltning

**4.1** Har leverandøren oversiktlig dokumentasjon over utstyr og systemer som er involvert i tjenesteleveransen?

> Ja

**4.2** Har leverandøren rutiner for sikker sletting av lagringsmedier som kan ha inneholdt kundedata?

> Ja – Rutinen gjennomgås årlig av ledelsen.

**4.3** Har tjenesten automatiske sletterutiner?

> Ja – Elevdata slettes automatisk 180 dager etter at skolen avslutter abonnementet.


## 5. Tilgangskontroll

**5.1** Har løsningen en informasjonsarkitektur hvor tilgangssstyringen er rollebasert og bruken av privilegerte kontoer er begrenset?

> Ja – Beskrevet i vår sikkerhetsdokumentasjon, som deles med kunden på forespørsel.

**5.2** Er alle drifts- og administrasjonskontoer ("superbrukere" mv.) implementert som unike og personlige brukeridentiteter?

> Annet – Gjelder for produksjonsmiljøet, ikke for testmiljøet.

**5.3** Er Feide eneste innloggingsløsning?

> Ja – Tjenesten har ingen annen innloggingsløsning enn Feide. Se docs/feide-integrasjon.md.


## 6. Kryptografi

**6.1** Er kundedata, inklusive lagringsmedier, logger og backup, alltid kryptert med moderne kryptoløsninger (både ved overføring og lagring)?

> Ja


## 7. Fysisk og miljømessig sikkerhet

**7.1** Har leverandør fysiske sikringstiltak for alle lokasjoner hvor tjenesten behandles? (Adgangskontroll, ventilasjon, brannsiking og redundant nett- og strømforsyning).

> Ja


## 8. Driftssikkerhet

**8.1** Har leverandøren en dokumentert prosess for varsling av planlagt nedetid (f.eks. faste servicevinduer, roadmap for større versjonsoppgraderinger)?

> Ja

**8.2** Har leverandøren rutiner for endringshåndtering og dokumentert prosess for testing av endringer i tjenesten, inkludert testmiljø adskilt fra produksjonsmiljø med anonymiserte data?

> Ja

**8.3** Har leverandøren implementert fysisk og/eller logisk skille mellom data fra forskjellige kunder?

> Ja

**8.4** Har leverandøren en prosess for backup som inkluderer regelmessig testing av tilbakeføring?

> Ja

**8.5** Kan leverandøren inngå avtale som spesifiserer maksimalt tillatte nedetid?

> Ja

**8.6** Har leverandøren en backup-prosess med logisk og geografisk redundans?

> Annet – Gjelder for produksjonsmiljøet, ikke for testmiljøet.

**8.7** Har leverandøren dokumentert prosess for monitorering av tjenesten, dataoverføring og grensesnitt med relevant varsling av avvik til kunden?

> Ja – Beskrevet i vår sikkerhetsdokumentasjon, som deles med kunden på forespørsel.

**8.8** Har leverandøren en dokumentert prosess for logging av forsøk på autorisert og uautorisert tilgang til tjenesten eller kundedata, samt relevante sikkerhetshendelser som er tilknyttet løsningen?

> Ja

**8.9** Logges all tilgang og aktivitet knyttet opp mot identifiserbare brukere, inkludert hvem som har aksessert eller endret hvilke data på hvilket tidspunkt ("audit trail logging")?

> Ja – Se personvernerklæringen.

**8.10** Har leverandøren en dokumentert prosess for oppdatering av tjenesten, inkludert operativsystem, programvarebiblioteker og annen mellomvare?

> Nei – Ikke på plass i dag. Vi vurderer dette i neste versjon av tjenesten.

**8.11** Har leverandøren en dokumentert prosess for sikkerhetstesting av tjenesten, f.eks. sårbarhetsskanning eller penetrasjonstester?

> Ja


## 9. Anskaffelse, utvikling og vedlikehold av systemer

**9.1** Er tjenesten fra grunnen av utviklet med sikker utviklingsmetodikk?

> Ja – Se personvernerklæringen.


## 10. Leverandørforhold

**10.1** Vil leverandøren kunne inngå en databehandleravtale i tråd med GDPR?

> Ja

**10.2** Kan leverandøren inngå databehandleravtale etter mal fra Direktoratet for forvaltning og økonomistyring (DFØ) og er "Skjema for mal som genereres" i Feides kundeportal oppdatert? (anskaffelser.no)

> Ja – Beskrevet i vår sikkerhetsdokumentasjon, som deles med kunden på forespørsel.


## 11. Styring av informasjons-sikkerhetsbrudd

**11.1** Har leverandøren en dokumentert prosess for hendelseshåndtering, inklusive registrering, kategorisering og rapportering av hendelser, med en klar beskrivelse av hva som skal utløse rapportering til kunden?

> Ja – Beskrevet i vår sikkerhetsdokumentasjon, som deles med kunden på forespørsel.

**11.2** Har leverandøren etablert et avvikssystem som fanger opp og håndterer informasjonssikkerhetsavvik?

> Annet – Delvis på plass. Arbeidet ferdigstilles i løpet av skoleåret.


## 12. Virksomhetskontinuitet

**12.1** Har leverandøren etablert kontinuitets- og beredskapsplaner som ivaretar forretningsmessige kontinuitet ved alvorlige uforusette hendelser?

> Annet – Delvis på plass. Arbeidet ferdigstilles i løpet av skoleåret.

**12.2** Har leverandøren rutiner for å oppdatere kontaktinformasjon og varslingslister?

> Ja – Rutinen gjennomgås årlig av ledelsen.


## 13. Samsvar

**13.1** Kan kunden få tilgang til en årlig uavhengig gjennomgang av informasjonssikkerheten i tjenesteleveransen?

> Ja

**13.2** Har kunden adgang til å gjennomføre revisjon av tjenesteleveransen inkludert organisatoriske forhold hos leverandøren og ev. underleverandører, enten selv eller gjennom tredjepart?

> Ja – Se personvernerklæringen.


## 14. Personvern

**14.1** Har leverandør utarbeidet personvernvurderinger, eks risikovurderinger/DPIA?

> Annet – Gjelder for produksjonsmiljøet, ikke for testmiljøet.

**14.2** Finnes det en personvernerklæring for tjenesten?

> Ja

**14.3** Kan leverandør dokumentere tiltak for innebygd personvern?

> Ja

**14.4** Behandles alle personopplysninger innenfor EU/EØS??

> Ja

**14.5** Har leverandøren en liste over underleverandører som benyttes for å levere den spesifikke tjenesten? List opp/legg ved URL i kommentarfeltet tilhørende spørsmålet.

> Ja – Wolkenhafen Rechenzentrum GmbH (DE), Liffey Mailworks Ltd (IE) og Plausible Insights OÜ (EE). Se docs/underleverandorer.md.

**14.6** Har leverandøren rutiner som sikrer at det ikke tas i bruk nye databehandlere uten nødvendig godkjenning og varsler?

> Annet – Håndteres av driftsleverandøren, se databehandleravtalen.

**14.7** Har tjenesten funksjonalitet for å ivareta de registrerte sine rettigheter som innsyn og sletting?

> Annet – Delvis på plass. Arbeidet ferdigstilles i løpet av skoleåret.

**14.8** Henter tjenesten kun nødvendige personopplysninger, og bare gjennom attributtene som er registrert i Feide med oppgitte begrunnelser?

> Ja – Beskrevet i vår sikkerhetsdokumentasjon, som deles med kunden på forespørsel.

**14.9** Har tjenesten dokumentert tilgangsstyring basert på roller?

> Ja

**14.10** Er tjenesten fri for reklame, herunder sporingsteknologi?

> Ja – Ingen reklame og ingen sporing etter innlogging. Forsiden og de åpne sidene teller besøk anonymt med Plausible, uten informasjonskapsler.

**14.11** Unngår tjenesten at lærer/ansatte har oversikt over elevenes aktiviteter i tjenesten, for eksempel elevarbeider, progresjon, vurderinger, lekser, osv.?

> Ja – Se personvernerklæringen.


## 15. Behandlinger

**15.1** Er tjenesten uten funksjonalitet for at lærer kan gi oppgaver til elever eller grupper av elever, herunder digital produksjon av tekst, bilder, lyd, film, etc.?

> Nei

**15.2** Er tjenesten uten funksjonalitet for at lærer kan vurdere elevenes digitale arbeid?

> Nei

**15.3** Er tjenesten uten funksjonalitet for at elever kan produsere elevarbeid i form av fritekst?

> Nei

**15.4** Er tjenesten uten funksjonalitet for at elever kan produsere elevarbeid i form av bilder, lyd, film eller andre multimodale elementer?

> Nei

**15.5** Er tjenesten uten funksjonalitet for å tilgjengeliggjøre elevproduksjoner for andre enn elevens faglærer og/eller kontaktlærer?

> Ja

**15.6** Garanterer leverandøren at kvantitative elevdata, herunder pseudunymiserte data om skår, svar på flervalgsoppgaver, tidsbruk, etc. ikke benyttes til normering, altoritmetrening, utvikling av læringsmodell, utvikling av adaptivitet, trening av kunstig intelligens, etc.?

> Ja

**15.7** Garanterer leverandøren at kvalitative elevdata, herunder fritekst, lyd, bilder, video, multimodale elementer, etc. ikke benyttes til normering, altoritmetrening, utvikling av læringsmodell, utvikling av adaptivitet, trening av kunstig intelligens, etc.?

> Ja – Se personvernerklæringen.

**15.8** Brukerne kan ikke drive prosesskriving i tjenesten, for eksempel lærer-elev eller elev-elev.

> Ja

**15.9** Er tjenesten uten funksjonalitet for at brukerne kan kommunisere med hverandre gjennom meldinger/chat/mail, voicemail, videocall, etc?

> Ja

**15.10** Er tjenesten uten funksjonalitet for å registrere elevenes digitale aktiviteter knyttet til læreplanmål og vise disse (både individuelt og samlet) til lærerne?

> Ja

**15.11** Er tjenesten uten kunstig intelligens eller tilsvarende funksjonalitet?

> Ja

**15.12** Er tjenesten uten adaptiv funksjonalitet, automatiserte vurderinger eller andre former for automatisk vurdering / retting av elevarbeider?

> Ja

**15.13** Har leverandøren rutiner og retningslinjer som sikrer at det ikke utføres behandlinger utover det som er fastsatt i avtalen med behandlingsansvarlig?

> Ja

