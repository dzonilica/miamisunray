# Sunray Contracting Miami — kompletan sadržaj sajta

Izvor: https://www.sunraymiami.com/ (Wix sajt) · Preuzeto: 13.09.2026. · Sitemap lastmod: 03.04.2026.

---

## Osnovni podaci o firmi

| Polje | Vrednost |
|---|---|
| Naziv | Sunray Contracting Miami |
| Delatnost | Licencirana i osigurana građevinska / renovation firma |
| Područje rada | South Florida (Miami i okolina) |
| Email | info@sunraymiami.com |
| Telefon | (786) 928-5140 |
| Instagram | https://www.instagram.com/sunraymiami/ |
| Iskustvo | Preko 20 godina |
| Copyright u futeru | © 2023 by Sunray Contracting Miami |
| Fizička adresa | **Nije navedena nigde na sajtu** |

### Radno vreme
| Dan | Vreme |
|---|---|
| Pon – Pet | 8:00 – 20:00 |
| Subota | 9:00 – 19:00 |
| Nedelja | zatvoreno |

---

## Struktura navigacije

Glavni meni (isti na svim stranicama):
`Home` · `Services` · `Payments` · `Contact` · `About` · `More`

| Stranica | URL putanja | `<title>` |
|---|---|---|
| Home | `/` | Home \| Sunray Contracting M |
| Services | `/services-3` | Services \| Sunray Contracting M |
| Payments | `/general-4` | Payments \| Sunray Contracting M |
| Contact | `/contact-4` | Contact \| Sunray Contracting M |
| About | `/about-3` | About \| Sunray Contracting M |
| Get a quote | `/book-online` | Get a quote \| Sunray Contracting M |

> URL-ovi su Wix auto-generisani (`-3`, `-4`, `general-4`). Za novi sajt koristi čiste:
> `/`, `/services`, `/payments`, `/contact`, `/about`, `/quote` — i postavi 301 redirekcije sa starih.

---

## 1. HOME (`/`)

**Hero**
- Nadnaslov: `WELCOME TO`
- Naslov: `SUNRAY CONTRACTING MIAMI`
- Podnaslov: `South Florida's leaders in renovation - reimagining your home with precision and purpose.`
- CTA dugme: `LEARN MORE`

**Sekcija: FINANCING**
- Naslov: `FINANCING`
- Uvod: `Convenient, hassle-free financial solutions to repair and upgrade your home!`
- Lista benefita:
  - $0 down payment
  - Approval NOT based on credit score
  - Quick and simple application
  - Affordable payments
  - No payments for up to 17 months
  - Repay over time as part of your property taxes

**Sekcija: ABOUT US**
- Naslov: `ABOUT US`
- Tekst: Firma se predstavlja kao potpuno licencirana i osigurana contracting firma u South Floridi; tim sertifikovanih profesionalaca koji radi i velike i male projekte; naglašava posvećenost kvalitetu i zadovoljstvu klijenata; poziva na besplatnu procenu (complimentary quote).
- *(Doslovan tekst: `docs/TEXT_index.txt`)*

**Sekcija: SERVICES** — lista na početnoj (17 stavki + "& much more!"):
Solar · Fence · Roofing · Landscaping Design · Impact windows & doors · Full Demolition · Painting (Interior & Exterior) · Concrete · Pool · Driveway · AC & Ducts · Additions · Insulation · Excavation · Commercial Projects · Engineering · Interior Design

**Futer** (identičan na svim stranicama): logo + `SUNRAY CONTRACTING MIAMI` · `info@sunraymiami.com` · Instagram ikona · `© 2023 by Sunray Contracting Miami`

---

## 2. SERVICES (`/services-3`)

Naslov: `Services`. Grid od **16 kartica**, svaka sa slikom:

| # | Usluga | Slika |
|---|---|---|
| 1 | Custom Homes | `assets/services/custom-homes.jpg` |
| 2 | Impact Door & Windows | — **treba nova** (Wix stock uklonjen) |
| 3 | Solar | — **treba nova** (Wix stock uklonjen) |
| 4 | Roofing | `assets/services/roofing.jpg` |
| 5 | Full Demolitions | — **treba nova** (Wix stock uklonjen) |
| 6 | Pool | — **treba nova** (Wix stock uklonjen) |
| 7 | Painting | — **treba nova** (Wix stock uklonjen) |
| 8 | Concrete work | `assets/services/concrete-work.jpg` |
| 9 | Driveway | — **treba nova** (Wix stock uklonjen) |
| 10 | Insulation | — **treba nova** (Wix stock uklonjen) |
| 11 | Additions | — **treba nova** (Wix stock uklonjen) |
| 12 | Air Conditioning | — **treba nova** (Wix stock uklonjen) |
| 13 | Ducts | — **treba nova** (Wix stock uklonjen) |
| 14 | Excavation | `assets/services/excavation.jpg` |
| 15 | Commercial Build-outs | — **treba nova** (Wix stock uklonjen) |
| 16 | Permits & Engineering | — **treba nova** (Wix stock uklonjen) |

