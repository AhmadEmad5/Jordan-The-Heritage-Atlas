import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DestinationStory from "@/components/DestinationStory";
import { destinations } from "@/data/destinations";
const animation = vi.hoisted(() => ({
  reduced: false,
  active: 0,
  revert: vi.fn(),
  timeline: vi.fn(),
  set: vi.fn(),
}));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: {} }));
vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    set: animation.set,
    utils: {
      toArray: (selector: string, scope: HTMLElement) => [
        ...scope.querySelectorAll(selector),
      ],
    },
    timeline: (options: unknown) => {
      animation.active++;
      animation.timeline(options);
      const chain = { to: vi.fn().mockReturnThis() };
      return chain;
    },
    context: (callback: () => void) => {
      const before = animation.active;
      callback();
      const owned = animation.active - before;
      return {
        revert: () => {
          animation.active -= owned;
          animation.revert();
        },
      };
    },
  },
}));
beforeEach(() => {
  window.localStorage.clear();
  animation.reduced = false;
  animation.active = 0;
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({
      matches: animation.reduced,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
  vi.stubGlobal("scrollTo", vi.fn());
});
describe("Story animation lifecycle", () => {
  it("remembers an explicit cinematic choice across destination mounts", async () => {
    animation.reduced = true;
    const view = render(<DestinationStory destination={destinations[0]} />);
    await userEvent.click(screen.getByRole("button", { name: "Enable cinematic story" }));
    expect(localStorage.getItem("jordan-story-motion")).toBe("cinematic");
    view.unmount();
    const next = render(<DestinationStory destination={destinations[1]} />);
    expect(screen.getByLabelText("Wadi Rum story chapters")).toHaveClass("is-cinematic");
    expect(animation.active).toBe(1);
    next.unmount();
    expect(animation.active).toBe(0);
  });

  it("persists reading mode even when reduced motion already selected it", async () => {
    animation.reduced = true;
    Element.prototype.scrollIntoView = vi.fn();
    const view = render(<DestinationStory destination={destinations[0]} />);
    await userEvent.click(screen.getByRole("button", { name: "Read at your pace" }));
    view.unmount();
    animation.reduced = false;
    render(<DestinationStory destination={destinations[1]} />);
    expect(screen.getByLabelText("Wadi Rum story chapters")).toHaveClass("is-reading");
    expect(animation.active).toBe(0);
  });

  it("initializes pinning with scrub 1 and reverts owned triggers on unmount", () => {
    const view = render(<DestinationStory destination={destinations[0]} />);
    expect(animation.timeline).toHaveBeenCalledWith(
      expect.objectContaining({
        scrollTrigger: expect.objectContaining({
          id: "story-petra",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }),
      }),
    );
    expect(animation.active).toBe(1);
    expect(animation.set).toHaveBeenCalledWith(expect.any(Array), {
      autoAlpha: 0,
      yPercent: 100,
    });
    view.unmount();
    expect(animation.revert).toHaveBeenCalledTimes(1);
    expect(animation.active).toBe(0);
  });
  it("cleans up the previous story when a destination changes", () => {
    const view = render(<DestinationStory destination={destinations[0]} />);
    view.rerender(<DestinationStory destination={destinations[1]} />);
    expect(animation.revert).toHaveBeenCalledTimes(1);
    expect(animation.active).toBe(1);
    view.unmount();
    expect(animation.active).toBe(0);
  });
  it("does not create a pinned timeline under reduced motion, and keeps the narrative in reading order", () => {
    animation.reduced = true;
    render(<DestinationStory destination={destinations[0]} />);
    expect(animation.timeline).not.toHaveBeenCalled();
    destinations[0].chapters.forEach((c) =>
      expect(
        screen.getByRole("heading", { name: c.title }),
      ).toBeInTheDocument(),
    );
    expect(animation.active).toBe(0);
  });
  it("opens localized stay discovery and closes accessibly", async () => {
    render(<DestinationStory destination={destinations[0]} />);
    await userEvent.click(screen.getByRole("button", { name: "Find a stay" }));
    const modal = screen.getByRole("dialog");
    expect(modal).toHaveAttribute("open");
    expect(modal).toHaveAccessibleName("Petra guesthouses");
    expect(screen.getByLabelText("Check-in")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Explore providers" }),
    ).toHaveAttribute(
      "href",
      expect.stringContaining("Petra%20guesthouses%20Wadi%20Musa%20hotels"),
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Close booking options" }),
    );
    expect(modal).not.toHaveAttribute("open");
  });
  it("explains reduced motion and allows an explicit cinematic opt-in", async () => {
    animation.reduced = true;
    const view = render(<DestinationStory destination={destinations[0]} />);
    expect(
      screen.getByText(/Reading mode follows your device/),
    ).toBeInTheDocument();
    expect(animation.active).toBe(0);
    await userEvent.click(
      screen.getByRole("button", { name: "Enable cinematic story" }),
    );
    expect(animation.active).toBe(1);
    expect(screen.getByLabelText("Petra story chapters")).toHaveClass(
      "is-cinematic",
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Switch to reading mode" }),
    );
    expect(animation.active).toBe(0);
    expect(screen.getByLabelText("Petra story chapters")).toHaveClass(
      "is-reading",
    );
    view.unmount();
    expect(animation.active).toBe(0);
  });
});
