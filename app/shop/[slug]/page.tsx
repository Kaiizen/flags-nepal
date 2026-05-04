import { siteConfig } from "@/lib/site";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { categoryLabel, getProductBySlug, products } from "@/lib/products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Catalogue Item", alternates: { canonical: `/shop/${params.slug}` } };
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: {
      canonical: `/shop/${params.slug}`,
    },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      type: "website",
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: product.images[0] ? [product.images[0]] : undefined,
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => `${siteConfig.url}${img}`),
    sku: product.code ?? product.slug,
    category: categoryLabel[product.category],
    brand: {
      "@type": "Brand",
      name: "Flags Nepal",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Flags Nepal",
      url: siteConfig.url,
    },
    additionalProperty: product.specifications.map((spec) => ({
      "@type": "PropertyValue",
      name: "Specification",
      value: spec,
    })),
    url: `${siteConfig.url}/shop/${product.slug}`,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Catalogue", item: `${siteConfig.url}/shop` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${siteConfig.url}/shop/${product.slug}` },
    ],
  };

  return (
    <div className="page-shell-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetail product={product} />
    </div>
  );
}
