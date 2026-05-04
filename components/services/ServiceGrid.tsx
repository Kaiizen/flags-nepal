"use client";

import { Card } from "@/components/ui/Card";
import { fadeUpTransition, transition } from "@/lib/motion";
import { motion } from "framer-motion";

export type ServiceBlock = {
  numeral: string;
  title: string;
  copy: string;
};

export function ServiceGrid({ blocks }: { blocks: ServiceBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <motion.div
          key={b.title}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-36px", amount: 0.12 }}
          transition={fadeUpTransition(i, 0.05)}
          whileHover={{ y: -6, transition: transition.fast }}
        >
          <Card className="h-full border-charcoal/10 bg-white/92 p-6 transition-colors duration-300 hover:border-crimson">
            <p className="text-2xl text-crimson">{b.numeral}</p>
            <h2 className="mt-4 font-display text-heading-sm">{b.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{b.copy}</p>
          </Card>
        </motion.div>
      ))}
    </>
  );
}
