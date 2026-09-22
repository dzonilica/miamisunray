import { useEffect } from "react";
import CookieConsent from "./components/CookieConsent";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import PageHero from "./components/PageHero";
import PageTransition from "./components/PageTransition";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import SmoothScroll from "./components/SmoothScroll";
import AboutPage from "./pages/AboutPage";
import ApproachPage from "./pages/ApproachPage";
import ContactPage from "./pages/ContactPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import FinancingPage from "./pages/FinancingPage";
import HomePage from "./pages/HomePage";
import PrivacyPage from "./pages/PrivacyPage";
import ServicesPage from "./pages/ServicesPage";
import { introPlays } from "./intro";
import { useLocation } from "./router";
import { scrollToId, scrollToTop } from "./scroll";
import { syncHead } from "./seo";

const routes = {
  "/": HomePage,
  "/about": AboutPage,
  "/approach": ApproachPage,
  "/services": ServicesPage,
  "/financing": FinancingPage,
  "/contact": ContactPage,
  "/privacy": PrivacyPage,
  "/cookies": CookiePolicyPage,
};

const routeAliases = {
  "/about-3": "/about",
  "/services-3": "/services",
  "/general-4": "/financing",
  "/payments": "/financing",
  "/contact-4": "/contact",
  "/book-online": "/contact",
  "/quote": "/contact",
  "/process": "/approach",
  "/privacy-policy": "/privacy",
  "/cookie-policy": "/cookies",
};

function normalizePath(pathname) {
  const withoutTrailingSlash = pathname.replace(/\/+$/, "");
  return withoutTrailingSlash || "/";
}

function NotFoundPage() {
  return (
    <PageHero
      eyebrow="404"
      title="This page is not on the plan."
      lead="Head back to the start, or tell us what you were looking for."
      image="/media/custom-homes.jpg"
      alt="Custom home built by Sunray Contracting in South Florida"
      cta={{ label: "Back home", href: "/" }}
      compact
    />
  );
}

export default function App() {
  const { pathname, hash } = useLocation();
  const requestedPath = normalizePath(pathname);
  const currentPath = routeAliases[requestedPath] || requestedPath;
  const Page = routes[currentPath] || NotFoundPage;
  const isKnownRoute = Boolean(routes[currentPath]);

  useEffect(() => {
    syncHead(currentPath);

    const targetId = hash.slice(1);
    if (!targetId) {
      scrollToTop();
      return undefined;
    }

    // The section belongs to the page that just mounted, so wait a frame for
    // it to exist before looking for it.
    const frame = window.requestAnimationFrame(() => {
      if (!scrollToId(targetId)) scrollToTop();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentPath, hash]);

  return (
    <div className="site-app" id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SmoothScroll />
      <PageTransition skipEntry={introPlays} />
      {introPlays && <Loader />}
      <Cursor />
      <SiteHeader currentPath={isKnownRoute ? currentPath : ""} />
      <main id="main-content" tabIndex="-1">
        <Page />
      </main>
      <SiteFooter />
      <CookieConsent />
    </div>
  );
}
