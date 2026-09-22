# Sunray Contracting Miami — brend i dizajn sistem

Izvučeno iz Wix teme starog sajta (CSS varijable `--color_*`).

## Paleta boja

### Brend akcenti — ovo prenosimo
| Uloga | HEX | RGB | Napomena |
|---|---|---|---|
| **Akcent — žuto/lime** | `#EAEE7C` | 234,238,124 | `--color_42` — "sunray" akcent, glavna prepoznatljiva boja |
| **Akcent — tamnozelena** | `#0B5218` | 11,82,24 | `--color_43` — sekundarni akcent |

Žuta i tamnozelena su jedine dve boje koje nisu Wix default — one nose brend i vezuju se za logo.

### Neutralne (tekst / pozadine)
| HEX | RGB | Uloga |
|---|---|---|
| `#FFFFFF` | 255,255,255 | pozadina, tekst na tamnom |
| `#FBFBFB` | 251,251,251 | vrlo svetla pozadina |
| `#F7F7F7` | 247,247,247 | svetla sekcija |
| `#0C0C0D` | 12,12,13 | primarni tekst / crna |
| `#19191E` | 25,25,30 | tamna pozadina sekcije |
| `#868686` | 134,134,134 | sekundarni tekst |
| `#E2E2E2` | 226,226,226 | linije / borderi |

### Topla smeđa skala (Wix paleta 2)
`#12110F` · `#252127` (37,33,31) · `#37322E` (55,50,46) · `#81756C` (129,117,108) · `#C1BAB5` (193,186,181)

### Hladna siva skala
`#424250` (66,66,80) · `#6C6C81` (108,108,129) · `#9C9CAC` (156,156,172) · `#CDCDD6` (205,205,214)

> Puna lista svih 46 CSS varijabli: `raw/css-vars.txt`

---

## Tipografija — bira se iznova

**Novi sajt ide na potpuno nove fontove.** Stari sajt je koristio Gilroy (komercijalan, licenciran preko Wix-a)
i Helvetica W01 — ništa od toga se ne prenosi. Zapisano samo kao istorijski podatak.

Pri izboru para fontova vredi imati u vidu karakter firme: građevina, 20+ godina iskustva,
South Florida, pozicionirani kao premium renovation ("precision and purpose"). Dakle nešto sa težinom
i poverenjem, ne lepršavo.

Praktični kriterijumi za izbor:
- **Besplatna komercijalna licenca** (Google Fonts / SIL OFL) — da se izbegne Gilroy situacija
- **Dovoljno težina** — minimum 400/600/700, jer naslovi na starom sajtu idu u velikom uppercase-u
- **Dobra čitljivost na malim veličinama** — kontakt podaci, radno vreme, lista usluga
- **Podrška za latinicu proširenu** — ako se ide i na španski (Miami tržište)

---

## Logo

| Fajl | Dimenzije | Opis |
|---|---|---|
| `assets/logo/sunray-logo-inverted-800x600.png` | 800×600 | Glavni logo, inverted color varijanta. Header i futer na svim stranicama. |
| `assets/logo/favicon.ico` | 16×16 | **Wix default favicon, NIJE brendiran** — treba napraviti novi |

Logo se vidi i na fotografiji izloga: `assets/about/storefront-logo-signage-1500x1000.png` (1500×1000)
— korisno kao referenca za pun oblik i boje logotipa.

> Logo je samo 800×600 PNG (5 KB, colormap). **Za novi sajt treba SVG ili vektorski original** —
> traži od klijenta `.ai` / `.svg` / `.eps`. Ako ga nema, vektorizuj sa storefront fotografije.

---

## Vizuelni jezik zatečenog sajta

- Tamne hero sekcije sa fotografijom preko cele širine + preklopljen tekst
- Grid kartica za usluge (4 kolone), svaka slika + naziv ispod
- Dosta belog prostora, velika uppercase tipografija za naslove
- Akcenat žutom (`#EAEE7C`) na CTA elementima
