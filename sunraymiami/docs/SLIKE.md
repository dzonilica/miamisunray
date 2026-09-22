# Inventar slika — 10 upotrebljivih fajlova

Wix stock slike su **uklonjene** (15 fajlova, 104 MB). Ostalo je samo ono što se sme koristiti bez Wix licence.
Sve su skinute kao **originali**, bez Wix `crop`/`fill` transformacija — dakle u najvećoj dostupnoj rezoluciji.

Sortirano po nameni: `assets/` · Backup sa originalnim Wix imenima: `images/`

---

## Klijentove sopstvene slike (6) — vlasništvo klijenta

Wix media prefiks `1b4013_` = upload sa klijentovog naloga.

| Fajl | Dimenzije | Veličina | Gde se koristi |
|---|---|---|---|
| `logo/sunray-logo-inverted-800x600.png` | 800×600 | 0.005 MB | Header + futer, sve stranice |
| `about/storefront-logo-signage-1500x1000.png` | 1500×1000 | 1.45 MB | About |
| `about/sunray-2.jpg` | 1920×1280 | 0.24 MB | About |
| `contact/company-door-3d.jpeg` | 1500×1072 | 0.39 MB | Contact |
| `hero/financing-envelope-in-hand.png` | 1979×1440 | 1.63 MB | Home, Financing sekcija |
| `payments/credit-cards.jpg` | 1400×1400 | 0.07 MB | Payments |

## Unsplash (4) — slobodna licenca

Wix media prefiks `nsplsh_` = Unsplash preko Wix-a. Unsplash licenca dozvoljava komercijalnu upotrebu bez atribucije.

| Fajl | Dimenzije | Veličina | Usluga | Autor (iz alt teksta) |
|---|---|---|---|---|
| `services/custom-homes.jpg` | 4500×3000 | 2.69 MB | Custom Homes | R ARCHITECTURE |
| `services/roofing.jpg` | 6016×4016 | 2.60 MB | Roofing | Ryunosuke Kikuno |
| `services/concrete-work.jpg` | 4936×3295 | 3.78 MB | Concrete work | Erik Mclean |
| `services/excavation.jpg` | 6000×3376 | 4.31 MB | Excavation | Samuel Horn af Rantzien |

**Ukupno: 10 fajlova, ~17 MB.**

---

## Šta nedostaje — 12 od 16 usluga nema sliku

Uklanjanjem Wix stocka ostale su bez fotografije:

Impact Door & Windows · Solar · Full Demolitions · Pool · Painting · Driveway · Insulation · Additions · Air Conditioning · Ducts · Commercial Build-outs · Permits & Engineering

Takođe nema više ni **hero slike za Home** (bile su dve Wix stock), ni Instagram ikone (uzeti iz svog icon seta — Lucide, Phosphor, Simple Icons).

> **Preporuka:** tražiti od klijenta fotografije stvarnih projekata za ovih 12 usluga.
> Za građevinsku firmu su fotke realnih radova ubedljivije od stocka — i rešavaju pitanje licence.
> Ako klijent nema svoje za neku uslugu, Unsplash i Pexels su besplatna dopuna.

---

## Optimizacija pre postavljanja

Nijedna slika nije optimizovana — najveća je 4.31 MB (`excavation.jpg`, 6000×3376).
Za novi sajt: konvertuj u **WebP/AVIF**, generiši responsive varijante (400/800/1600px), lazy-load ispod preloma.
Ovih 17 MB se realno svodi na ispod 1.5 MB bez vidljivog gubitka kvaliteta.

## Vraćanje obrisanih fajlova

Ako ipak zatrebaju, svi Wix media ID-ovi su sačuvani u `raw/media-ids.txt`.
Original se skida sa: `https://static.wixstatic.com/media/<ID>`
