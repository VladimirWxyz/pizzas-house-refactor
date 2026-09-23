"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fulfillmentNames, pizzas, promos, sizeNames } from "@/data/catalog";
import { branchCenters, getBranchDeliveryArea, getDeliveryRateRulesForBranch, getKnownSectorPoint, getNearestDeliveryZone } from "@/data/delivery";
import { deliveryPriceFor, estimatedRoadKm } from "@/lib/delivery";
import { formatBs, formatUsd, uniqueId } from "@/lib/format";
import type { CartItem, DialogName, Fulfillment, GeoPoint, LocationMethod, OrderDetails, OrderTotals, PizzaFilter, SizeKey } from "@/types/order";

interface OrderContextValue {
  selectedSize: SizeKey;
  setSelectedSize: (size: SizeKey) => void;
  filter: PizzaFilter;
  setFilter: (filter: PizzaFilter) => void;
  cart: CartItem[];
  addPizza: (name: string) => void;
  addPromo: (key: string) => void;
  addBeverage: (size: string, price: number) => void;
  removeItem: (index: number) => void;
  replaceItem: (index: number, item: CartItem) => void;
  details: OrderDetails;
  setDetails: (details: OrderDetails) => void;
  fulfillment: Fulfillment;
  setFulfillment: (mode: Fulfillment) => void;
  locationMethod: LocationMethod;
  setLocationMethod: (method: LocationMethod) => void;
  geoUrl: string;
  geoPlace: string;
  geoOutOfArea: boolean;
  setGeoLocation: (point: GeoPoint, label?: string) => Promise<void>;
  setManualSector: (sector: string) => void;
  locateSector: () => Promise<"success" | "empty" | "missing-branch" | "not-found">;
  deliveryFee: number | null;
  deliveryKm: number | null;
  deliveryCalculating: boolean;
  totals: OrderTotals;
  bcvRate: number | null;
  bcvUpdated: string;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  dialog: DialogName;
  openDialog: (dialog: Exclude<DialogName, null>) => void;
  closeDialog: () => void;
  activeItemIndex: number;
  setActiveItemIndex: (index: number) => void;
  validationError: string;
  reviewOrder: () => void;
  whatsappUrl: string;
  toast: string;
  showToast: (message: string) => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [selectedSize, setSelectedSize] = useState<SizeKey>("M");
  const [filter, setFilter] = useState<PizzaFilter>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [details, setDetails] = useState<OrderDetails>({ branch: "", customerName: "", sector: "", supportPhone: "584148893707" });
  const [fulfillment, setFulfillmentState] = useState<Fulfillment>("pickup");
  const [locationMethod, setLocationMethod] = useState<LocationMethod>("gps");
  const [deliveryPoint, setDeliveryPoint] = useState<GeoPoint | null>(null);
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [deliveryKm, setDeliveryKm] = useState<number | null>(null);
  const [deliveryCalculating, setDeliveryCalculating] = useState(false);
  const [geoUrl, setGeoUrl] = useState("");
  const [geoPlace, setGeoPlace] = useState("");
  const [geoOutOfArea, setGeoOutOfArea] = useState(false);
  const [bcvRate, setBcvRate] = useState<number | null>(null);
  const [bcvUpdated, setBcvUpdated] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogName>(null);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [validationError, setValidationError] = useState("");
  const [toast, setToast] = useState("");

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3600);
  }, []);

  const addPizza = useCallback((name: string) => {
    const pizza = pizzas.find((item) => item.name === name);
    if (!pizza) return;
    const basePrice = pizza.prices[selectedSize];
    setCart((current) => [...current, { id: uniqueId(), kind: "pizza", name: pizza.name, size: selectedSize, sizeDetail: sizeNames[selectedSize], detail: sizeNames[selectedSize], basePrice, price: basePrice, border: "", extras: [], note: "" }]);
    showToast(`${pizza.name} agregada`);
  }, [selectedSize, showToast]);

  const addPromo = useCallback((key: string) => {
    const promo = promos[key];
    if (!promo) return;
    setCart((current) => [...current, { id: uniqueId(), kind: "promo", name: promo.name, detail: promo.detail, price: promo.price, promo10: promo.promo10, note: "" }]);
    showToast(`${promo.name} agregada`);
  }, [showToast]);

  const addBeverage = useCallback((size: string, price: number) => {
    setCart((current) => [...current, { id: uniqueId(), kind: "beverage", name: "Refresco", detail: size, price, note: "" }]);
    showToast(`Refresco ${size} agregado`);
  }, [showToast]);

  const removeItem = useCallback((index: number) => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index)), []);
  const replaceItem = useCallback((index: number, item: CartItem) => setCart((current) => current.map((currentItem, itemIndex) => itemIndex === index ? item : currentItem)), []);

  const calculateDelivery = useCallback(async (point: GeoPoint) => {
    const origin = branchCenters[details.branch];
    const rateRules = getDeliveryRateRulesForBranch(details.branch);
    if (fulfillment !== "delivery" || !origin || !rateRules) {
      setDeliveryFee(null);
      setDeliveryKm(null);
      return;
    }
    setDeliveryCalculating(true);
    try {
      const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${point.lng},${point.lat}?overview=false`);
      const route = response.ok ? (await response.json() as { routes?: { distance: number }[] }).routes?.[0] : null;
      const kilometers = route ? route.distance / 1000 : estimatedRoadKm(origin, point);
      setDeliveryKm(kilometers);
      setDeliveryFee(deliveryPriceFor(kilometers, rateRules));
    } catch {
      const kilometers = estimatedRoadKm(origin, point);
      setDeliveryKm(kilometers);
      setDeliveryFee(deliveryPriceFor(kilometers, rateRules));
    } finally {
      setDeliveryCalculating(false);
    }
  }, [details.branch, fulfillment]);

  const setGeoLocation = useCallback(async (point: GeoPoint, label = "Ubicación guardada") => {
    setDeliveryPoint(point);
    setGeoUrl(`https://maps.google.com/?q=${point.lat.toFixed(6)},${point.lng.toFixed(6)}`);
    const inCiudadGuayana = point.lat >= 8.18 && point.lat <= 8.43 && point.lng >= -62.90 && point.lng <= -62.52;
    if (!inCiudadGuayana) {
      setGeoPlace("Fuera del área habitual de Ciudad Guayana");
      setGeoOutOfArea(true);
    } else {
      const city = point.lng > -62.69 ? "San Félix" : "Puerto Ordaz";
      const area = city === "San Félix" ? "san-felix" : "puerto-ordaz";
      const nearestZone = getNearestDeliveryZone(area, point);
      setGeoOutOfArea(false);
      setGeoPlace(nearestZone ? `${nearestZone.name}, ${city}` : `${label}, ${city}`);
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${point.lat}&lon=${point.lng}&zoom=16&addressdetails=1`, { headers: { "Accept-Language": "es" } });
        if (response.ok) {
          const data = await response.json() as { address?: Record<string, string> };
          const address = data.address ?? {};
          const sector = address.neighbourhood || address.suburb || address.quarter || address.residential || address.city_district || address.village;
          setGeoPlace(sector ? `${sector}, ${city}` : (nearestZone ? `${nearestZone.name}, ${city}` : `${label}, ${city}`));
        }
      } catch { /* El punto exacto sigue siendo válido aunque falle el nombre del sector. */ }
    }
    await calculateDelivery(point);
  }, [calculateDelivery]);

  const setManualSector = useCallback((sector: string) => {
    setDetails((current) => ({ ...current, sector }));
    setDeliveryPoint(null);
    setDeliveryFee(null);
    setDeliveryKm(null);
  }, []);

  const locateSector = useCallback(async () => {
    const sector = details.sector.trim();
    if (!sector) return "empty" as const;
    if (!getBranchDeliveryArea(details.branch)) return "missing-branch" as const;
    let point = getKnownSectorPoint(details.branch, sector);
    if (!point) {
      try {
        const area = getBranchDeliveryArea(details.branch);
        if (!area) throw new Error("branch missing");
        const query = encodeURIComponent(`${sector}, ${area === "san-felix" ? "San Félix" : "Puerto Ordaz"}, Ciudad Guayana, Bolívar, Venezuela`);
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=ve&q=${query}`, { headers: { "Accept-Language": "es" } });
        const result = response.ok ? (await response.json() as { lat: string; lon: string }[])[0] : null;
        if (result) point = { lat: Number(result.lat), lng: Number(result.lon) };
      } catch { /* La sede confirmará la tarifa cuando el geocodificador no responda. */ }
    }
    if (point) {
      setDeliveryPoint(point);
      await calculateDelivery(point);
      return "success" as const;
    } else {
      setDeliveryFee(null);
      setDeliveryKm(null);
      return "not-found" as const;
    }
  }, [calculateDelivery, details.branch, details.sector]);

  const setFulfillment = useCallback((mode: Fulfillment) => {
    setFulfillmentState(mode);
    setValidationError("");
    if (mode !== "delivery") {
      setDeliveryFee(null);
      setDeliveryKm(null);
    }
  }, []);

  const totals = useMemo<OrderTotals>(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const packaging = fulfillment === "dinein" ? 0 : cart.filter((item) => item.promo10).length * 2;
    const pendingDelivery = fulfillment === "delivery" && deliveryFee === null;
    const delivery = fulfillment === "delivery" && deliveryFee !== null ? deliveryFee : 0;
    return { subtotal, packaging, delivery, total: subtotal + packaging + delivery, pendingDelivery };
  }, [cart, deliveryFee, fulfillment]);

  const validate = useCallback(() => {
    if (!cart.length) return "Agrega al menos un producto al pedido.";
    if (!details.branch) return "Selecciona la sede que preparará el pedido.";
    if (!details.customerName.trim()) return "Escribe el nombre de quien recibe el pedido.";
    if (fulfillment === "delivery" && locationMethod === "gps" && !geoUrl) return "Comparte tu ubicación GPS para continuar con el delivery.";
    if (fulfillment === "delivery" && locationMethod === "manual" && !details.sector.trim()) return "Escribe o selecciona el sector del delivery.";
    if (fulfillment === "delivery" && locationMethod === "manual" && deliveryFee === null) return "Confirma el sector para calcular y guardar la tarifa del delivery.";
    return "";
  }, [cart.length, deliveryFee, details, fulfillment, geoUrl, locationMethod]);

  const whatsappMessage = useMemo(() => {
    const lines = cart.map((item, index) => `${index + 1}. *${item.name}* x1\n   ${item.detail}${item.note ? `\n   _Observación: ${item.note}_` : ""}\n   ${formatUsd(item.price)}`).join("\n");
    const bcvDate = bcvUpdated ? new Date(bcvUpdated).toLocaleDateString("es-VE") : "fecha por confirmar";
    const deliveryBlock = fulfillment === "delivery" ? `📍 *Sector:* ${locationMethod === "manual" ? details.sector : (geoPlace || "Por confirmar")}\n${locationMethod === "gps" ? `📍 *Ubicación GPS:* ${geoUrl}\n` : ""}${geoOutOfArea ? "⚠️ *Zona:* verificar antes de cotizar el delivery\n" : ""}🛵 *Delivery:* ${totals.pendingDelivery ? "tarifa por confirmar" : `${formatUsd(totals.delivery)} · ${deliveryKm?.toFixed(1)} km`}\n` : "";
    return `🍕 *PIZZAS HOUSE — NUEVO PEDIDO*\n━━━━━━━━━━━━\n👤 *Cliente:* ${details.customerName}\n📍 *Modalidad:* ${fulfillmentNames[fulfillment]}\n📍 *Sede:* ${details.branch}\n${deliveryBlock}⏱️ *Tiempo estimado:* 45 min\n\n*PEDIDO*\n${lines}\n\nSubtotal: ${formatUsd(totals.subtotal)}\n${totals.packaging ? `Gastos de caja: ${formatUsd(totals.packaging)}\n` : ""}${fulfillment === "delivery" ? `Delivery: ${totals.pendingDelivery ? "Por confirmar" : formatUsd(totals.delivery)}\n` : ""}*TOTAL ESTIMADO: ${formatUsd(totals.total)}${totals.pendingDelivery ? " + delivery" : ""}*\n${bcvRate ? `*TOTAL EN BS: Bs ${formatBs(totals.total * bcvRate)}${totals.pendingDelivery ? " + delivery" : ""}*\n(tasa oficial BCV Bs ${formatBs(bcvRate)} del ${bcvDate})` : "*Total en Bs: por confirmar con la tasa BCV vigente*"}\n\nPor favor, confirmen disponibilidad. 🙌`;
  }, [bcvRate, bcvUpdated, cart, deliveryKm, details, fulfillment, geoOutOfArea, geoPlace, geoUrl, locationMethod, totals]);

  const whatsappUrl = useMemo(() => {
    const url = new URL("https://api.whatsapp.com/send/");
    url.searchParams.set("phone", details.supportPhone);
    url.searchParams.set("text", whatsappMessage);
    return url.toString();
  }, [details.supportPhone, whatsappMessage]);

  const reviewOrder = useCallback(() => {
    const error = validate();
    setValidationError(error);
    if (!error) setDialog("confirm");
  }, [validate]);

  useEffect(() => {
    const locked = drawerOpen || dialog !== null;
    document.body.classList.toggle("no-scroll", locked);
    return () => document.body.classList.remove("no-scroll");
  }, [dialog, drawerOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setDialog(null); setDrawerOpen(false); }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    async function loadRate() {
      try {
        const cached = JSON.parse(localStorage.getItem("pizzasHouseBcv") ?? "null") as { rate: number; updated: string; savedAt: number } | null;
        if (cached && Date.now() - cached.savedAt < 21600000) { setBcvRate(cached.rate); setBcvUpdated(cached.updated); return; }
      } catch { /* Ignora un caché inválido. */ }
      try {
        const response = await fetch("https://ve.dolarapi.com/v1/dolares/oficial");
        if (!response.ok) return;
        const data = await response.json() as { promedio: number; fechaActualizacion?: string };
        const updated = data.fechaActualizacion ?? new Date().toISOString();
        setBcvRate(Number(data.promedio));
        setBcvUpdated(updated);
        localStorage.setItem("pizzasHouseBcv", JSON.stringify({ rate: Number(data.promedio), updated, savedAt: Date.now() }));
      } catch { /* El total en dólares continúa disponible. */ }
    }
    void loadRate();
  }, []);

  useEffect(() => {
    if (fulfillment !== "delivery" || !deliveryPoint || !details.branch) return;
    const timer = window.setTimeout(() => void calculateDelivery(deliveryPoint), 0);
    return () => window.clearTimeout(timer);
  }, [calculateDelivery, deliveryPoint, details.branch, fulfillment]);

  const value = useMemo<OrderContextValue>(() => ({
    selectedSize, setSelectedSize, filter, setFilter, cart, addPizza, addPromo, addBeverage, removeItem, replaceItem, details,
    setDetails, fulfillment, setFulfillment, locationMethod, setLocationMethod, geoUrl, geoPlace, geoOutOfArea, setGeoLocation,
    setManualSector, locateSector, deliveryFee, deliveryKm, deliveryCalculating, totals, bcvRate, bcvUpdated, drawerOpen, setDrawerOpen, dialog,
    openDialog: setDialog, closeDialog: () => setDialog(null), activeItemIndex, setActiveItemIndex, validationError, reviewOrder,
    whatsappUrl, toast, showToast,
  }), [selectedSize, filter, cart, addPizza, addPromo, addBeverage, removeItem, replaceItem, details, fulfillment, setFulfillment,
    locationMethod, geoUrl, geoPlace, geoOutOfArea, setGeoLocation, setManualSector, locateSector, deliveryFee, deliveryKm, deliveryCalculating, totals,
    bcvRate, bcvUpdated, drawerOpen, dialog, activeItemIndex, validationError, reviewOrder, whatsappUrl, toast, showToast]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder debe usarse dentro de OrderProvider");
  return context;
}
