# Accurate Black — Cinematic Experience Storyboard

**Phase 3**  
**Creative direction:** BLACK APERTURE  
**Canonieke speelduur:** circa 38 seconden  
**Storyboard:** 96 hoofdframes + 12 menu-insertframes = 108 frames  
**Status:** filmische regie; uitsluitend documentatie  
**Bronnen van waarheid:** `docs/accurate-black-codebase-audit.md` en `docs/homepage-design-masterplan.md`

---

## 1. Regieverklaring

De homepage wordt niet behandeld als een verzameling secties. Zij wordt geregisseerd als één ononderbroken korte film waarin de bezoeker zelf het tempo bepaalt.

Er is geen soundtrack bij aankomst. Er is geen stem die uitlegt wat Accurate Black is. Er is eerst zwart, daarna een snede, daarna één werk. De eerste echte klank kan pas ontstaan wanneer de bezoeker die zelf oproept.

De film kent één centrale beweging:

> Van verborgen object naar gekozen relatie.

De bezoeker begint buiten de wereld van het label. Na 38 seconden heeft hij niet “de homepage bekeken”; hij heeft achtereenvolgens één release ontmoet, het selectiemechanisme begrepen, mensen achter de catalogus gezien en besloten of hij het signaal wil volgen.

### Canonieke bezoeker

Het hoofdscenario veronderstelt een bezoeker die:

- op desktop of een ruim tabletscherm binnenkomt;
- de hero ongeveer vijf seconden bekijkt;
- rustig door de volledige homepage beweegt;
- één catalogusitem onderzoekt zonder de pagina te verlaten;
- bij één artiest kort vertraagt;
- bij Transmission bewust op play drukt;
- de footer bereikt zonder tussentijds het menu te openen.

Dit is geen gedwongen tijdlijn. De bezoeker kan sneller, langzamer, terug of helemaal niet scrollen. De pagina wacht nooit op een vooraf ingestelde speelduur. De tijdcodes beschrijven het verwachte ritme van een gemiddelde volledige passage, niet een automatische animatiefilm.

### Bewegingsvocabulaire

De film gebruikt uitsluitend de reeds vastgelegde bewegingen:

- **Aperture:** zwart opent langs een precieze snede.
- **Crop:** een beeld wordt langs zijn eigen rand vrijgegeven.
- **Resolve:** tekst vindt over maximaal twaalf pixels zijn definitieve positie.
- **10X Decode:** `1`, `0` en `X` lossen op tot een echte naam, route of cataloguscode.

De vaste timings blijven:

- direct: 80 ms, lineair;
- snel: 160 ms, `cubic-bezier(.2,0,0,1)`;
- utility: 240 ms, `cubic-bezier(.2,0,0,1)`;
- reveal: 480 ms, `cubic-bezier(.22,1,.36,1)`;
- hero: 620 ms, `cubic-bezier(.22,1,.36,1)`;
- exit: 280 ms, `cubic-bezier(.4,0,1,1)`.

### Stilte als beeldmateriaal

Stilte betekent hier niet dat er niets ontworpen is. Stilte is het moment waarop beweging ophoudt vóórdat de bezoeker verdergaat. Daardoor kan hij herkennen, lezen en kiezen.

Op vijf plaatsen is stilte verplicht:

1. direct nadat de hero volledig is verschenen;
2. tussen het complete artwork en de label thesis;
3. nadat de eerste cataloguspreview wisselt;
4. tijdens de blik op ieder artiestenportret;
5. na de laatste footerbeweging.

---

## 2. De acht momenten

## Moment 01 — Threshold

**Tijd:** 00:00–00:01.40  
**Doel:** de buitenwereld afsluiten zonder de bezoeker te blokkeren.  
**Emotie:** onmiddellijke kalmte, gevolgd door lichte verwachting.  
**Waarom dit moment bestaat:** een premium ervaring begint niet met een mededeling, maar met een verandering van mentale ruimte.

**Welke informatie wordt verwerkt:** alleen de naam Accurate Black, de aanwezigheid van een menu en het feit dat er iets achter zwart verborgen ligt.

**Wat de bezoeker denkt:** “Ik ben ergens binnengekomen; dit gaat niet schreeuwen.”  
**Wat hij voelt:** controle, donkerte, een nog onbenoemde spanning.  
**Waarschijnlijke actie:** niets; eerst kijken.

**Spanning wordt opgebouwd doordat:** het logo zich vormt terwijl elders slechts een haarfijne snede aanwezig is.  
**Spanning wordt losgelaten doordat:** de woordmarkering herkenbaar wordt en de pagina onmiddellijk bruikbaar blijkt.

**Zichtbare motion:** de bestaande letterintrede en het ontstaan van de Signal-naad.  
**Niet zichtbaar:** geen preloader, geen volle-pagina fade, geen achtergrondvideo, geen cursorchoreografie.  
**Waarom:** de bezoeker moet het gevoel krijgen dat de wereld al bestond vóór zijn aankomst.

## Moment 02 — Recognition

**Tijd:** 00:01.40–00:05.60  
**Doel:** één release van abstract object naar herkenbaar cultureel werk laten groeien.  
**Emotie:** nieuwsgierigheid die overgaat in focus.  
**Waarom dit moment bestaat:** Accurate Black moet eerst laten zien wat het kiest, vóór het vertelt waar het voor staat.

**Welke informatie wordt verwerkt:** artwork, artiest, titel, catalogusnummer, jaar en één vervolgstap.

**Wat de bezoeker denkt:** “Dit is de release die nu telt.”  
**Wat hij voelt:** aantrekking tot het artwork, daarna vertrouwen in de precisie van de presentatie.  
**Waarschijnlijke actie:** de cursor richting artwork bewegen of de titel lezen.

**Spanning wordt opgebouwd doordat:** het artwork lang genoeg gedeeltelijk verborgen blijft om een beeld te vermoeden.  
**Spanning wordt losgelaten doordat:** de aperture tot zijn ruststand opent en bij intentie het volledige werk vrijgeeft.

**Zichtbare motion:** aperture, korte Resolve van titel, één Decode van het catalogusnummer.  
**Niet zichtbaar:** geen artworkzoom, parallax, roterende releases of voortdurende scramble.  
**Waarom:** de cover is het hoofdpersonage; de interface mag niet acteren over het werk heen.

## Moment 03 — Surrender

**Tijd:** 00:05.60–00:08.30  
**Doel:** de bezoeker de controle over het tempo expliciet teruggeven.  
**Emotie:** ontlading en bereidheid om verder te gaan.  
**Waarom dit moment bestaat:** na de eerste spanningsboog moet de site bewijzen dat zij de scroll niet kaapt.

**Welke informatie wordt verwerkt:** het artwork in zijn geheel en de overgang van release naar overtuiging.

**Wat de bezoeker denkt:** “Ik kan dit zelf onderzoeken.”  
**Wat hij voelt:** beloning; het verborgen werk is nu vrij.  
**Waarschijnlijke actie:** rustig naar beneden scrollen.

**Spanning wordt opgebouwd doordat:** de eerste scroll de zwarte begrenzing nog kort vasthoudt.  
**Spanning wordt losgelaten doordat:** binnen twaalf procent viewportreis het volledige artwork zichtbaar wordt en daarna alle hero-motion stopt.

**Zichtbare motion:** alleen de laatste opening en maximaal acht pixels vertrek van de titel.  
**Niet zichtbaar:** geen pinning, schaalverandering of versnelde scroll.  
**Waarom:** het gevoel van overgave ontstaat alleen wanneer de pagina niet terugduwt.

## Moment 04 — Conviction

**Tijd:** 00:08.30–00:13.20  
**Doel:** de selectie een overtuiging geven zonder marketinguitleg.  
**Emotie:** rust, ernst en helderheid.  
**Waarom dit moment bestaat:** de bezoeker heeft een object gezien; nu krijgt dat object een culturele context.

**Welke informatie wordt verwerkt:** Deep. Dark. Authentic. Profound. en één merkzin.

**Wat de bezoeker denkt:** “De ingetogenheid is bewust.”  
**Wat hij voelt:** kalm vertrouwen.  
**Waarschijnlijke actie:** lezen; de scroll tijdelijk vertragen.

**Spanning wordt opgebouwd doordat:** de vier woorden als één blok verschijnen maar de merkzin nog een fractie achterblijft.  
**Spanning wordt losgelaten doordat:** `PROFOUND.` eenmaal ontcijfert en daarna alles stilstaat.

**Zichtbare motion:** één groeps-Resolve, één Decode, één zachte tekstintrede.  
**Niet zichtbaar:** geen woord-voor-woordshow, letterexplosie of illustratie.  
**Waarom:** de stelling moet zelf kunnen dragen wat zij beweert.

## Moment 05 — Evidence

**Tijd:** 00:13.20–00:20.60  
**Doel:** overtuiging omzetten in bewijs.  
**Emotie:** precisie, ritme en intellectuele voldoening.  
**Waarom dit moment bestaat:** zonder catalogus zou de thesis alleen positionering zijn.

**Welke informatie wordt verwerkt:** zes releases, hun volgorde, makers, titels, jaren en visuele verwantschap.

**Wat de bezoeker denkt:** “Dit is een coherent archief, geen eenmalige campagne.”  
**Wat hij voelt:** vertrouwen, nieuwsgierigheid naar de reeks.  
**Waarschijnlijke actie:** één of twee rijen volgen en één artworkpreview onderzoeken.

**Spanning wordt opgebouwd doordat:** de lijst compact is en de afbeelding nog aan één actieve rij gebonden blijft.  
**Spanning wordt losgelaten doordat:** de geselecteerde rij exact antwoordt met een nieuw artwork, zonder de rest in beweging te zetten.

