import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder } from "../../state/order/order.action";
import { updateOrderStatusAPI } from "../../state/order/order.action";
import { cancelOrderAdminAPI } from "../../state/order/order.action"; // 🔥 مهم

const OrderTable = ({ filterValue }) => {
  const dispatch = useDispatch();

  const { orders } = useSelector((store) => store.restaurantOrder);

  const jwt = localStorage.getItem("quickeats_token");
  const restaurantId = localStorage.getItem("restaurantId");

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantsOrder({ jwt, restaurantId }));
    }
  }, [dispatch, jwt, restaurantId]);

  const safeOrders = Array.isArray(orders) ? orders : [];

  const filteredOrders =
    filterValue === "ALL"
      ? safeOrders
      : safeOrders.filter((o) => o.orderStatus === filterValue);

  return (
    <div className="mt-4 bg-[#111] rounded-xl border border-white/10">
      <div className="p-4 font-bold text-white">All Orders</div>

      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-gray-400 border-b border-white/10">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Items</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Price</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr
                key={order.id}
                className={`border-b border-white/5 ${
                  order.orderStatus === "CANCELLED"
                    ? "opacity-50 line-through"
                    : ""
                }`}
              >
                <td className="p-3">{order.id}</td>

                <td className="p-3">
                  {order.items.map((item, i) => (
                    <div key={i}>
                      {item.name} x {item.quantity}
                    </div>
                  ))}
                </td>

                <td className="p-3">{order.customerName}</td>

                <td className="p-3">
                  {(order.totalAmount ?? order.totalPrice)} EGP
                </td>

                <td className="p-3">
                  <select
  value={order.orderStatus}
  disabled={order.orderStatus === "CANCELLED"}
  onChange={(e) => {
    const value = e.target.value;

    if (value === "CANCELLED") {
      dispatch(
        cancelOrderAdminAPI({
          orderId: order.id,
          jwt,
          restaurantId,
        })
      );
    } else {
      dispatch(
        updateOrderStatusAPI({
          orderId: order.id,
          orderStatus: value,
          jwt,
        })
      );
    }
  }}
  className={`bg-black text-white border border-gray-600 rounded px-2 py-1 ${
    order.orderStatus === "CANCELLED"
      ? "opacity-50 cursor-not-allowed"
      : ""
  }`}
>
  <option value="PENDING">Pending</option>
  <option value="OUT_FOR_DELIVERY">Out for delivery 🚚</option>
  <option value="DELIVERED">Delivered 📦</option>
  <option value="COMPLETED">Completed ✅</option>
  <option value="CANCELLED">Cancelled ❌</option>
</select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-6">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;