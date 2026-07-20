import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { siteConfig } from '@/lib/config'
import { formatPhone } from '@/lib/utils'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/privacy', {
  title: 'Privacy Policy',
  description:
    'How Elevate Wellness & Health collects, uses, and protects information about visitors to www.elevatewellnessnj.com, including our SMS/text messaging program.',
})

const EFFECTIVE_DATE = 'July 20, 2026'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Hero
        subtitle="Legal"
        title="Privacy Policy"
        description={`Effective ${EFFECTIVE_DATE}. This policy describes how we collect, use, and protect information from visitors to www.elevatewellnessnj.com.`}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <article className="mx-auto max-w-3xl prose prose-neutral prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary-700 hover:prose-a:underline">
            <p className="text-sm text-neutral-500">Effective date: {EFFECTIVE_DATE}</p>

            <h2>Who we are</h2>
            <p>
              {siteConfig.legalName} (&ldquo;Elevate Wellness,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the
              website at <a href={siteConfig.siteUrl}>{siteConfig.siteUrl.replace(/^https?:\/\//, '')}</a>{' '}
              and provides orthopedic, internal medicine, gastroenterology, physical therapy, and
              wellness services at our North Bergen, New Jersey office.
            </p>

            <h2>Scope of this policy</h2>
            <p>
              This policy covers information you provide on our website (for example, through our
              contact and appointment-request forms) and information collected automatically when
              you visit the site. Information you share during your in-office care is treated as
              Protected Health Information (PHI) and is covered by our{' '}
              <Link href="/hipaa">HIPAA Notice of Privacy Practices</Link>.
            </p>

            <h2>Information we collect</h2>
            <h3>Information you give us</h3>
            <ul>
              <li>
                <strong>Contact form:</strong> your name, email address, optional phone number, and
                the message you send us.
              </li>
              <li>
                <strong>Appointment request form:</strong> your name, email address, phone number,
                preferred date window and time of day, the service you&apos;re requesting, and an
                optional non-medical reason for visit.
              </li>
              <li>
                <strong>Text messaging (SMS):</strong> if you opt in to text messages, we collect
                your mobile number and a record of your consent (method and date). See the{' '}
                <a href="#sms">Text messaging (SMS)</a> section below for details.
              </li>
            </ul>
            <p>
              We ask you <em>not</em> to include diagnoses, medications, or other medical detail in
              these forms — they are not the right channel for protected health information.
            </p>

            <h3>Information collected automatically</h3>
            <ul>
              <li>
                <strong>Server logs:</strong> when you load a page or submit a form, our hosting
                provider records the request URL, timestamp, IP address, and browser user-agent.
                These logs are kept for a limited operational period (set by our hosting plan) to
                investigate abuse and outages.
              </li>
              <li>
                <strong>Analytics (optional):</strong> if Google Analytics 4 is enabled on our
                site, it collects standard page-view, referrer, device, and approximate location
                data with IP anonymization. You can opt out by enabling browser-level tracking
                protection or using the{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                  Google Analytics opt-out browser add-on
                </a>
                .
              </li>
              <li>
                <strong>Cookies:</strong> our site uses only strictly-necessary cookies for site
                operation. No advertising or cross-site tracking cookies are set. If analytics is
                enabled, Google may set its own analytics cookies.
              </li>
            </ul>

            <h2>How we use information</h2>
            <ul>
              <li>To respond to your inquiry or schedule your visit</li>
              <li>To create tentative Calendar holds in our internal scheduling calendar</li>
              <li>To send appointment confirmations and reminders</li>
              <li>
                To send transactional text messages (appointment confirmations, reminders,
                scheduling updates, and replies) to patients who have opted in
              </li>
              <li>To improve the site (aggregate analytics, not individual tracking)</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p>
              We do not sell your information. We do not share your information with advertisers.
            </p>

            <h2 id="sms">Text messaging (SMS)</h2>
            <p>
              <strong>Our SMS program.</strong> If you opt in, {siteConfig.legalName} may send you
              transactional text messages about appointment confirmations, reminders, scheduling
              updates, and replies to your inquiries. We do not use text messaging for marketing or
              promotional offers.
            </p>
            <p>
              <strong>Information we collect for SMS.</strong> When you opt in, we collect your
              mobile phone number and may associate it with your name and the method and date of
              your consent. We use this information solely to send the messages you agreed to
              receive and to keep a record of your consent.
            </p>
            <p>
              <strong>How you opt in.</strong> Consent may be provided verbally, on paper intake
              forms at our office, or through another affirmative opt-in method we provide.
              Providing a phone number on our website contact or appointment-request forms alone
              does not enroll you in SMS unless you also give affirmative consent to texting.
              Consent to receive text messages is not a condition of receiving care.
            </p>
            <p>
              <strong>Frequency and rates.</strong> Message frequency varies. Message and data
              rates may apply.
            </p>
            <p>
              <strong>Opt-out and help.</strong> You may opt out at any time by replying{' '}
              <strong>STOP</strong> to any message. You will receive a confirmation and will not
              receive further SMS messages from us unless you opt in again. For help, reply{' '}
              <strong>HELP</strong> or contact us at{' '}
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> or{' '}
              <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`}>
                {formatPhone(siteConfig.contact.phone)}
              </a>
              .
            </p>
            <p>
              <strong>No sharing of mobile opt-in data.</strong> No mobile information will be
              shared with third parties/affiliates for marketing/promotional purposes. Information
              sharing to subcontractors in support of services (for example, our messaging provider
              that delivers texts) is permitted. All other use case categories exclude text
              messaging originator opt-in data and consent; this information will not be shared with
              any third parties.
            </p>

            <h2>Who we share information with</h2>
            <p>
              We use a small number of vendors to operate the site. Each vendor only processes
              information on our behalf and is contractually bound to protect it.
            </p>
            <ul>
              <li>
                <strong>Vercel</strong> (hosting and serverless functions) —{' '}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                  privacy policy
                </a>
              </li>
              <li>
                <strong>Resend</strong> (transactional email delivery) —{' '}
                <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                  privacy policy
                </a>
              </li>
              <li>
                <strong>Google Workspace &amp; Calendar API</strong> (email inbox and internal
                scheduling calendar) —{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  privacy policy
                </a>
              </li>
              <li>
                <strong>Google Analytics</strong> (optional, site analytics) — same Google policy
              </li>
              <li>
                <strong>SMS delivery provider</strong> (text-message carrier/aggregator) — used
                only to deliver the text messages you have opted in to receive. Your mobile
                opt-in data and consent are not shared for marketing purposes (see{' '}
                <a href="#sms">Text messaging (SMS)</a> below).
              </li>
            </ul>
            <p>
              <strong>Note on Protected Health Information (PHI).</strong> Our website forms are
              designed not to collect PHI: we explicitly ask you not to include medical history,
              diagnoses, medications, or other clinical detail when contacting us through this
              site. Where a vendor handles PHI on our behalf in connection with your in-office
              care, we will execute a Business Associate Agreement with that vendor as HIPAA
              requires. PHI shared during your visit is covered by our{' '}
              <Link href="/hipaa">HIPAA Notice of Privacy Practices</Link>.
            </p>

            <h2>Data retention</h2>
            <p>
              We retain information you submit via our forms for as long as needed to provide care
              and meet legal recordkeeping requirements. Aggregate analytics data is retained per
              the analytics provider&apos;s default settings (typically 14 months).
            </p>

            <h2>Security</h2>
            <p>
              We protect information in transit with industry-standard TLS encryption. Forms are
              submitted over HTTPS only. Calendar and email storage are operated by Google
              Workspace under their security controls. No method of transmission is 100% secure,
              and we cannot guarantee absolute security.
            </p>

            <h2>Your choices and rights</h2>
            <ul>
              <li>You can ask us to delete information you&apos;ve submitted through our forms</li>
              <li>You can opt out of analytics (see above)</li>
              <li>
                If you are a patient, you have additional rights under HIPAA — see our{' '}
                <Link href="/hipaa">Notice of Privacy Practices</Link>
              </li>
              <li>
                New Jersey, California, and other states grant additional privacy rights to
                residents. We honor all valid requests submitted via the contact below.
              </li>
            </ul>

            <h2>Children</h2>
            <p>
              We do not knowingly collect information from children under 13 through this website.
              Parents or guardians who schedule appointments for minor patients should not include
              medical details in our forms.
            </p>

            <h2>External links</h2>
            <p>
              Our site may link to third-party websites. Their privacy practices are not covered by
              this policy.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy from time to time. Material changes will be posted here
              with a new effective date.
            </p>

            <h2>Contact us</h2>
            <p>
              Questions about this policy, or to exercise a privacy right:
            </p>
            <ul>
              <li>
                Email:{' '}
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              </li>
              <li>
                Phone:{' '}
                <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`}>
                  {formatPhone(siteConfig.contact.phone)}
                </a>
              </li>
              <li>
                Mail: {siteConfig.legalName}, {siteConfig.contact.address.street},{' '}
                {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{' '}
                {siteConfig.contact.address.zip}
              </li>
            </ul>

            <p className="mt-12 text-xs text-neutral-500">
              This page is provided as general information. It does not constitute legal advice and
              should be reviewed by your attorney before publication.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
