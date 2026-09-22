import LegalPage from "../components/LegalPage";
import CookieChoice from "../components/CookieChoice";
import { contact } from "../data";

/*
 * The table below is the real inventory of what this build writes to a browser.
 * Add a row before adding a script, not after.
 */

const sections = [
  {
    id: "what-cookies-are",
    heading: "What this covers",
    body: (
      <>
        <p>
          "Cookies" here means cookies and the equivalent browser storage —
          <code>localStorage</code> and <code>sessionStorage</code> — that a site can write to
          your device. This page lists everything this site writes, what it is for, and how
          long it stays.
        </p>
        <p>
          This site sets no advertising cookies and no third-party tracking cookies. It does
          not embed social media widgets, video players or maps that would set cookies of
          their own.
        </p>
      </>
    ),
  },
  {
    id: "strictly-necessary",
    heading: "Strictly necessary storage",
    body: (
      <>
        <p>
          These are set without asking, because the site cannot do its job without them. They
          hold no personal information and are never used to profile anyone.
        </p>
        <div className="legal__table-wrap">
          <table className="legal__table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Purpose</th>
                <th scope="col">Expires</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>sunray:intro-played</code>
                </td>
                <td>sessionStorage</td>
                <td>Remembers the opening animation has already run, so it plays once instead of on every page.</td>
                <td>When you close the tab</td>
              </tr>
              <tr>
                <td>
                  <code>sunray:cookie-consent</code>
                </td>
                <td>localStorage</td>
                <td>Stores whether you accepted or declined optional cookies, and when, so we do not ask again.</td>
                <td>Until you clear it or change your choice</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "optional",
    heading: "Optional cookies",
    body: (
      <>
        <p>
          Optional cookies would cover analytics: which pages get read, which services get
          clicked, and roughly where visitors come from, in aggregate. They run only after you
          press Accept, and declining does not reduce anything on this site.
        </p>
        <p>
          <strong>No optional cookies are active in this version of the site.</strong> The
          consent choice is recorded and honoured now, so that when analytics is added it
          cannot run for anyone who declined. This page and the banner will be updated with
          the specific providers and retention periods before that happens.
        </p>
      </>
    ),
  },
  {
    id: "your-choice",
    heading: "Your choice",
    body: (
      <>
        <p>
          Accepting and declining are equally easy and both are remembered. You can change
          your mind at any time, here or from the "Cookie settings" link in the footer of
          every page.
        </p>
        <CookieChoice />
      </>
    ),
  },
  {
    id: "browser-controls",
    heading: "Controlling it in your browser",
    body: (
      <>
        <p>
          Independently of this site, every major browser lets you block or delete cookies and
          site data for a specific site or for all sites. Look under Settings, then Privacy,
          in Chrome, Safari, Firefox or Edge — on a phone the same controls sit under the
          browser's own settings app entry, not the page.
        </p>
        <p>
          Clearing site data for this domain removes both keys above. The cookie banner will
          appear again on your next visit, which is the expected result.
        </p>
      </>
    ),
  },
  {
    id: "more",
    heading: "More information",
    body: (
      <p>
        How we handle the personal information you send us is covered in the{" "}
        <a href="/privacy">Privacy Policy</a>. For anything else, email{" "}
        <a href={contact.emailHref}>{contact.email}</a> or call{" "}
        <a href={contact.phoneHref}>{contact.phone}</a>.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      lead="Everything this site writes to your browser, why it is there, how long it stays, and how to change your answer."
      sections={sections}
    />
  );
}
