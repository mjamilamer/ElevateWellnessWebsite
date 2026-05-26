import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { siteConfig } from '@/lib/config'
import { formatPhone } from '@/lib/utils'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/terms', {
  title: 'Terms of Service',
  description:
    'The terms governing your use of the Elevate Wellness & Health website. Informational only — not medical advice.',
})

const EFFECTIVE_DATE = 'May 26, 2026'

export default function TermsOfServicePage() {
  return (
    <>
      <Hero
        subtitle="Legal"
        title="Terms of Service"
        description={`Effective ${EFFECTIVE_DATE}. These terms govern your use of our website. By using www.elevatewellnessnj.com you agree to them.`}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <article className="mx-auto max-w-3xl prose prose-neutral prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary-700 hover:prose-a:underline">
            <p className="text-sm text-neutral-500">Effective date: {EFFECTIVE_DATE}</p>

            <h2>1. Acceptance of terms</h2>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) apply when you visit or use{' '}
              <a href={siteConfig.siteUrl}>{siteConfig.siteUrl.replace(/^https?:\/\//, '')}</a>{' '}
              (the &ldquo;Site&rdquo;), operated by {siteConfig.legalName}. If you do not agree
              with any part of these Terms, please do not use the Site.
            </p>

            <h2>2. Informational purpose only</h2>
            <p>
              Content on the Site is provided for general informational purposes. It is not
              medical advice, diagnosis, or treatment. Always seek the advice of your physician or
              other qualified health provider with any questions you may have regarding a medical
              condition.
            </p>
            <p>
              <strong>
                If you think you may have a medical emergency, call 911 or your local emergency
                services immediately. Do not rely on this Site for urgent medical needs.
              </strong>
            </p>

            <h2>3. No physician–patient relationship</h2>
            <p>
              Using the Site, reading content here, or submitting a contact or appointment-request
              form does not create a physician–patient relationship with any of our providers. A
              relationship is established only after you are seen at our office.
            </p>

            <h2>4. Appointment requests are tentative</h2>
            <p>
              When you submit an appointment-request form, the time you select is{' '}
              <strong>tentative</strong> and may be adjusted by our team based on provider
              availability and clinical needs. Your appointment is confirmed only when our team
              sends you a calendar invitation or written confirmation. Tentative requests do not
              constitute a contract for medical services.
            </p>

            <h2>5. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Site for any unlawful purpose</li>
              <li>Submit false or misleading information through our forms</li>
              <li>Submit content that contains protected health information of others</li>
              <li>Attempt to interfere with, probe, or breach the security of the Site</li>
              <li>
                Use automated tools (bots, scrapers) to access the Site beyond reasonable use
              </li>
              <li>Use the Site to harass, defame, or harm any person</li>
            </ul>

            <h2>6. Intellectual property</h2>
            <p>
              All content on the Site — including text, graphics, logos, images, and code — is
              owned by {siteConfig.legalName} or its licensors and protected by U.S. copyright and
              trademark laws. You may view and print pages for your personal, non-commercial use.
              Any other use requires our prior written permission.
            </p>

            <h2>7. Third-party services and links</h2>
            <p>
              The Site uses third-party services (such as Google Calendar for scheduling and
              Resend for email) and may link to third-party websites. We are not responsible for
              the content, policies, or practices of third parties. Your use of those services is
              governed by their own terms.
            </p>

            <h2>8. Disclaimers</h2>
            <p>
              THE SITE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT
              WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE
              SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
            </p>

            <h2>9. Limitation of liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, {siteConfig.legalName.toUpperCase()} AND ITS
              PROVIDERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF, OR INABILITY
              TO USE, THE SITE. OUR TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SITE SHALL NOT
              EXCEED ONE HUNDRED U.S. DOLLARS ($100).
            </p>
            <p>
              Some jurisdictions do not allow limits on certain damages, so portions of this
              section may not apply to you.
            </p>

            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless {siteConfig.legalName} from any claims,
              liabilities, damages, and expenses (including reasonable attorneys&apos; fees)
              arising out of your misuse of the Site or violation of these Terms.
            </p>

            <h2>11. Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. Material changes will be posted here
              with a new effective date. Continued use of the Site after changes are posted
              constitutes acceptance of the updated Terms.
            </p>

            <h2>12. Governing law and venue</h2>
            <p>
              These Terms are governed by the laws of the State of New Jersey, without regard to
              its conflicts-of-laws principles. Any dispute arising from your use of the Site will
              be brought exclusively in the state or federal courts located in Hudson County, New
              Jersey, and you consent to the jurisdiction of those courts.
            </p>

            <h2>13. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining
              provisions will remain in full effect.
            </p>

            <h2>14. Contact</h2>
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
              This page is provided as general information. It does not constitute legal advice
              and should be reviewed by your attorney before publication.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
