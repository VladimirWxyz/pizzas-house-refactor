"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import { branchCenters } from "@/data/catalog";
import { useOrder } from "@/context/order-context";
import type { GeoPoint } from "@/types/order";
import { DialogFrame } from "@/components/order/dialog-frame";

export function MapDialog() {
  const { dialog, details, setGeoLocation, closeDialog } = useOrder();
  const [mapElement, setMapElement] = useState<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<LeafletMarker | null>(null);
  const [point, setPoint] = useState<GeoPoint | null>(null);
  const [status, setStatus] = useState("Toca el mapa para marcar el punto exacto de entrega.");

  useEffect(() => {
    if (dialog !== "map" || !mapElement) return;
    const element = mapElement;
    let cancelled = false;
    let leafletMap: LeafletMap | null = null;

    async function initializeMap() {
      try {
        const leaflet = await import("leaflet");
        if (cancelled) return;
        const deliveryMarkerIcon = leaflet.divIcon({
          className: "delivery-map-marker",
          html: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>`,
          iconSize: [30, 30],
          iconAnchor: [15, 28],
        });
        const center = branchCenters[details.branch] ?? [8.275, -62.767];
        leafletMap = leaflet.map(element, { zoomControl: false }).setView(center, 14);
        mapRef.current = leafletMap;
        leafletMap.attributionControl.setPrefix(false);
        leaflet.control.zoom({ position: "bottomright" }).addTo(leafletMap);
        leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
        }).addTo(leafletMap);
        const mark = (next: GeoPoint) => {
          setPoint(next);
          setStatus(`Punto elegido: ${next.lat.toFixed(5)}, ${next.lng.toFixed(5)}`);
          if (markerRef.current) markerRef.current.setLatLng([next.lat, next.lng]);
          else {
            const marker = leaflet.marker([next.lat, next.lng], { draggable: true, title: "Punto de entrega", alt: "Punto de entrega", icon: deliveryMarkerIcon }).addTo(leafletMap!);
            marker.on("dragend", () => { const moved = marker.getLatLng(); mark({ lat: moved.lat, lng: moved.lng }); });
            markerRef.current = marker;
          }
        };
        leafletMap.on("click", (event) => mark({ lat: event.latlng.lat, lng: event.latlng.lng }));
      } catch { /* Si el navegador bloquea el mapa, el diálogo sigue siendo cerrable. */ }
    }

    void initializeMap();

    return () => {
      cancelled = true;
      leafletMap?.remove();
      mapRef.current = null;
      markerRef.current = null;
      setPoint(null);
    };
  }, [details.branch, dialog, mapElement]);

  const save = async () => { if (!point) return; await setGeoLocation(point, "Punto elegido"); closeDialog(); };
  return <DialogFrame name="map" title="Elige tu ubicación" description="Toca el mapa o arrastra el marcador hasta el punto exacto de entrega."><div ref={setMapElement} className="map-picker" aria-label="Mapa para elegir el punto de entrega"/><p className="map-picker-status">{status}</p><div className="map-picker-actions"><button className="btn btn-ghost" type="button" onClick={closeDialog}>Cancelar</button><button className="btn btn-yellow" type="button" disabled={!point} onClick={() => void save()}>Guardar esta ubicación</button></div></DialogFrame>;
}
