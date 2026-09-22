"use client";

import { useEffect, useRef, useState } from "react";
import { branchCenters } from "@/data/catalog";
import { useOrder } from "@/context/order-context";
import type { GeoPoint } from "@/types/order";
import { DialogFrame } from "@/components/order/dialog-frame";

export function MapDialog() {
  const { dialog, details, setGeoLocation, closeDialog } = useOrder();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<LeafletMarker | null>(null);
  const [point, setPoint] = useState<GeoPoint | null>(null);
  const [status, setStatus] = useState("Toca el mapa para marcar el punto exacto de entrega.");

  useEffect(() => {
    if (dialog !== "map" || !containerRef.current) return;
    const leaflet = window.L;
    if (!leaflet) return;
    const center = branchCenters[details.branch] ?? [8.275, -62.767];
    const map = leaflet.map(containerRef.current, { zoomControl: true }).setView(center, 14);
    mapRef.current = map;
    leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap" }).addTo(map);
    const mark = (next: GeoPoint) => {
      setPoint(next);
      setStatus(`Punto elegido: ${next.lat.toFixed(5)}, ${next.lng.toFixed(5)}`);
      if (markerRef.current) markerRef.current.setLatLng([next.lat, next.lng]);
      else {
        const marker = leaflet.marker([next.lat, next.lng], { draggable: true, title: "Punto de entrega", alt: "Punto de entrega" }).addTo(map);
        marker.on("dragend", () => { const moved = marker.getLatLng(); mark({ lat: moved.lat, lng: moved.lng }); });
        markerRef.current = marker;
      }
    };
    map.on("click", (event) => mark({ lat: event.latlng.lat, lng: event.latlng.lng }));
    return () => { map.remove(); mapRef.current = null; markerRef.current = null; setPoint(null); };
  }, [details.branch, dialog]);

  const save = async () => { if (!point) return; await setGeoLocation(point, "Punto elegido"); closeDialog(); };
  return <DialogFrame name="map" title="Elige tu ubicación" description="Toca el mapa o arrastra el marcador hasta el punto exacto de entrega."><div ref={containerRef} className="map-picker" aria-label="Mapa para elegir el punto de entrega"/><p className="map-picker-status">{status}</p><div className="map-picker-actions"><button className="btn btn-ghost" type="button" onClick={closeDialog}>Cancelar</button><button className="btn btn-yellow" type="button" disabled={!point} onClick={() => void save()}>Guardar esta ubicación</button></div></DialogFrame>;
}
