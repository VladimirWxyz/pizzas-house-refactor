import { normalizeSector } from "@/lib/format";
import type { GeoPoint } from "@/types/order";

export type DeliveryAreaId = "puerto-ordaz" | "san-felix";

export interface DeliveryZone extends GeoPoint {
  id: string;
  name: string;
  aliases?: readonly string[];
}

export interface DeliveryRateRule {
  upToKm?: number;
  fee: number;
}

export const PUERTO_ORDAZ_DELIVERY_ZONES: readonly DeliveryZone[] = [
  { id: "curagua", name: "Curagua", lat: 8.27008, lng: -62.77895 },
  { id: "alta-vista", name: "Alta Vista", lat: 8.29516, lng: -62.73171 },
  { id: "los-olivos", name: "Los Olivos", lat: 8.28304, lng: -62.71372 },
  { id: "la-churuata", name: "La Churuata", lat: 8.28531, lng: -62.72326 },
  { id: "villa-asia", name: "Villa Asia", lat: 8.28268, lng: -62.72625 },
  { id: "villa-brasil", name: "Villa Brasil", lat: 8.31015, lng: -62.72762 },
  { id: "villa-granada", name: "Villa Granada", lat: 8.31375, lng: -62.73148 },
  { id: "villa-tocoma", name: "Villa Tocoma", lat: 8.26017, lng: -62.78396 },
  { id: "sierra-parima", name: "Sierra Parima", lat: 8.25033, lng: -62.80265 },
  { id: "caujaro", name: "Caujaro", lat: 8.26598, lng: -62.78451 },
  { id: "unare-i", name: "Unare I", lat: 8.27908, lng: -62.7515 },
  { id: "unare-ii", name: "Unare II", lat: 8.27592, lng: -62.76065 },
  { id: "unare-iii", name: "Unare III", lat: 8.27374, lng: -62.76856 },
  { id: "los-mangos", name: "Los Mangos", lat: 8.2901, lng: -62.72041 },
  { id: "el-guamo", name: "El Guamo", lat: 8.27478, lng: -62.78208 },
  { id: "las-garzas", name: "Las Garzas", lat: 8.26215, lng: -62.76753 },
  { id: "el-caimito", name: "El Caimito", lat: 8.26606, lng: -62.79102 },
  { id: "orinokia", name: "Orinokia", lat: 8.29282, lng: -62.74188 },
  { id: "castillito", name: "Castillito", lat: 8.31525, lng: -62.70661 },
  { id: "chilemex", name: "Chilemex", lat: 8.30594, lng: -62.72345 },
  { id: "mendoza", name: "Mendoza", lat: 8.30689, lng: -62.70614 },
  { id: "toro-muerto", name: "Toro Muerto", lat: 8.26806, lng: -62.72681 },
  { id: "core-8", name: "Core 8", lat: 8.22855, lng: -62.82539 },
];

export const SAN_FELIX_DELIVERY_ZONES = [
  { id: "moreno-mendoza", name: "Moreno de Mendoza", lat: 8.34722, lng: -62.67291 },
  { id: "el-roble", name: "El Roble", lat: 8.35467, lng: -62.67468 },
  { id: "guaiparo", name: "Guaiparo", lat: 8.33887, lng: -62.68766 },
  { id: "dalla-costa", name: "Dalla Costa", lat: 8.34271, lng: -62.67942 },
  { id: "vista-alegre", name: "Vista Alegre", lat: 8.34804, lng: -62.64605 },
  { id: "el-gallo", name: "El Gallo", aliases: ["Manuel Piar"], lat: 8.36428, lng: -62.64665 },
  { id: "la-unidad", name: "La Unidad", lat: 8.36604, lng: -62.65295 },
  { id: "nueva-chirica", name: "Nueva Chirica", lat: 8.35243, lng: -62.63676 },
  { id: "guaicaipuro", name: "Guaicaipuro", lat: 8.34761, lng: -62.63365 },
  { id: "san-jose-chirica", name: "San José de Chirica", lat: 8.33309, lng: -62.62875 },
  { id: "brisas-del-sur", name: "Brisas del Sur", lat: 8.33086, lng: -62.63566 },
  { id: "25-de-marzo", name: "25 de Marzo", lat: 8.35998, lng: -62.62392 },
  { id: "vista-al-sol", name: "Vista al Sol", lat: 8.35705, lng: -62.61401 },
  { id: "vista-al-sol-ii", name: "Vista al Sol II", lat: 8.36052, lng: -62.61295 },
  { id: "ines-romero", name: "Inés Romero", lat: 8.37323, lng: -62.61103 },
  { id: "la-victoria", name: "La Victoria", lat: 8.34447, lng: -62.60411 },
  { id: "trapichito", name: "Trapichito", lat: 8.33153, lng: -62.61515 },
  { id: "chirica-vieja", name: "Chirica Vieja", lat: 8.31629, lng: -62.61798 },
] as const satisfies readonly DeliveryZone[];

