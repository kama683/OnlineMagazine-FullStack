from flask import Flask, jsonify, request
from flask_cors import CORS  # 🆕 добавляем CORS
from db import db
from models import Goods, Order, OrderItem

app = Flask(__name__)

# ✅ Настройки подключения к базе
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://user:password@db:3306/shop'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# ✅ Подключаем CORS (разрешаем доступ с React фронта)
CORS(app, origins=["http://localhost:5173"])

db.init_app(app)

@app.route("/goods", methods=["GET"])
def get_goods():
    goods = Goods.query.all()
    return jsonify([g.to_dict() for g in goods])


@app.route("/order", methods=["POST"])
def create_order():
    data = request.get_json()
    goods_data = data.get("goods", [])
    amount = data.get("amount", 0)
    discount = data.get("discount", 0)
    total_amount = data.get("total_amount", 0)

    new_order = Order(amount=amount, discount=discount, total_amount=total_amount, status="created")
    db.session.add(new_order)
    db.session.commit()

    for item in goods_data:
        order_item = OrderItem(
            order_id=new_order.id,
            goods_id=item["goods_id"],
            quantity=item["quantity"],
            amount=item["amount"]
        )
        db.session.add(order_item)

    db.session.commit()
    return jsonify({"order_id": new_order.id, "status": new_order.status})


@app.route("/orders", methods=["GET"])
def get_all_orders():
    orders = Order.query.all()
    return jsonify([
        {
            "order_id": order.id,
            "status": order.status,
            "total_amount": order.total_amount
        } for order in orders
    ])


@app.route("/orders/<int:order_id>", methods=["GET"])
def get_order_by_id(order_id):
    order = Order.query.get_or_404(order_id)
    items = OrderItem.query.filter_by(order_id=order.id).all()
    return jsonify({
        "order_id": order.id,
        "goods": [
            {
                "goods_id": item.goods_id,
                "quantity": item.quantity,
                "amount": item.amount
            } for item in items
        ],
        "amount": order.amount,
        "discount": order.discount,
        "total_amount": order.total_amount,
        "status": order.status
    })


@app.route("/orders/<int:order_id>", methods=["PUT"])
def update_order(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.get_json()

    order.amount = data.get("amount", order.amount)
    order.discount = data.get("discount", order.discount)
    order.total_amount = data.get("total_amount", order.total_amount)
    order.status = data.get("status", order.status)

    OrderItem.query.filter_by(order_id=order.id).delete()

    for item in data.get("goods", []):
        order_item = OrderItem(
            order_id=order.id,
            goods_id=item["goods_id"],
            quantity=item["quantity"],
            amount=item["amount"]
        )
        db.session.add(order_item)

    db.session.commit()
    return jsonify({"message": "Order updated"})


@app.route("/orders/<int:order_id>", methods=["DELETE"])
def delete_order(order_id):
    order = Order.query.get_or_404(order_id)
    OrderItem.query.filter_by(order_id=order.id).delete()
    db.session.delete(order)
    db.session.commit()
    return jsonify({"message": f"Order {order_id} deleted"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
