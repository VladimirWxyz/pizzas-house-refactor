"use client";

import { formatUsd } from "@/lib/format";
import type { Pizza, SizeKey } from "@/types/order";

export function PizzaCard({ pizza, index, size, onAdd }: { pizza: Pizza; index: number; size: SizeKey; onAdd: () => void }) {
  return <article className={`pizza-card${pizza.photo ? " has-photo" : ""} reveal in`}><span className="pizza-number">{String(index + 1).padStart(2, "0")}</span><span className="pizza-tag">{size === "60" || size === "80" ? "Monster" : "Favorita de la casa"}</span>{pizza.photo && <div className="pizza-photo"><img src={pizza.photo} alt={pizza.name} loading="lazy" /></div>}<h3>{pizza.name}</h3><p>{pizza.desc}</p><div className="pizza-bottom"><span className="pizza-price">{formatUsd(pizza.prices[size])}</span><button className="add-btn" type="button" onClick={onAdd}>+ Agregar</button></div></article>;
}