**Zichtbare motion:** actieve marker, één catalogus-Decode en één harde cropwisseling.  
**Niet zichtbaar:** geen kaartlift, carrousel, hoverzoom of bewegende hele lijst.  
**Waarom:** snelheid zit in de opeenvolging van informatie, niet in de afstand die elementen afleggen.

## Moment 06 — Presence

**Tijd:** 00:20.60–00:27.20  
**Doel:** de menselijke aanwezigheid achter het archief voelbaar maken.  
**Emotie:** intimiteit en verbinding.  
**Waarom dit moment bestaat:** catalogusnummers geven vertrouwen, maar gezichten geven betekenis.

**Welke informatie wordt verwerkt:** drie kunstenaars, drie portretten en drie feitelijke regels.

**Wat de bezoeker denkt:** “Deze wereld wordt door echte stemmen gedragen.”  
**Wat hij voelt:** nabijheid zonder familiariteit af te dwingen.  
**Waarschijnlijke actie:** langer bij één gezicht blijven of een naam aanraken.

**Spanning wordt opgebouwd doordat:** ieder portret eerst als gecontroleerde uitsnede verschijnt.  
**Spanning wordt losgelaten doordat:** de volledige blik en naam samen beschikbaar komen.

**Zichtbare motion:** drie afzonderlijke crop-reveals en hooguit één directe Decode.  
**Niet zichtbaar:** geen beeldzoom, automatische pan, zwart-witfilter of alle portretten tegelijk.  
**Waarom:** menselijke aanwezigheid verdraagt geen effecten die de maker tot materiaal reduceren.

## Moment 07 — Pulse

**Tijd:** 00:27.20–00:33.70  
**Doel:** de stille wereld één keer hoorbaar kunnen maken.  
**Emotie:** verwachting, keuze en lichamelijke beloning.  
**Waarom dit moment bestaat:** de bezoeker moet ervaren dat Accurate Black niet alleen archiveert, maar uitzendt.

**Welke informatie wordt verwerkt:** format, sessie/show, datum, bron, duur en expliciete toestemming voor externe media.

**Wat de bezoeker denkt:** “Ik kan nu luisteren, omdat ik dat zelf kies.”  
**Wat hij voelt:** controle vóór de actie; energie na de eerste klank.  
**Waarschijnlijke actie:** play selecteren of bewust doorlopen.

**Spanning wordt opgebouwd doordat:** de progresslijn aanwezig is maar nog niets afspeelt.  
**Spanning wordt losgelaten doordat:** één bewuste actie de stilte doorbreekt.

**Zichtbare motion:** posterreveal, facade-aperture, directe play/pause en lineaire progressie.  
**Niet zichtbaar:** geen pulserende waveform, draaitafel, autoplay of providerchroom vóór toestemming.  
**Waarom:** de eerste beat moet voelen als het gevolg van een menselijke keuze, niet als opgelegde atmosfeer.

## Moment 08 — Residue

**Tijd:** 00:33.70–00:38.80  
**Doel:** de ervaring laten nagalmen en één relatiekeuze aanbieden.  
**Emotie:** ontspanning, zelfverzekerde afronding.  
**Waarom dit moment bestaat:** een premium ervaring eindigt niet met meer content, maar met ruimte om te besluiten.

**Welke informatie wordt verwerkt:** contact/follow-relatie, demo-status, routes, kanalen, privacy en identiteit.

**Wat de bezoeker denkt:** “Ik weet waar ik verder kan.”  
**Wat hij voelt:** voltooiing zonder weggeduwd te worden.  
**Waarschijnlijke actie:** contact, catalogus of menu kiezen; anders de ervaring laten eindigen.

**Spanning wordt opgebouwd doordat:** de levende progresslijn terugloopt tot één kleine Signal-markering.  
**Spanning wordt losgelaten doordat:** de laatste regel en het volledige logo uiteindelijk onbeweeglijk achterblijven.

**Zichtbare motion:** verkorting van de lijn, één heading-Resolve, minimale linkrespons.  
**Niet zichtbaar:** geen marquee, social feed, pop-up of herhaling van de logo-animatie.  
**Waarom:** de herinnering moet bij het label blijven, niet bij het laatste effect.

---

## 3. Frame storyboard — canonieke passage

### Leeswijzer

- **Tijd** is verstreken tijd sinds first paint.
- **Actie** beschrijft de waarschijnlijke menselijke impuls, niet een automatisch commando.
- **Motion** noemt altijd de totale duur en easing van de beweging die in dat frame actief wordt.
- **Stil** benoemt wat nadrukkelijk niet reageert.
- Bij een tragere of snellere bezoeker verschuift de wandkloktijd, maar nooit de interne timing van een reactie.

## Reel A — Threshold / frames 001–012

| Frame | Tijd | Gebruikersactie | Wat zichtbaar wordt / verdwijnt | Actieve motion | Wat blijft stil | Dramaturgische reden |
|---:|---:|---|---|---|---|---|
| 001 | 00:00.000 | De pagina wordt geopend. | Void is onmiddellijk aanwezig; naam, menu en hero-inhoud bestaan al maar zijn nog optisch terughoudend. | Geen cover; alleen de startstaat. | De viewport, scroll en artworkpositie. | De film begint in een bestaande ruimte, niet achter een laadgordijn. |
| 002 | 00:00.080 | De bezoeker oriënteert zich. | De eerste A van het logo vindt zijn plek. | 300 ms, `cubic-bezier(.22,1,.36,1)`, −8 px naar rust. | De rechterzijde en de hero. | Eén teken is genoeg om herkenning te starten. |
| 003 | 00:00.116 | Geen bewuste actie. | De eerste C volgt; de A is nog onderweg. | Zelfde 300 ms; 36 ms stagger. | Menucontrol en zwart vlak. | Ritme wordt gehoord zonder geluid. |
| 004 | 00:00.152 | De blik blijft linksboven. | De tweede C verschijnt. | Zelfde reveal. | Alle release-informatie. | `ACC` vormt de eerste merkhaak. |
| 005 | 00:00.180 | De blik begint naar het midden te trekken. | Een 2 px Signal-snede ontstaat waar het artwork vermoed wordt. | 160 ms fast easing. | Logoletters blijven hun eigen tempo volgen. | De film opent een tweede spanningsbron zonder aandacht te eisen. |
| 006 | 00:00.224 | Geen actie. | U en R komen in het logo; de Signal-snede is compleet. | Logo reveal, 36 ms stagger. | De snede beweegt nog niet. | Eerst identiteit, dan inhoud. |
| 007 | 00:00.296 | Geen actie. | A en T volgen; `LATEST RELEASE` wordt leesbaar vanuit 8 px lager. | Overline Resolve 420 ms, reveal easing. | Artwork blijft een naad. | De bezoeker krijgt context vóór beeld. |
| 008 | 00:00.404 | Geen actie. | E en BLACK completeren het volledige woordmerk. | Laatste logo-entry, 300 ms. | Menucontrol en cataloguscode. | Volledige herkenning krijgt een korte adem. |
| 009 | 00:00.520 | De blik keert naar de snede. | De eerste fractie artworkkleur wordt zichtbaar. | Aperture start; 620 ms hero easing. | Logo houdt zijn volledige vorm. | Kleur verschijnt pas nadat het zwart betekenis heeft gekregen. |
| 010 | 00:00.720 | Geen actie. | De opening is groot genoeg om textuur, nog niet de hele cover, te herkennen. | Aperture blijft openen. | Titel en artiest blijven bijna stil/leesbaar. | Het brein mag voorspellen vóór het antwoord komt. |
| 011 | 00:01.040 | Geen actie. | Het volledige logo heeft 400 ms stilgestaan; `URATE` begint weg te gaan. | Exit 340 ms totaal, 24 ms stagger; exit easing. | Aperturetempo verandert niet. | De merkbeweging trekt zich terug vóór zij een show wordt. |
| 012 | 00:01.380 | De eerste oriëntatie is voltooid. | BLACK sluit optisch aan op ACC; compact `ACC BLACK` blijft over. | BLACK-compressie eindigt, hero easing. | Alle andere elementen zijn stil. | De interface maakt ruimte voor het hoofdpersonage. |

## Reel B — Recognition / frames 013–025

