import React from "react";
import orders from "../data/orders"; // if you have it; else create a small mock file

export default function Orders(){
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">My Orders</h2>
        <div className="space-y-4">
          {orders && orders.length ? orders.map(o => (
            <div key={o.id} className="bg-dark-elev p-4 rounded">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{o.id}</div>
                  <div className="text-sm text-beige/70">{o.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{o.total} EGP</div>
                  <div className="text-sm text-beige/70">{o.status}</div>
                </div>
              </div>
            </div>
          )) : <div className="text-beige/70">No orders yet.</div>}
        </div>
      </div>
    </section>
  );
}
