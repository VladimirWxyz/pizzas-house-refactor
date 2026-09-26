import type { Fulfillment, Pizza, Promo, SizeKey } from "@/types/order";

export { branchCenters, branches } from "@/data/delivery";

export const pizzas: Pizza[] = [
  { name: "Full Home", type: ["clasica", "carnes"], desc: "Salsa, queso, pepperoni, tocineta, maíz, aceitunas negras, champiñones y vegetales.", photo: "/assets/products/full-home.webp", prices: { P: 12, M: 14, G: 16, EG: 20, "60": 55, "80": 65 } },
  { name: "Pizza Radical", type: ["clasica", "carnes"], desc: "Salsa, queso, borde de queso, jamón, pepperoni, tocineta y vegetales.", photo: "/assets/products/pizza-radical.webp", prices: { P: 12, M: 14, G: 16, EG: 20, "60": 55, "80": 65 } },
  { name: "4 Estaciones", type: ["clasica", "carnes"], desc: "Jamón, pepperoni, tocineta y vegetales.", photo: "/assets/products/cuatro-estaciones.webp", prices: { P: 10, M: 12, G: 14, EG: 16, "60": 45, "80": 55 } },
  { name: "Margarita House", type: ["clasica", "carnes"], desc: "Salsa, jamón y queso.", prices: { P: 5, M: 6, G: 7, EG: 10, "60": 35, "80": 40 } },
  { name: "Margarita House Primavera", type: ["clasica", "carnes"], desc: "Salsa, jamón, tocineta, queso y maíz.", prices: { P: 10, M: 12, G: 14, EG: 16, "60": 45, "80": 55 } },
  { name: "Vegetariana House", type: ["clasica", "vegetariana"], desc: "Salsa, queso, pimentón, cebolla, aceitunas negras, champiñones y maíz.", prices: { P: 10, M: 12, G: 15, EG: 18, "60": 40, "80": 50 } },
  { name: "Full Pepperoni", type: ["clasica", "carnes"], desc: "Salsa, queso mozzarella, pepperoni y vegetales.", prices: { P: 10, M: 12, G: 14, EG: 16, "60": 40, "80": 50 } },
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

export const regularBorders = [
  { name: "", label: "Sin borde extra", price: 0 }, { name: "Queso", label: "Queso", price: 3 }, { name: "Jamón + queso", label: "Jamón + queso", price: 5 }, { name: "Queso + tocineta", label: "Queso + tocineta", price: 6 }, { name: "Queso + salchichón", label: "Queso + salchichón", price: 6 },
];

export const monsterBorders = [
  { name: "", label: "Sin borde extra", prices: { "60": 0, "80": 0 } }, { name: "Queso", label: "Queso", prices: { "60": 10, "80": 10 } }, { name: "Queso + tocineta", label: "Queso + tocineta", prices: { "60": 15, "80": 20 } }, { name: "Queso + jamón", label: "Queso + jamón", prices: { "60": 15, "80": 15 } },
];

export const regularExtras = [
  { name: "Jamón", price: 2 }, { name: "Pepperoni", price: 2 }, { name: "Tocineta", price: 3 }, { name: "Maíz", price: 1 }, { name: "Aceitunas negras", price: 2 }, { name: "Champiñones", price: 2 }, { name: "Anchoas", price: 3 },
];

export const largeExtras = [
  { name: "Jamón", price: 3 }, { name: "Pepperoni", price: 3 }, { name: "Tocineta", price: 4 }, { name: "Maíz", price: 2 }, { name: "Aceitunas", price: 3 }, { name: "Champiñones", price: 3 }, { name: "Anchoas", price: 4 },
];

export const monsterExtras = largeExtras;

export function extrasForSize(size: SizeKey) {
  if (size === "EG") return largeExtras;
  if (size === "60" || size === "80") return monsterExtras;
  return regularExtras;
}
