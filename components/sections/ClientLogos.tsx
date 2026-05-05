"use client";

import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const clientLogos = [
  { name: "AGA", src: "/client-logos/aga.png" },
  { name: "CAN", src: "/client-logos/can.png" },
  { name: "8K Expeditions", src: "/client-logos/8k-expeditions.png" },
  { name: "BK", src: "/client-logos/bk.png" },
  { name: "Elite Exped", src: "/client-logos/elite-exped.png" },
  { name: "Kantipur", src: "/client-logos/kantipur.png" },
  { name: "Hyatt", src: "/client-logos/hyatt.png" },
  { name: "Honda", src: "/client-logos/honda.png" },
  { name: "KG", src: "/client-logos/kg.png" },
  { name: "Lumbini Lions", src: "/client-logos/lumbini-lions.png" },
  { name: "NPL", src: "/client-logos/npl.png" },
  { name: "Maitri", src: "/client-logos/maitri.png" },
  { name: "Soaltee", src: "/client-logos/soaltee.png" },
  { name: "Ncell", src: "/client-logos/ncell.png" },
  { name: "Xtreme", src: "/client-logos/xtreme.png" },
] as const;

export function ClientLogos() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-charcoal py-12 md:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/[0.04] to-transparent" />

      <motion.p
        className="mb-8 text-center text-[13px] font-medium uppercase tracking-[0.38em] text-gold/50 md:mb-10 md:text-[15px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        Trusted by leading organizations across Nepal
      </motion.p>

      {reducedMotion ? (
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-6 px-5 md:gap-7">
          {clientLogos.map((logo) => (
            <div
              key={logo.name}
              className="relative h-20 w-[185px] p-2"
            >
              <Image src={logo.src} alt={logo.name} fill className="object-contain p-2" sizes="185px" />
            </div>
          ))}
        </div>
      ) : (
        <LogoStrip logos={clientLogos} />
      )}
    </section>
  );
}

function LogoStrip({
  logos,
  className,
}: {
  logos: ReadonlyArray<{ name: string; src: string }>;
  className?: string;
}) {
  const set = logos.map((logo) => (
    <div
      key={logo.name}
      className="relative mx-4 h-20 w-[185px] flex-none select-none p-2 md:mx-5 md:w-[205px]"
    >
      <Image src={logo.src} alt={logo.name} fill className="object-contain p-2" sizes="205px" />
    </div>
  ));

  return (
    <div className={cn("relative", className)}>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-charcoal to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-charcoal to-transparent md:w-32" />

      <motion.div
        className="flex w-max items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 125, ease: "linear", repeat: Infinity }}
      >
        {set}
        {set}
      </motion.div>
    </div>
  );
}
