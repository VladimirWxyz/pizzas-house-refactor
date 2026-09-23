"use client";

import { useState } from "react";
import { useOrder } from "@/context/order-context";

const options = [{ size: "1 L", price: 2.5 }, { size: "1.5 L", price: 3.5 }, { size: "2 L", price: 4.5 }];

export function Beverages() {
  const [selected, setSelected] = useState(1);
  const { addBeverage } = useOrder();
  return <section className="beverages-section reveal" id="bebidas" aria-labelledby="beverages-title"><div className="beverages-head"><div><p className="eyebrow">Para acompañar</p><h2 className="section-title" id="beverages-title">Bebidas</h2></div><p>Escoge el tamaño y la sede confirmará los sabores disponibles.</p></div><div className="beverages-grid"><article className="beverage-card"><div className="beverage-photo"><img src="/assets/refrescos-pizzas-house.webp" alt="Refrescos Golden, Pepsi y 7Up disponibles en Pizzas House" width="1086" height="1448" loading="lazy" decoding="async" /></div><div className="beverage-content"><h3>Refrescos</h3><p>Selecciona el tamaño. El sabor se confirma según disponibilidad del local.</p><div className="beverage-flavors" aria-label="Sabores de referencia"><span>Golden</span><span>Pepsi</span><span>7Up</span></div><div className="beverage-sizes" role="group" aria-label="Tamaño de refresco">{options.map((option, index) => <button key={option.size} className="beverage-size" type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{option.size} · ${option.price.toFixed(2)}</button>)}</div><button className="beverage-add" type="button" onClick={() => addBeverage(options[selected].size, options[selected].price)}>+ Agregar refresco</button></div></article></div></section>;
}
