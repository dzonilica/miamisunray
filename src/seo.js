import { contact, faqs, routeMeta, serviceAreas, services, site } from "./data";

/*
 * Structured data and head tags.
 *
 * The organisation block is the same on every page, so it ships in index.html
 * and is never rewritten here. What changes per route is the WebPage node, the
 * breadcrumb trail, and the FAQ block on the pages that show one.
 *
 * Nothing in here asserts a fact the company has not published. There is no
 * street address and no licence number on file, so neither is emitted: a wrong
 * PostalAddress is worse for local search than none at all.
 */

const ORG_ID = `${site.origin}/#organization`;
const SITE_ID = `${site.origin}/#website`;

export function canonicalFor(path) {
  return `${site.origin}${path === "/" ? "/" : path}`;
}

export function organizationNode() {
  return {
    "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: `${site.origin}/`,
    telephone: contact.phoneE164,
    email: contact.email,
    image: `${site.origin}/media/hero-poster.jpg`,
    logo: `${site.origin}/media/sunray-logo-dark.png`,
    description:
      "Licensed and insured general contractor serving Miami-Dade, Broward and Palm Beach counties, with more than 20 years of residential and commercial construction and renovation.",
    foundingDate: "2003",
    priceRange: "$$",
    areaServed: [
      ...serviceAreas.counties.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      ...serviceAreas.cities.map((name) => ({
        "@type": "City",
        name,
        addressRegion: site.region,
      })),
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    openingHoursSpecification: contact.hoursSpec.map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.days,
      opens: row.opens,
      closes: row.closes,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      telephone: contact.phoneE164,
      email: contact.email,
      areaServed: "US-FL",
      availableLanguage: ["English", "Spanish"],
    },
    sameAs: [contact.instagramHref],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction and renovation services in South Florida",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.line,
          serviceType: service.name,
          areaServed: serviceAreas.counties,
          provider: { "@id": ORG_ID },
        },
        url: `${site.origin}/services#${service.slug}`,
      })),
    },
  };
}

function breadcrumbNode(path) {
  const meta = routeMeta[path];
  const trail = [{ name: "Home", item: `${site.origin}/` }];
  if (path !== "/" && meta) {
    trail.push({ name: meta.label, item: canonicalFor(path) });
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalFor(path)}#breadcrumb`,
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

function faqNode(path) {
  return {
    "@type": "FAQPage",
    "@id": `${canonicalFor(path)}#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/* The pages that actually render the FAQ list are the only ones allowed to
   claim it in structured data. */
const FAQ_ROUTES = new Set(["/", "/contact"]);

export function graphFor(path) {
  const meta = routeMeta[path];
  if (!meta) return null;

  const url = canonicalFor(path);
  const graph = [
    /* Same @id as the block in index.html, which is the JS-free baseline. This
       one carries the full service catalogue; a consumer merges the two on the
       shared identifier rather than seeing two businesses. */
    organizationNode(),
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: `${site.origin}/`,
      name: site.name,
      publisher: { "@id": ORG_ID },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: meta.title,
      description: meta.description,
      isPartOf: { "@id": SITE_ID },
      about: { "@id": ORG_ID },
      inLanguage: "en-US",
      breadcrumb: { "@id": `${url}#breadcrumb` },
      primaryImageOfPage: `${site.origin}/media/hero-poster.jpg`,
    },
    breadcrumbNode(path),
  ];

  if (FAQ_ROUTES.has(path)) graph.push(faqNode(path));

  return { "@context": "https://schema.org", "@graph": graph };
}

function setMeta(selector, attribute, value) {
  const node = document.head.querySelector(selector);
  if (node) node.setAttribute(attribute, value);
}

export function syncHead(path) {
  const meta = routeMeta[path];
  if (!meta) return;

  const url = canonicalFor(path);

  document.title = meta.title;
  setMeta('meta[name="description"]', "content", meta.description);
  setMeta('meta[property="og:title"]', "content", meta.title);
  setMeta('meta[property="og:description"]', "content", meta.description);
  setMeta('meta[property="og:url"]', "content", url);
  setMeta('meta[name="twitter:title"]', "content", meta.title);
  setMeta('meta[name="twitter:description"]', "content", meta.description);
  setMeta('link[rel="canonical"]', "href", url);

  const graph = graphFor(path);
  if (!graph) return;

  let script = document.head.querySelector('script[data-page-schema="true"]');
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.pageSchema = "true";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(graph);
}
