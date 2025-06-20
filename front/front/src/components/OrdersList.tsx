import { useEffect, useState } from "react";
import { getAllOrders } from "../api";
import type { OrderSummary } from "../types";
import OrderDetails from "./OrderDetail";
type Props = {
  onRefetch?: (refetch: () => void) => void;
};

export default function OrdersList({ onRefetch }: Props) {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const fetchOrders = () => {
    setLoading(true);
    getAllOrders()
      .then(setOrders)
      .catch((err) => console.error("Ошибка при загрузке заказов", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
    onRefetch?.(fetchOrders); // 👈 передаём функцию вверх
  }, []);

  return (
    <div>
      <h2>📦 Список заказов</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.order_id}>
            Заказ #{order.order_id} — {order.status}, всего: {order.total_amount}₸
            <button onClick={() => setSelectedOrderId(order.order_id)}>Подробнее</button>
          </li>
        ))}
      </ul>

      {selectedOrderId && (
        <OrderDetails
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
          onUpdate={() => {
            fetchOrders();
            setSelectedOrderId(null);
          }}
        />
      )}
    </div>
  );
}
