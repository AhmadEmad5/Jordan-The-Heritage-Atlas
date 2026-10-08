import Link from "next/link";
export default function NotFound() {
  return (
    <main className="story-loading">
      <p className="eyebrow">OFF THE BEATEN PATH</p>
      <h1>This place isn’t in our atlas.</h1>
      <Link href="/" className="solid-button">
        Return to the map
      </Link>
    </main>
  );
}
