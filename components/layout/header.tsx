"use client";

import { useEffect, useRef, useState } from "react";
import { useOrder } from "@/context/order-context";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { cart, setDrawerOpen } = useOrder();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnOutsideInteraction = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) closeMenu();
    };
    const closeOnScroll = () => closeMenu();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("pointerdown", closeOnOutsideInteraction);
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideInteraction);
      window.removeEventListener("scroll", closeOnScroll);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef}>
      <div className="container nav">
        <a href="#inicio" className="brand" aria-label="Pizzas House, inicio"><span className="brand-mark"><img src="/assets/logo.webp" alt="" width="240" height="541" /></span>Pizzas House</a>
        <div className="delivery-status" aria-label="Servicio de delivery activo"><span className="delivery-dot" aria-hidden="true" /><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true"><path d="M5 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm14 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7 19h7m-4-9h5l3 4h2l1 5h-1M4 10h6v9H7"/><path d="M3 7h7v3H3z"/></svg><span>Delivery activo</span></div>
        <nav id="nav-menu" className={menuOpen ? "open" : ""} aria-label="Navegación principal">
          <a className="nav-link" href="#menu" onClick={closeMenu}>Menú</a><a className="nav-link" href="#tamanos" onClick={closeMenu}>Tamaños</a><a className="nav-link" href="#historia" onClick={closeMenu}>Nuestra casa</a><a className="nav-link" href="#equipo" onClick={closeMenu}>Equipo</a><a className="nav-link" href="#visitanos" onClick={closeMenu}>Visítanos</a>
          <button className="btn btn-yellow cart-nav" type="button" onClick={() => { setDrawerOpen(true); closeMenu(); }}>Mi pedido <span className="cart-count">{cart.length}</span></button>
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="nav-menu" aria-label="Abrir menú" onClick={() => setMenuOpen((open) => !open)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
      </div>
    </header>
  );
}
