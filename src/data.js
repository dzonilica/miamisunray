export const services = [
  {
    slug: "custom-homes",
    name: "Custom Homes",
    group: "Build",
    line: "Ground-up single-family construction in Miami-Dade, Broward and Palm Beach: site prep, foundation, framing, MEP rough-in, finishes and final inspection.",
    image: "/media/custom-homes.jpg",
    alt: "Custom home built by Sunray Contracting in South Florida, exterior at dusk",
  },
  {
    slug: "additions",
    name: "Additions",
    group: "Build",
    line: "Room additions, second storeys and garage conversions tied into the existing foundation, structure and roofline.",
    image: "/media/services/additions/01.jpg",
    alt: "Home addition under construction on a Miami property",
  },
  {
    slug: "commercial-projects",
    name: "Commercial Projects",
    group: "Build",
    line: "Retail, office and restaurant build-outs and tenant improvements, permitted and inspected through to certificate of occupancy.",
    image: "/media/services/commercial-projects/01.jpg",
    alt: "Commercial build-out project by Sunray Contracting in South Florida",
  },
  {
    slug: "impact-windows-doors",
    name: "Impact Windows & Doors",
    group: "Exterior",
    line: "Impact windows, sliders and entry doors carrying Miami-Dade County product approval, installed to High-Velocity Hurricane Zone requirements.",
    image: "/media/services/impact-windows-doors/01.jpg",
    alt: "Impact-rated sliding glass door installed in a Miami home",
  },
  {
    slug: "roofing",
    name: "Roofing",
    group: "Exterior",
    line: "Tile, shingle, metal and flat roof replacement and repair, with underlayment, secondary water barrier and flashing detailed to Florida Building Code.",
    image: "/media/services/roofing/01.jpg",
    alt: "New tile roof installed by a Miami roofing contractor",
  },
  {
    slug: "pools",
    name: "Pools",
    group: "Exterior",
    line: "Gunite pool construction, decking, equipment sets and screen enclosures, finished with the barrier and safety compliance the county inspects for.",
    image: "/media/services/pools/01.jpg",
    alt: "Swimming pool and paver deck built at a South Florida residence",
  },
  {
    slug: "fences",
    name: "Fences",
    group: "Exterior",
    line: "Aluminum, PVC, wood and chain-link fencing, gates and privacy screens set to the survey line and to permitted height.",
    image: "/media/services/fences/01.jpg",
    alt: "Wood privacy fence installed along a residential property line in Miami",
  },
  {
    slug: "landscape-design",
    name: "Landscape Design",
    group: "Exterior",
    line: "Planting plans, irrigation, pavers, retaining walls and finish grading that carries water away from the structure.",
    image: "/media/services/landscape-design/01.jpg",
    alt: "Landscaped garden and paver hardscape at a Miami home",
  },
  {
    slug: "interior-design",
    name: "Kitchen, Bath & Interior Remodeling",
    group: "Interiors",
    line: "Kitchen and bathroom remodeling and whole-home interior renovation: layout changes, cabinetry, tile, countertops, lighting and fixtures.",
    image: "/media/services/interior-design/02.jpg",
    alt: "Renovated living space in a completed Miami home remodel",
  },
  {
    slug: "painting",
    name: "Painting",
    group: "Interiors",
    line: "Interior and exterior painting: pressure wash, patch, caulk, prime, then two finish coats in acrylic or elastomeric.",
    image: "/media/services/painting/01.jpg",
    alt: "Painter rolling a finish coat on an interior wall",
  },
  {
    slug: "solar",
    name: "Solar",
    group: "Systems",
    line: "Roof-mounted solar arrays with engineered attachment, inverter install and the utility interconnection paperwork filed for you.",
    image: "/media/services/solar/01.jpg",
    alt: "Solar panel array installed on a South Florida roof",
  },
  {
    slug: "ac-and-ducts",
    name: "AC & Ducts",
    group: "Systems",
    line: "Air conditioning changeouts and duct replacement, sized to the room-by-room load and sealed rather than taped over.",
    image: "/media/services/ac-and-ducts/01.jpg",
    alt: "New air conditioning duct work installed in a ceiling",
  },
  {
    slug: "insulation",
    name: "Insulation",
    group: "Systems",
    line: "Attic, wall and spray foam insulation installed to the R-value the Florida Energy Code requires for that assembly.",
    image: "/media/services/insulation/01.jpg",
    alt: "Insulation being installed inside a framed wall cavity",
  },
  {
    slug: "excavation",
    name: "Excavation",
    group: "Site Work",
    line: "Clearing, cut and fill, trenching and rough grading, compacted and tested before anything is poured on top of it.",
    image: "/media/services/excavation/01.jpg",
    alt: "Excavator grading a construction site in South Florida",
  },
  {
    slug: "demolition",
    name: "Full Demolition",
    group: "Site Work",
    line: "Permitted interior strip-outs and full structural demolition, with utility disconnects, dust control and debris hauled off site.",
    image: "/media/services/demolition/01.jpg",
    alt: "Structure being demolished under permit in Miami-Dade County",
  },
  {
    slug: "concrete",
    name: "Concrete",
    group: "Site Work",
    line: "Footings, slabs, tie beams, sidewalks and flatwork poured and finished to the specification on the engineered drawings.",
    image: "/media/services/concrete/01.jpg",
    alt: "Freshly poured and finished concrete slab on a building site",
  },
  {
    slug: "driveways",
    name: "Driveways",
    group: "Site Work",
    line: "Concrete, paver and asphalt driveways, aprons and parking, graded to drain and permitted where the city requires it.",
    image: "/media/services/driveways/01.jpg",
    alt: "Finished paver driveway at a South Florida residence",
  },
  {
    slug: "engineering",
    name: "Permits & Engineering",
    group: "Planning",
    line: "Architectural and structural drawings, calculations, and permit submittal, revisions and inspections through the Miami-Dade and Broward building departments.",
    image: "/media/services/engineering/01.jpg",
    alt: "Engineer reviewing a permit drawing set for a Miami project",
  },
];

