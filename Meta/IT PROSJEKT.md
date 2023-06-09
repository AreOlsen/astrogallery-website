## Kva prosjektet handlar om.
Prosjektet tek utgangspunkt i å skapa ein nettstad for ein "bedrift". Eg har skapt ein internasjonal forum-nettstad retta mot astronomar, som er utvikla av SpaceX. Nettstaden gjev brukarane moglegheit til å opprette nye innlegg, kommentere, sjekka brukarprofilane til kvarandre og liknande. Prosjektet nyttar fleire ulike rammeverk som "daisyUI", "tailwindCSS", "firebase" og kompilatoren "SvelteKit". Nettstaden har ein innebygd API som er laga i javascript. Dette API-et er statisk og tilgjengeleg for alle gjennom ein URI-lenke. Det inneber at det hentar informasjon, men den informasjonen som blir henta i form av json blir ikkje oppdatert når informasjonen på serveren blir oppdatert. Dette er berre brukt på hovudsida, der ein statisk, ikkje-oppdaterande metode for å hente informasjon er optimal for å unngå hastigheitsproblem. For andre delar av nettstaden finst det eit dynamisk SvelteKit-lagerbasert API tilgjengeleg berre for utviklarane. Dette dynamiske API-et er langt betre for oppdateringar som skjer på nettstaden.

Prosjektet er tilgjengelig gjennom github for source-kode:
"https://github.com/AreOlsen/AstroGallery".

Og nettstaden:
"https://astroguidance.vercel.app"

## Filstruktur.

### Lokal Filstruktur.
Dette er den lokale filstrukturen til prosjektet:

```python
├── AstroGuidance
│   ├── LICENSE
│   ├── README.md
│   ├── database.rules.json
│   ├── firebase.json
│   ├── firestore.indexes.json
│   ├── firestore.rules
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.cjs
│   ├── src
│   │   ├── app.css
│   │   ├── app.html
│   │   ├── firebase.js
│   │   ├── lib
│   │   │   ├── Comment.svelte
│   │   │   ├── MediaGallery.svelte
│   │   │   ├── Post.svelte
│   │   │   ├── alertStore.ts
│   │   │   ├── authStore.ts
│   │   │   ├── docCollectionStore.ts
│   │   │   ├── emailSub.js
│   │   │   ├── postHandling.js
│   │   │   └── updateSetDoc.js
│   │   └── routes
│   │       ├── +error.svelte
│   │       ├── +layout.svelte
│   │       ├── +page.server.js
│   │       ├── +page.svelte
│   │       ├── aboutus
│   │       │   └── +page.svelte
│   │       ├── api
│   │       │   ├── getPostStatic
│   │       │   │   └── +server.js
│   │       │   └── getPostsStatic
│   │       │       └── +server.js
│   │       ├── forum
│   │       │   ├── +page.svelte
│   │       │   └── post
│   │       │       └── [slug]
│   │       │           ├── +page.js
│   │       │           └── +page.svelte
│   │       ├── newpost
│   │       │   └── +page.svelte
│   │       ├── privacy
│   │       │   └── +page.svelte
│   │       ├── profile
│   │       │   └── [slug]
│   │       │       ├── +page.js
│   │       │       └── +page.svelte
│   │       └── terms
│   │           └── +page.svelte
│   ├── static
│   │   ├── AboutUsBackground
│   │   │   ├── developers.jpg
│   │   │   ├── event.jpg
│   │   │   ├── moon.jpg
│   │   │   ├── outerspace.jpg
│   │   │   └── research.jpg
│   │   ├── CompanyLogo
│   │   │   └── Logo.png
│   │   ├── HomeBackground
│   │   │   ├── Backgrounds
│   │   │   │   └── Nebula.jpg
│   │   │   └── Hero
│   │   │       ├── Astronaut.jpg
│   │   │       ├── Astronaut2.jpg
│   │   │       ├── Astronaut3.jpg
│   │   │       ├── Earth.jpg
│   │   │       ├── Earth2.jpg
│   │   │       ├── Launch.jpg
│   │   │       ├── Launch2.jpg
│   │   │       ├── Launch3.jpg
│   │   │       ├── Launch4.jpg
│   │   │       ├── Launch5.jpg
│   │   │       ├── Launch6.jpg
│   │   │       ├── Launch7.jpg
│   │   │       ├── Meeting.jpg
│   │   │       ├── Moon.jpg
│   │   │       ├── Moon2.jpg
│   │   │       ├── Moon3.jpg
│   │   │       ├── Moon4.jpg
│   │   │       ├── NorthernLights.jpg
│   │   │       ├── SpaceStation.jpg
│   │   │       ├── USA.jpg
│   │   │       └── Window.jpg
│   │   ├── Icons
│   │   │   ├── arrowDownwards.svg
│   │   │   ├── astronomyPlanet.svg
│   │   │   ├── comments.svg
│   │   │   ├── contact.svg
│   │   │   ├── forumNotepad.svg
│   │   │   ├── heart.svg
│   │   │   ├── recycle.svg
│   │   │   ├── search.svg
│   │   │   └── text.svg
│   │   └── Socials
│   │       ├── instagram.svg
│   │       ├── twitter.svg
│   │       └── youtube.svg
│   ├── svelte.config.js
│   ├── tailwind.config.cjs
│   └── vite.config.js
└── README.md
```

