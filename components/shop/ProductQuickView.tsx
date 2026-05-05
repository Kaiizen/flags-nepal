"use client";

import { Button } from "@/components/ui/Button";
import { categoryLabel, type Product } from "@/lib/products";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type ProductQuickViewProps = {
  product: Product | null;
  onClose: () => void;
};

export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const imageCount = product?.images.length ?? 0;

  const goNext = useCallback(() => {
    setImageIndex((i) => (i + 1) % imageCount);
  }, [imageCount]);

  const goPrev = useCallback(() => {
    setImageIndex((i) => (i - 1 + imageCount) % imageCount);
  }, [imageCount]);

  useEffect(() => {
    setImageIndex(0);
  }, [product?.slug]);

  useEffect(() => {
    if (!product) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [product, onClose, goNext, goPrev]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} quick view`}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-sm border border-charcoal/10 bg-cream shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/80 text-cream transition-colors hover:bg-charcoal"
          aria-label="Close details dialog"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden bg-charcoal">
            <Image
              src={product.images[imageIndex]}
              alt={`${product.name} — photo ${imageIndex + 1} of ${imageCount}`}
              fill
              className="object-contain transition-opacity duration-300"
              sizes="50vw"
            />

            {imageCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal/60 text-cream backdrop-blur-sm transition-colors hover:bg-charcoal/85"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal/60 text-cream backdrop-blur-sm transition-colors hover:bg-charcoal/85"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageIndex(i)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        i === imageIndex
                          ? "scale-125 bg-gold"
                          : "bg-cream/50 hover:bg-cream/75"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="p-6 md:p-8">
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-gold">
              {categoryLabel[product.category]}
            </p>
            <h3 className="mt-2 font-display text-3xl text-charcoal">{product.name}</h3>
            {product.code ? (
              <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.12em] text-charcoal/30">
                Code: {product.code}
              </p>
            ) : null}
            <p className="mt-4 text-[13px] leading-[1.9] text-charcoal/50">{product.description}</p>

            <div className="mt-6 rounded-sm border border-charcoal/8 bg-white p-4">
              <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-gold">Specifications</p>
              <ul className="mt-3 space-y-2 text-[13px] text-charcoal/60">
                {product.specifications.map((item) => (
                  <li key={item} className="list-inside list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <Button href={`/contact?product=${product.slug}`} variant="primary" className="w-full">
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