export const serviceGroupOrder = [
  "Build",
  "Exterior",
  "Interiors",
  "Systems",
  "Site Work",
  "Planning",
];

/* Heading is what the section is called in search; intro is the sentence under it. */
const serviceGroupHeadings = {
  Build: "New construction and additions",
  Exterior: "Roofing, impact windows and exterior work",
  Interiors: "Kitchen, bath and interior remodeling",
  Systems: "Solar, air conditioning and insulation",
  "Site Work": "Excavation, demolition and concrete",
  Planning: "Permits and engineering",
};

export const serviceGroupIntros = {
  Build: "Ground-up construction and new square footage for homes and businesses across South Florida.",
  Exterior:
    "The building envelope — roof, glazing, doors and the ground around them — detailed for Florida wind and water loads.",
  Interiors:
    "Kitchens, bathrooms and whole-home renovation, taken from demolition through to the final coat of paint.",
  Systems: "Solar, HVAC and insulation: the systems that decide what a building costs to run every month.",
  "Site Work":
    "Excavation, demolition, concrete and driveways — the ground and the structure it has to carry.",
  Planning:
    "Drawings, structural engineering and building permits, filed and approved before the first delivery arrives.",
};

const serviceGroupCovers = {
  Build: {
    image: "/media/custom-homes.jpg",
    alt: "Custom home built by Sunray Contracting in South Florida",
  },
  Exterior: {
    image: "/media/services/roofing/01.jpg",
    alt: "Tile roof being installed on a Miami residence",
  },
  Interiors: {
    image: "/media/services/interior-design/03.jpg",
    alt: "Bedroom finished in a completed Miami interior renovation",
  },
  Systems: {
    image: "/media/services/solar/01.jpg",
    alt: "Solar array installed across a South Florida roof",
  },
  "Site Work": {
    image: "/media/services/excavation/01.jpg",
    alt: "Excavator working a prepared building site in Miami-Dade",
  },
  Planning: {
    image: "/media/services/engineering/01.jpg",
    alt: "Permit drawing set open on a project desk",
  },
};

export const serviceGroups = serviceGroupOrder.map((name) => ({
  name,
  heading: serviceGroupHeadings[name],
  intro: serviceGroupIntros[name],
  ...serviceGroupCovers[name],
  items: services.filter((service) => service.group === name),
}));

export const featuredServices = [
  services.find((service) => service.slug === "custom-homes"),
  services.find((service) => service.slug === "impact-windows-doors"),
  services.find((service) => service.slug === "roofing"),
  services.find((service) => service.slug === "interior-design"),
  services.find((service) => service.slug === "excavation"),
];

export const navigation = [
  { label: "About", href: "/about" },
  { label: "Approach", href: "/approach" },
  { label: "Services", href: "/services" },
  { label: "Financing", href: "/financing" },
  { label: "Contact", href: "/contact" },
];

export const legalNavigation = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];

export const contact = {
  phone: "(786) 928-5140",
  phoneHref: "tel:+17869285140",
  phoneE164: "+1-786-928-5140",
  email: "info@sunraymiami.com",
  emailHref: "mailto:info@sunraymiami.com",
  instagram: "@sunraymiami",
  instagramHref: "https://www.instagram.com/sunraymiami/",
  hours: [
    ["Mon — Fri", "8:00 am – 8:00 pm"],
    ["Saturday", "9:00 am – 7:00 pm"],
    ["Sunday", "Closed"],
  ],
  /* Machine-readable mirror of the rows above, for openingHoursSpecification. */
  hoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00" },
    { days: ["Saturday"], opens: "09:00", closes: "19:00" },
  ],
};

