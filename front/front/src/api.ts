import axios from "axios";
import type { Goods, OrderItem } from "./types";

const BASE_URL = "http://localhost:5000";

export const fetchGoods = async (): Promise<Goods[]> => {
  const res = await axios.get(`${BASE_URL}/goods`);
  return res.data;
};

export const createOrder = async (
  items: OrderItem[],
  discount = 0
): Promise<{ order_id: number; status: string }> => {
  const amount = items.reduce((sum, item) => sum + item.amount, 0);
  const total_amount = amount - discount;

  const res = await axios.post(`${BASE_URL}/order`, {
    goods: items,
    amount,
    discount,
    total_amount,
  });

  return res.data;
};
// 👇 Добавь этот тип, если его нет
export type OrderSummary = {
  order_id: number;
  status: string;
  total_amount: number;
};

// 👇 Добавь метод
export const getAllOrders = async (): Promise<OrderSummary[]> => {
  const res = await axios.get(`${BASE_URL}/orders`);
  return res.data;
};
export type OrderDetail = {
  order_id: number;
  goods: {
    goods_id: number;
    quantity: number;
    amount: number;
  }[];
  amount: number;
  discount: number;
  total_amount: number;
  status: string;
};

export const getOrderById = async (id: number): Promise<OrderDetail> => {
  const res = await axios.get(`${BASE_URL}/orders/${id}`);
  return res.data;
};
export async function updateOrder(orderId: number, data: any) {
  const res = await axios.put(`${BASE_URL}/orders/${orderId}`, data);
  return res.data;
}
export async function deleteOrder(orderId: number) {
  const res = await axios.delete(`${BASE_URL}/orders/${orderId}`);
  return res.data;
}
