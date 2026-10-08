import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JordanMap from "@/components/map/JordanMap";
import TourismHub from "@/components/TourismHub";
import DestinationPage, {
  generateStaticParams,
  generateMetadata,
} from "@/app/destinations/[slug]/page";
import { destinations, projectCoordinates } from "@/data/destinations";
const { push, notFound } = vi.hoisted(() => ({
  push: vi.fn(),
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }), notFound }));
vi.mock("@/components/DestinationStory", () => ({
  default: ({
    destination,
  }: {
    destination: (typeof destinations)[number];
  }) => <h1>{destination.name}</h1>,
}));
describe("Geographic routes", () => {
  it.each(destinations)(
    "navigates from the $name pin to its dedicated route",
    async (d) => {
      render(<JordanMap />);
      await userEvent.click(
        screen.getByRole("button", { name: `Explore ${d.name}` }),
      );
      expect(push).toHaveBeenCalledWith(`/destinations/${d.slug}`);
    },
  );
  it.each(destinations)(
    "resolves promised route params for $slug",
    async (d) => {
      render(
        await DestinationPage({ params: Promise.resolve({ slug: d.slug }) }),
      );
      expect(screen.getByRole("heading", { name: d.name })).toBeInTheDocument();
      expect(
        await generateMetadata({ params: Promise.resolve({ slug: d.slug }) }),
      ).toMatchObject({
        title: `${d.name} — Jordan Heritage Atlas`,
        description: d.subtitle,
      });
    },
  );
  it("returns a 404 for an unknown destination", async () => {
    await expect(
      DestinationPage({ params: Promise.resolve({ slug: "unknown" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });
  it("prerenders every unique destination", () => {
    expect(generateStaticParams()).toEqual(
      destinations.map(({ slug }) => ({ slug })),
    );
    expect(new Set(destinations.map((d) => d.slug)).size).toBe(
      destinations.length,
    );
  });
  it("gives every map hotspot a fixed 44px hit box independent of SVG scaling", () => {
    render(<JordanMap />);
    destinations.forEach((d) => {
      expect(
        screen.getByRole("button", { name: `Explore ${d.name}` }),
      ).toHaveStyle({ width: "44px", height: "44px" });
      const p = projectCoordinates(d.coordinates);
      expect(p.x).toBeGreaterThan(0);
      expect(p.x).toBeLessThan(100);
      expect(p.y).toBeGreaterThan(0);
      expect(p.y).toBeLessThan(100);
    });
  });
  it("shows a rich preview on keyboard focus and hover", async () => {
    render(<JordanMap />);
    const user = userEvent.setup();
    await user.hover(screen.getByRole("button", { name: "Explore Petra" }));
    expect(screen.getByRole("status")).toHaveTextContent(destinations[0].hook);
    await user.tab();
    expect(screen.getByRole("button", { name: "Explore Petra" })).toHaveFocus();
  });
  it("filters both map hotspots and the destination collection", async () => {
    render(<TourismHub />);
    await userEvent.click(
      screen.getByRole("button", { name: "Wild landscapes" }),
    );
    expect(
      screen.queryByRole("button", { name: "Explore Petra" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Explore Wadi Rum" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Wild landscapes" }),
    ).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "All places" }));
    expect(
      screen.getByRole("button", { name: "Explore Petra" }),
    ).toBeInTheDocument();
  });
});
