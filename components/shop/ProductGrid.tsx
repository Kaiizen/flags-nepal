"use client";

import { categoryLabel, products, type Product, type ProductCategory } from "@/lib/products";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FilterBar } from "./FilterBar";
import { ProductCard } from "./ProductCard";
import { ProductQuickView } from "./ProductQuickView";

const PRODUCT_CATEGORIES = Object.keys(categoryLabel) as ProductCategory[];

function parseCategoryQuery(raw: string | null): ProductCategory | undefined {
  if (!raw) return undefined;
  return PRODUCT_CATEGORIES.includes(raw as ProductCategory) ? (raw as ProductCategory) : undefined;
}

type ProductGridProps = {
  initialFilter?: ProductCategory | "all";
};

export function ProductGrid({ initialFilter = "all" }: ProductGridProps) {
  const searchParams = useSearchParams();
  const categoryQs = searchParams.get("category");

  const [filter, setFilter] = useState<ProductCategory | "all">(
    () => parseCategoryQuery(categoryQs) ?? initialFilter,
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /**
   * Keep filters aligned with URL + server snapshot on SPA navigations. When `?category=`
   * is absent / invalid, fall back to the server-provided category (normally `all`).
   */
  useEffect(() => {
    const parsed = parseCategoryQuery(categoryQs);
    setFilter(parsed ?? initialFilter);
  }, [categoryQs, initialFilter]);

  const list = useMemo(() => {
    const data = filter === "all" ? products : products.filter((p) => p.category === filter);
    return [...data].sort((a, b) => a.name.localeCompare(b.name));
  }, [filter]);

  return (
    <div id="catalogue-grid">
      <FilterBar active={filter} onChange={setFilter} />
      <div className="mb-6 flex items-center justify-between text-sm text-charcoal/40">
        <p>
          Showing <span className="font-semibold text-charcoal">{list.length}</span> catalogue items
        </p>
        <p className="hidden md:block">
          {filter === "all" ? "All categories" : categoryLabel[filter]}
        </p>
      </div>
      <div className="mb-6 rounded-sm border border-gold/25 bg-gold/5 px-4 py-3 text-xs leading-[1.8] text-charcoal/65">
        Note: Some catalogue photos are AI-generated concept visuals.
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} onViewDetails={setSelectedProduct} />
        ))}
      </div>
      {list.length === 0 ? (
        <div className="mt-10 rounded-sm border border-charcoal/8 bg-white p-8 text-center text-[13px] text-charcoal/40">
          No products found in this category yet.
        </div>
      ) : null}
      <ProductQuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
