"use client";

import { pizzas, sizeNames } from "@/data/catalog";
import { useOrder } from "@/context/order-context";
import type { PizzaFilter, SizeKey } from "@/types/order";
import { PizzaCard } from "@/components/catalog/pizza-card";
import { AddonsCatalog } from "@/components/catalog/addons-catalog";
import { Beverages } from "@/components/catalog/beverages";

const sizes: SizeKey[] = ["P", "M", "G", "EG", "60", "80"];
const filters: { value: PizzaFilter; label: string }[] = [{ value: "all", label: "Todas" }, { value: "clasica", label: "Clásicas" }, { value: "carnes", label: "Con carnes" }, { value: "vegetariana", label: "Sin carnes" }];

export function MenuSection() {
  const { selectedSize, setSelectedSize, filter, setFilter, addPizza } = useOrder();
  const visible = pizzas.filter((pizza) => filter === "all" || pizza.type.includes(filter));
  const chooseMonster = () => { setSelectedSize("60"); document.querySelector(".menu-tools")?.scrollIntoView({ behavior: "smooth", block: "center" }); };
  return <section className="menu-section" id="menu"><div className="container"><div className="menu-head reveal"><div><p className="eyebrow">La carta</p><h2 className="section-title">Escoge tu <span className="red">favorita</span></h2><p className="section-lead">Selecciona un tamaño para ver los precios. ¿Ya decidió el antojo por ti? Agrégala y termina el pedido por WhatsApp.</p></div><div className="menu-tools"><span className="tool-label">Tamaño seleccionado: <strong>{sizeNames[selectedSize]}</strong></span><div className="sizes" role="group" aria-label="Seleccionar tamaño">{sizes.map((size) => <button key={size} className="size-btn" type="button" aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)}>{size}</button>)}</div></div></div><nav className="catalog-jump" aria-label="Ir a una categoría del catálogo"><a href="#pizza-list">🍕 Pizzas</a><a href="#pizza-addons">✦ <span className="catalog-label-full">Bordes y extras</span><span className="catalog-label-mobile">Extras</span></a><a href="#bebidas">🥤 Bebidas</a></nav><div className="filters" role="group" aria-label="Filtrar pizzas">{filters.map((item) => <button key={item.value} className="chip" type="button" aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>{item.label}</button>)}</div><div className="menu-grid" id="pizza-list">{visible.map((pizza, index) => <PizzaCard key={pizza.name} pizza={pizza} index={index} size={selectedSize} onAdd={() => addPizza(pizza.name)} />)}</div><AddonsCatalog /><Beverages /><article className="monster-banner reveal"><div className="monster-copy"><p className="eyebrow">Para el combo completo</p><h3>Pizzas <span>Monster</span></h3><p>60 u 80 centímetros de puro sabor. Perfectas para cumpleaños, reuniones y esos días en los que una pizza normal simplemente no alcanza.</p><button className="btn btn-yellow" type="button" onClick={chooseMonster}>Ver precios Monster</button></div><div className="monster-visual" role="img" aria-label="Carta de pizzas Monster de Pizzas House" /></article></div></section>;
}
