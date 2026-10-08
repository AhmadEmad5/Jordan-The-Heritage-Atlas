import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinations, getDestination } from "@/data/destinations";
import DestinationStory from "@/components/DestinationStory";
export function generateStaticParams() {
  return destinations.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const d = getDestination((await params).slug);
  return {
    title: d ? `${d.name} — Jordan Heritage Atlas` : "Place not found",
    description: d?.subtitle,
  };
}
export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const d = getDestination((await params).slug);
  if (!d) notFound();
  return <DestinationStory destination={d} />;
}
