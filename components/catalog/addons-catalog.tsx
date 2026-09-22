"use client";

import { useOrder } from "@/context/order-context";

export function AddonsCatalog() {
  const { cart, setActiveItemIndex, openDialog, showToast } = useOrder();
  const choosePizza = () => {
    const indexes = cart.map((item, index) => item.kind === "pizza" ? index : -1).filter((index) => index >= 0);
    if (!indexes.length) { showToast("Debes seleccionar tu Pizza primero"); return; }
    if (indexes.length === 1) { setActiveItemIndex(indexes[0]); openDialog("addons"); return; }
    openDialog("pizza-picker");
  };
  return <div className="catalog-panels reveal" id="pizza-addons"><article className="catalog-panel"><h3>Bordes</h3><p>Disponibles para pizzas pequeñas, medianas y grandes.</p><div className="catalog-list"><button className="catalog-line" type="button" onClick={choosePizza}><span>Queso</span><b>+$3</b></button><button className="catalog-line" type="button" onClick={choosePizza}><span>Jamón + queso</span><b>+$5</b></button><button className="catalog-line" type="button" onClick={choosePizza}><span>Queso + tocineta</span><b>+$6</b></button><button className="catalog-line" type="button" onClick={choosePizza}><span>Queso + salchichón</span><b>+$6</b></button></div><p className="catalog-lock-note">Añade primero una pizza y personalízala desde tu pedido.</p></article><article className="catalog-panel"><h3>Extras</h3><p>Personaliza tu pizza. Precio por ingrediente adicional.</p><div className="catalog-list"><button className="catalog-line" type="button" onClick={choosePizza}><span>Maíz</span><b>+$1</b></button><button className="catalog-line" type="button" onClick={choosePizza}><span>Jamón · Pepperoni · Aceitunas · Champiñones</span><b>+$2 c/u</b></button><button className="catalog-line" type="button" onClick={choosePizza}><span>Tocineta · Salchichón · Anchoas</span><b>+$3 c/u</b></button></div><p className="catalog-lock-note">Los extras se aplican a una pizza específica del pedido.</p></article></div>;
}
