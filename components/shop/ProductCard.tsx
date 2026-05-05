"use client";

import { Button } from "@/components/ui/Button";
import { categoryLabel, type Product } from "@/lib/products";
import Image from "next/image";
import { duration, easeOut, transition } from "@/lib/motion";
import { whatsappHref } from "@/lib/site";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

type ProductCardProps = {
  product: Product;
  onViewDetails: (product: Product) => void;
};

function orderMessage(product: Product) {
  const label = product.code ? `${product.name} (${product.code})` : product.name;
  return `Hi Flags Nepal, I'd like to order ${label}. Could you share the price and availability?`;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ...transition.reveal,
        layout: { duration: duration.md, ease: easeOut },
      }}
      whileHover={{
        y: -6,
        transition: transition.fast,
      }}
      className="group flex flex-col overflow-hidden rounded-sm border border-charcoal/8 bg-white shadow-[0_8px_30px_rgba(15,15,15,0.04)]"
    >
      <button
        type="button"
        onClick={() => onViewDetails(product)}
        className="relative block aspect-square overflow-hidden bg-charcoal text-left"
        aria-label={`View details for ${product.name}`}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-charcoal/5 to-transparent opacity-90" />
        <div className="absolute left-3 top-3 rounded-full border border-cream/20 bg-charcoal/60 px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-cream/90 backdrop-blur">
          {categoryLabel[product.category]}
        </div>
      </button>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="text-left"
            aria-label={`Open details dialog for ${product.name}`}
          >
            <h3 className="font-display text-xl text-charcoal transition-colors group-hover:text-gold">
              {product.name}
            </h3>
          </button>
          {product.code ? (
            <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.12em] text-charcoal/30">Code: {product.code}</p>
          ) : null}
          <p className="mt-2 line-clamp-2 text-[13px] leading-[1.9] text-charcoal/45">{product.shortDescription}</p>
        </div>
        <button
          type="button"
          onClick={() => onViewDetails(product)}
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold transition-colors hover:text-gold/70"
        >
          View details <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
        <div className="mt-auto flex flex-col gap-2">
          <Button
            href={whatsappHref(orderMessage(product))}
            variant="primary"
            className="w-full py-2 text-xs uppercase tracking-widest"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Order on WhatsApp
          </Button>
          <a
            href={`/contact?product=${product.slug}`}
            className="text-center text-[13px] font-medium uppercase tracking-[0.15em] text-charcoal/45 underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            Email a quote instead
          </a>
        </div>
      </div>
    </motion.article>
  );
}
