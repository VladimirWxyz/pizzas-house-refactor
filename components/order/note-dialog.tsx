"use client";

import { useState } from "react";
import { useOrder } from "@/context/order-context";
import { DialogFrame } from "@/components/order/dialog-frame";

export function NoteDialog() {
  const { dialog, cart, activeItemIndex } = useOrder();
  const item = cart[activeItemIndex];
  if (dialog !== "note" || !item) return null;
  return <NoteEditor key={item.id} />;
}

function NoteEditor() {
  const { cart, activeItemIndex, replaceItem, closeDialog, showToast } = useOrder();
  const item = cart[activeItemIndex];
  const [note, setNote] = useState(item.note);
  const save = () => { replaceItem(activeItemIndex, { ...item, note: note.trim() }); closeDialog(); showToast(note.trim() ? "Observación guardada" : "Observación eliminada"); };
  return <DialogFrame name="note" title="Observación" description={`Indica cualquier detalle para ${item.name}.`}><label className="order-field"><span>Observación opcional</span><textarea value={note} onChange={(event) => setNote(event.target.value)} maxLength={240} placeholder="Ej: sin cebolla, salsa aparte…" /></label><p className="order-helper">La observación se enviará junto a este producto por WhatsApp.</p><button className="btn btn-yellow dialog-full-button" type="button" onClick={save}>Guardar observación</button></DialogFrame>;
}
