"use client";

import { cn } from "@/lib/cn";
import { easeOut, fadeUpTransition, transition } from "@/lib/motion";
import { ne, neFace } from "@/lib/nepali-labels";
import { siteConfig, whatsappHref } from "@/lib/site";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Music2, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Catalogue" },
  { href: "/works", label: "Works" },
  { href: "/#guides-resources", label: "Resources" },
  { href: "/nepal-flag-proportions", label: "Flag Guide" },
  { href: "/#faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: siteConfig.social.facebook, label: "Facebook", Icon: Facebook },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: Instagram },
  { href: siteConfig.social.tiktok, label: "TikTok", Icon: Music2 },
  { href: siteConfig.social.youtube, label: "YouTube", Icon: Youtube },
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: Linkedin },
];

export function Footer() {
  return (
    <footer id="site-footer" className="relative bg-charcoal text-cream">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/[0.12] to-transparent" />

      <div className="mx-auto max-w-content px-5 pb-8 pt-16 md:px-8 md:pt-20">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={fadeUpTransition(0, 0)}
        >
          <div className="mb-3 flex items-center gap-4">
            <Image
              src="/flags-nepal-logo-white.png"
              alt="Flags Nepal logo"
              width={72}
              height={72}
              className="h-14 w-auto md:h-16"
            />
            <p className="font-display text-[1.9rem] font-bold leading-[1.12] tracking-[0.02em] text-cream">
              Flags <span className="hero-pride">Nepal</span>
            </p>
          </div>

          <p lang="ne" className={cn("mb-2 text-gold/40", neFace)}>
            {ne.establishment}
          </p>

          <p className="mb-8 max-w-md text-[13px] leading-[1.9] text-cream/30">
            {siteConfig.tagline}
          </p>

          <nav className="mb-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-cream/40">
            {footerLinks.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={fadeUpTransition(i, 0.04)}
              >
                <Link href={l.href} className="transition-colors duration-300 hover:text-gold/70">
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="mb-8 flex flex-wrap items-center justify-center gap-3 text-sm text-cream/30"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={fadeUpTransition(2, 0)}
          >
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition-colors duration-300 hover:text-gold/70"
            >
              {siteConfig.email}
            </a>
            <span className="text-cream/10">&middot;</span>
            <a
              href={`tel:${siteConfig.landlineTel}`}
              className="transition-colors duration-300 hover:text-gold/70"
            >
              {siteConfig.landline}
            </a>
            <span className="text-cream/10">&middot;</span>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="transition-colors duration-300 hover:text-gold/70"
            >
              {siteConfig.phone}
            </a>
            <span className="text-cream/10">&middot;</span>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-gold/70"
            >
              WhatsApp
            </a>
          </motion.div>

          <motion.div
            className="mb-8 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={fadeUpTransition(3, 0)}
          >
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 text-cream/60 transition-all duration-300 hover:border-gold/60 hover:text-gold/80"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <div className="border-t border-cream/[0.06] pt-6">
          <motion.div
            className="flex flex-col items-center justify-between gap-3 text-xs text-cream/25 md:flex-row"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition.reveal, delay: 0.06 }}
          >
            <p>&copy; {new Date().getFullYear()} Flags Nepal. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="transition-colors duration-300 hover:text-gold/50">
                Terms
              </Link>
              <Link href="/privacy" className="transition-colors duration-300 hover:text-gold/50">
                Privacy
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
