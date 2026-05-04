"use client";

import { cn } from "@/lib/cn";
import { springSnappy, transition } from "@/lib/motion";
import type { ProductCategory } from "@/lib/products";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const filters: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hand-flags", label: "Hand Flags" },
  { id: "table-stands", label: "Table Stands" },
  { id: "indoor-outdoor-stands", label: "Indoor & Outdoor Stands" },
  { id: "vehicle-stands-sticks", label: "Vehicle Stands & Sticks" },
  { id: "hardware-fabrics", label: "Hardware & Fabrics" },
];

type FilterBarProps = {
  active: ProductCategory | "all";
  onChange: (c: ProductCategory | "all") => void;
};

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="mb-10 rounded-sm border border-charcoal/8 bg-white p-4 shadow-[0_8px_30px_rgba(15,15,15,0.04)] md:p-5">
      <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-gold">
        <Sparkles className="h-3.5 w-3.5" />
        Discover by category
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <motion.button
            key={f.id}
            type="button"
            onClick={() => onChange(f.id)}
            className={cn(
              "relative rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-300",
              active === f.id
                ? "border-transparent text-cream"
                : "border-charcoal/12 text-charcoal/60 hover:border-gold/40",
            )}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={transition.fast}
          >
            {active === f.id && (
              <motion.span
                layoutId="shopFilterActive"
                className="absolute inset-0 -z-0 rounded-full bg-charcoal shadow-sm"
                transition={springSnappy}
              />
            )}
            <span className="relative z-10">{f.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
