"use client";

import { useState } from "react";
import { extrasForSize, monsterBorders, regularBorders } from "@/data/catalog";
import { useOrder } from "@/context/order-context";
import { formatUsd } from "@/lib/format";
import { DialogFrame } from "@/components/order/dialog-frame";

export function AddonDialog() {
  const { dialog, cart, activeItemIndex } = useOrder();
  const item = cart[activeItemIndex];
  if (dialog !== "addons" || !item) return null;
  return <AddonEditor key={item.id} />;
}

function AddonEditor() {
  const { cart, activeItemIndex, replaceItem, closeDialog, showToast } = useOrder();
  const item = cart[activeItemIndex];
  const [border, setBorder] = useState(item.border ?? "");
  const [selectedExtras, setSelectedExtras] = useState<string[]>(item.extras ?? []);
  const isMonster = item?.size === "60" || item?.size === "80";
  const hasRegularBorder = item?.size === "P" || item?.size === "M" || item?.size === "G";
  const borders = isMonster ? monsterBorders.map((entry) => ({ name: entry.name, label: entry.label, price: entry.prices[item.size === "80" ? "80" : "60"] })) : hasRegularBorder ? regularBorders : [];
  const extras = extrasForSize(item.size ?? "M");

  const borderPrice = borders.find((entry) => entry.name === border)?.price ?? 0;
  const extrasPrice = extras.filter((entry) => selectedExtras.includes(entry.name)).reduce((sum, entry) => sum + entry.price, 0);
  const total = (item.basePrice ?? item.price) + borderPrice + extrasPrice;
  const save = () => {
    const detail = [item.sizeDetail, border ? `Borde: ${border}` : "", ...selectedExtras.map((extra) => `Extra: ${extra}`)].filter(Boolean).join(" · ");
    replaceItem(activeItemIndex, { ...item, border, extras: selectedExtras, detail, price: total });
    closeDialog();
    showToast("Extras guardados en tu pizza");
  };
  return <DialogFrame name="addons" title="Añadir extras" description={`${item.name} · ${item.sizeDetail ?? ""}`}><div className="addon-groups">{borders.length > 0 && <section className="addon-group"><h3>{isMonster ? "Borde Monster" : "Elige un borde"}</h3><div className="addon-grid">{borders.map((entry) => <button key={entry.label} className="addon-option" type="button" aria-pressed={border === entry.name} onClick={() => setBorder(entry.name)}><strong>{entry.label}</strong><small>{entry.price ? `+${formatUsd(entry.price)}` : "Sin costo adicional"}</small></button>)}</div></section>}<section className="addon-group"><h3>{isMonster ? "Extras Monster · por 1/4 de pizza" : "Ingredientes extra"}</h3><div className="addon-grid">{extras.map((entry) => <button key={entry.name} className="addon-option" type="button" aria-pressed={selectedExtras.includes(entry.name)} onClick={() => setSelectedExtras((current) => current.includes(entry.name) ? current.filter((name) => name !== entry.name) : [...current, entry.name])}><strong>{entry.name}</strong><small>+{formatUsd(entry.price)}</small></button>)}</div></section></div><p className="order-helper">{isMonster ? "Los extras Monster se cobran por cada 1/4 de pizza seleccionado." : item.size === "EG" ? "Tarifas correspondientes a pizzas extra grandes de 40 cm." : "Tarifas para pizzas pequeñas, medianas y grandes."}</p><div className="addon-total"><span>Total de la pizza</span><b>{formatUsd(total)}</b></div><button className="btn btn-yellow dialog-full-button" type="button" onClick={save}>Guardar extras</button></DialogFrame>;
}
