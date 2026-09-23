import type { GeoPoint } from "@/types/order";
import type { DeliveryRateRule } from "@/data/delivery";

export function estimatedRoadKm(origin: [number, number], point: GeoPoint) {
  const radians = (value: number) => (value * Math.PI) / 180;
  const earthRadius = 6371;
  const dLat = radians(point.lat - origin[0]);
  const dLng = radians(point.lng - origin[1]);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(radians(origin[0])) * Math.cos(radians(point.lat)) * Math.sin(dLng / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1.2;
}

export function deliveryPriceFor(kilometers: number, rules: readonly DeliveryRateRule[]) {
  return rules.find((rule) => rule.upToKm === undefined || kilometers <= rule.upToKm)?.fee ?? null;
}
