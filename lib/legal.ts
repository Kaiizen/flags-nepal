export type LegalSection = {
  id: string;
  title: string;
  items: string[];
};

export const termsLastUpdated = "22 April 2026";

export const termsSections: LegalSection[] = [
  {
    id: "pricing-payment",
    title: "1. Pricing and Payment",
    items: [
      "All prices are quoted in Nepalese Rupees (NPR) and are subject to change without prior notice.",
      "The final price will be based on the selected fabric, size, quantity, and printing specifications.",
      "Online orders are confirmed with 50% advance payment; the remaining 50% is paid on delivery (COD).",
      "Bulk and institutional orders may follow custom payment terms confirmed in writing before production begins.",
      "Accepted payment methods include cash, bank transfer, and digital wallets (e.g., eSewa, Khalti).",
    ],
  },
  {
    id: "custom-orders",
    title: "2. Custom Orders",
    items: [
      "Custom sizes, designs, and specifications are produced as per the customer's written approval.",
      "Once a design proof or sample is approved by the customer, no changes or cancellations will be accepted.",
      "Customers are responsible for providing accurate artwork, dimensions, and colour references.",
    ],
  },
  {
    id: "production-delivery",
    title: "3. Production and Delivery",
    items: [
      "Standard production time varies depending on order size and material availability.",
      "Delivery timelines are estimates only and may be affected by factors beyond our control (e.g., weather, transport delays, material shortages).",
      "Any urgent orders may incur additional express service charges.",
    ],
  },
  {
    id: "quality-variations",
    title: "4. Quality and Variations",
    items: [
      "Minor colour or size variations may occur due to printing and fabric characteristics.",
      "We strive to maintain the highest quality, but such variations are not considered defects.",
      "If a product is found to be faulty, it must be reported within 48 hours of delivery.",
    ],
  },
  {
    id: "returns-refunds",
    title: "5. Returns and Refunds",
    items: [
      "Returns are accepted only for manufacturing defects and must be approved by our management.",
      "Custom-printed products cannot be refunded or exchanged unless defective.",
      "Refunds, if approved, will be processed within 7–10 working days.",
    ],
  },
  {
    id: "intellectual-property",
    title: "6. Intellectual Property",
    items: [
      "All logos, images, and artwork provided by the customer are assumed to be legally owned or licensed for use.",
      "We are not responsible for copyright infringements arising from customer-supplied designs.",
    ],
  },
  {
    id: "liability",
    title: "7. Liability",
    items: [
      "Our liability is limited to the value of the product sold.",
      "We are not responsible for indirect losses such as missed events, reprinting costs, or loss of business caused by product delays or errors.",
    ],
  },
  {
    id: "acceptance",
    title: "8. Acceptance of Terms",
    items: [
      "By placing an order, the customer acknowledges and agrees to these Terms and Conditions.",
      "The company reserves the right to update or modify these terms without prior notice.",
    ],
  },
];

export const privacyLastUpdated = "22 April 2026";

export const privacySections: LegalSection[] = [
  {
    id: "overview",
    title: "1. Overview",
    items: [
      "Flags Nepal (\"we\", \"our\", \"us\") respects your privacy and handles personal information shared with us responsibly.",
      "This policy explains what information we collect, how we use it, and the choices you have.",
    ],
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    items: [
      "Contact details you share through our contact form, email, phone, or WhatsApp (e.g., name, email, phone, message).",
      "Order-related information such as delivery address, artwork files, and specifications you provide to complete a production brief.",
      "Basic technical data your browser sends automatically (e.g., device type, browser, IP address) for security and analytics.",
    ],
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    items: [
      "To respond to enquiries, share quotations, and coordinate production and delivery.",
      "To communicate order status, proofs, approvals, and post-delivery follow-up.",
      "To maintain internal records, prevent fraud, and improve our services.",
    ],
  },
  {
    id: "artwork-ip",
    title: "4. Artwork and Customer Content",
    items: [
      "Artwork, logos, and images you share are used solely to execute your order.",
      "We do not publish customer artwork externally without permission.",
      "Customers remain responsible for ensuring they own or are licensed to use the artwork they provide.",
    ],
  },
  {
    id: "sharing",
    title: "5. Sharing of Information",
    items: [
      "We do not sell your personal information.",
      "Limited information may be shared with trusted service providers (for example, courier partners) strictly to fulfil your order.",
      "We may disclose information if required by applicable Nepali law or legal process.",
    ],
  },
  {
    id: "retention",
    title: "6. Data Retention",
    items: [
      "Order records are retained for normal business and tax purposes in line with applicable law.",
      "Contact enquiries are kept only as long as reasonably needed to respond and maintain a record of our conversation.",
    ],
  },
  {
    id: "security",
    title: "7. Security",
    items: [
      "We take reasonable steps to protect information shared with us against loss, misuse, and unauthorised access.",
      "No method of transmission or storage is fully secure; please do not share sensitive financial details over insecure channels.",
    ],
  },
  {
    id: "your-rights",
    title: "8. Your Choices",
    items: [
      "You may request access to, correction of, or deletion of personal information you have shared with us.",
      "To exercise any of these choices, contact us at flagsnepal@gmail.com.",
    ],
  },
  {
    id: "updates",
    title: "9. Updates to This Policy",
    items: [
      "We may update this policy from time to time. The latest version will always be available on this page with an updated effective date.",
    ],
  },
  {
    id: "contact",
    title: "10. Contact Us",
    items: [
      "For privacy-related questions, contact Flags Nepal at flagsnepal@gmail.com or +977 982 336 4747.",
    ],
  },
];
