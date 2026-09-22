import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pizzas House · Puerto Ordaz",
  description: "Pizzas House Puerto Ordaz. Pizzas clásicas y Monster, combos, extras y pedidos por WhatsApp.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#e32119" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin=""/></head>
      <body>{children}</body>
    </html>
  );
}
