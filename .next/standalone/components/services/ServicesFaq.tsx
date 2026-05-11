"use client";

import { Accordion } from "@/components/ui/Accordion";
import { servicesFaqItems } from "@/lib/services-faq";

export function ServicesFaq() {
  const items = servicesFaqItems.map((entry, index) => ({
    id: `services-faq-${index}`,
    title: entry.title,
    content: <p className="text-[13px] leading-[1.85]">{entry.content}</p>,
  }));

  return <Accordion items={items} tone="light" />;
}
