"use client";

import { largeExtras, monsterBorders, monsterExtras, regularBorders, regularExtras } from "@/data/catalog";
import { useOrder } from "@/context/order-context";
import { formatUsd } from "@/lib/format";

export function AddonsCatalog() {
  const { cart, setActiveItemIndex, openDialog, showToast } = useOrder();
  const choosePizza = () => {
    const indexes = cart.map((item, index) => item.kind === "pizza" ? index : -1).filter((index) => index >= 0);
    if (!indexes.length) { showToast("Debes seleccionar tu Pizza primero"); return; }
    if (indexes.length === 1) { setActiveItemIndex(indexes[0]); openDialog("addons"); return; }
    openDialog("pizza-picker");
  };
  return <div className="catalog-panels reveal" id="pizza-addons">
    <article className="catalog-panel"><h3>Bordes de queso</h3><p>Aplica solo para las pizzas grandes, medianas y pequeñas.</p><div className="catalog-list">{regularBorders.slice(1).map((item) => <button className="catalog-line" type="button" onClick={choosePizza} key={item.name}><span>{item.label}</span><b>+{formatUsd(item.price)}</b></button>)}</div><p className="catalog-lock-note">Añade primero una pizza y personalízala desde tu pedido.</p></article>
    <article className="catalog-panel"><h3>Extras</h3><p>Aplica solo para las pizzas grandes, medianas y pequeñas.</p><div className="catalog-list">{regularExtras.map((item) => <button className="catalog-line" type="button" onClick={choosePizza} key={item.name}><span>{item.name}</span><b>+{formatUsd(item.price)}</b></button>)}</div><p className="catalog-lock-note">Cada ingrediente se aplica a una pizza específica.</p></article>
    <article className="catalog-panel"><h3>Extras · 40 cm</h3><p>Extras para tus pizzas extra grandes (40 cm).</p><div className="catalog-list">{largeExtras.map((item) => <button className="catalog-line" type="button" onClick={choosePizza} key={item.name}><span>{item.name}</span><b>+{formatUsd(item.price)}</b></button>)}</div><p className="catalog-lock-note">Tarifa exclusiva para pizzas extra grandes.</p></article>
    <article className="catalog-panel catalog-panel--monster"><h3>Extras Monsters</h3><p>Extras para tus Monster Pizzas (60 cm–80 cm), por 1/4 de pizza.</p><div className="catalog-list">{monsterExtras.map((item) => <button className="catalog-line" type="button" onClick={choosePizza} key={item.name}><span>{item.name}</span><b>+{formatUsd(item.price)}</b></button>)}</div><h4>Bordes Monster</h4><p>Aplica solo para las Pizzas Monsters.</p><div className="catalog-size-head"><span>Tipo de borde</span><b>60 cm</b><b>80 cm</b></div><div className="catalog-list">{monsterBorders.slice(1).map((item) => <button className="catalog-line catalog-line--sizes" type="button" onClick={choosePizza} key={item.name}><span>{item.label}</span><b>+{formatUsd(item.prices["60"])}</b><b>+{formatUsd(item.prices["80"])}</b></button>)}</div><p className="catalog-lock-note">Selecciona una Monster de 60 u 80 cm para aplicar estas opciones.</p></article>
  </div>;
}
