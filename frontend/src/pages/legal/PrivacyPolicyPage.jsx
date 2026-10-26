import { Link } from "react-router-dom";
import LegalLayout from "../../Components/Legal/LegalLayout";

const updated = "26 October 2026";

function Section({ title, children }) {
  return (
    <section>
      <h2 className="mb-3 font-serif text-2xl font-medium text-brand-pine sm:text-3xl">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      eyebrow="Vastu Vihar Nepal · Legal"
      title="Privacy Notice & Policy"
      updated={updated}
      intro="Vastu Vihar Nepal is committed to handling personal information responsibly. This notice explains what information this website collects, why it is used, which service providers support the site, and how to contact us with a privacy request."
    >
      <Section title="1. Who is responsible for your information">
        <p>
          This website is operated under the Vastu Vihar brand by Technoculture
          Building Centre Private Limited. In this notice, “Vastu Vihar Nepal,”
          “we,” and “us” refer to the team responsible for this Nepal website
          and its property enquiries.
        </p>
        <p>
          Our Nepal offices are at Shop No-8, 2nd Floor, Rungta Mall, Adarsh
          Nagar, Birgunj - 44300, and 211, 2nd Floor, Hanuman Center, Mukti
          Chowk, Birtamode, Jhapa. You can contact us at{" "}
          <a className="text-brand-pine underline" href="mailto:info@vastuvihar.org">
            info@vastuvihar.org
          </a>.
        </p>
      </Section>

      <Section title="2. Information we collect and why">
        <p>
          We collect the information needed to manage a property enquiry. The
          contact form currently asks for:
        </p>
        <div className="overflow-x-auto rounded-sm border border-brand-line">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead className="bg-brand-forest text-white">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Information</th>
                <th scope="col" className="px-4 py-3 font-semibold">Why we use it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-line bg-white/60">
              <tr>
                <th scope="row" className="px-4 py-3 font-medium text-brand-pine">Name and phone number</th>
                <td className="px-4 py-3">To identify your enquiry and contact you about it.</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-medium text-brand-pine">Email address (optional)</th>
                <td className="px-4 py-3">To reply to your enquiry by email.</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-medium text-brand-pine">Property selection</th>
                <td className="px-4 py-3">To understand which property or model you are asking about.</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-medium text-brand-pine">Enquiry date and status</th>
                <td className="px-4 py-3">To organize and follow up on submitted enquiries.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Please do not include identity documents, financial account details,
          health information, or other sensitive information in the enquiry
          form. Career applications are collected through the external Google
          Forms service linked from our Careers page, not through this enquiry
          form.
        </p>
      </Section>

      <Section title="3. Technical and third-party information">
        <p>
          When third-party content loads, its provider may receive technical
          request information such as your IP address, browser, or device. Our
          site currently uses Google Maps for embedded contact maps, OpenStreetMap
          tiles for the Nepal locations map, Google Fonts for typography, and
          Google Forms for the careers application link.
        </p>
        <p>
          We do not currently use an on-site analytics or advertising cookie
          system, and this website does not provide a cookie-preference manager.
          Third-party services embedded or opened from the site may use their
          own cookies or similar technologies under their own policies.
        </p>
      </Section>

      <Section title="4. How we use information and who may receive it">
        <p>
          We use enquiry details to respond to you, discuss the property you
          selected, reply to you using the contact details you provided,
          maintain enquiry records, and protect the website from misuse. We do
          not use details from the enquiry form to add you to a marketing
          mailing list.
        </p>
        <p>
          Enquiries are stored using MongoDB Atlas. We do not currently send
          automatic email confirmations. We do not sell enquiry information.
          We may disclose information to service providers who
          support these purposes or where disclosure is required by applicable
          law or a lawful request from an authority. Depending on provider
          infrastructure, information may be processed outside Nepal. Each
          provider's own privacy terms apply to information it collects
          directly.
        </p>
      </Section>

      <Section title="5. Legal grounds and purpose limits">
        <p>
          We collect and use enquiry information for the purposes explained in
          this notice and in accordance with applicable law, including
          Nepal's Privacy Act, 2075. We do not use enquiry details for unrelated
          purposes without an appropriate basis or notice.
        </p>
      </Section>

      <Section title="6. Your choices and privacy requests">
        <p>
          You may contact us to ask what enquiry information we hold about you,
          request correction of inaccurate details, or ask us to delete your
          enquiry information. You may also withdraw a request or permission
          where applicable. We may need to verify your identity, and we may
          retain some records where required for legal or legitimate business
          purposes. Requests are handled under applicable law.
        </p>
      </Section>

      <Section title="7. Children">
        <p>
          The property enquiry form is intended for people making property
          enquiries. We do not knowingly request personal information from
          children through this form. If you believe a child has submitted
          personal information, contact us so we can review the request.
        </p>
      </Section>

      <Section title="8. Retention and security">
        <p>
          We retain enquiry records while they are needed to respond to and
          manage the enquiry, and for any further period required for applicable
          legal or business purposes. We apply reasonable safeguards to protect
          information. No electronic storage or transmission method can be
          guaranteed to be completely secure.
        </p>
        <p>
          The website does not make automated decisions about visitors based on
          enquiry-form information.
        </p>
      </Section>

      <Section title="9. External websites and policy updates">
        <p>
          Links to external websites and services are provided for convenience.
          We do not control their content or privacy practices. We may update
          this notice when our site or data practices change; the revision date
          above shows when it was last updated. For website-use terms, read our{" "}
          <Link className="text-brand-pine underline" to="/terms-and-conditions">
            Terms &amp; Conditions
          </Link>.
        </p>
      </Section>

      <Section title="10. Privacy contact">
        <p>
          For questions, access or correction requests, or other privacy
          concerns, contact our privacy desk at{" "}
          <a className="text-brand-pine underline" href="mailto:info@vastuvihar.org">
            info@vastuvihar.org
          </a>{" "}
          or call{" "}
          <a className="text-brand-pine underline" href="tel:+9779802591815">
            +977 98025 91815
          </a>. You can also write to either Nepal office listed in Section 1.
        </p>
      </Section>
    </LegalLayout>
  );
}
