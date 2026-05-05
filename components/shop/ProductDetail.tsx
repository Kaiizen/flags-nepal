"use client";

import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { ne, neFace } from "@/lib/nepali-labels";
import { products, type Product } from "@/lib/products";
import { fadeUpTransition, transition } from "@/lib/motion";
import { siteConfig, whatsappHref } from "@/lib/site";
import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type ProductDetailProps = {
  product: Product;
};

function orderMessage(product: Product) {
  const label = product.code ? `${product.name} (${product.code})` : product.name;
  return `Hi Flags Nepal, I'd like to order ${label}. Could you share the price and availability?`;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const related = useMemo(
    () => products.filter((p) => p.slug !== product.slug).slice(0, 3),
    [product.slug],
  );

  return (
    <div className="mx-auto max-w-content px-5 py-24 md:px-8">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-charcoal/8 bg-charcoal shadow-[0_8px_30px_rgba(15,15,15,0.06)]">
            <Image
              key={product.images[imageIndex]}
              src={product.images[imageIndex]}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 55vw, 100vw"
              priority
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3" role="tablist" aria-label={`${product.name} image gallery`}>
            {product.images.map((src, i) => {
              const isActive = imageIndex === i;
              return (
                <button
                  key={src + i}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show image ${i + 1} of ${product.images.length} for ${product.name}`}
                  onClick={() => setImageIndex(i)}
                  className={`relative aspect-square overflow-hidden rounded-sm border transition-colors ${
                    isActive ? "border-gold" : "border-charcoal/10 hover:border-charcoal/30"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-contain"
                    sizes="120px"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition.reveal}>
          <p lang="ne" className={cn("text-gold", neFace)}>
            {ne.details}
          </p>
          <h1 className="mt-2 font-display text-heading text-charcoal">{product.name}</h1>
          {product.code ? (
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.1em] text-charcoal/30">Code: {product.code}</p>
          ) : null}
          <p className="mt-6 text-[14px] leading-[1.9] text-charcoal/50">{product.description}</p>

          <div className="mt-8 rounded-sm border border-charcoal/8 bg-white p-5 shadow-[0_8px_30px_rgba(15,15,15,0.04)]">
            <h2 className="text-[13px] font-medium uppercase tracking-[0.15em] text-gold">Specifications</h2>
            <ul className="mt-3 space-y-2 text-[13px] text-charcoal/60">
              {product.specifications.map((spec) => (
                <li key={spec} className="list-inside list-disc">
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              href={whatsappHref(orderMessage(product))}
              variant="primary"
              className="w-full sm:flex-1"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Order on WhatsApp
            </Button>
            <Button
              href={`tel:${siteConfig.landlineTel}`}
              variant="inverse"
              className="w-full sm:flex-1"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Call {siteConfig.landline}
            </Button>
          </div>

          <p className="mt-4 text-[12.5px] text-charcoal/45">
            Bulk or custom artwork?{" "}
            <Link
              href={`/contact?product=${product.slug}`}
              className="text-charcoal/70 underline-offset-4 transition-colors hover:text-gold hover:underline"
            >
              Request a written quote
            </Link>
            .
          </p>

          <div className="mt-10">
            <Accordion
              tone="light"
              defaultOpenId={null}
              items={[
                {
                  id: "ship",
                  title: "Pricing, payment & how we quote",
                  content:
                    "Final pricing depends on material, size, quantity, and custom artwork. Share your specifications on WhatsApp or by phone and we will confirm the price in minutes. Online orders are confirmed with 50% advance and the remaining 50% is paid on delivery (COD). Bulk or institutional orders follow custom payment terms — please contact us. We accept cash, bank transfer, eSewa, and Khalti. Walk-ins are welcome at our Bagbazar workshop.",
                },
              ]}
            />
          </div>
        </motion.div>
      </div>

      <section className="mt-20 border-t border-charcoal/10 pt-12">
        <p lang="ne" className={cn("text-gold", neFace)}>
          {ne.related}
        </p>
        <h2 className="mt-2 font-display text-heading-sm text-charcoal">Related products</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {related.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-32px" }}
              transition={fadeUpTransition(i, 0.07)}
              whileHover={{ y: -5 }}
            >
              <Link
                href={`/shop/${p.slug}`}
                className="group block overflow-hidden rounded-sm border border-charcoal/8 bg-white shadow-[0_8px_30px_rgba(15,15,15,0.04)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(15,15,15,0.07)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    sizes="33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg text-charcoal group-hover:text-gold">{p.name}</h3>
                  <p className="mt-1 text-[13px] leading-[1.9] text-charcoal/40">{p.shortDescription}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
