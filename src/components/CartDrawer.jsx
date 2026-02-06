import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, removeItem, updateQty, total, clearCart } = useCart();

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed right-6 bottom-6 z-50 btn-cta">Cart ({items.length})</button>
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 w-full md:w-96 h-full bg-dark-primary p-6 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Your Cart</h3>
              <button onClick={() => setOpen(false)} className="btn-ghost">Close</button>
            </div>
            {items.length === 0 ? (
              <p className="text-beige/70">Cart is empty.</p>
            ) : (
              <>
                <div className="space-y-4">
                  {items.map(it => (
                    <div key={it.id} className="flex items-center gap-3">
                      <img src={it.image} alt={it.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-semibold">{it.name}</div>
                        <div className="text-sm text-beige/70">{it.price} EGP</div>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQty(it.id, Math.max(1, it.qty - 1))} className="btn-ghost">-</button>
                          <div className="px-3">{it.qty}</div>
                          <button onClick={() => updateQty(it.id, it.qty + 1)} className="btn-ghost">+</button>
                        </div>
                      </div>
                      <button onClick={() => removeItem(it.id)} className="text-red-400">Remove</button>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="flex justify-between font-bold"><span>Total</span><span>{total()} EGP</span></div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => { clearCart(); setOpen(false); }} className="btn-sm">Clear</button>
                    <a href="/checkout" onClick={() => setOpen(false)} className="btn-cta">Checkout</a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}