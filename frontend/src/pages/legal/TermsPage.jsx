import { Link } from "react-router-dom";
import LegalLayout from "../../Components/Legal/LegalLayout";

const updated = "26 October 2026";

function Section({ title, children }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-2xl font-medium text-brand sm:text-3xl">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Vastu Vihar Nepal · Legal"
      title="Terms & Conditions"
      updated={updated}
      intro="These terms apply to your use of the Vastu Vihar Nepal website. By browsing the site or sending an enquiry, you agree to use it in accordance with these terms."
    >
      <Section title="1. About this website">
        <p>
          This website shares information about Vastu Vihar Nepal, its projects,
          properties, locations, and ways to contact our team. It is provided
          for general information and to help visitors make an enquiry.
        </p>
      </Section>

      <Section title="2. Property information">
        <p>
          Prices, plans, specifications, images, dimensions, availability,
          timelines, and other project details may change. Illustrations and
          photographs may be indicative and can differ from the final property
          or development. Please confirm current details with our team and rely
          on the final written documents for any purchase or other transaction.
        </p>
        <p>
          Sending an enquiry through this website does not reserve a property,
          create a purchase agreement, or guarantee availability, pricing, or
          acceptance of an offer. Any transaction will be subject to separate
          written documentation and applicable requirements.
        </p>
      </Section>

      <Section title="3. Enquiries and contact details">
        <p>
          Please provide accurate contact information when submitting an
          enquiry. We may use the details you provide to respond to your
          request, discuss the property you selected, and send an email
          confirming that we received your enquiry if you provided an email
          address. See our <Link className="text-brand underline" to="/privacy-policy">Privacy Policy</Link> for details about handling that information.
        </p>
      </Section>

      <Section title="4. Acceptable use">
        <p>
          You may use this site only for lawful purposes. Do not attempt to
          disrupt, damage, gain unauthorized access to, or misuse the site or
          its services, submit false or misleading enquiries, or use automated
          means to collect site content without our permission.
        </p>
      </Section>

      <Section title="5. Content and intellectual property">
        <p>
          Unless stated otherwise, the text, branding, graphics, photographs,
          videos, and other content on this site belong to or are used with
          permission by Vastu Vihar. You may view and share links to public
          pages for personal, non-commercial purposes. Reproducing or
          commercially using site content requires permission from the rights
          holder.
        </p>
      </Section>

      <Section title="6. Third-party services and links">
        <p>
          The site may link to or display services operated by other providers,
          including maps, social networks, and external forms. Those services
          are controlled by their own providers and terms. We are not
          responsible for their content, availability, or privacy practices.
        </p>
      </Section>

      <Section title="7. Availability and liability">
        <p>
          We work to keep the website available and information useful, but we
          do not guarantee uninterrupted access or that every page is free of
          errors. To the extent permitted by applicable law, Vastu Vihar is not
          responsible for losses arising from reliance on website information
          or temporary unavailability. Nothing in these terms limits rights or
          remedies that cannot legally be limited.
        </p>
      </Section>

      <Section title="8. Changes and applicable law">
        <p>
          We may update these terms or website content from time to time. The
          latest revision date appears above. These terms are interpreted under
          applicable laws of Nepal, subject to any mandatory legal requirements
          that apply to you.
        </p>
      </Section>

      <Section title="9. Contact us">
        <p>
          Questions about these terms can be sent to{" "}
          <a className="text-brand underline" href="mailto:info@vastuvihar.org">
            info@vastuvihar.org
          </a>{" "}
          or by phone at{" "}
          <a className="text-brand underline" href="tel:+9779802591815">
            +977 98025 91815
          </a>.
        </p>
      </Section>
    </LegalLayout>
  );
}