| Frame | Tijd | Gebruikersactie | Wat zichtbaar wordt / verdwijnt | Actieve motion | Wat blijft stil | Dramaturgische reden |
|---:|---:|---|---|---|---|---|
| 013 | 00:01.400 | De blik zoekt het grootste contrast. | De aperture bereikt 64% rustbreedte; het artwork is herkenbaar maar niet volledig vrij. | Laatste 60 ms van hero easing. | Logo, menu en achtergrond. | Een gedeeltelijk beeld houdt nieuwsgierigheid vast zonder informatie te blokkeren. |
| 014 | 00:01.520 | Geen actie. | Artiestnaam en eerste titelregel bereiken definitieve scherpte. | Resolve eindigt na 480 ms. | Artwork stopt volledig. | Tekst landt nadat het oog het beeld heeft gevonden. |
| 015 | 00:01.700 | De bezoeker leest. | Tweede titelregel en de lange Hairline worden bewust waarneembaar. | Geen nieuwe motion. | Het hele frame. | Lezen heeft ongestoorde tijd nodig. |
| 016 | 00:01.880 | Geen actie. | `ACB047` begint kort als `10X`-patroon te flitsen en lost van links naar rechts op. | Decode 320 ms, max. 30 fps. | Titel, artwork en jaar. | De technische identiteit komt na de emotionele. |
| 017 | 00:02.200 | Geen actie. | Het echte catalogusnummer blijft definitief staan. | Decode stopt exact op de originele glyphs. | Alles. | Het stoppen is belangrijker dan het flikkeren: data is nu zeker. |
| 018 | 00:02.360 | De blik daalt naar de titel. | `OPEN RELEASE` en zijn korte onderlijn worden volledig aanwezig. | Utility reveal 240 ms. | Artwork blijft gedeeltelijk geopend. | De actie verschijnt pas nadat het object is begrepen. |
| 019 | 00:02.700 | De bezoeker beweegt de cursor richting artwork. | Nog niets reageert gedurende de intentiedrempel. | 70 ms bewuste stilstand. | Alle content. | Onbedoelde passages veroorzaken geen nerveuze interface. |
| 020 | 00:02.770 | De cursor blijft boven het artwork. | De aperture begint verder open te gaan; de titelregel krijgt Signal. | 280 ms hero easing; kleurwissel 160 ms fast. | Artwork zelf zoomt of verschuift niet. | De bezoeker opent het frame, niet het kunstwerk. |
| 021 | 00:02.850 | De cursor beweegt langzaam. | Contextcursor `OPEN ACB047` verschijnt nabij de handeling. | 120 ms fast easing, directe positionering. | Native content en logo. | Een fluistering bevestigt klikbaarheid zonder een tweede CTA te worden. |
| 022 | 00:03.050 | De aperture is volledig open. | De complete cover is zichtbaar; de onderlijn van `OPEN RELEASE` bereikt 100%. | Aperture en underline eindigen. | Titel, nummer, jaar en frame. | Eerste visuele beloning. |
| 023 | 00:03.240 | De bezoeker blijft kijken. | `OPEN RELEASE` Confirmt één keer via `10X` en herstelt. | Confirm 220 ms. | Het artwork blijft absoluut stil. | Alleen de actie antwoordt; het werk hoeft niets te bewijzen. |
| 024 | 00:03.460 | De cursor stopt. | Na 800 ms zonder beweging zal de contextcursor verdwijnen; nog geen verandering. | Timer, geen zichtbare motion. | Alles. | Stilstand van de mens leidt tot stilstand van het systeem. |
| 025 | 00:04.260–00:05.600 | De bezoeker bekijkt titel en cover. | De contextcursor verdwijnt; niets nieuws verschijnt. | Cursor uit in 120 ms; daarna volledige rust. | Het complete hero-frame. | Dit is de eerste lange stilte: 1,34 seconde zonder nieuwe gebeurtenis. |

## Reel C — Surrender / frames 026–032

| Frame | Tijd | Gebruikersactie | Wat zichtbaar wordt / verdwijnt | Actieve motion | Wat blijft stil | Dramaturgische reden |
|---:|---:|---|---|---|---|---|
| 026 | 00:05.600 | De bezoeker begint rustig te scrollen. | De header verlaat de topstaat; de hero blijft aanwezig. | Headerachtergrond 240 ms utility. | Artworkgrootte en catalogusnummer. | De interface erkent vertrek zonder een overgang op te leggen. |
| 027 | 00:05.760 | Scroll bereikt circa 2svh. | De laatste zwarte inset rond het artwork begint los te laten. | Bounded scroll-timeline, lineair gekoppeld binnen 0–12svh. | Geen parallax of schaal. | De eerste beweging van de bezoeker voltooit de onthulling. |
| 028 | 00:06.080 | Scroll bereikt circa 6svh. | Het artwork is voor ongeveer 82% vrij; titel beweegt nauwelijks omhoog. | Insetprogressie; titel max. −4 px. | ACB-code, jaar en artworkpixels. | De pagina wijkt, zij trekt niet. |
| 029 | 00:06.420 | Scroll bereikt 12svh. | De aperture is 100% open; titel heeft maximaal −8 px bereikt. | Scrollreactie eindigt permanent. | Vanaf nu de hele hero. | De spanning wordt volledig afbetaald. |
| 030 | 00:06.800 | De bezoeker scrollt verder. | De onderste 96 px Void komt in beeld. | Geen section reveal. | Hero-inhoud trekt alleen door natuurlijke scroll weg. | Een lege maat scheidt object van overtuiging. |
| 031 | 00:07.420 | De hero verdwijnt boven de viewport. | Eerst titel, daarna artwork verlaten het blikveld door normale scroll. | Geen aparte exit. | De nieuwe sectie blijft nog buiten beeld. | Filmische discipline: niet ieder vertrek heeft een effect nodig. |
| 032 | 00:08.300 | Scroll vertraagt bij `02`. | Alleen zwart en de eerste contour van de thesis zijn aanwezig. | Geen motion tot threshold. | Header blijft verborgen tijdens neerwaartse intentie. | De bezoeker arriveert met een leeg hoofd. |

## Reel D — Conviction / frames 033–043

| Frame | Tijd | Gebruikersactie | Wat zichtbaar wordt / verdwijnt | Actieve motion | Wat blijft stil | Dramaturgische reden |
|---:|---:|---|---|---|---|---|
| 033 | 00:08.380 | Scroll komt tot rust. | Sectie-index `02` en de vier woorden worden als één massa herkenbaar. | Groeps-Resolve start, 480 ms reveal easing. | De merkzin blijft optisch terug. | Eerst overtuiging, daarna uitleg. |
| 034 | 00:08.560 | De blik landt op `DEEP.` | Alle woorden bewegen samen, niet beurtelings. | Zelfde Resolve, maximaal 12 px. | Geen woord scramblet. | Het blok voelt als één adem, niet als vier slides. |
| 035 | 00:08.760 | De blik zakt naar `DARK.` | De typografische massa is bijna op rust. | Laatste 100 ms Resolve. | Header en achtergrond. | De bezoeker bepaalt zelf de leesvolgorde. |
| 036 | 00:08.860 | Geen actie. | De vier woorden staan definitief. | Motion stopt. | Alles gedurende 160 ms. | Korte stilte vóór betekenis. |
| 037 | 00:09.020 | De bezoeker leest verder. | De merkzin begint zichtbaar te worden. | Opacity/Resolve 420 ms, reveal easing. | De vier woorden. | Uitleg komt na het gevoel. |
| 038 | 00:09.180 | Geen actie. | `PROFOUND.` start één Decode. | Decode 320 ms. | De andere drie woorden en bodycopypositie. | Slechts één woord krijgt systeemtaal; het wordt een conclusie. |
| 039 | 00:09.500 | Geen actie. | `PROFOUND.` eindigt exact; de merkzin is volledig leesbaar. | Decode en tekstintrede stoppen. | Hele compositie. | Een helder eindpunt voorkomt digitale ruis. |
| 040 | 00:09.500–00:11.100 | De bezoeker leest de zin. | Niets verschijnt of verdwijnt. | Geen motion. | Alles. | Langste inhoudelijke stilte: de copy krijgt 1,6 seconde. |
| 041 | 00:11.100 | De bezoeker hervat de scroll. | De baseline onder `PROFOUND.` wordt merkbaar als richting naar beneden. | Hairline-uitbreiding 480 ms reveal easing. | Woorden en tekst bewegen niet. | De gedachte wordt fysiek verbonden met bewijs. |
| 042 | 00:11.720 | De onderste thesishelft passeert. | De lijn blijft achter als bovenrand van de volgende wereld. | Geen aanvullende motion. | Thesis verlaat natuurlijk de viewport. | Continuïteit zonder morph-show. |
| 043 | 00:13.200 | De cataloguskop komt volledig in beeld. | `03`, titel, reeks en `VIEW ALL` zijn tegelijk leesbaar. | Korte groeps-Resolve 420 ms. | De release-rijen wachten. | De bezoeker ziet eerst het archief als geheel. |

## Reel E — Evidence / frames 044–061

