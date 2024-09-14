// src/app/layout.tsx
import "~/styles/globals.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "RE Agencies",
  description: "RE Agencies. Ayurvedic Distributor",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