export const site = {
  name: "Sunray Contracting",
  legalName: "Sunray Contracting Miami",
  origin: "https://www.sunraymiami.com",
  locality: "Miami",
  region: "FL",
  country: "US",
};

/* Counties first — they are how the work is actually bid and permitted. */
export const serviceAreas = {
  counties: ["Miami-Dade County", "Broward County", "Palm Beach County"],
  cities: [
    "Miami",
    "Miami Beach",
    "Coral Gables",
    "Coconut Grove",
    "Key Biscayne",
    "Doral",
    "Hialeah",
    "Kendall",
    "Pinecrest",
    "Aventura",
    "North Miami",
    "Homestead",
    "Fort Lauderdale",
    "Hollywood",
    "Pembroke Pines",
    "Weston",
    "Davie",
    "Boca Raton",
    "Delray Beach",
    "West Palm Beach",
  ],
};

/* Answers stay inside what the company has actually published: scope, process,
   licensing and coverage. No invented prices, durations or license numbers. */
export const faqs = [
  {
    q: "Is Sunray Contracting licensed and insured in Florida?",
    a: "Yes. Sunray Contracting is a licensed and insured contractor working across South Florida, and we provide the license and the certificate of insurance on request before any contract is signed.",
  },
  {
    q: "Which areas of South Florida do you cover?",
    a: "Miami-Dade, Broward and Palm Beach counties, including Miami, Miami Beach, Coral Gables, Doral, Hialeah, Kendall, Aventura, Homestead, Fort Lauderdale, Hollywood and Boca Raton. If you are outside that, call and we will tell you straight away whether we are the right contractor for the job.",
  },
  {
    q: "What does a quote cost?",
    a: "Nothing. The site walkthrough and the written quote are free. You get a scope that states what is included and what is not, and a price to plan around, before you commit to anything.",
  },
  {
    q: "Do you pull the building permits?",
    a: "Yes. Drawings, structural calculations, permit submittal, revisions and inspections through the county or city building department are part of our scope, not something we leave with the owner.",
  },
  {
    q: "Do you take on small jobs, or only full builds?",
    a: "Both. A single bathroom, a roof replacement or a fence gets the same crew standard as a ground-up custom home. Tell us the scope and we will tell you whether it is ours to do.",
  },
  {
    q: "Can the work be financed?",
    a: "Financing is available on eligible home improvements in South Florida. Which programs apply depends on the property and the scope, and the terms are confirmed in writing during your consultation before anything is signed.",
  },
];

export const routeMeta = {
  "/": {
    title: "General Contractor in Miami & South Florida | Sunray Contracting",
    description:
      "Licensed and insured general contractor in Miami. Custom homes, additions, impact windows, roofing, kitchen and bath remodeling and commercial build-outs across Miami-Dade, Broward and Palm Beach. Free quote: (786) 928-5140.",
    label: "Home",
  },
  "/about": {
    title: "About Sunray Contracting | Licensed Miami Contractor, 20+ Years",
    description:
      "Sunray Contracting is a licensed and insured South Florida construction company with more than 20 years building homes, additions and commercial projects across Miami-Dade, Broward and Palm Beach.",
    label: "About",
  },
  "/approach": {
    title: "How We Run a Project | Sunray Contracting Miami",
    description:
      "Walkthrough, written scope and price, permits, build, handover. The five steps every Sunray Contracting project in South Florida runs through, in that order.",
    label: "Approach",
  },
  "/services": {
    title: "Construction & Renovation Services in Miami | Sunray Contracting",
    description:
      "18 services under one contract: custom homes, additions, impact windows and doors, roofing, pools, kitchen and bath remodeling, solar, HVAC, concrete, excavation, demolition, permits and engineering across South Florida.",
    label: "Services",
  },
  "/financing": {
    title: "Home Improvement Financing in South Florida | Sunray Contracting",
    description:
      "Financing for eligible home improvements in Miami-Dade, Broward and Palm Beach: no down payment, approval not based on credit score, repaid through property taxes. Terms confirmed in writing before you sign.",
    label: "Financing",
  },
  "/contact": {
    title: "Contact Sunray Contracting | Free Quote in Miami, FL",
    description:
      "Request a free quote from a licensed Miami general contractor. Call (786) 928-5140, email info@sunraymiami.com, or send your project details and we will come back to you.",
    label: "Contact",
  },
  "/privacy": {
    title: "Privacy Policy | Sunray Contracting Miami",
    description:
      "How Sunray Contracting collects, uses, shares and protects the personal information you send through this website, and the rights you have over it.",
    label: "Privacy Policy",
  },
  "/cookies": {
    title: "Cookie Policy | Sunray Contracting Miami",
    description:
      "What Sunray Contracting stores in your browser, why, how long it stays, and how to accept, decline or change your choice at any time.",
    label: "Cookie Policy",
  },
};

export const legal = {
  updated: "September 20, 2026",
  updatedISO: "2026-09-20",
};