| Frame | Tijd | Gebruikersactie | Wat zichtbaar wordt / verdwijnt | Actieve motion | Wat blijft stil | Dramaturgische reden |
|---:|---:|---|---|---|---|---|
| 044 | 00:13.520 | Scroll vertraagt. | De eerste drie catalogusrijen en één artworkstage verschijnen. | Rijen als groep Resolve 420 ms; max. vijf-itemstagger 40 ms. | Artworkstage toont al de eerste cover zonder wissel. | Informatie wordt ritme, niet cascade. |
| 045 | 00:13.880 | Geen actie. | De overige rijen zijn leesbaar als één groep. | Laatste groeps-Resolve eindigt. | Kop en artwork. | De lijst is compleet voordat zij interactief wordt onderzocht. |
| 046 | 00:14.140 | De blik scant nummers omlaag. | De actieve eerste rij is net iets helderder; de 2 px Signal-marker staat vast. | Geen motion. | Alle andere rijen. | De interface geeft een vertrekpunt zonder bevel. |
| 047 | 00:14.420 | De cursor nadert rij twee. | Gedurende 70 ms gebeurt niets. | Intentiestilte. | Artwork en marker. | Menselijke beweging wordt niet direct geïnterpreteerd. |
| 048 | 00:14.490 | De cursor blijft op rij twee. | De tweede cataloguscode begint te Decode; marker verlaat rij één. | Decode 320 ms; marker 240 ms utility. | Tekst van andere rijen. | Alleen de gekozen relatie wordt levend. |
| 049 | 00:14.610 | De marker bevindt zich tussen twee rijen. | Het eerste artwork wordt langs een verticale snede bedekt. | Cropwisseling 360 ms reveal easing. | De lijst beweegt niet. | De overgang voelt als een archiefslot dat van positie verandert. |
| 050 | 00:14.850 | Het nieuwe artwork is grotendeels zichtbaar. | Oude en nieuwe cover overlappen maximaal 180 ms en scheiden dan hard. | Crop vervolgt. | Namen, titels en jaren. | Geen zachte crossfade: ieder werk behoudt zijn identiteit. |
| 051 | 00:14.970 | Geen actie. | De nieuwe code en cover zijn definitief; marker staat exact bij rij twee. | Alle motion stopt. | Hele sectie. | Beloning volgt binnen minder dan een halve seconde. |
| 052 | 00:15.100–00:16.000 | De bezoeker bekijkt het tweede artwork. | Niets nieuws. | Geen motion. | Lijst en frame. | Tweede lange rustpunt; visuele kwaliteit krijgt tijd. |
| 053 | 00:16.000 | De cursor beweegt vluchtig over rij drie. | Geen reactie door de 70 ms intentiedrempel. | Geen motion. | Artwork twee blijft actief. | Het systeem toont zelfbeheersing. |
| 054 | 00:16.180 | De cursor keert naar rij twee of verlaat de lijst. | Rij twee blijft de actieve preview zolang geen nieuwe intentie bevestigd wordt. | Geen resetanimatie. | Alles. | Geen nervositeit bij microscopische pointerbeweging. |
| 055 | 00:16.520 | De bezoeker scrollt een halve viewport. | De onderste rijen komen dichterbij; artworkstage blijft natuurlijk op zijn plaats en gaat mee. | Alleen native scroll. | Marker en coverstatus. | Geen pinning: archief blijft onderdeel van de pagina. |
| 056 | 00:17.020 | De blik scant rij vier tot zes. | Informatie blijft volledig statisch. | Geen motion. | Alles behalve viewportpositie. | Densiteit is nu de versnelling. |
| 057 | 00:17.480 | De cursor rust kort op `VIEW COMPLETE CATALOGUE`. | Onderlijn groeit van 24% naar 100%. | 180 ms fast easing; eventuele Confirm 220 ms. | Rijen en artwork. | De uitweg is duidelijk maar concurreert niet met releases. |
| 058 | 00:17.700 | De cursor verlaat de actie. | Onderlijn keert in 160 ms terug naar rust. | Fast easing. | De tekst verandert niet. | Hover eindigt sneller dan hij opent. |
| 059 | 00:18.100–00:19.000 | De bezoeker neemt de hele reeks waar. | Geen nieuw beeld. | Geen motion. | De volledige cataloguscompositie. | Een halve maat stilte voorkomt informatiemoeheid. |
| 060 | 00:19.000 | Scroll naar het einde van de sectie. | De vierkante artworkstage nadert de volgende beeldwereld. | Nog geen morph; alleen anticipatie door nabijheid. | De cover blijft vierkant. | De transformatie begint pas wanneer beide betekenissen elkaar raken. |
| 061 | 00:20.600 | De Artist-sectie bereikt de threshold. | De vierkante uitsnede begint 4:5 te worden terwijl de eerste portretcrop verschijnt. | Shape/crop reveal 480 ms, `cubic-bezier(.22,1,.36,1)`. | Catalogusrijen bewegen niet. | Werk wordt maker in één inhoudelijke snede. |

## Reel F — Presence / frames 062–076

| Frame | Tijd | Gebruikersactie | Wat zichtbaar wordt / verdwijnt | Actieve motion | Wat blijft stil | Dramaturgische reden |
|---:|---:|---|---|---|---|---|
| 062 | 00:20.760 | Scroll vertraagt. | De eerste ogen/het gekozen focal point van portret één worden zichtbaar. | Top-to-bottom crop, 520 ms reveal easing. | Naam en zin wachten 60 ms. | Menselijke herkenning begint bij blik, niet bij label. |
| 063 | 00:20.980 | Geen actie. | Meer van portret één en de artiestennaam komen vrij. | Crop vervolgt; tekst Resolve 420 ms. | Andere portretten blijven buiten aandacht. | Beeld en naam ontmoeten elkaar, niet als kaart maar als persoon. |
| 064 | 00:21.280 | Geen actie. | Portret één is volledig; naam en feitelijke regel staan vast. | Motion eindigt. | Hele eerste compositie. | De bezoeker krijgt toestemming om te blijven kijken. |
| 065 | 00:21.280–00:22.100 | De blik blijft bij het gezicht. | Niets verandert. | Geen motion. | Alles. | Portretfotografie vraagt stilte, geen hoverdrang. |
| 066 | 00:22.100 | De bezoeker scrollt verder. | Portret twee komt vanuit een andere beeldpositie in zicht. | Native scroll; reveal wacht op threshold. | Portret één blijft settled. | Afwisseling ontstaat door compositie, niet door een nieuw effect. |
| 067 | 00:22.320 | Threshold portret twee. | De gekozen ooglijn verschijnt eerst. | Crop 520 ms reveal easing. | Portret één en globale achtergrond. | De tweede mens krijgt dezelfde waardigheid, niet dezelfde show. |
| 068 | 00:22.540 | Geen actie. | Naam en regel van artiest twee lossen op naar rust. | Resolve 420 ms, 60 ms na cropstart. | Geen scramble. | Het systeem blijft herkenbaar maar niet mechanisch. |
| 069 | 00:22.840 | Geen actie. | Portret twee is compleet. | Motion stopt. | Beide gezichten. | Twee aanwezigheidspunten creëren relatie. |
| 070 | 00:23.060 | De cursor rust bewust op artiest twee. | Donkere overlay verliest 12%; actieregel wordt zichtbaar. | 240 ms utility; onderlijn 180 ms. | Het beeld zoomt niet. | De bezoeker komt dichterbij zonder dat het portret naar hem toe springt. |
| 071 | 00:23.130 | Intentie is bevestigd. | De artiestennaam Decode één keer. | 320 ms Decode. | Portret, regel en andere naam. | De systeemtaal bevestigt identiteit, niet decoratie. |
| 072 | 00:23.450 | Decode eindigt; cursor blijft. | Naam, beeld en actie zijn volledig helder. | Motion stopt. | Alles gedurende 450 ms. | Directe menselijke verbinding krijgt ademruimte. |
| 073 | 00:23.900 | Cursor verlaat het portret; scroll hervat. | Overlay keert sneller terug; actie blijft inhoudelijk vindbaar via focus/mobile. | 200 ms utility. | Naam en portretpositie. | Afscheid is zacht en kort. |
| 074 | 00:24.300 | Portret drie bereikt threshold. | Derde blik wordt met dezelfde cropgrammatica vrijgegeven. | 520 ms reveal easing. | De eerste twee portretten replayen niet. | Herhaling wordt ritueel, niet repetitie. |
| 075 | 00:24.880–00:26.200 | De bezoeker ziet de drie stemmen als reeks. | Naam en regel drie zijn settled; `VIEW ALL ARTISTS` wordt leesbaar. | Alleen action reveal 240 ms; daarna rust. | Alle portretten. | Het label voelt bevolkt zonder een profielwand te worden. |
| 076 | 00:26.200–00:27.200 | Scroll verlaat de portretten. | Een dunne Signal-lijn blijft als laatste visueel spoor en loopt de volgende zone in. | Line reveal 480 ms. | Portretten verlaten via native scroll. | Menselijkheid wordt ritme, ritme wordt transmissie. |

## Reel G — Pulse / frames 077–088

| Frame | Tijd | Gebruikersactie | Wat zichtbaar wordt / verdwijnt | Actieve motion | Wat blijft stil | Dramaturgische reden |
|---:|---:|---|---|---|---|---|
| 077 | 00:27.200 | De Transmission-zone komt in beeld. | De Signal-lijn ligt nu als stille progress track; format en titel zijn aanwezig. | Groeps-Resolve 420 ms. | De lijn beweegt niet. | Een verwachting van tijd zonder geluid. |
| 078 | 00:27.480 | Geen actie. | De poster wordt langs één zijde vrijgegeven. | Crop reveal 480 ms. | Play, datum en duur blijven leesbaar. | Beeld introduceert de uitzending zonder videotheater. |
| 079 | 00:27.960 | Geen actie. | Poster en metadata zijn compleet; `PLAY / LOAD [PROVIDER]` is helder. | Motion stopt. | De progresslijn blijft leeg. | Transparantie over de externe bron bouwt vertrouwen. |
| 080 | 00:28.100–00:28.900 | De bezoeker leest titel, datum en bron. | Niets verandert; er klinkt niets. | Geen motion. | Hele zone. | Stilte maakt de toekomstige klank voelbaar. |
| 081 | 00:28.900 | Cursor/toetsenbordfocus bereikt play. | Focus/onderlijn verschijnt; geen audio. | 160 ms fast easing. | Poster en progressie. | Keuze wordt aangeboden, niet voorspeld. |
| 082 | 00:29.060 | De bezoeker activeert play. | Label gaat direct naar `LOADING`; de facade begint vanuit de playpositie te openen. | Press 80 ms lineair; aperture 320 ms reveal easing. | Titel, datum en poster. | De handeling heeft onmiddellijk, eerlijk gevolg. |
| 083 | 00:29.180 | Provider wordt normaal geladen. | Een Signal-segment beweegt eenmaal over de eerste 30% van de track. | Max. 320 ms, utility; geen loop. | De rest van de pagina. | Korte wachttijd voelt gemeten, niet verstopt. |
| 084 | 00:29.380 | Player is gereed. | De facade is vervangen in exact dezelfde beeldruimte; playstatus wordt pause. | Aperture eindigt; state 80 ms lineair. | Alle omliggende typografie. | Geen layoutschok op het moment van toestemming. |
| 085 | 00:29.460 | De expliciete actie resulteert in geluid. | De eerste klank begint; progressie verlaat nul. | Audio progressie direct lineair; visueel geen pulse. | Poster, titel, frame en pagina. | Dit is het emotionele hoogtepunt: de bezoeker heeft de stilte zelf gebroken. |
| 086 | 00:29.460–00:31.200 | De bezoeker luistert kort. | Alleen tijd en 2 px progressie veranderen. | Lineaire functionele beweging. | Alles wat geen tijdwaarde is. | Geluid draagt de emotie; de interface trekt zich terug. |
| 087 | 00:31.200 | De bezoeker scrollt door of pauzeert. | Bij pause verandert uitsluitend het controlteken; bij doorscrollen blijft audio binnen de huidige pagina actief. | 80 ms lineair voor pause; geen sectie-exit. | Andere content. | De mens blijft regisseur van duur en stilte. |
| 088 | 00:32.000–00:33.700 | De Closing Signal nadert. | De progresslijn wordt visueel losgemaakt van de player en bereidt verkorting voor; audio blijft functioneel of is gepauzeerd. | Lijntransitie start pas bij volgende threshold. | Playerinhoud replayt niet. | De levende puls kan nu herinnering worden. |

