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
      <head><link rel="preload" as="image" href="/assets/pizza-cuatro-sabores-limpia.webp" type="image/webp" fetchPriority="high"/><link rel="preload" as="font" href="/assets/fonts/archivo-black-latin.woff2" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" as="font" href="/assets/fonts/barlow-condensed-900-latin.woff2" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" as="font" href="/assets/fonts/dm-sans-latin.woff2" type="font/woff2" crossOrigin="anonymous"/></head>
      <body>{children}</body>
    </html>
  );
}
