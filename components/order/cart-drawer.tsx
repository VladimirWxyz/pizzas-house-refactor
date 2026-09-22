"use client";

import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useOrder } from "@/context/order-context";
import { CartItem } from "@/components/order/cart-item";
import { FulfillmentPicker } from "@/components/order/fulfillment-picker";
import { OrderForm } from "@/components/order/order-form";
import { CartSummary } from "@/components/order/cart-summary";

export function CartDrawer() {
  const { cart, fulfillment, totals, drawerOpen, setDrawerOpen, reviewOrder, deliveryFee, deliveryKm } = useOrder();
  const note = fulfillment === "delivery" ? deliveryFee === null ? "Tiempo estimado: 45 minutos. La sede confirmará la tarifa y disponibilidad." : `Tarifa calculada por ruta desde la sede elegida: ${deliveryKm?.toFixed(1)} km. Tiempo estimado: 45 minutos.` : "Tiempo estimado: 45 minutos. La sede confirmará disponibilidad.";
  return <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}><SheetContent className="cart-panel" showCloseButton={false}><SheetDescription className="sr-only">Configura y revisa tu pedido antes de enviarlo por WhatsApp.</SheetDescription><div className="cart-head"><SheetTitle id="cart-title">Tu pedido</SheetTitle><button className="cart-close" type="button" onClick={() => setDrawerOpen(false)} aria-label="Cerrar pedido">×</button></div><div className="cart-items">{cart.length ? cart.map((item, index) => <CartItem key={item.id} item={item} index={index} />) : <p className="cart-empty">Tu pedido está vacío.<br/>Elige una pizza o una promo.</p>}</div><div className="cart-foot"><FulfillmentPicker /><OrderForm /><div className={`promo-fee-alert ${totals.packaging ? "visible" : ""}`}>La promo de $10 suma $2 por gastos de caja cuando es para retirar o delivery.</div><CartSummary /><button className="btn btn-yellow" type="button" onClick={reviewOrder}>Revisar pedido</button><p className="cart-note">{note}</p></div></SheetContent></Sheet>;
}
