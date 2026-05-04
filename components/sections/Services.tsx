"use client";

import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { ne, neFace } from "@/lib/nepali-labels";
import {
  easeOut,
  fadeUpTransition,
  springSnappy,
  staggerContainer,
  staggerItem,
  transition,
} from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

const services = [
  {
    id: "svc-1",
    number: "01",
    name: "Custom Flag Printing",
    description:
      "National, corporate, event, hand, table, and pole flags produced with color-accurate print and durable finishing for indoor and outdoor use.",
  },
  {
    id: "svc-2",
    number: "02",
    name: "Golden & Silver Foil Printing",
    description:
      "Premium metallic foil finishing for invitations, certificates, labels, and ceremonial pieces where shine and contrast need to feel deliberate.",
  },
  {
    id: "svc-3",
    number: "03",
    name: "Paper Printing",
    description:
      "Business cards, flyers, brochures, menus, posters, and branded stationery printed with clean typography, accurate tones, and consistent cuts.",
  },
  {
    id: "svc-4",
    number: "04",
    name: "Jersey Customization Printing",
    description:
      "Team jerseys with names, numbers, sponsor marks, and tournament batches executed for readability, comfort, and repeat-order consistency.",
  },
  {
    id: "svc-5",
    number: "05",
    name: "Advertisement Banners",
    description:
      "Flex banners, standees, roll-ups, and campaign displays built for storefronts, activations, fairs, and road-facing visibility.",
  },
  {
    id: "svc-6",
    number: "06",
    name: "Bulk & Custom Projects",
    description:
      "Combined packages across flags, paper, jersey, and banner work scoped end-to-end for schools, clubs, events, and business launches.",
  },
] as const;

type ServiceEntry = (typeof services)[number];

function ServiceItem({
  service,
  index,
  align,
  variant,
}: {
  service: ServiceEntry;
  index: number;
  align: "left" | "right";
  variant: "dark" | "light";
}) {
  const light = variant === "light";
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.15 }}
      transition={fadeUpTransition(index, 0.07)}
      whileHover={reduced ? undefined : { y: -5 }}
      className={cn(
        "group flex flex-col",
        align === "right" ? "md:items-end md:text-right" : "md:items-start md:text-left",
      )}
    >
      <motion.span
        className={cn(
          "inline-block font-display text-[3rem] font-bold leading-none tracking-[-0.04em] transition-colors duration-500 md:text-[3.6rem]",
          light
            ? "text-gold/35 group-hover:text-gold/75"
            : "text-gold/20 group-hover:text-gold/40",
        )}
        whileHover={reduced ? undefined : { scale: 1.04 }}
        transition={springSnappy}
      >
        {service.number}
      </motion.span>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{
          duration: 0.55,
          ease: easeOut,
          delay: reduced ? 0 : 0.08 + index * 0.04,
        }}
        style={{ transformOrigin: align === "right" ? "right center" : "left center" }}
        className={cn(
          "my-4 h-px w-10 transition-all duration-500 group-hover:w-16",
          light ? "bg-gold/25 group-hover:bg-gold/50" : "bg-gold/15 group-hover:bg-gold/30",
        )}
      />
      <motion.h3
        initial={{ opacity: 0, x: align === "right" ? 12 : -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-24px" }}
        transition={{ ...transition.reveal, delay: reduced ? 0 : 0.05 + index * 0.03 }}
        className={cn(
          "font-display text-[1.25rem] font-bold leading-[1.1] tracking-[0.01em] md:text-[1.4rem]",
          light ? "text-charcoal" : "text-cream",
        )}
      >
        {service.name}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-24px" }}
        transition={{ ...transition.reveal, delay: reduced ? 0 : 0.12 + index * 0.03 }}
        className={cn(
          "mt-3 max-w-sm text-[13px] leading-[1.9] transition-colors duration-500",
          light
            ? "text-charcoal/50 group-hover:text-charcoal/65"
            : "text-cream/35 group-hover:text-cream/50",
        )}
      >
        {service.description}
      </motion.p>
    </motion.div>
  );
}

type ServicesProps = {
  /** `dark` = homepage charcoal band. `light` = services page + charcoal type. */
  variant?: "dark" | "light";
};