## Reel H — Residue / frames 089–096

| Frame | Tijd | Gebruikersactie | Wat zichtbaar wordt / verdwijnt | Actieve motion | Wat blijft stil | Dramaturgische reden |
|---:|---:|---|---|---|---|---|
| 089 | 00:33.700 | De Closing Signal bereikt threshold. | De lange progresslijn trekt zich terug tot een 32 px Signal-markering bij `06`. | 320 ms utility, `cubic-bezier(.2,0,0,1)`. | Audio stopt niet automatisch; tekst wacht. | Tijd wordt een blijvend teken, niet abrupt afgebroken. |
| 090 | 00:33.900 | Geen actie. | `KEEP THE SIGNAL.` begint vanuit 12 px lager op zijn plaats te komen. | Resolve 480 ms reveal easing. | Marker en achtergrond. | De afsluitzin verschijnt nadat de beweging kleiner is geworden. |
| 091 | 00:34.380 | Geen actie. | Heading staat vast; contact/followroute wordt rustig zichtbaar. | Action reveal 240 ms. | Heading blijft onaangeraakt, geen scramble. | Relatie komt na de conclusie, niet tegelijk. |
| 092 | 00:34.620–00:35.600 | De bezoeker leest en beslist. | Demo-status en footergrens zijn zichtbaar; niets beweegt. | Geen motion. | Hele Closing Signal. | Beslissing vereist stilte. |
| 093 | 00:35.600 | Scroll bereikt footer. | Routes, kanalen en legal verschijnen als complete informatie, niet als cascade. | Eén groeps-Resolve 420 ms; max. 12 px. | Closing heading en Signal-marker. | De film schakelt van emotie naar bruikbaarheid. |
| 094 | 00:36.020 | Geen actie. | Het volledige statische Accurate Black-woordmerk komt in het onderste blikveld. | Crop/opacity 480 ms, geen letteranimatie. | Footerlinks. | Identiteit keert terug, maar herhaalt de openingsperformance niet. |
| 095 | 00:36.500–00:37.600 | De cursor raakt eventueel één route of social link. | Alleen die onderlijn/luminantie reageert; eventuele Decode duurt één keer 320 ms. | Fast 180 ms / Decode 320 ms. | Het woordmerk, andere links en pagina. | Functionaliteit blijft precies en lokaal. |
| 096 | 00:37.600–00:38.800 | De bezoeker stopt, kiest een route of verlaat de pagina. | Niets nieuws. Compacte Signal-marker, volledig woordmerk en bruikbare routes blijven achter. | Geen motion. | Alles. | De film eindigt niet met een cut, maar met een residu dat de bezoeker zelf verlaat. |

---

## 4. Insert storyboard — het full-screen menu

Deze twaalf frames vormen een onderbreking die op ieder moment kan plaatsvinden. De pagina erachter bevriest op haar actuele toestand. Na sluiten hervat zij exact waar de bezoeker was; section-reveals replayen niet.

| Frame | Relatieve tijd | Gebruikersactie | Ervaring | Actieve motion | Wat blijft stil | Waarom |
|---:|---:|---|---|---|---|---|
| 097 | +00.000 | De bezoeker activeert MENU. | De drie lijnen erkennen de actie; zwart begint vanaf de menuzijde binnen te komen. | Press 80 ms; plane 360 ms reveal easing. | De onderliggende homepage op haar actuele frame. | Het menu voelt als een nieuw zwart vlak, niet als een los paneel. |
| 098 | +00.080 | Geen actie. | De hamburger wordt een heldere sluitmarkering. | 240 ms utility. | Logo blijft compact maar begint statisch uit te zetten. | Terugkeer blijft altijd zichtbaar. |
| 099 | +00.120 | Geen actie. | De eerste routegroep komt vanuit 12 px lager in beeld. | 420 ms reveal; 36 ms stagger, max. vijf items. | Achtergrondpagina is inert. | Routes worden snel leesbaar, niet theatraal onthuld. |
| 100 | +00.180 | Geen actie. | De grote bekende menuwoordmarkering verschijnt op 14% intensiteit. | 360 ms, 98→100% schaal, reveal easing. | Routeposities. | Merkdiepte zonder leescontrast te storen. |
| 101 | +00.360 | Geen actie. | Het zwarte vlak is compleet; routes zes tot acht verschijnen als groep. | Laatste groeps-Resolve. | Alle reeds zichtbare routes. | De volledige structuur is binnen één halve seconde beschikbaar. |
| 102 | +00.420 | Focus wordt geplaatst. | De actuele/eerste route is helder gemarkeerd met `CURRENT`. | Focus direct; geen extra reis. | Andere routes Ash. | Oriëntatie vóór exploratie. |
| 103 | +00.700 | Bezoeker beweegt naar een route. | 70 ms lang gebeurt niets. | Intentiestilte. | Hele menu. | Snelle diagonale beweging veroorzaakt geen glitchregen. |
| 104 | +00.770 | Intentie blijft. | Alleen de gekozen index en label Decode; label beweegt 16 px. | 320 ms Decode; 240 ms utility. | Zeven andere routes. | Eén signaal maakt de keuze voelbaar. |
| 105 | +01.090 | Bezoeker blijft of tabt verder. | De gekozen route is volledig leesbaar; vorige route keert in 160 ms terug. | Fast exit. | Achtergrondwoordmerk. | De interface houdt geen visuele echo's vast. |
| 106 | +01.300 | Bezoeker activeert route óf sluit. | Bij routekeuze begint de zwarte plane de paginatransitie; bij sluiten verdwijnen routes als groep. | Exit 280 ms, exit easing. | De URL/actie wordt niet kunstmatig vertraagd. | Weggaan voelt sneller dan binnenkomen. |
| 107 | +01.440 | Geen actie. | Routes zijn verdwenen; woordmarkering daalt naar nul intensiteit. | 140–240 ms exit. | De zwarte plane blijft tot overgang klaar is. | Geen concurrerende aftiteling. |
| 108 | +01.580 | Sluiten is voltooid of nieuwe route opent. | Bij sluiten keert exact dezelfde homepagepositie terug; focus keert naar MENU. | Plane exit 280 ms totaal; route kan daarna aperture-openen volgens masterplan. | Alle settled homepagecontent. | De onderbreking laat geen spoor of herhaling achter. |

---

## 5. Ritme — de homepage als muziek

### Maatsoort

De ervaring voelt als een langzame, precieze 4/4-track rond 118 BPM, maar zonder hoorbare beat. Het ritme wordt gebouwd uit vier soorten maatdelen:

- **Attack:** een korte Signal-naad, Decode of cropstart.
- **Body:** het beeld of de tekst wordt herkenbaar.
- **Decay:** de beweging eindigt sneller dan zij begon.
- **Silence:** het frame blijft staan zodat betekenis kan ontstaan.

### De muzikale structuur

| Passage | Tijd | Muzikale functie | Ritmische kwaliteit |
|---|---:|---|---|
| Threshold | 0.0–1.4 s | Intro zonder kick | Kleine letterimpulsen, veel zwart |
| Recognition | 1.4–5.6 s | Eerste motief | Langzame opening, dan volledige rust |
| Surrender | 5.6–8.3 s | Break | De bezoeker bepaalt het tempo; bijna geen systeemmotion |
| Conviction | 8.3–13.2 s | Harmonische ruimte | Lang aangehouden woorden, één decodeaccent |
| Evidence | 13.2–20.6 s | Percussieve kern | Catalogusrijen, korte respons, hoogste informatiedichtheid |
| Presence | 20.6–27.2 s | Menselijke tussenlaag | Drie trage beeldademingen |
| Pulse | 27.2–33.7 s | Drop, alleen na consent | De eerste werkelijke klank is door de bezoeker veroorzaakt |
| Residue | 33.7–38.8 s | Outro | Lijn wordt markering, beweging verdwijnt |

### Stilte

De belangrijkste stiltes zijn:

- 03.46–05.60: artwork en titel blijven volledig staan;
- 09.50–11.10: de thesis wordt gelezen;
- 15.10–16.00: het gekozen catalogusartwork blijft staan;
- 21.28–22.10: het eerste portret ademt;
- 28.10–28.90: audio blijft bewust afwezig;
- 37.60–38.80: niets volgt meer.

### Versnelling

De catalogus is de snelste passage. Niet doordat de pagina sneller scrollt, maar doordat de bezoeker meer discrete feiten per seconde kan verwerken. Een enkele hoverwisseling geeft een scherpe syncope; daarna keert rust terug.

### Vertraging

De vertragingen liggen vóór betekenisvolle keuzes: vóór het volledige hero-artwork, vóór de merkzin, vóór het eerste portret en vóór play. De site vertraagt nooit nadat de gebruiker al heeft gekozen.

### Hoogtepunt

Er zijn twee verschillende climaxen:

1. **Visueel hoogtepunt, circa 03.05 s:** het hero-artwork is voor het eerst volledig vrij.
2. **Emotioneel hoogtepunt, circa 29.46 s:** de bezoeker laat zelf de eerste klank toe.

Het tweede hoogtepunt is sterker omdat het niet automatisch plaatsvindt.

### Ontspanning en einde

