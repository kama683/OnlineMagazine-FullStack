import { useState, useRef } from "react";
import GoodsList from "./components/GoodsList";
import OrdersList from "./components/OrdersList";
import type { OrderItem } from "./types";
import { createOrder } from "./api";

function App() {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  const ordersRef = useRef<() => void>(() => {});

  const handleAdd = (item: OrderItem) => {
    setItems((prev) => [...prev, item]);
  };

  const handleOrder = async () => {
    try {
      const res = await createOrder(items);
      setOrderStatus(`Заказ #${res.order_id} успешно создан ✅`);
      setItems([]);

     
      ordersRef.current();
    } catch (err) {
      console.error(err);
      setOrderStatus("❌ Ошибка при создании заказа");
    }
  };

  return (
    <div style={{  display:'flex', justifyContent:'space-around'}} className="app">
      <div style={{width:'1000px'}}>
        <h1 style={{ padding: "10px", fontSize: "52px" }}>Smartphone Shops</h1>
      <GoodsList onAdd={handleAdd} onOrderCreated={function (): void {
        throw new Error("Function not implemented.");
      } } />
      </div>

      <div style={{marginTop:"180px"}}>
        <h2>📝 Текущий заказ</h2>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            Товар #{item.goods_id} — Кол-во: {item.quantity}, Сумма: {item.amount}₸
          </li>
        ))}
      </ul>

      {items.length > 0 && (
        <button onClick={handleOrder} style={{ marginTop: "10px" }}>
          ✅ Оформить заказ
        </button>
      )}

      {orderStatus && <p>{orderStatus}</p>}

      <OrdersList onRefetch={(cb) => (ordersRef.current = cb)} />
      </div>
    </div>
  );
}

export default App;
