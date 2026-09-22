"use client";

import { useOrder } from "@/context/order-context";
import { formatBs, formatUsd } from "@/lib/format";

export function CartSummary() {
  const { totals, fulfillment, deliveryCalculating, deliveryFee, deliveryKm, bcvRate } = useOrder();
  const delivery = fulfillment === "delivery" ? deliveryCalculating ? "Calculando…" : deliveryFee === null ? "Por confirmar" : `${formatUsd(deliveryFee)} · ${deliveryKm?.toFixed(1)} km` : "—";
  return <div className="cart-breakdown"><div className="cart-breakdown-row"><span>Subtotal</span><b>{formatUsd(totals.subtotal)}</b></div>{totals.packaging > 0 && <div className="cart-breakdown-row"><span>Gastos de caja</span><b>{formatUsd(totals.packaging)}</b></div>}<div className="cart-breakdown-row"><span>Delivery</span><b>{delivery}</b></div><div className="cart-breakdown-row total"><span>Total estimado</span><b>{formatUsd(totals.total)}{totals.pendingDelivery ? " + delivery" : ""}</b></div><div className="rate-chip"><span>{bcvRate ? `Tasa BCV ${formatBs(bcvRate)}` : "Consultando tasa BCV…"}</span><strong>{bcvRate ? `Bs ${formatBs(totals.total * bcvRate)}` : "Bs por confirmar"}</strong></div></div>;
}
