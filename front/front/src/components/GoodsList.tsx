import { useEffect, useState } from "react";
import { fetchGoods } from "../api";
import type { Goods, OrderItem } from "../types";
import "./GoodsList.scss";

type Props = {
  onAdd: (item: OrderItem) => void;
   onOrderCreated?: () => void; 
};

export default function GoodsList({ onAdd }: Props) {
  const [goods, setGoods] = useState<Goods[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoods()
      .then(setGoods)
      .catch((err) => console.error("Ошибка при загрузке товаров", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="goods-list">
      <h2>Phones: </h2>
      <div className="goods-grid">
        {goods.map((g) => (
          <div className="goods-card" key={g.id}>
            <img src={g.image_url} alt={g.name} />
            <h3>{g.name}</h3>
            <p>{g.price}₸</p>
            <button onClick={() => onAdd({ goods_id: g.id, quantity: 1, amount: g.price })}>
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
