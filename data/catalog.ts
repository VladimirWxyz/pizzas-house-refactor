import type { Fulfillment, Pizza, Promo, SizeKey } from "@/types/order";

export const pizzas: Pizza[] = [
  { name: "Full Home", type: ["clasica", "carnes"], desc: "Salsa, queso, pepperoni, maíz, aceitunas negras, champiñones y vegetales.", photo: "/assets/products/full-home.jpg", prices: { P: 12, M: 14, G: 16, EG: 20, "60": 50, "80": 60 } },
  { name: "Pizza Radical", type: ["clasica", "carnes"], desc: "Salsa, queso, borde de queso, jamón, pepperoni, tocineta y vegetales.", photo: "/assets/products/pizza-radical.jpg", prices: { P: 12, M: 14, G: 16, EG: 20, "60": 50, "80": 60 } },
  { name: "4 Estaciones", type: ["clasica", "carnes"], desc: "Jamón, pepperoni, tocineta y vegetales.", photo: "/assets/products/cuatro-estaciones.jpg", prices: { P: 10, M: 12, G: 14, EG: 16, "60": 40, "80": 50 } },
  { name: "Margarita House", type: ["clasica", "carnes"], desc: "Salsa, jamón y queso.", prices: { P: 5, M: 6, G: 7, EG: 10, "60": 30, "80": 35 } },
  { name: "Margarita House Primavera", type: ["clasica", "carnes"], desc: "Salsa, jamón, tocineta, queso y maíz.", prices: { P: 10, M: 12, G: 14, EG: 16, "60": 40, "80": 50 } },
  { name: "Salchichón Full", type: ["clasica", "carnes"], desc: "Salsa, queso, salchichón y vegetales.", prices: { P: 10, M: 12, G: 14, EG: 16, "60": 40, "80": 50 } },
  { name: "Vegetariana House", type: ["clasica", "vegetariana"], desc: "Salsa, queso, pimentón, cebolla, aceitunas negras, champiñones y maíz.", prices: { P: 10, M: 12, G: 15, EG: 18, "60": 35, "80": 45 } },
  { name: "Full Pepperoni", type: ["clasica", "carnes"], desc: "Salsa, queso mozzarella, pepperoni y vegetales.", prices: { P: 10, M: 12, G: 14, EG: 16, "60": 35, "80": 45 } },
];

export const promos: Record<string, Promo> = {
  combo10: { name: "Promo 2 medianas", detail: "1 Margarita + 1 Pepperoni · medianas", price: 10, promo10: true },
  quedate: { name: "Combo Quédate en casa", detail: "1 grande + 1 mediana + 1 pequeña", price: 25 },
  "full-family": { name: "Combo Full Family", detail: "1 pizza 36 cm + 2 pizzas 33 cm + refresco 1.5 L", price: 30 },
};

export const sizeNames: Record<SizeKey, string> = {
  P: "Pequeña · 28 cm", M: "Mediana · 33 cm", G: "Grande · 36 cm", EG: "Extra grande · 40 cm", "60": "Monster · 60 cm", "80": "Monster XL · 80 cm",
};

export const fulfillmentNames: Record<Fulfillment, string> = {
  dinein: "Consumir en el local", pickup: "Retirar en la sede", delivery: "Delivery",
};

export const supportNumbers: Record<string, string> = {
  "584148893707": "Atención al cliente 1 · 0414 889 3707",
  "584127094898": "Atención al cliente 2 · 0412 709 4898",
};

export const branches = [
  { value: "Unare II", label: "Unare II", detail: "Virgen Niña" },
  { value: "Alta Vista", label: "Alta Vista", detail: "Clínica La Esperanza" },
  { value: "Villa Brasil · Club La Cantera", label: "Villa Brasil", detail: "Club La Cantera" },
  { value: "San Félix · Moreno de Mendoza", label: "San Félix", detail: "Moreno de Mendoza" },
];

export const branchCenters: Record<string, [number, number]> = {
  "Unare II": [8.2733399, -62.7689088],
  "Alta Vista": [8.2922507, -62.7344649],
  "Villa Brasil · Club La Cantera": [8.3117789, -62.7249609],
};

export const sectorPoints: Record<string, { lat: number; lng: number }> = {
  curagua: { lat: 8.27008, lng: -62.77895 }, "alta vista": { lat: 8.29516, lng: -62.73171 }, "los olivos": { lat: 8.28304, lng: -62.71372 }, "la churuata": { lat: 8.28531, lng: -62.72326 }, "villa asia": { lat: 8.28268, lng: -62.72625 }, "villa brasil": { lat: 8.31015, lng: -62.72762 }, "villa granada": { lat: 8.31375, lng: -62.73148 }, "villa tocoma": { lat: 8.26017, lng: -62.78396 }, "sierra parima": { lat: 8.25033, lng: -62.80265 }, caujaro: { lat: 8.26598, lng: -62.78451 }, "unare i": { lat: 8.27908, lng: -62.7515 }, "unare ii": { lat: 8.27592, lng: -62.76065 }, "unare iii": { lat: 8.27374, lng: -62.76856 }, "los mangos": { lat: 8.2901, lng: -62.72041 }, "el guamo": { lat: 8.27478, lng: -62.78208 }, "las garzas": { lat: 8.26215, lng: -62.76753 }, "el caimito": { lat: 8.26606, lng: -62.79102 }, orinokia: { lat: 8.29282, lng: -62.74188 }, castillito: { lat: 8.31525, lng: -62.70661 }, chilemex: { lat: 8.30594, lng: -62.72345 }, mendoza: { lat: 8.30689, lng: -62.70614 }, "toro muerto": { lat: 8.26806, lng: -62.72681 }, "core 8": { lat: 8.22855, lng: -62.82539 }, "francisca duarte": { lat: 8.30324, lng: -62.6298 },
};

export const sectors = Object.keys(sectorPoints).map((sector) => sector.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase()));

export const regularBorders = [
  { name: "", label: "Sin borde extra", price: 0 }, { name: "Queso", label: "Queso", price: 3 }, { name: "Jamón + queso", label: "Jamón + queso", price: 5 }, { name: "Queso + tocineta", label: "Queso + tocineta", price: 6 }, { name: "Queso + salchichón", label: "Queso + salchichón", price: 6 },
];

export const monsterBorders = [
  { name: "", label: "Sin borde extra", prices: { "60": 0, "80": 0 } }, { name: "Queso", label: "Queso", prices: { "60": 10, "80": 10 } }, { name: "Queso + salchichón", label: "Queso + salchichón", prices: { "60": 15, "80": 20 } }, { name: "Queso + tocineta", label: "Queso + tocineta", prices: { "60": 15, "80": 20 } }, { name: "Queso + jamón", label: "Queso + jamón", prices: { "60": 15, "80": 15 } },
];

export const extras = [
  { name: "Maíz", price: 1 }, { name: "Jamón", price: 2 }, { name: "Pepperoni", price: 2 }, { name: "Aceitunas negras", price: 2 }, { name: "Champiñones", price: 2 }, { name: "Tocineta", price: 3 }, { name: "Salchichón", price: 3 }, { name: "Anchoas", price: 3 },
];
