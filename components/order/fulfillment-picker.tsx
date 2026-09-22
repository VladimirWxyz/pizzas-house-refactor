"use client";

import { useOrder } from "@/context/order-context";
import type { Fulfillment } from "@/types/order";

const modes: { value: Fulfillment; icon: string; label: string; detail: string }[] = [
  { value: "dinein", icon: "🍽", label: "En el local", detail: "Disfruta en mesa" },
  { value: "pickup", icon: "🏪", label: "Retirar", detail: "Busca en la sede" },
  { value: "delivery", icon: "🛵", label: "Delivery", detail: "Recíbelo en casa" },
];

export function FulfillmentPicker() {
  const { fulfillment, setFulfillment } = useOrder();
  return <div className="fulfillment"><span className="fulfillment-label">¿Cómo quieres disfrutarlo?</span><div className="fulfillment-options" role="group" aria-label="Modalidad del pedido">{modes.map((mode) => <button key={mode.value} className="fulfillment-option" type="button" aria-pressed={fulfillment === mode.value} onClick={() => setFulfillment(mode.value)}><span aria-hidden="true">{mode.icon}</span><span><strong>{mode.label}</strong><small>{mode.detail}</small></span></button>)}</div></div>;
}
