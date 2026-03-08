import React from "react";
import { notFound } from "next/navigation";
import { standardDetails } from "@/components/standards/standard-detail-data";
import StandardDetailContent from "@/components/standards/StandardDetailContent";

const validSlugs = ["identify", "capture", "share"];

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export default async function StandardDetailPage({ params }) {
  const { slug } = await params;
  const data = standardDetails[slug];

  if (!data) notFound();

  return <StandardDetailContent data={data} />;
}