import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { siteConfig } from '@/lib/config'
import { formatPhone } from '@/lib/utils'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('/hipaa', {
  title: 'HIPAA Notice of Privacy Practices',
  description:
    'How Elevate Wellness & Health may use and disclose your protected health information, and your rights under HIPAA.',
})

const EFFECTIVE_DATE = 'May 26, 2026'

export default function HipaaNoticePage() {
  return (
    <>
      <Hero
        subtitle="Patient Privacy"
        title="Notice of Privacy Practices"
        description={`Effective ${EFFECTIVE_DATE}. This notice describes how medical information about you may be used and disclosed and how you can get access to this information.`}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <article className="mx-auto max-w-3xl prose prose-neutral prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary-700 hover:prose-a:underline">
            <div className="not-prose rounded-lg border border-primary-300 bg-primary-50/60 p-5">
              <p className="text-sm font-semibold text-primary-900">
                THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED
                AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.
              </p>
            </div>

            <p className="text-sm text-neutral-500">Effective date: {EFFECTIVE_DATE}</p>

            <h2>Our pledge to you</h2>
            <p>
              {siteConfig.legalName} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our practice&rdquo;)
              is committed to protecting the privacy of your Protected Health Information (PHI).
              Federal law — the Health Insurance Portability and Accountability Act of 1996 (HIPAA)
              and its regulations — requires us to maintain the privacy of your PHI, provide you
              with this notice of our legal duties and privacy practices, and follow the terms of
              the notice currently in effect.
            </p>

            <h2>What is Protected Health Information?</h2>
            <p>
              Protected Health Information (PHI) is information about you, including demographic
              data, that may identify you and that relates to your past, present, or future
              physical or mental health, the care you receive, or payment for that care.
            </p>

            <h2>How we may use and disclose your PHI without your written authorization</h2>
            <p>
              We may use and disclose your PHI for the following purposes without your specific
              authorization:
            </p>

            <h3>For treatment</h3>
            <p>
              We may use your PHI to provide, coordinate, or manage your medical care. For
              example, we may share information with another physician, specialist, hospital, or
              therapist involved in your care.
            </p>

            <h3>For payment</h3>
            <p>
              We may use and disclose your PHI to obtain payment for the services we provide. For
              example, we may submit claims to your health insurance carrier or share information
              with a billing service.
            </p>

            <h3>For healthcare operations</h3>
            <p>
              We may use and disclose your PHI to operate our practice — for quality improvement,
              staff training, accreditation, licensing, and business management activities.
            </p>

            <h3>Appointment reminders and follow-up</h3>
            <p>
              We may contact you to remind you of an appointment, follow up after a visit, or
              share health-related information about services that may interest you.
            </p>

            <h3>Other permitted uses</h3>
            <ul>
              <li>
                <strong>Required by law:</strong> when disclosure is required by federal, state, or
                local law
              </li>
              <li>
                <strong>Public health activities:</strong> reporting communicable diseases, FDA
                product safety concerns, etc.
              </li>
              <li>
                <strong>Health oversight:</strong> audits, investigations, inspections, and
                licensure activities by health oversight agencies
              </li>
              <li>
                <strong>Judicial and administrative proceedings:</strong> in response to a court
                order, subpoena, or other lawful process
              </li>
              <li>
                <strong>Law enforcement:</strong> as required by law or in response to a valid law
                enforcement request
              </li>
              <li>
                <strong>To avert a serious threat to health or safety:</strong> consistent with
                applicable law and ethical standards
              </li>
              <li>
                <strong>Workers&apos; compensation:</strong> as authorized by and to the extent
                necessary to comply with workers&apos; compensation laws
              </li>
              <li>
                <strong>Coroners, medical examiners, and funeral directors:</strong> as permitted
                by law
              </li>
              <li>
                <strong>Organ and tissue donation:</strong> when applicable
              </li>
              <li>
                <strong>Research:</strong> subject to an approved Institutional Review Board waiver
                or other safeguards
              </li>
              <li>
                <strong>Specialized government functions:</strong> military, national security,
                protective services
              </li>
            </ul>

            <h2>Uses and disclosures that require your written authorization</h2>
            <p>
              We will obtain your written authorization before using or disclosing your PHI for any
              purpose not described above. In particular, we will obtain your authorization for:
            </p>
            <ul>
              <li>Most uses and disclosures of psychotherapy notes</li>
              <li>Uses and disclosures of PHI for marketing</li>
              <li>Disclosures that constitute a sale of PHI</li>
            </ul>
            <p>
              You may revoke any authorization in writing at any time, except to the extent we
              have already relied on it.
            </p>

            <h2>Your rights regarding your PHI</h2>

            <h3>Right to inspect and copy</h3>
            <p>
              You have the right to inspect and obtain a copy of the PHI we maintain about you,
              with limited exceptions. To request access, please contact our Privacy Officer using
              the information below. We may charge a reasonable fee for copies as permitted by law.
            </p>

            <h3>Right to request amendment</h3>
            <p>
              If you believe PHI we have about you is incorrect or incomplete, you may ask us to
              amend it. Requests must be in writing and include a reason supporting the request.
              We may deny a request that does not meet certain criteria.
            </p>

            <h3>Right to an accounting of disclosures</h3>
            <p>
              You have the right to request an accounting of certain disclosures we have made of
              your PHI in the six years prior to your request. This excludes disclosures for
              treatment, payment, healthcare operations, and disclosures you authorized.
            </p>

            <h3>Right to request restrictions</h3>
            <p>
              You have the right to request a restriction on certain uses and disclosures of your
              PHI. We are not required to agree to your request except in limited circumstances —
              for example, when you have paid for a service in full out of pocket and request
              that we not share that PHI with your health plan.
            </p>

            <h3>Right to request confidential communications</h3>
            <p>
              You have the right to request that we communicate with you about medical matters in
              a specific way or at a specific location (for example, by mail to a P.O. box rather
              than your home).
            </p>

            <h3>Right to a paper copy of this notice</h3>
            <p>
              You may request a paper copy of this notice at any time, even if you have agreed to
              receive it electronically.
            </p>

            <h3>Right to be notified of a breach</h3>
            <p>
              You have the right to be notified if there is a breach of your unsecured PHI.
            </p>

            <h2>Our duties</h2>
            <ul>
              <li>We are required by law to maintain the privacy of your PHI</li>
              <li>We are required to provide you with this notice</li>
              <li>We are required to abide by the terms of the notice currently in effect</li>
              <li>
                We reserve the right to change this notice and to make the revised notice effective
                for PHI we already have as well as any PHI we receive in the future. We will post a
                copy of the current notice on our website and at our office.
              </li>
            </ul>

            <h2>Complaints</h2>
            <p>
              If you believe your privacy rights have been violated, you may file a complaint with
              our Privacy Officer (contact below) or with the Secretary of the U.S. Department of
              Health and Human Services. To file a complaint with HHS, visit{' '}
              <a href="https://www.hhs.gov/hipaa/filing-a-complaint/index.html" target="_blank" rel="noopener noreferrer">
                hhs.gov/hipaa/filing-a-complaint
              </a>
              . We will not retaliate against you for filing a complaint.
            </p>

            <h2>Privacy Officer</h2>
            <p>
              To exercise any of the rights described above, ask questions about this notice, or
              file a complaint, please contact our Privacy Officer:
            </p>
            <ul>
              <li>{siteConfig.legalName} — Privacy Officer</li>
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
              {siteConfig.contact.fax && (
                <li>Fax: {siteConfig.contact.fax}</li>
              )}
              <li>
                Mail: {siteConfig.contact.address.street}, {siteConfig.contact.address.city},{' '}
                {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
              </li>
            </ul>

            <h2>Related policies</h2>
            <p>
              See also our <Link href="/privacy">Privacy Policy</Link> for how we handle
              non-clinical information collected through the website, and our{' '}
              <Link href="/terms">Terms of Service</Link>.
            </p>

            <p className="mt-12 text-xs text-neutral-500">
              This notice is provided as a starting template based on HIPAA&apos;s required
              elements (45 CFR § 164.520). It should be reviewed and customized by qualified
              healthcare counsel before being published as your practice&apos;s official Notice of
              Privacy Practices.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
