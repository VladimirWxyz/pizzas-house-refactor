"use client";

import { useOrder } from "@/context/order-context";
import type { Fulfillment } from "@/types/order";
import { DialogFrame } from "@/components/order/dialog-frame";

const options: { mode: Fulfillment; title: string; price: string; detail: string }[] = [
  { mode: "dinein", title: "🍽️ En el local", price: "$10", detail: "Sin gasto de caja." },
  { mode: "pickup", title: "🏪 Retirar", price: "$12", detail: "$10 + $2 de caja." },
  { mode: "delivery", title: "🛵 Delivery", price: "$12 + delivery", detail: "$10 + $2 de caja. La sede confirma el delivery." },
];

export function PromoDialog() {
  const { setFulfillment, addPromo, closeDialog, setDrawerOpen } = useOrder();
  const choose = (mode: Fulfillment) => { setFulfillment(mode); addPromo("combo10"); closeDialog(); setDrawerOpen(true); };
  return <DialogFrame name="promo" title="¿Cómo la vas a disfrutar?" description="La promo cuesta $10 en el local. Para llevar, se añaden $2 por gastos de caja."><div className="promo-mode-grid">{options.map((option) => <button key={option.mode} className="promo-mode" type="button" onClick={() => choose(option.mode)}><strong>{option.title}</strong><b>{option.price}</b><small>{option.detail}</small></button>)}</div><p className="dialog-price-note">La sede confirmará el costo del delivery antes de preparar el pedido.</p></DialogFrame>;
}
