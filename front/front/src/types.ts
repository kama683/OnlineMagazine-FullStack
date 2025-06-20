export type Goods = {
  id: number;
  name: string;
  price: number;
  image_url: string; // 👈 добавляем ссылку на картинку
};


export type OrderItem = {
  goods_id: number;
  quantity: number;
  amount: number;
};

export type Order = {
  order_id: number;
  goods: OrderItem[];
  amount: number;
  discount: number;
  total_amount: number;
  status: string;
};
export type OrderSummary = {
  order_id: number;
  status: string;
  total_amount: number;
};
