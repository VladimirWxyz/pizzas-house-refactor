"use client";

import { useOrder } from "@/context/order-context";
import { DialogFrame } from "@/components/order/dialog-frame";

export function PizzaPickerDialog() {
  const { cart, setActiveItemIndex, openDialog } = useOrder();
  const pizzas = cart.map((item, index) => ({ item, index })).filter(({ item }) => item.kind === "pizza");
  return <DialogFrame name="pizza-picker" className="pizza-picker-dialog" title="Elige tu pizza" description="Los bordes y extras se aplican a una pizza específica."><div className="pizza-choice-grid">{pizzas.map(({ item, index }) => <button key={item.id} className="pizza-choice" type="button" onClick={() => { setActiveItemIndex(index); openDialog("addons"); }}><span><strong>{item.name}</strong><small>{item.sizeDetail}{item.border || item.extras?.length ? " · Personalizada" : ""}</small></span><b>Elegir →</b></button>)}</div></DialogFrame>;
}
