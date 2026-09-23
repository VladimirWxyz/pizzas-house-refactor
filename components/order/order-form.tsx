"use client";

import { useState } from "react";
import { branches } from "@/data/catalog";
import { deliveryAreas, getDeliveryZonesForBranch } from "@/data/delivery";
import { useOrder } from "@/context/order-context";
import { geolocationErrorMessage } from "@/lib/geolocation";

export function OrderForm() {
  const { details, setDetails, fulfillment, locationMethod, setLocationMethod, setManualSector, locateSector, geoUrl, geoPlace, geoOutOfArea, setGeoLocation, deliveryFee, deliveryCalculating, openDialog, validationError } = useOrder();
  const [gpsStatus, setGpsStatus] = useState("");
  const [manualStatus, setManualStatus] = useState("");
  const update = (patch: Partial<typeof details>) => setDetails({ ...details, ...patch });
  const availableSectors = getDeliveryZonesForBranch(details.branch);
  const selectedBranch = branches.find((branch) => branch.value === details.branch);
  const deliveryArea = selectedBranch ? deliveryAreas[selectedBranch.deliveryArea] : null;
  const selectBranch = (branch: string) => {
    update({ branch, sector: "" });
    if (locationMethod === "manual") setManualSector("");
    setManualStatus("");
  };
  const useGps = () => {
    if (!navigator.geolocation) {
      setGpsStatus(geolocationErrorMessage());
      return;
    }
    setGpsStatus("Solicitando ubicación al teléfono…");
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        setGpsStatus("Ubicación detectada. Calculando la tarifa…");
        await setGeoLocation({ lat: coords.latitude, lng: coords.longitude }, "Ubicación actual");
        setGpsStatus("Ubicación detectada y tarifa guardada.");
      },
      (error) => setGpsStatus(geolocationErrorMessage(error)),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  };
  const confirmSector = async () => {
    setManualStatus("Buscando el sector y calculando la tarifa…");
    const result = await locateSector();
    if (result === "success") setManualStatus("Sector confirmado y tarifa guardada.");
    else if (result === "missing-branch") setManualStatus("Selecciona primero la sede que preparará el pedido.");
    else if (result === "empty") setManualStatus("Escribe o selecciona un sector.");
    else setManualStatus("No encontramos ese sector. Revisa el nombre o marca el punto exacto en el mapa.");
  };
  return <form className="order-form" noValidate onSubmit={(event) => event.preventDefault()}><div className="order-field"><label htmlFor="order-branch">Sede</label><select className="branch-select-native" id="order-branch" value={details.branch} onChange={(event) => selectBranch(event.target.value)}><option value="">Selecciona una sede</option>{branches.map((branch) => <option key={branch.value} value={branch.value}>{branch.label}</option>)}</select><div className="branch-picker" role="group" aria-label="Selecciona la sede">{branches.map((branch) => <button key={branch.value} className="branch-option" type="button" aria-pressed={details.branch === branch.value} onClick={() => selectBranch(branch.value)}><span><strong>{branch.label}</strong><small>{branch.detail}</small></span></button>)}</div></div><div className="order-field"><label htmlFor="order-name">Nombre</label><input id="order-name" value={details.customerName} onChange={(event) => update({ customerName: event.target.value })} autoComplete="name" placeholder="¿Quién recibe?" /></div><div className="order-field"><span>Enviar pedido a</span><div className="support-options" role="group" aria-label="Número de atención al cliente">{[["584148893707", "Atención al cliente 1", "0414 889 3707"], ["584127094898", "Atención al cliente 2", "0412 709 4898"]].map(([phone, label, number]) => <button key={phone} className="support-option" type="button" aria-pressed={details.supportPhone === phone} onClick={() => update({ supportPhone: phone })}><strong>{label}</strong><small>{number}</small></button>)}</div></div>{fulfillment === "delivery" && <div className="delivery-fields"><div className="gps-card"><span>Ubicación para el delivery</span><div className="location-methods" role="group" aria-label="Método para indicar la ubicación"><button className="location-method" type="button" aria-pressed={locationMethod === "gps"} onClick={() => setLocationMethod("gps")}>⌖ GPS</button><button className="location-method" type="button" aria-pressed={locationMethod === "manual"} onClick={() => setLocationMethod("manual")}>⌨ Manual</button></div>{locationMethod === "gps" ? <div className="gps-location"><div className="gps-actions"><button className="gps-button" type="button" onClick={useGps}>⌖ {geoUrl ? "Actualizar ubicación actual" : "Usar mi ubicación actual"}</button><button className="gps-button secondary" type="button" onClick={() => openDialog("map")}>⌖ {geoUrl ? "Cambiar punto guardado" : "Elegir punto en el mapa"}</button></div><span className={`gps-status${gpsStatus && !geoUrl ? " is-warning" : ""}`} role="status">{gpsStatus || (geoUrl ? "Ubicación guardada para calcular el delivery." : "Detectaremos el sector y guardaremos el punto exacto para el delivery.")}</span>{geoPlace && <strong className={`gps-place ${geoOutOfArea ? "is-warning" : ""}`}>📍 {geoPlace}</strong>}{geoUrl && <a className="gps-link" href={geoUrl} target="_blank" rel="noopener">Ver ubicación guardada ↗</a>}</div> : <div className="manual-location"><label htmlFor="delivery-sector">Busca o escribe tu sector</label><input id="delivery-sector" type="search" list="delivery-sectors" value={details.sector} onChange={(event) => { setManualSector(event.target.value); setManualStatus(""); }} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); void confirmSector(); } }} placeholder={deliveryArea ? `Ej. ${availableSectors[0]?.name ?? "tu sector"}` : "Selecciona primero una sede"} autoComplete="off"/><datalist id="delivery-sectors">{availableSectors.map((sector) => <option key={sector.id} value={sector.name} />)}</datalist><span className="manual-hint">{deliveryArea ? `La búsqueda sugiere sectores de ${deliveryArea.label}.` : "Selecciona una sede para ver los sectores disponibles."}</span><button className="manual-confirm-button" type="button" disabled={deliveryCalculating || !details.sector.trim()} onClick={() => void confirmSector()}>✓ {deliveryCalculating ? "Calculando…" : deliveryFee !== null ? "Sector y tarifa confirmados" : "Confirmar sector y calcular"}</button>{manualStatus && <span className={`manual-status${deliveryFee === null ? " is-warning" : ""}`} role="status">{manualStatus}</span>}<button className="manual-map-button" type="button" onClick={() => { setLocationMethod("gps"); openDialog("map"); }}>⌖ Marcar punto exacto en el mapa</button></div>}</div></div>}<p className="form-error" role="alert">{validationError}</p></form>;
}
