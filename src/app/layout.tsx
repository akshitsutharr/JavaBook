import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { getGrouped } from "@/lib/chapters";

export const metadata: Metadata = {
  title: { default: "JavaBook — learn Java, one chapter at a time", template: "%s · JavaBook" },
  description: "A calm, book-style course on Java: notes, code, diagrams and examples for students and teachers.",
  icons: {
    icon: [
      { url: "/icons8-java-color-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons8-java-color-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons8-java-color-96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/icons8-java-color-70.png",
  },
};

export const viewport: Viewport = { themeColor: "#111111", colorScheme: "dark light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const groups = getGrouped().map(({ part, chapters }) => ({
    id: part.id,
    title: part.title,
    chapters: chapters.map((c) => ({ slug: c.slug, number: c.number, title: c.title })),
  }));
  return (
    <html lang="en">
      <body>
        <AppShell groups={groups}>{children}</AppShell>
      </body>
    </html>
  );
}