Na Transmission neemt de hoeveelheid motion sneller af dan de hoeveelheid informatie. De footer is bruikbaar maar niet filmisch luid. Het einde heeft geen “finale”; het heeft nagalm.

---

## 6. Attention map

De kaart beschrijft waarschijnlijk kijkgedrag bij desktopgebruik. Zij is geen opdracht aan het oog.

| Tijd | Waarschijnlijk eerste focus | Secundaire focus | Reden |
|---:|---|---|---|
| 0.0–0.4 s | Linksboven: vormend logo | Signal-naad | Het eerste hoge contrast ontstaat in de header. |
| 0.4–1.2 s | Signal-naad / eerste artworkkleur | Volledig logo | Kleur in een bijna zwart frame trekt automatisch. |
| 1.2–2.0 s | Artwork | Artiest en titel | Grootte en kleur winnen van tekst; daarna zoekt het oog betekenis. |
| 2.0–3.2 s | Titel → catalogusnummer | `OPEN RELEASE` | Lezen beweegt van groot naar klein/precies. |
| 3.2–5.6 s | Volledige artworkdetails | Titelregel | Stilstand maakt detailonderzoek waarschijnlijk. |
| 5.6–8.3 s | Artwork tijdens eerste scroll | Lege Void onderzijde | Het oog volgt het laatst vrijgegeven object tot het verdwijnt. |
| 8.3–9.5 s | `DEEP.` en volgende woorden | Sectie-index | Grote typografie bepaalt de verticale scan. |
| 9.5–11.1 s | Merkzin | `PROFOUND.` | Na het blok zoekt het oog uitleg. |
| 11.1–13.2 s | Doorlopende Hairline | Cataloguskop | De lijn trekt de blik vooruit zonder animatiepad. |
| 13.2–14.4 s | Eerste catalogusnummers | Shared artwork | Herhaalde codes vormen een scananker. |
| 14.4–15.1 s | Actieve rij | Wisselend artwork | Directe interactie verschuift aandacht naar het antwoordbeeld. |
| 15.1–17.0 s | Artwork | Rijen twee tot zes | Na beweging blijft kleur dominant; daarna hervat de scan. |
| 17.0–20.6 s | Lagere catalogusrijen | Vormovergang naar portret | Informatie leidt, daarna menselijke vorm. |
| 20.6–22.1 s | Ogen/focal point portret één | Naam | Gezichten trekken eerder aandacht dan tekst. |
| 22.1–24.0 s | Portret twee | Naam en feitelijke regel | Asymmetrie verplaatst de blik naar de andere zijde. |
| 24.0–27.2 s | Portret drie → Signal-lijn | `VIEW ALL ARTISTS` | De reeks sluit en laat één visueel spoor achter. |
| 27.2–28.9 s | Transmissiontitel en poster | Playcontrol | Context wordt vóór handeling gelezen. |
| 28.9–29.5 s | Playcontrol | Lege progresslijn | De enige duidelijke potentiële beweging trekt. |
| 29.5–31.2 s | Progresslijn/tijd | Titel | Na zelfgekozen geluid hoeft het oog niet meer te zoeken. |
| 31.2–34.4 s | Signal-lijn → Closing heading | Contactactie | De afnemende lijn stuurt naar de conclusie. |
| 34.4–36.5 s | `KEEP THE SIGNAL.` | Contact/demo-status | Grootte, daarna operationele betekenis. |
| 36.5–38.8 s | Volledig woordmerk | Routes/legale details | Identiteit sluit af; utility blijft beschikbaar. |

### Aandachtsregels

- Beweging mag nooit op twee ver uit elkaar liggende plekken tegelijk starten.
- Signal verschijnt waar de volgende betekenis ontstaat, niet waar decoratie nodig is.
- Een gezicht krijgt minimaal 800 ms zonder concurrerende motion.
- Na iedere Decode blijft het opgeloste woord minimaal 600 ms ongewijzigd.
- De header verdwijnt tijdens neerwaartse intentie zodat zij niet permanent met sectionele aandacht concurreert.

---

## 7. Emotional curve

De onderstaande schaal loopt van 1 (nauwelijks aanwezig) tot 10 (maximaal). De curve is kwalitatief: zij beschrijft de gewenste psychologische verhouding, niet biometrische zekerheid.

| Tijd | Nieuwsgierigheid | Spanning | Vertrouwen | Rust | Focus | Beloning |
|---:|---:|---:|---:|---:|---:|---:|
| 0–1.4 s | 8 | 6 | 3 | 7 | 6 | 2 |
| 1.4–3.1 s | 9 | 8 | 5 | 5 | 9 | 5 |
| 3.1–5.6 s | 7 | 3 | 7 | 8 | 9 | 9 |
| 5.6–8.3 s | 6 | 2 | 8 | 9 | 7 | 8 |
| 8.3–11.1 s | 5 | 3 | 8 | 9 | 8 | 6 |
| 11.1–15.1 s | 7 | 5 | 8 | 6 | 9 | 7 |
| 15.1–20.6 s | 8 | 4 | 9 | 6 | 9 | 8 |
| 20.6–24.0 s | 7 | 4 | 9 | 8 | 9 | 8 |
| 24.0–28.9 s | 6 | 6 | 9 | 7 | 8 | 7 |
| 28.9–31.2 s | 8 | 9→3 | 10 | 5→8 | 10 | 10 |
| 31.2–34.4 s | 5 | 2 | 10 | 9 | 7 | 9 |
| 34.4–38.8 s | 4 | 1 | 10 | 10 | 6 | 8 |

### Verloop in woorden

**Nieuwsgierigheid** stijgt onmiddellijk, piekt vóór de cover volledig open is, keert terug bij cataloguswissel en opnieuw vlak vóór play.  
**Spanning** kent twee golven: visueel bij de aperture en lichamelijk vóór zelfgekozen audio. Zij mag nergens chronisch hoog blijven.  
**Vertrouwen** groeit vrijwel zonder terugval: door heldere data, beperkte motion, eerlijke consent en voorspelbare respons.  
**Rust** is hoog aan begin en einde, daalt alleen waar de catalogus en play keuze om aandacht vragen.  
**Focus** wordt eerst door artwork, daarna door archiefdata, gezichten en audio gedragen.  
**Beloning** volgt altijd op menselijke intentie: hover opent, scroll geeft vrij, play laat horen.

---

## 8. Cognitive load

### Algemene regel

Nooit meer dan één van deze categorieën vraagt tegelijk actieve verwerking:

1. identiteit;
2. cultureel object;
3. overtuiging;
4. archiefdata;
5. menselijk gezicht;
6. mediahandeling;
7. routekeuze.

### Belasting per moment

| Moment | Tegelijk zichtbare betekenisdragers | Belasting | Regiekeuze |
|---|---:|---|---|
| Threshold | logo, menu, naad | Laag | Geen releasecopy vóór oriëntatie. |
| Recognition | artwork, artiest, titel, code, één actie | Middel | Eén release; geen description/providers. |
| Surrender | volledig artwork + verdwijnende titel | Laag | Lege 96 px Void voorkomt botsing met thesis. |
| Conviction | vier woorden + één korte zin | Laag/middel | Geen CTA of beeld. |
| Evidence | zes rijen + één beeld + één route | Hoog | Dit is bewust de enige dense passage; slechts één rij reageert. |
| Presence | per kijkmoment één portret + naam + regel | Middel | Portretten onthullen sequentieel, niet simultaan. |
| Pulse | één uitzending + play/bron/tijd | Middel | Providerinterface blijft verborgen tot keuze. |
| Residue | één relatiekeuze + footerutility | Laag → middel | Emotionele afsluiting vóór de volledige route-informatie. |

### Waar rust wordt gegeven

- vóór de bezoeker iets moet kiezen;
- na iedere grote beeldonthulling;
- rond langere copy;
- tussen menselijke portretten;
- vóór en na zelfgekozen audio;
- aan het absolute einde.

### Waar rust bewust wordt verminderd

Alleen in de catalogus. Daar mag het oog sneller schakelen omdat precisie en volume het bewijs vormen. Ook daar blijft het antwoord beperkt tot één actieve marker en één artworkstage.

### Herkenning versus herinnering

De bezoeker hoeft nooit routevolgorde, verborgen state of playergedrag te onthouden. De site laat herkenbare labels en visuele eindtoestanden staan. Scrambling vervangt tekst slechts kort op een verborgen visuele laag; semantische en kopieerbare informatie blijft stabiel.

---

## 9. Micro-moments — onzichtbare premium details

