import Link from "next/link";

export default function NotFound() {
  return (
    <div className="home" style={{ textAlign: "center", paddingTop: 120 }}>
      <h1 style={{ fontSize: 64, margin: 0 }}>404</h1>
      <p style={{ color: "var(--text-dim)" }}>This page doesn’t exist (yet).</p>
      <Link href="/" className="btn primary">
        Back to JavaBook
      </Link>
    </div>
  );
}