> **Slike:** Wix stock je uklonjen, pa 12 od 16 usluga nema fotografiju. Ostale su samo 4 sa Unsplasha (slobodna licenca). Detalji: `docs/SLIKE.md`.

> **Napomena:** lista na Home (17 stavki) i lista na Services (16 stavki) se **ne poklapaju**.
> Samo na Home: `Fence`, `Landscaping Design`, `Interior Design`. Samo na Services: `Custom Homes`, `Permits & Engineering`.
> Na Home je `AC & Ducts` jedna stavka, na Services su razdvojene. Uskladi na novom sajtu.

---

## 3. PAYMENTS (`/general-4`)

- Naslov: `Payments`
- `Secure payments with Square`
- `We accept all types of credit cards`
- `100% secure checkout`
- Slika: `assets/payments/credit-cards.jpg`

> Integracija ide preko **Square**. Na novom sajtu treba novi Square payment link / Web Payments SDK.

---

## 4. CONTACT (`/contact-4`)

- Naslov: `Contact Us`
- Podnaslov: `Have a project in mind? Lets get started.` *(fali apostrof — `Let's`)*
- Email: `info@sunraymiami.com`
- Telefon: `(786) 928-5140`
- Radno vreme (vidi gore)
- Slika: `assets/contact/company-door-3d.jpeg`

**Kontakt forma** — polja: `First Name`, `Last Name`, `Email`, `Message` + dugme `Send`
Poruka nakon slanja: `Thanks for submitting!`

> Forma je Wix-ova. Na novom sajtu treba backend/servis (Formspree, Resend, vlastiti endpoint) + spam zaštita.
> Telefon nigde nije `tel:` link — dodaj klikabilan broj.

---

## 5. ABOUT (`/about-3`)

- Nadnaslov: `More than 20 years of experience`
- Naslov: `About Us`
- Glavni pasus: isti tekst kao ABOUT US na početnoj (duplikat).
- Dodatna dva pasusa: o iskustvu u industriji, realizaciji vizije klijenta i prevazilaženju očekivanja; poziv da izaberu njih za svoje građevinske potrebe.
- *(Doslovan tekst: `docs/TEXT_about-3.txt`)*
- Slike: `assets/about/storefront-logo-signage-1500x1000.png`, `assets/about/sunray-2.jpg`

> Isti About tekst stoji i na Home i na About — duplikat sadržaja (loše za SEO). Napiši jedinstvenu verziju za svaku.

---

## 6. GET A QUOTE (`/book-online`)

Wix Bookings stranica. Trenutno prazna: `Nothing to book right now. Check back soon.`

> **Nefunkcionalna stranica** — u meniju stoji "Get a quote" ali nema nijednog termina. Na novom sajtu: pravi quote formular.

---

## Zatečeni problemi (za ispraviti u novoj verziji)

1. **Nijedna stranica nema meta description** — 0/6. Kritično za SEO.
2. `<title>` je svuda skraćen na `Sunray Contracting M` (Wix limit) — deluje kao greška.
3. Nema fizičke adrese ni Google Mape → slabo za lokalni SEO / Google Business Profile.
4. Nema structured data (LocalBusiness / GeneralContractor schema).
5. Favicon je Wix default (`pfavico.ico`), nije brendiran.
6. Nema `tel:` linka za telefon.
7. `/book-online` je prazna stranica u glavnoj navigaciji.
8. Duplikat About teksta na dve stranice.
9. Neusklađene liste usluga (Home vs Services).
10. Nema stranice sa referencama/portfoliom gotovih radova — za contracting firmu je to najjači prodajni alat.
11. Nema licencnog broja (CGC/license #) — obavezan signal poverenja u FL.
12. Slike nisu optimizovane (najveca 4.31 MB) — treba WebP/AVIF + responsive varijante.
13. Sajt je samo na engleskom — Miami tržište ide i na španski.