1. De eerste logoletter begint 80 ms na first paint: snel genoeg om levend, langzaam genoeg om niet als foutieve flash te voelen.
2. Het volledige logo staat 400 ms stil vóór compressie; de bezoeker ziet dus werkelijk de volledige naam.
3. BLACK eindigt optisch op vijf of zes pixels van de derde C, niet op een wiskundig maar visueel centrum.
4. De Signal-naad bestaat al vóór het artwork beweegt; oorzaak komt vóór gevolg.
5. Het artwork opent niet onmiddellijk bij een passerende cursor; 70 ms intentie voorkomt schrikkerigheid.
6. De aperture stopt zonder kleine overshoot. Het einde voelt vast, niet veerkrachtig.
7. De titel landt een fractie vóór het catalogusnummer Decode; betekenis komt vóór administratie.
8. Scrambling stopt exact op de oorspronkelijke glyphs en laat geen afwijkende letterspacing achter.
9. De contextcursor verdwijnt na 800 ms stilstand, zodat kijken weer belangrijker wordt dan klikken.
10. De contextcursor wordt nooit tussen het oog en het belangrijkste artworkdetail geplaatst.
11. De hero-onderlijn wordt alleen Signal tijdens echte intentie en valt daarna snel terug naar Hairline.
12. De eerste scroll voltooit het artwork maar vergroot het niet; onthulling voelt als toestemming, niet als zoom.
13. De laatste 96 px van de hero bevatten geen label, pijl of “scroll”-hint.
14. De vier thesiswoorden bewegen als één adem, zodat geen woord hiërarchisch per ongeluk belangrijker wordt.
15. Alleen `PROFOUND.` Decode; het systeem kiest een conclusie in plaats van vier effecten.
16. De thesislijn wordt pas langer wanneer de bezoeker verdergaat; zij anticipeert niet op iemand die nog leest.
17. Een vluchtige beweging over een catalogusrij verandert het artwork niet.
18. De catalogusmarker passeert de ruimte tussen rijen vloeiend, maar het artwork wisselt met een harde crop; navigatie en inhoud hebben verschillend materiaal.
19. Oude en nieuwe cover bestaan maximaal 180 ms tegelijk; geen modderige dubbele afbeelding.
20. Wanneer een tweede preview eenmaal rustig staat, blijft zij actief bij vluchtige pointerexit; de site springt niet terug naar “default”.
21. Een portret reveal begint bij het gecureerde focal point, meestal de ooglijn, niet automatisch bij de bovenrand van het bestand.
22. De artiestennaam verschijnt 60 ms na het portret, precies genoeg om eerst een mens en daarna een label te zien.
23. De portretoverlay vermindert maar twaalf procent; het bronbeeld wordt niet van grauw naar commercieel glanzend getransformeerd.
24. Bij pointerleave keert een artiststate sneller terug dan hij verscheen; de bezoeker voelt geen kleverige hover.
25. De derde portretreveal herhaalt geen eerder effect elders; settled portretten blijven definitief rustig.
26. De Signal-lijn uit de artistpassage arriveert op exact dezelfde hoogte als de toekomstige audioprogressie.
27. De lege audiolijn beweegt niet alsof er al iets speelt.
28. De playtekst noemt de provider vóór activering; toestemming wordt niet verstopt in een elegante knop.
29. Bij provider-load blijft de hele tekstcompositie staan; alleen de controleruimte opent.
30. De eerste beat heeft geen visuele pulse. Het oor krijgt het moment alleen.
31. Audio-progressie loopt zonder easing achter de echte tijd; mooie vertraging zou onwaar zijn.
32. Pause verandert binnen 80 ms maar laat poster, titel en tijd onaangeraakt.
33. De lange progresslijn wordt bij het slot niet uitgefade maar teruggebracht tot één 32 px residu.
34. De Closing heading begint pas wanneer de lijn bijna klaar is; twee afsluitende gebaren spreken niet tegelijk.
35. Footerlinks verschijnen als een complete bruikbare set, niet als een finale staggerprestatie.
36. Het volledige footerlogo speelt de intro niet opnieuw; identiteit hoeft zichzelf niet te applaudisseren.
37. Een linkunderline keert 20 ms sneller terug dan hij opent, wat interacties responsief laat eindigen.
38. Focusrestauratie na het menu brengt de bezoeker naar exact dezelfde trigger en dezelfde scrollcontext.
39. Bij reduced motion staat ieder element al in zijn betekenisvolle eindstaat; er is geen “mindere film”, alleen een andere montage.
40. Wanneer niets laadt of beweegt, blijft zwart `#080808` en geen absoluut zwart: de ruimte behoudt materiaal zonder zichtbaar effect.

---

## 10. Negative space — waar niets gebeurt

### De bovenste zwarte zone rond de hero

Hier verschijnt geen slogan, scrollindicator of ambient texture. De bezoeker heeft ruimte nodig om het kleine logo en de Signal-naad als twee afzonderlijke tekens te herkennen.

### Rondom de gedeeltelijke cover

Geen stof, grid-overlay, lichtgloed of particles. De lege zwarte ruimte maakt de aperture werkelijk een opening; decoratie zou haar tot een effectlaag reduceren.

### Tussen volledige hero en thesis

De laatste 96 px blijven leeg. Dit is de harde redactionele punt na de release. Zonder deze ruimte zou de labeltekst klinken als copy die op de cover is geplakt.

### Binnen de thesis

Geen beeld en geen CTA. De bezoeker verwerkt hier voor het eerst taal zonder tegelijkertijd een productbeslissing te hoeven nemen.

### Na een catalogue previewwissel

Minimaal 900 ms geen nieuwe automatische motion. De cover is inhoud, geen overgangsmateriaal.

### Tussen portretten

De verticale afstanden zijn geen “lege gaten” die gevuld moeten worden. Zij voorkomen dat drie mensen als één campagnebeeld of een rostergrid worden gelezen.

### Voor play

Er is absolute audiostilte en de progresslijn staat op nul. Geen previewbeat, waveform of pulserende indicator mag de keuze alvast simuleren.

### In Closing Signal

Na het terugtrekken van de lijn is er een fractie waarin de heading nog niet komt. Daardoor voelt de markering als residu van de vorige passage, niet als decoratie van de volgende.

### Na het laatste frame

Er is geen automatische terugkeer naar boven, geen menu-aanmoediging, nieuwsbriefpopup of logoherhaling. De bezoeker mag de ervaring onbeantwoord laten.

### Waarom stilte essentieel is

Stilte bewijst vertrouwen. Een label dat gelooft in zijn selectie hoeft niet ieder leeg vlak te activeren. Bovendien geeft negatieve ruimte de korte motiongebaren een duidelijke aanloop en uitklank. Zonder niets kan geen enkel iets bijzonder voelen.

---

## 11. Awwwards jury review

## Waarom dit Site of the Day kan verdienen

1. **Conceptuele samenhang:** zwart, aperture, cataloguscode en Decode zijn één gedachte, geen verzameling trends.
2. **Art direction boven techniek:** het artwork en de artiesten blijven protagonist; technologie is onzichtbare regie.
3. **Zeldzame motiondiscipline:** de ervaring durft secondenlang volledig stil te staan.
4. **Eigen interactie-DNA:** de bestaande Accurate Black-logo- en scramblingtaal wordt herkenbaar volwassen.
5. **Menselijke causatie:** de belangrijkste beloningen volgen op echte intentie; vooral de eerste klank.
6. **Toegankelijk alternatief zonder conceptverlies:** reduced motion, keyboard en consent tonen dat inclusie niet als nabewerking is bedacht.
7. **Performance als esthetiek:** één beeld, één signaal en geen technisch spektakel maken snelheid onderdeel van luxe.

## Waarom misschien niet

1. Een verticale aperture en asymmetrische portretten bestaan ook in hedendaagse fashion/editorial sites.
2. `DEEP. DARK. AUTHENTIC. PROFOUND.` kan zonder uitzonderlijke copy en timing generiek merkmanifest voelen.
3. De site is sterk afhankelijk van de kwaliteit en consistentie van echte cover- en portretassets.
4. De ervaring is bewust technisch terughoudend; een jury die innovatie gelijkstelt aan WebGL of spatial interaction kan haar te veilig vinden.
5. Zonder perfecte uitvoering van eindeasing, tekstmeting en responsiviteit wordt minimalisme snel “veel zwart met grote letters”.

## Welke onderdelen zijn nog te veilig

- De eerste presentatie van de thesis is formeel bekend: grote woorden plus korte statementcopy.
- De artistpassage gebruikt een mode-editorial sequentie die zonder precieze blikregie vertrouwd kan ogen.
- De Closing heading kan als een klassieke grote-footer-CTA worden gelezen.
- De catalogue list is inhoudelijk sterk, maar haar filmische gedrag kan te functioneel worden als de cropwisseling geen eigen materialiteit krijgt.

## Welke onderdelen kunnen generiek voelen

- Groot off-white type op zwart.
- Een cursorlabel boven artwork.
- Een gedeelde image preview naast een lijst.
- Asymmetrische portretten.
- Een groot woordmerk in de footer.

Deze elementen worden alleen niet-generiek wanneer zij zich exact aan Accurate Black-data, timing en stilte verbinden.

## Waarschijnlijke kritiek van Active Theory

Active Theory zou kunnen zeggen dat het systeem weliswaar extreem verzorgd is, maar dat de digitale ruimte weinig werkelijk transformeert. De pagina gebruikt geen generatieve of ruimtelijke techniek en de bezoeker beïnvloedt vooral onthulling, niet de wereld zelf. Hun scherpste vraag zou zijn: “Wat kan alleen digitaal, buiten soepel maskeren?”

Het antwoord moet niet alsnog WebGL zijn. Het digitaal specifieke zit in de realtime relatie tussen menselijke intentie, catalogusstate, consent en een variabel artworksignaal. Als die stateovergangen niet voelbaar precies zijn, blijft de kritiek terecht.

## Waarschijnlijke kritiek van Apple

Apple zou streng zijn op drie punten:

- de custom hero-cursor mag de native aanwijzer nooit functioneel vervangen;
- scrambling mag tekstherkenning en VoiceOver nooit verstoren;
- het hide-on-scroll headergedrag moet onmiddellijk omkeerbaar en voorspelbaar blijven.

Apple zou de duidelijke focus, reduced motion, expliciete consent en afwezigheid van autoplay waarschijnlijk waarderen. Hun kernvraag: voelt ieder detail vanzelfsprekend nadat je het één keer hebt gezien?

## Waarschijnlijke kritiek van Dieter Rams

Rams zou vragen of de logo-intro, Decode en page transitions werkelijk nodig zijn. Zijn vermoedelijke advies: verwijder ieder gebaar dat de informatie niet helderder maakt.

De verdediging is beperkt en toetsbaar:

- logo-intro communiceert de bestaande merktransformatie;
- Decode markeert state-resolution;
- aperture communiceert onthulling;
- de rest blijft stil.

Zodra een effect buiten die drie functies verschijnt, heeft Rams gelijk en moet het weg.

