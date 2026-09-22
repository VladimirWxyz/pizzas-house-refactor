"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { DialogName } from "@/types/order";
import { useOrder } from "@/context/order-context";

export function DialogFrame({ name, title, description, children, className = "" }: { name: Exclude<DialogName, null>; title: string; description: string; children: React.ReactNode; className?: string }) {
  const { dialog, closeDialog } = useOrder();
  return <Dialog open={dialog === name} onOpenChange={(open) => { if (!open) closeDialog(); }}><DialogContent className={`dialog-card ${className}`} showCloseButton={false}><div className="dialog-head"><div><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></div><button className="dialog-close" type="button" onClick={closeDialog} aria-label="Cerrar">×</button></div><div className="dialog-body">{children}</div></DialogContent></Dialog>;
}