export function Services({ variant = "dark" }: ServicesProps) {
  const light = variant === "light";
  const reduced = useReducedMotion();
  const pairs = [];
  for (let i = 0; i < services.length; i += 2) {
    pairs.push(services.slice(i, i + 2));
  }

  const headerStagger = reduced ? staggerContainer(0.01, 0) : staggerContainer(0.12, 0.08);

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        light
          ? "mt-14 py-14 text-charcoal sm:py-16 md:py-20"
          : "bg-charcoal py-20 text-cream sm:py-24 md:py-32",
      )}
    >
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent",
          light ? "from-transparent via-charcoal/[0.12]" : "from-transparent via-cream/[0.06]",
        )}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={{ duration: 0.9, ease: easeOut }}
      />

      <div className={cn("mx-auto max-w-content", !light && "px-5 md:px-8")}>
        <motion.div
          className={cn(light ? "mb-12 md:mb-16" : "mb-16 md:mb-24")}
          variants={headerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.p
            variants={staggerItem}
            lang="ne"
            className={cn("mb-4 text-gold", neFace)}
          >
            {ne.whatWeDo}
          </motion.p>
          <motion.div
            variants={staggerItem}
            className="flex flex-col justify-between gap-8 md:flex-row md:items-end md:gap-10"
          >
            <div className="max-w-xl">
              <h2 className="font-display font-bold leading-[1.14] tracking-[-0.022em] md:leading-[1.12]">
                <span
                  className={cn(
                    "block text-[clamp(2.15rem,6.2vw,3.85rem)]",
                    light ? "text-charcoal" : "text-cream",
                  )}
                >
                  PRINT
                </span>
                <span
                  className={cn(
                    "block text-[clamp(2.15rem,6.2vw,3.85rem)]",
                    light ? "text-charcoal" : "text-cream",
                  )}
                >
                  <em
                    className={cn(
                      "font-normal not-italic hero-pride",
                      light && "text-gold",
                    )}
                  >
                    Solutions
                  </em>
                </span>
              </h2>
              <p
                className={cn(
                  "mt-4 max-w-md font-sans text-[15px] font-normal leading-[1.65] md:mt-5 md:text-[16px]",
                  light ? "text-charcoal/72" : "text-cream/58",
                )}
              >
                From custom flag printing to foil, paper, jersey, and banners,
                each service is built around clear output quality, practical
                timelines, and production-ready detail.
              </p>
            </div>
            <p
              className={cn(
                "max-w-sm shrink-0 font-sans text-[14px] font-normal leading-[1.85] md:text-right md:text-[15px]",
                light ? "text-charcoal/58" : "text-cream/48",
              )}
            >
              Six core service lines designed so buyers can compare options
              quickly and move forward without guesswork.
            </p>
          </motion.div>
        </motion.div>

        <div className="hidden md:block">
          <div className="space-y-20 lg:space-y-24">
            {pairs.map((pair, pairIdx) => (
              <motion.div
                key={pairIdx}
                className="grid grid-cols-2 items-start gap-x-12 gap-y-12 lg:gap-x-20 lg:gap-y-0"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px", amount: 0.12 }}
                transition={{
                  duration: 0.65,
                  ease: easeOut,
                  delay: reduced ? 0 : pairIdx * 0.09,
                }}
              >
                <div>
                  <ServiceItem service={pair[0]} index={pairIdx * 2} align="left" variant={variant} />
                </div>
                {pair[1] && (
                  <div>
                    <ServiceItem service={pair[1]} index={pairIdx * 2 + 1} align="right" variant={variant} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <Accordion
            defaultOpenId={null}
            tone={light ? "light" : "dark"}
            className={cn(
              "rounded-sm border bg-transparent",
              light ? "border-charcoal/[0.1]" : "border-cream/[0.06]",
            )}
            items={services.map((s, i) => ({
              id: s.id,
              title: (
                <span className="flex items-center gap-3 font-normal">
                  <span
                    className={cn(
                      "font-display text-[18px] font-bold",
                      light ? "text-gold/60" : "text-gold/50",
                    )}
                  >
                    {s.number}
                  </span>
                  <span className={cn("h-px w-4", light ? "bg-charcoal/12" : "bg-cream/[0.08]")} />
                  <span
                    className={cn(
                      "font-display text-[1rem] font-bold",
                      light ? "text-charcoal" : "text-cream",
                    )}
                  >
                    {s.name}
                  </span>
                </span>
              ),
              content: (
                <p
                  className={cn(
                    "text-[13px] leading-[1.85] pt-1",
                    light ? "text-charcoal/50" : "text-cream/40",
                  )}
                >
                  {s.description}
                </p>
              ),
            }))}
          />
        </motion.div>

        {/* Outro CTA — primary quote action + catalogue fallback */}
        <motion.div
          className={cn(
            "mt-16 flex flex-col items-start gap-5 border-t pt-10 sm:flex-row sm:items-center sm:justify-between md:mt-20 md:pt-12",
            light ? "border-charcoal/[0.08]" : "border-cream/[0.06]",
          )}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <p
            className={cn(
              "max-w-md text-[13px] leading-[1.9] md:text-[14px]",
              light ? "text-charcoal/55" : "text-cream/40",
            )}
          >
            Tell us what you need and we&rsquo;ll scope it end-to-end — from
            artwork to delivery across Nepal.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href="/contact"
              variant={light ? "primary" : "primary"}
              className="text-xs uppercase tracking-[0.18em]"
            >
              Request a quote
            </Button>
            <Button
              href="/shop"
              variant={light ? "inverse" : "outline"}
              className="text-xs uppercase tracking-[0.18em]"
            >
              Browse catalogue
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
