import { PromoDialog } from "@/components/order/promo-dialog";
import { AddonDialog } from "@/components/order/addon-dialog";
import { PizzaPickerDialog } from "@/components/order/pizza-picker-dialog";
import { NoteDialog } from "@/components/order/note-dialog";
import { ConfirmationDialog } from "@/components/order/confirmation-dialog";
import { MapDialog } from "@/components/order/map-dialog";

export function OrderDialogs() {
  return <><PromoDialog/><AddonDialog/><PizzaPickerDialog/><NoteDialog/><ConfirmationDialog/><MapDialog/></>;
}