export const SAN_FELIX_NEARBY_ZONES = [
  { id: "las-americas", name: "Las Américas", lat: 8.3748, lng: -62.63839 },
  { id: "los-aceites", name: "Los Aceites", lat: 8.37214, lng: -62.64472 },
  { id: "loma-colorada", name: "Loma Colorada", lat: 8.37529, lng: -62.64417 },
  { id: "altamira-i", name: "Altamira I", lat: 8.37904, lng: -62.64288 },
  { id: "altamira-ii", name: "Altamira II", lat: 8.38688, lng: -62.6319 },
  { id: "bella-vista", name: "Bella Vista", lat: 8.36803, lng: -62.63728 },
  { id: "las-batallas", name: "Las Batallas", lat: 8.37208, lng: -62.64852 },
  { id: "jose-gregorio-hernandez", name: "José Gregorio Hernández", aliases: ["La Gallina"], lat: 8.36916, lng: -62.64672 },
  { id: "primero-de-mayo", name: "1ero de Mayo", lat: 8.35924, lng: -62.6389 },
  { id: "la-laguna", name: "La Laguna", lat: 8.33685, lng: -62.69613 },
] as const satisfies readonly DeliveryZone[];

const SAN_FELIX_HISTORICAL_ZONE: DeliveryZone = {
  id: "francisca-duarte",
  name: "Francisca Duarte",
  lat: 8.30324,
  lng: -62.6298,
};

export const deliveryAreas: Record<DeliveryAreaId, { label: string; searchName: string; rateRules: readonly DeliveryRateRule[] }> = {
  "puerto-ordaz": {
    label: "Puerto Ordaz",
    searchName: "Puerto Ordaz",
    rateRules: [{ upToKm: 4, fee: 2 }, { upToKm: 7, fee: 3 }, { fee: 4 }],
  },
  "san-felix": {
    label: "San Félix",
    searchName: "San Félix",
    rateRules: [{ upToKm: 3, fee: 2 }, { upToKm: 4, fee: 3 }, { upToKm: 5, fee: 4 }, { upToKm: 6, fee: 5 }, { upToKm: 7, fee: 6 }, { upToKm: 8, fee: 7 }, { fee: 8 }],
  },
};

export const branches = [
  { value: "Unare II", label: "Unare II", detail: "Virgen Niña", deliveryArea: "puerto-ordaz", point: { lat: 8.2733399, lng: -62.7689088 } },
  { value: "Alta Vista", label: "Alta Vista", detail: "Clínica La Esperanza", deliveryArea: "puerto-ordaz", point: { lat: 8.2922507, lng: -62.7344649 } },
  { value: "Villa Brasil · Club La Cantera", label: "Villa Brasil", detail: "Club La Cantera", deliveryArea: "puerto-ordaz", point: { lat: 8.3117789, lng: -62.7249609 } },
  { value: "San Félix · Moreno de Mendoza", label: "San Félix", detail: "Moreno de Mendoza", deliveryArea: "san-felix", point: { lat: 8.34654, lng: -62.668449 } },
] as const satisfies readonly { value: string; label: string; detail: string; deliveryArea: DeliveryAreaId; point: GeoPoint }[];

const zonesByDeliveryArea: Record<DeliveryAreaId, readonly DeliveryZone[]> = {
  "puerto-ordaz": PUERTO_ORDAZ_DELIVERY_ZONES,
  "san-felix": [...SAN_FELIX_DELIVERY_ZONES, ...SAN_FELIX_NEARBY_ZONES, SAN_FELIX_HISTORICAL_ZONE],
};

export const branchCenters: Record<string, [number, number]> = Object.fromEntries(
  branches.map((branch) => [branch.value, [branch.point.lat, branch.point.lng]]),
);

const pointsFor = (zones: readonly DeliveryZone[]) => Object.fromEntries(
  zones.flatMap((zone) => [zone.name, ...(zone.aliases ?? [])].map((name) => [normalizeSector(name), { lat: zone.lat, lng: zone.lng }])),
) as Record<string, GeoPoint>;

const sectorPointsByDeliveryArea: Record<DeliveryAreaId, Record<string, GeoPoint>> = {
  "puerto-ordaz": pointsFor(zonesByDeliveryArea["puerto-ordaz"]),
  "san-felix": pointsFor(zonesByDeliveryArea["san-felix"]),
};

export const getBranchDeliveryArea = (branchValue: string) => branches.find((branch) => branch.value === branchValue)?.deliveryArea;

export const getDeliveryZonesForBranch = (branchValue: string) => {
  const area = getBranchDeliveryArea(branchValue);
  return area ? zonesByDeliveryArea[area] : [];
};

export const getNearestDeliveryZone = (area: DeliveryAreaId, point: GeoPoint) => {
  const zones = zonesByDeliveryArea[area];
  return zones.reduce<DeliveryZone | null>((nearest, zone) => {
    if (!nearest) return zone;
    const zoneDistance = (zone.lat - point.lat) ** 2 + (zone.lng - point.lng) ** 2;
    const nearestDistance = (nearest.lat - point.lat) ** 2 + (nearest.lng - point.lng) ** 2;
    return zoneDistance < nearestDistance ? zone : nearest;
  }, null);
};

export const getKnownSectorPoint = (branchValue: string, sector: string) => {
  const area = getBranchDeliveryArea(branchValue);
  return area ? sectorPointsByDeliveryArea[area][normalizeSector(sector)] : undefined;
};

export const getDeliveryRateRulesForBranch = (branchValue: string) => {
  const area = getBranchDeliveryArea(branchValue);
  return area ? deliveryAreas[area].rateRules : undefined;
};