### Server-side Firestore filstruktur.
Dette er filstrukturen som er lagret på firestore databasen, denne innehalder alle brukere, poster, og haldar også styr på kven som får emailer.
```python
├── AstroGuidance
│   ├── Newsletter
│   │   └──subscribedEmails
│   ├── Posts
│   │   ├── post1
│   │   ├── post2
│   │   ├── post3
│   │   ├── postN
│   ├── Profile
│   │   ├── user1
│   │   ├── user2
│   │   ├── user3
│   │   ├── userN
```

## Nettside struktur graf.
Alle under-nettstadene er tilkopla kvarandre gjennom ein meny på toppen av nettstaden, ein "header-nav-bar"-meny, og ein liknande meny på botnen. Difor finst det ingen vegar som berre går i ein retning. Nettstadane som ikkje er tilkopla til dei andre, "Error & API", er berre tilgjengelege ved å skrive inn ein URI-lenke, og dei er generelt fråkopla nettstadens brukarinnehald. Men "API" blir brukt av andre nettstader til informasjon-henting i form av JSON, sjølv om det ikkje er ein nettstad for brukarinnehald. "Ny post"-nettstaden er berre tilgjengeleg dersom brukaren er logga inn på nettstaden. "Brukarprofil"-nettstaden er tilgjengeleg på to ulike måtar. Dersom brukaren er logga inn, er det ein lenke på botnen og toppen av nettstaden som fører til eigen profil. Men den kan også nåast ved å bruke ein URI-lenke med profilen sin ID i tankane. "Post" er ein eigen type nettstad som viser berre eitt innlegg og er berre tilgjengeleg ved å enten bruke innlegget sin ID og nettstaden ".....app/forum/post/ID", eller når ein lagar eit nytt innlegg, blir ein umiddelbart omdirigert.

![[Captura de Pantalla 2023-06-09 a la(s) 19.03.33.png]]


## Nettside designer.
Basert på desse designa vart nettstaden utvikla med ein lik struktur med små variasjonar, som var forankra i prinsippa om universell design. Kvar nettstad har derfor ein gjennomgåande likhet i innhald og plassering av komponentar. Denne tilnærminga sikra at nettstaden var tilgjengeleg og brukarvenleg for eit breitt spekter av brukarar. Designet vart utført i programmet *Adobe XD*.

### Hovudside.
![[Captura de Pantalla 2023-06-08 a la(s) 3.20.02.png]]

### Forum side.
![[Captura de Pantalla 2023-06-08 a la(s) 4.19.20.png]]

### Om oss side.
![[Captura de Pantalla 2023-06-08 a la(s) 4.19.25.png]]

### Bruker-profil side.
![[Captura de Pantalla 2023-06-08 a la(s) 4.19.29.png]]

### Ny post side.
![[Captura de Pantalla 2023-06-08 a la(s) 4.19.35.png]]

### Post side.
![[Captura de Pantalla 2023-06-08 a la(s) 4.19.40.png]]

### Vilkår og betingelser side.
![[Captura de Pantalla 2023-06-08 a la(s) 4.19.46.png]]

### Personvernserklæring side.
![[Captura de Pantalla 2023-06-08 a la(s) 4.19.50.png]]

### Error side.
![[Captura de Pantalla 2023-06-08 a la(s) 4.19.53.png]]


## Oppgåve krav.
### Krav til innhold:
1.Nettstedet skal ha en hovedside som har en grunnleggende beskrivelse av hva nettstedet dreier seg om og hvilken informasjon man kan finne der.
*Nettstaden inkluderer ein hovudsida som presenterer grunnleggjande informasjon om nettstaden, inkludert opphavet, temaet og annen relevant generell informasjon. Denne informasjonen er kortfatta og overfladisk av omsyn til prinsippa for universell design som tar omsyn til hukommelse og syn. Videre er det meir omfattande informasjon tilgjengeleg på "om oss"-sida*.

