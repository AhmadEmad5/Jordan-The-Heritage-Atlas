import type { Metadata } from "next";
import TourismHub from "@/components/TourismHub";

export const metadata: Metadata = {
  title: "Jordan — The Heritage Atlas",
  description:
    "Explore Jordan through an interactive atlas of ancient wonders, wild landscapes, and living heritage.",
};

export default function HomePage() {
  return <TourismHub />;
}
