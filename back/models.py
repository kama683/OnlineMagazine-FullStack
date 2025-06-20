from db import db

class Goods(db.Model):
    __tablename__ = 'goods'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255))  

    def to_dict(self):
        return {"id": self.id, "name": self.name, "price": self.price, "image_url": self.image_url  }


class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float)
    discount = db.Column(db.Float)
    total_amount = db.Column(db.Float)
    status = db.Column(db.String(20))

    items = db.relationship('OrderItem', backref='order', cascade="all, delete")


class OrderItem(db.Model):
    __tablename__ = 'order_items'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    goods_id = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    amount = db.Column(db.Float)
