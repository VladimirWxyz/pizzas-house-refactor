export type SizeKey = "P" | "M" | "G" | "EG" | "60" | "80";
export type PizzaFilter = "all" | "clasica" | "carnes" | "vegetariana";
export type Fulfillment = "dinein" | "pickup" | "delivery";
export type LocationMethod = "gps" | "manual";
export type DialogName = "promo" | "addons" | "pizza-picker" | "note" | "confirm" | "map" | null;

export interface Pizza {
  name: string;
  type: Exclude<PizzaFilter, "all">[];
  desc: string;
  photo?: string;
  prices: Record<SizeKey, number>;
}

export interface Promo {
  name: string;
  detail: string;
  price: number;
  promo10?: boolean;
}

export interface CartItem {
  id: string;
  kind: "pizza" | "promo" | "beverage";
  name: string;
  detail: string;
  price: number;
  note: string;
  promo10?: boolean;
  size?: SizeKey;
  sizeDetail?: string;
  basePrice?: number;
  border?: string;
  extras?: string[];
}

export interface OrderDetails {
  branch: string;
  customerName: string;
  sector: string;
  supportPhone: string;
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface OrderTotals {
  subtotal: number;
  packaging: number;
  delivery: number;
  total: number;
  pendingDelivery: boolean;
}
