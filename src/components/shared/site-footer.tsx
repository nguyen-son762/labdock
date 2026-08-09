import { Facebook, Global, Instagram, Sms, TruckFast, Verify, Whatsapp } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    title: "Product Categories",
    links: [
      "Chemicals & Reagents",
      "Laboratory Consumables",
      "Laboratory Equipment",
      "Animal Research Housing Systems",
      "Biotechnology Solutions",
    ],
  },
  {
    title: "Customer Support",
    links: ["Track Order", "Shipping & Delivery", "Return Policy", "Technical Consultation", "Contact us"],
  },
  {
    title: "Quick Links",
    links: ["Terms & Conditions", "Privacy Policy", "Warranty Policy", "About us", "News"],
  },
] as const;

const certifications = ["S5G Certified", "CSBE Certified", "ISO Certified"] as const;

export function SiteFooter() {
  return (
    <footer id="contact-us" className="border-t border-[#d9e4ee] bg-white text-[#5e6375]">
      <div className="container grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_0.85fr_0.9fr]">
        <div>
          <Link
            href="/"
            aria-label="Labdock home"
            className="inline-flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
          >
            <Image
              src="/auth/company-logo.png"
              alt=""
              width={56}
              height={50}
              className="h-[50px] w-[56px] object-cover object-bottom"
            />
            <span className="text-2xl font-medium text-[#164990]">LABDOCK</span>
          </Link>
          <p className="mt-5 max-w-[260px] text-sm leading-6 text-[#051a50]">
            Simplifying scientific procurement, enhancing research efficiency
          </p>
          <div className="mt-5 flex gap-4 text-[#73798f]">
            <Link
              href="#"
              aria-label="Labdock on Instagram"
              className="rounded hover:text-[#164990] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
            >
              <Instagram className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href="#"
              aria-label="Labdock website"
              className="rounded hover:text-[#164990] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
            >
              <Global className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href="#"
              aria-label="Labdock on Facebook"
              className="rounded hover:text-[#164990] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164990]"
            >
              <Facebook className="size-5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-sm font-semibold text-[#164990]">{column.title}</h2>
            <ul className="mt-4 space-y-3 text-xs">
              {column.links.map((link) => (
                <li key={link}>
                  <Link
                    href={`/#${link.toLowerCase().replaceAll(" ", "-")}`}
                    className="hover:text-[#164990] hover:underline"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-sm font-semibold text-[#164990]">Contact us</h2>
          <address className="mt-4 space-y-3 text-xs not-italic">
            <a href="mailto:info@i-dna.sg" className="flex items-center gap-2 hover:text-[#164990]">
              <Sms className="size-4 text-[#164990]" variant="Bold" aria-hidden="true" /> info@i-dna.sg
            </a>
            <a href="tel:+6596221086" className="flex items-center gap-2 hover:text-[#164990]">
              <Whatsapp className="size-4 text-[#2bb673]" variant="Bold" aria-hidden="true" /> (+65) 96221086
            </a>
          </address>
          <p className="mt-8 text-xs font-semibold text-[#164990]">Secured your payment with</p>
          <div className="mt-3 flex gap-2" aria-label="Accepted payment methods">
            {["VISA", "PAY NOW", "●●"].map((payment) => (
              <span
                key={payment}
                className="flex h-7 min-w-10 items-center justify-center rounded border px-2 text-[9px] font-bold text-[#164990]"
              >
                {payment}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#ecf0f3]">
        <div className="container flex flex-col gap-4 py-5 text-[11px] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} LABDOCK. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {certifications.map((certification) => (
              <span key={certification} className="inline-flex items-center gap-1.5 text-[#303647]">
                <Verify className="size-4 text-[#3eb584]" variant="Bold" aria-hidden="true" /> {certification}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 text-[#303647]">
              <TruckFast className="size-4 text-[#164990]" variant="Bold" aria-hidden="true" /> Fast Delivery
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
