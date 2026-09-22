interface LeafletPoint { lat: number; lng: number }
interface LeafletMarker {
  addTo(map: LeafletMap): LeafletMarker;
  on(event: "dragend", handler: () => void): void;
  getLatLng(): LeafletPoint;
  setLatLng(point: [number, number]): void;
}
interface LeafletMap {
  setView(point: [number, number], zoom: number): LeafletMap;
  on(event: "click", handler: (event: { latlng: LeafletPoint }) => void): void;
  remove(): void;
}
interface LeafletApi {
  map(element: HTMLElement, options: { zoomControl: boolean }): LeafletMap;
  tileLayer(url: string, options: { maxZoom: number; attribution: string }): { addTo(map: LeafletMap): void };
  marker(point: [number, number], options: { draggable: boolean; title: string; alt: string }): LeafletMarker;
}
interface Window { L?: LeafletApi }
