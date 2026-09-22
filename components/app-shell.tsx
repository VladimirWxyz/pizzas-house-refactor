"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { OrderProvider, useOrder } from "@/context/order-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { PromotionsSection } from "@/components/sections/promotions-section";
import { MenuSection } from "@/components/sections/menu-section";
import { SizesSection } from "@/components/sections/sizes-section";
import { StorySection } from "@/components/sections/story-section";
import { TeamSection } from "@/components/sections/team-section";
import { VisitSection } from "@/components/sections/visit-section";
import { InstagramSection } from "@/components/sections/instagram-section";
import { CartDrawer } from "@/components/order/cart-drawer";
import { OrderDialogs } from "@/components/order/order-dialogs";

function PizzaHouseSite() {
  const [loading, setLoading] = useState(true);
  const { cart, totals, setDrawerOpen, toast } = useOrder();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 720);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("in")), { threshold: 0.13 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => { window.clearTimeout(timer); observer.disconnect(); };
  }, []);

  return (
    <>
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="afterInteractive" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossOrigin="" />
      {loading && <div className="site-loader" role="status" aria-live="polite" aria-label="Cargando Pizzas House"><div className="site-loader-inner"><span className="site-loader-logo"><img src="/assets/logo.jpeg" alt="Pizzas House" /></span><span className="site-loader-line" aria-hidden="true" /></div><span className="site-loader-status">Preparando el horno</span></div>}
      <a className="skip" href="#menu">Saltar al menú</a>
      <Header />
      <main>
        <HeroSection />
        <div className="ticker" aria-hidden="true"><div className="ticker-track">{["Promo de 2 pizzas por $10", "4 sedes para elegir", "Monster de 80 cm", "Delivery activo", "Promo de 2 pizzas por $10", "4 sedes para elegir", "Monster de 80 cm", "Delivery activo"].map((text, index) => <span key={`${text}-${index}`}>{text}</span>)}</div></div>
        <PromotionsSection />
        <MenuSection />
        <SizesSection />
        <StorySection />
        <TeamSection />
        <VisitSection />
        <InstagramSection />
      </main>
      <Footer />
      <CartDrawer />
      <OrderDialogs />
      <button className={`mobile-cart-bar ${cart.length ? "active" : ""}`} type="button" onClick={() => setDrawerOpen(true)} aria-label="Abrir mi pedido"><span className="mobile-cart-copy"><span aria-hidden="true">🛒</span><span>Mi pedido</span><span className="mobile-cart-count">{cart.length}</span></span><span className="mobile-cart-total"><b>{`$${totals.total.toFixed(2).replace(/\.00$/, "")}`}</b><span aria-hidden="true">↑</span></span></button>
      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}

export function AppShell() {
  return <OrderProvider><PizzaHouseSite /></OrderProvider>;
}