## Waarschijnlijke kritiek van John Maeda

Maeda zou de balans onderzoeken tussen simplicity en meaningful complexity. De homepage lijkt eenvoudig, maar de gedragscode is nauwkeurig. Zijn kritiek zou zijn dat te veel verborgen regels de ervaring voor makers complex kunnen maken zonder dat de bezoeker extra betekenis voelt.

Daarom moet het team niet elk micro-moment als zelfstandig systeem bouwen. Voor de bezoeker bestaan slechts vier waarneembare principes: zwart houdt tegen, het frame opent, data lost op en gekozen geluid beweegt de lijn.

---

## 12. Aanscherpingspass — alleen waar de juryreview onvoldoende onderscheid zag

Onderstaande correcties vervangen de genoemde frame-intenties. De vaste homepageopbouw, content, timingsystemen en bron-documenten veranderen niet.

## 12.1 Thesis: van bekende manifesto-layout naar één adem

**Probleem:** grote merkwoorden op zwart kunnen generiek voelen.  
**Aanscherping:** de vier woorden worden niet als vier afzonderlijke helden behandeld. Ze verschijnen als één reeds bestaande tekstmassa die slechts twaalf pixels naar rust komt. De bezoeker ontdekt de woorden zelf van boven naar beneden. Alleen `PROFOUND.` Decode nadat het oog daar waarschijnlijk is aangekomen.

**Vervangt/versterkt frames:** 033–040.  
**Beslisregel:** geen extra stagger, accentkleur, outline, woord-voor-woordopacity of scrollreactie toevoegen. De bijzonderheid is de moed om na de Decode 1,6 seconde niets te doen.

## 12.2 Catalogue: crop krijgt fysieke herkomst

**Probleem:** een shared preview naast een lijst kan een bekend interactiepatroon zijn.  
**Aanscherping:** iedere artworkwisseling begint exact op de horizontale baseline van de nieuw actieve catalogusrij. De crop lijkt daardoor niet uit een willekeurige beeldrand te komen, maar uit het gekozen archiefrecord. De marker bereikt de rij 80 ms vóór de cover volledig wisselt.

**Vervangt/versterkt frames:** 048–051.  
**Beslisregel:** het artwork mag nooit eerder “raden” welke rij gekozen wordt. De menselijke intentie, code en marker gaan vóór beeld.

## 12.3 Artist Roster: menselijke blik vóór modecompositie

**Probleem:** asymmetrische portretten zijn op zichzelf niet onderscheidend.  
**Aanscherping:** ieder portret wordt gecureerd op een exact focal point. De crop maakt eerst een herkenbare ooglijn of, als het beeld geen direct gezicht toont, het belangrijkste menselijke gebaar vrij. Naam volgt 60 ms later. De asymmetrie wordt pas secundair waargenomen.

**Vervangt/versterkt frames:** 062–075.  
**Beslisregel:** als een bronportret geen betekenisvol focal point of voldoende rechten/kwaliteit heeft, wordt het niet door motion “gered”; een neutralere state is eerlijker.

## 12.4 Closing Signal: geen finale CTA-pose

**Probleem:** een grote slotslogan en footerwoordmerk kunnen generiek premium-fashion voelen.  
**Aanscherping:** de progresslijn trekt volledig terug vóór de heading binnenkomt. De heading staat vervolgens snel en blijft stil; de relatieactie wordt visueel kleiner behandeld dan de heading en nooit magnetisch. Het footerlogo verschijnt pas wanneer utilitylinks al bruikbaar zijn.

**Vervangt/versterkt frames:** 089–096.  
**Beslisregel:** geen marquee, schaalanimatie, gigantische cursor of tweede slogan. Het laatste bijzondere moment is het verdwijnen van beweging.

## 12.5 Hero cursor: een tijdelijke fluistering

**Probleem:** custom cursors zijn een herkenbaar Awwwards-motief.  
**Aanscherping:** de contextcursor bestaat alleen tijdens actieve beweging boven artwork en verdwijnt na 800 ms stilstand. De native cursor en zichtbare CTA blijven volledig functioneel.

**Vervangt/versterkt frames:** 021–025.  
**Beslisregel:** als testing laat zien dat de cursor aandacht van artwork wegtrekt, wordt hij verwijderd zonder enige andere compensatie. De aperture blijft het concept dragen.

## 12.6 Digitale eigenheid zonder technologisch theater

**Probleem:** de ervaring zou als “perfect uitgevoerd editorial” maar niet specifiek digitaal kunnen worden beoordeeld.  
**Aanscherping:** benadruk in uitvoering de causale keten:

1. menselijke intentie wordt na 70 ms erkend;
2. `10X` resolve bevestigt welke data actief is;
3. de geselecteerde data bepaalt de bron en Signal-state;
4. alleen dan wordt het beeld of geluid vrijgegeven;
5. na menselijke stilstand stopt de interface eveneens.

Dit is geen nieuwe animatie. Het is de montagewet achter frames 019–023, 047–051, 070–072 en 081–085.

### Eindjury na aanscherping

De homepage verdient een nominatie wanneer de uitvoering de stiltes daadwerkelijk bewaart en geen extra effectlaag toevoegt. Zij verdient Site of the Day wanneer drie dingen tegelijk lukken:

1. de hero-aperture voelt onlosmakelijk verbonden met ACB-data en artwork;
2. de eerste zelfgekozen klank voelt als het emotionele antwoord op dertig seconden visuele discipline;
3. de ervaring blijft even coherent met reduced motion en keyboard als met pointer en volledige motion.

Als één van deze drie ontbreekt, blijft het een uitzonderlijk verzorgde labelsite maar geen uitzonderlijke digitale ervaring.

---

## 13. Alternatieve montages zonder nieuwe creatieve beslissingen

## Snelle bezoeker — circa 25 seconden

- Hero krijgt minimaal zijn eigen 940 ms entree; de bezoeker kan daarna direct scrollen.
- Section-reveals verkorten niet intern, maar worden door sneller scrollen minder lang bekeken.
- Settled content replayt niet wanneer thresholds snel achter elkaar worden gepasseerd.
- Audio wordt waarschijnlijk niet gekozen; het emotionele hoogtepunt verschuift naar het volledig geopende artwork.
- Closing Signal blijft nog steeds minimaal één rustige eindseconde staan.

## Langzame bezoeker — 45 seconden of langer

- Geen idle animatie vult extra tijd.
- Contextcursor verdwijnt; artwork, thesis, portretten en footer blijven stil.
- De site beloont langer kijken met detail in de echte assets, niet met extra systeemgedrag.
- Audio kan langer spelen; alleen echte progressie verandert.

## Mobile montage

- Het logo en de eerste hero-timing blijven gelijk.
- De aperture opent horizontaal; het emotionele verloop verandert niet.
- Er is geen contextcursor of hover-intentie. Touch opent routes rechtstreeks; sectionele reveals ontstaan alleen bij eerste zichtbaarheid.
- Catalogue wordt een sequence van vier plates. Het ritme is daardoor langzamer en beeldgerichter; er is geen rapid previewpassage.
- Portretten staan lineair, met dezelfde 60 ms relatie tussen focal point en naam.
- De totale gemiddelde passage mag dichter bij 45 seconden liggen door de langere verticale afstand.

## Reduced-motion montage

- Compact logo, volledig artwork en settled tekst zijn vanaf het begin zichtbaar.
- Geen aperture-, crop-, Resolve-, Decode-, cursor- of sectiontransition.
- Native scroll vormt de volledige montage.
- Hover/focus gebruikt alleen kleur, lijn en zichtbare focus.
- Audio blijft stil tot play en progressie blijft functioneel.
- De emotionele curve wordt gedragen door informatievolgorde, artwork, negatieve ruimte en menselijke keuze; niet door beweging.

## Trage provider of fout

- Na 300 ms blijft `LOADING` stabiel en eerlijk staan.
- Er is geen herhalende scramble of spinnerperformance.
- Bij fout blijven titel, datum en poster bestaan; een externe luisterroute verschijnt.
- Het filmische ritme stopt niet voor een externe dienst. De bezoeker kan doorgaan naar Closing Signal.

---

## 14. Definitieve regieregels voor productie

1. Geen beweging toevoegen die niet in de 108 frames of de vaste masterplanstates voorkomt.
2. Geen interne timing verlengen om de site “luxer” te laten voelen.
3. Geen scrollpositie manipuleren om de tijdcodes af te dwingen.
4. Geen sound design vóór een expliciete playactie.
5. Geen twee primaire motionevents tegelijk binnen één viewport.
6. Na iedere Decode blijft de echte tekst staan; nooit loopen.
7. Bij twijfel tussen motion en stilte wint stilte.
8. Bij twijfel tussen effect en artwork wint artwork.
9. Bij twijfel tussen cinematic timing en directe bediening wint bediening.
10. Bij reduced motion wordt niets vervangen door een ander decoratief effect.
11. De frame-tijdcodes beschrijven menselijk ritme; functionele respons blijft altijd direct.
12. Het einde blijft open. Geen automatische volgende scène.

---

## 15. Slotbeeld

Het laatste beeld is geen zwart scherm.

De volledige naam Accurate Black staat stil. De kleine Signal-markering herinnert aan de releasekleur waarmee de ervaring begon. Routes zijn bruikbaar, maar vragen niet om aandacht. Als de bezoeker eerder play koos, kan er nog geluid zijn; als hij dat niet deed, blijft de volledige passage stil.

In beide gevallen eindigt dezelfde gedachte:

> Het label heeft niets opgedrongen. Het heeft precies genoeg vrijgegeven om gekozen te worden.

Dit storyboard sluit Phase 3 af. Er wordt geen code geschreven voordat de gebruiker het expliciet goedkeurt.
