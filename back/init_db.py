from app import app, db
from models import Goods

with app.app_context():
    db.drop_all()
    db.create_all()

    # Тестовые товары с картинками
    goods_list = [
        Goods(
            name="iPhone 15 Pro Max 256 ГБ",
            price=699000,
            image_url="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg"
        ),
        Goods(
            name="Samsung Galaxy S24 Ultra 512 ГБ",
            price=789000,
            image_url="https://cdn.new-brz.net/app/public/models/SM-S928BZKHSEK/large/j/240708160119023462.jpg"
        ),
        Goods(
            name="Xiaomi 14 Ultra 512 ГБ",
            price=499000,
            image_url="https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra-1.jpg"
        ),
        Goods(
            name="Nothing Phone (2) 256 ГБ",
            price=329000,
            image_url="https://resources.cdn-kaspi.kz/img/m/p/hc9/h4b/82547092291614.jpg?format=gallery-large"
        ),
        Goods(
            name="OnePlus 12 256 ГБ",
            price=429000,
            image_url="https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-12-1.jpg"
        ),
        Goods(
            name="Google Pixel 8 Pro 256 ГБ",
            price=539000,
            image_url="https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-1.jpg"
        ),
        Goods(
            name="Huawei P60 Pro 256 ГБ",
            price=479000,
            image_url="https://fdn2.gsmarena.com/vv/pics/huawei/huawei-p60-pro-1.jpg"
        ),
        Goods(
            name="Realme GT 5 512 ГБ",
            price=359000,
            image_url="https://miport.ru/assets/img/products/realme-gt5/silver/1.jpg"
        ),
        Goods(
            name="Redmi Note 13 Pro+ 5G 256 ГБ",
            price=219000,
            image_url="https://resources.cdn-kaspi.kz/img/m/p/h8a/h0d/85064467546142.jpg?format=gallery-large"
        ),
        Goods(
            name="Motorola Edge 40 Pro 256 ГБ",
            price=389000,
            image_url="https://fdn2.gsmarena.com/vv/pics/motorola/motorola-edge-40-pro-1.jpg"
        ),
        Goods(
            name="Infinix Zero 30 5G",
            price=149000,
            image_url="https://resources.cdn-kaspi.kz/img/m/p/h47/h40/84654088650782.jpg?format=gallery-large"
        ),
        Goods(
            name="Asus ROG Phone 8 Pro 512 ГБ",
            price=699000,
            image_url="https://fdn2.gsmarena.com/vv/pics/asus/asus-rog-phone-8-pro-1.jpg"
        )
]

    

    db.session.add_all(goods_list)
    db.session.commit()

    print("База данных успешно созданы!")
