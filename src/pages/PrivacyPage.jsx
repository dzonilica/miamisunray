import LegalPage from "../components/LegalPage";
import { contact, site } from "../data";

/*
 * Written against what this site actually does today: a quote form that opens a
 * prefilled email in the visitor's own mail client, a phone number, an email
 * address, one strictly necessary storage key, and an optional analytics slot
 * that stays empty until someone accepts cookies.
 *
 * If a hosted form endpoint, analytics or an embedded map is added later, the
 * "What we collect" and "Who else sees it" sections have to be updated with it.
 */

const sections = [
  {
    id: "who-we-are",
    heading: "Who we are",
    body: (
      <>
        <p>
          This site is operated by {site.legalName} ("Sunray Contracting", "we", "us"), a
          licensed and insured general contractor working in Miami-Dade, Broward and Palm
          Beach counties, Florida.
        </p>
        <p>
          For anything in this policy, write to{" "}
          <a href={contact.emailHref}>{contact.email}</a> or call{" "}
          <a href={contact.phoneHref}>{contact.phone}</a>. We are the controller of the
          personal information described here.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "What we collect",
    body: (
      <>
        <p>We collect only what you send us and what a web server records automatically.</p>
        <dl className="legal__defs">
          <div>
            <dt>Information you give us</dt>
            <dd>
              First and last name, email address, phone number, ZIP code, project type and
              whatever you write in the message field of the quote form. If you call or email
              instead, we hold whatever you tell us in that conversation.
            </dd>
          </div>
          <div>
            <dt>Technical information</dt>
            <dd>
              Our hosting provider logs the usual request data — IP address, date and time,
              the page requested, referring page, browser and operating system — to serve the
              site and to defend it against abuse.
            </dd>
          </div>
          <div>
            <dt>Browser storage</dt>
            <dd>
              One strictly necessary key that remembers the opening animation has already
              played in this tab, and one that records your cookie choice. Optional analytics
              storage is set only if you accept it. See the{" "}
              <a href="/cookies">Cookie Policy</a>.
            </dd>
          </div>
        </dl>
        <p>
          We do not ask for and do not want financial account numbers, social security
          numbers, health information or any other sensitive category of data through this
          website. Please do not send them in the form.
        </p>
      </>
    ),
  },
  {
    id: "how-the-form-works",
    heading: "How the quote form works",
    body: (
      <>
        <p>
          The quote form on the contact page does not post your details to a server. It
          assembles what you typed into a prefilled email in your own mail application,
          addressed to <a href={contact.emailHref}>{contact.email}</a>. Nothing leaves your
          device until you press send in that mail application, and you can edit or abandon
          it first.
        </p>
        <p>
          Once you do send it, the message is handled as ordinary business email: it sits in
          our mailbox with our email provider, and we reply from there.
        </p>
      </>
    ),
  },
  {
    id: "why-we-use-it",
    heading: "Why we use it",
    body: (
      <ul className="legal__list">
        <li>To answer your enquiry, arrange a walkthrough and prepare a written quote.</li>
        <li>To run a project you have engaged us for, and to invoice it.</li>
        <li>To keep records we are required to keep as a licensed contractor.</li>
        <li>To keep the website available, working and secure.</li>
        <li>
          If, and only if, you accept optional cookies: to understand in aggregate which
          pages and services people look at, so we can improve them.
        </li>
      </ul>
    ),
  },
  {
    id: "marketing",
    heading: "Marketing",
    body: (
      <p>
        We do not sell your personal information, and we do not share it with anyone for
        cross-context behavioural advertising. We do not run an email marketing list from the
        quote form. If that ever changes, it will be opt-in and this page will say so before
        it starts.
      </p>
    ),
  },
  {
    id: "who-else-sees-it",
    heading: "Who else sees it",
    body: (
      <>
        <p>Your information is shared only where the work requires it:</p>
        <ul className="legal__list">
          <li>
            <strong>Our service providers</strong> — website hosting and business email, which
            process data on our instructions.
          </li>
          <li>
            <strong>Subcontractors and suppliers</strong> on your project, limited to what they
            need to do their part of the job.
          </li>
          <li>
            <strong>Building departments and inspectors</strong>, where a permit application
            requires the property and owner details.
          </li>
          <li>
            <strong>Professional advisers, insurers and authorities</strong>, where we are
            legally obliged or need to establish or defend a legal claim.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-long",
    heading: "How long we keep it",
    body: (
      <>
        <p>
          Enquiries that do not become projects are kept while there is a realistic prospect
          of the work going ahead, and then deleted. Project records — contracts, drawings,
          permits, invoices and warranty documentation — are kept for as long as Florida
          construction, tax and limitations law requires us to be able to produce them.
        </p>
        <p>Server logs are kept for a short period by our host and then rotate out.</p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: (
      <>
        <p>
          Depending on where you live, you may have the right to ask us for a copy of the
          personal information we hold about you, to have it corrected or deleted, to object
          to or restrict how we use it, and to opt out of any sale or sharing of it — which,
          as stated above, we do not do.
        </p>
        <p>
          Florida residents have these rights under the Florida Digital Bill of Rights where
          it applies, and residents of other US states and of the EU and UK have comparable
          rights under their own law. We will not treat you differently for exercising them.
        </p>
        <p>
          To make a request, email <a href={contact.emailHref}>{contact.email}</a> with
          "Privacy request" in the subject line. We may need to verify who you are before we
          act, and we will respond within the time the applicable law allows.
        </p>
      </>
    ),
  },
  {
    id: "security",
    heading: "Security",
    body: (
      <p>
        The site is served over HTTPS. Access to our email and project records is limited to
        the people who need it. No method of transmission or storage is completely secure, so
        we cannot promise absolute security, but we do not keep more than we need and we do
        not keep it longer than we have to.
      </p>
    ),
  },
  {
    id: "children",
    heading: "Children",
    body: (
      <p>
        This site is aimed at property owners and businesses. It is not directed at children
        under 13 and we do not knowingly collect their information. If you believe a child has
        sent us personal information, contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        If we change what we collect or what we do with it, we will update this page and
        change the "last updated" date at the top. Material changes to optional cookies will
        also reset the cookie banner so you can make the choice again.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <p>
        {site.legalName} · {site.locality}, {site.region} ·{" "}
        <a href={contact.emailHref}>{contact.email}</a> ·{" "}
        <a href={contact.phoneHref}>{contact.phone}</a>
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lead="What this website collects, why we have it, who else sees it and how to get it back or have it deleted."
      sections={sections}
    />
  );
}
