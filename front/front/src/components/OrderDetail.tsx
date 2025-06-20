import { useEffect, useState } from "react";
import { getOrderById, updateOrder, deleteOrder, type OrderDetail } from "../api";


type Props = {
  orderId: number;
  onClose: () => void;
  onUpdate: () => void; // 👈 новое
};


export default function OrderDetails({ orderId, onClose, onUpdate }: Props) {

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("created");
  const [updatedDiscount, setUpdatedDiscount] = useState(0);

  useEffect(() => {
    getOrderById(orderId)
      .then((data) => {
        setOrder(data);
        setUpdatedStatus(data.status);
        setUpdatedDiscount(data.discount);
      })
      .catch((err) => console.error("Ошибка при загрузке заказа", err))
      .finally(() => setLoading(false));
  }, [orderId]);

  const handleUpdate = async () => {
    if (!order) return;
    try {
      await updateOrder(orderId, {
        goods: order.goods,
        amount: order.amount,
        discount: updatedDiscount,
        total_amount: order.amount - updatedDiscount,
        status: updatedStatus,
      });
      alert("Заказ обновлён!");
setEditMode(false);
onUpdate(); // 🔁
    } catch (err) {
      console.error("Ошибка при обновлении заказа", err);
      alert("Не удалось обновить заказ");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить заказ?")) return;
    try {
      await deleteOrder(orderId);
      alert("Заказ удалён!");
onClose();
onUpdate(); // 🔁
    } catch (err) {
      console.error("Ошибка при удалении заказа", err);
      alert("Не удалось удалить заказ");
    }
  };

  if (loading || !order) return <p>Загрузка деталей...</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "15px" }}>
      <h3> Детали заказа #{order.order_id}</h3>

      {order.goods.map((item, idx) => (
        <div key={idx}>
           Товар #{item.goods_id}, Кол-во: {item.quantity}, Сумма: {item.amount}₸
        </div>
      ))}

      <div>
        <strong>Сумма:</strong> {order.amount}₸<br />
        <strong>Скидка:</strong>{" "}
        {editMode ? (
          <input
            type="number"
            value={updatedDiscount}
            onChange={(e) => setUpdatedDiscount(Number(e.target.value))}
          />
        ) : (
          `${order.discount}₸`
        )}
        <br />
        <strong>Итого:</strong> {order.amount - updatedDiscount}₸<br />
        <strong>Статус:</strong>{" "}
        {editMode ? (
          <select value={updatedStatus} onChange={(e) => setUpdatedStatus(e.target.value)}>
            <option value="created">created</option>
            <option value="confirmed">confirmed</option>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
          </select>
        ) : (
          order.status
        )}
      </div>

      <div style={{ marginTop: "10px" }}>
        {editMode ? (
          <>
            <button onClick={handleUpdate}>💾 Сохранить</button>
            <button onClick={() => setEditMode(false)} style={{ marginLeft: "8px" }}>
              ❌ Отмена
            </button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)}>✏️ Редактировать</button>
        )}

        <button onClick={onClose} style={{ marginLeft: "8px" }}>
           Назад
        </button>

        <button onClick={handleDelete} style={{ marginLeft: "8px", color: "red" }}>
           Удалить
        </button>
      </div>
    </div>
  );
}
