export const formatUsd = (value: number) => `$${value.toFixed(2).replace(/\.00$/, "")}`;

export const formatBs = (value: number) =>
  new Intl.NumberFormat("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

export const normalizeSector = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export const uniqueId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;
