"use client";

import { useSyncExternalStore } from "react";

type StoryPreference = "system" | "cinematic" | "reading";
const key = "jordan-story-motion";
const changeEvent = "jordan-story-motion-change";
let fallback: StoryPreference = "system";

function snapshot(): StoryPreference {
  try {
    const value = window.localStorage.getItem(key);
    return value === "cinematic" || value === "reading" ? value : "system";
  } catch {
    // Storage may be disabled. Keep the choice for this application session.
    return fallback;
  }
}

function subscribe(notify: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) notify();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, notify);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, notify);
  };
}

const serverSnapshot = (): StoryPreference => "system";

export function useStoryPreference() {
  const preference = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  function setPreference(value: Exclude<StoryPreference, "system">) {
    fallback = value;
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // An unavailable storage API must never prevent entering the story.
    }
    window.dispatchEvent(new Event(changeEvent));
  }
  return [preference, setPreference] as const;
}