2.En av sidene skal inneholde et bildegalleri der visningen styres av javascript
*Alle innlegg, bortsett frå dei statiske på hovudsida, er utstyrt med eit "MediaGallery"-element som kan vise både bilete og video. Dette elementet er tilgjengeleg i innlegget "What is space".*

3.En av sidene skal inneholde et skjema som er koblet et javascript og som endrer innholdet på deler av siden avhengig av input i skjemaet.
*Dette kravet er oppfylt på flere områder på nettstedet. Det gjelder blant annet for det nye kommentarfeltet i et innlegg og for nettstedet der nye innlegg kan opprettes.*

4.En sidene skal ha innhold som delvis hentes fra en json-fil eller data-api og som kan endres dynamisk 
*På nettstedet finnes det en innebygd statisk API som er tilgjengelig for alle brukere. Dette API-et brukes blant annet på hovedsiden til nettstedet for å vise toppinnlegg, eller hente eit spesifikk innlegg gjennom ID-en til innlegget. Endringer kan gjøres ved å opprette et nytt innlegg på nettstedet, noe som kun er mulig når man er logget inn. Dette API-et er tilgjengelig via URI-lenker som er "/api/getPostStatic?postID=ID" og "/api/getPostsStatic?numberPosts=TALL". Nettstedet har også SvelteKit stores som er koblet til Firebase, og disse fungerer som ein type API som oppdateres dynamisk umiddelbart. For eksempel vil opprettelsen av et nytt innlegg medføre en øyeblikkelig oppdatering. Disse SvelteKit stores er imidlertid ikkje tilgjengelige for brukere å benytte gjennom ein URI-lenke.*

5.Alle sidene skal inneholde bilder 
*I alle nettstadene finn ein bilete, enten i form av firmaet sitt logo eller bilete relatert til innhaldet. Innhaldet av bilete kan variere frå nettstad til nettstad, men bilete er ein integrert del av alle nettstadene.*

6.Minst en av sidene skal inneholde video eller lyd
*Sidan innlegga kan innehalde både video og bilete, blir dette kravet oppfylt. Eit innlegg som demonstrerer dette, "What is space?" innlegget, er allereie lasta opp og fungerer som eit godt døme.*

### Funksjonelle krav: 
1.Nettstedet skal ha en meny eller lignende som gjør at man kan navigere mellom sidene på nettstedet 
*På nettstaden finn ein ein navigasjonsmeny i footer-en som går til absolutt alle nettstadene, inkludert dei som er relaterte til vilkår og betingelsar samt personvernserklæring. I tillegg finst det lenker til alle essensielle nettstader i menyen øvst på sida, der er det også ein søke knapp. Lenkene vist kan variere litt angåande om ein logget-inn eller ikkje, når ein er logget-inn kan ein, til dømes, lage poster og ein ny lenke vil vise dette i top-menyen.*

2.Nettstedet skal ha en enhetlig profil og du skal legge vekt på universell utforming i utviklingen
*Nettstaden har ein gjennomgåande fargepalett som er konsistent på tvers av heile nettstaden. Dette sikrar ein harmonisk visuell opplevelse for brukarane. I tillegg er strukturen i innhaldet lik over heile nettstaden, noko som gjer det enkelt og intuitivt å navigere og finne informasjon.For å sikre tilgjengelighet, er det blitt implementert passande "alt"-tekst for alle bilete og anna media. Dette gjer det mulig for brukarar med synshemming eller andre behov å forstå og oppleve innhaldet på nettstaden. Videre er alle lenker og knapper utforma med store areal for å sikre enkel interaksjon og brukervennlighet. Dette gjer det lettere for brukarar å navigere og utføre handlingar på nettstaden.
Alle desse tiltaka bidrar til å gjøre nettstaden mest mogleg tilgjengelig for flest mogleg menneske, uavhengig av eventuelle funksjonsnedsettelser eller spesielle behov de måtte ha.*


### Anbefalte subnettsider å sjekke ut:
For å sjekke "MediaGallery"-komponenten og kommentarkomponenten kan du besøke:

Posten i Forum-nettstaden: *"What is space?". Den kan også finnast her: "https://astroguidance.vercel.app/forum/post/9243dad0-cdd3-4647-9be0-ad864fb2a96a"

For å sjekke brukarprofilar kan du besøke:
"https://astroguidance.vercel.app/profile/HjPtV2R08Fc5YvaeLO5G1HL0tcj1"

Visse andre komponentar og funksjonar er berre tilgjengelege etter innlogging. Dette inkluderer funksjonen for å laste opp nye innlegg, opprette nye kommentarar eller slette innlegg og kommentarar.




