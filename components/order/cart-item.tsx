"use client";

import { useOrder } from "@/context/order-context";
import { formatUsd } from "@/lib/format";
import type { CartItem as CartItemType } from "@/types/order";

export function CartItem({ item, index }: { item: CartItemType; index: number }) {
  const { fulfillment, removeItem, setActiveItemIndex, openDialog } = useOrder();
  const edit = (dialog: "addons" | "note") => { setActiveItemIndex(index); openDialog(dialog); };
  return <div className="cart-item"><span><b>{item.name}</b><small className={item.promo10 ? "cart-item-promo" : ""}>{item.detail}</small>{item.note && <small className="cart-item-note">Observación: {item.note}</small>}{item.promo10 && fulfillment !== "dinein" && <small className="cart-item-note">+ $2 de caja para llevar</small>}</span><span><b>{formatUsd(item.price)}</b><button className="remove-item" type="button" onClick={() => removeItem(index)}>Quitar</button></span><div className="cart-item-actions">{item.kind === "pizza" && <button className="customize-item" type="button" onClick={() => edit("addons")}>✦ {item.border || item.extras?.length ? "Editar extras" : "Añadir extras"}</button>}<button className="customize-item" type="button" onClick={() => edit("note")}>◷ {item.note ? "Editar observación" : "Observación"}</button></div></div>;
}
