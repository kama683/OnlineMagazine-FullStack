
---

##  Online Smartphone Store — Full-Stack Project

###  Project Description

This is a **full-stack online store** project built with **React (frontend)** and **Flask + Python (backend)**, using **MySQL** as the database and **Docker** for containerization.

Users can browse a catalog of smartphones, place orders, and view detailed order information. Admins (or store managers) can update order status, apply discounts, and remove orders through a clean UI.

###  Features

 Browse smartphones with images and prices,
 Place new orders with multiple items,
 View all orders with status and total price,
 Detailed order view (items, quantities, discount),
 Update order status or discount,
 Delete orders,
 Dockerized backend and database,
 REST API with Flask (Python),
 Frontend built with React, TypeScript, and SCSS,

###  Technologies Used

* **Frontend:** React, TypeScript, SCSS
* **Backend:** Python, Flask, SQLAlchemy
* **Database:** MySQL
* **API:** RESTful endpoints
* **Tools:** Docker, Postman
* **Other:** Axios (for API calls), Vite (React Dev Server)

---

## 🚀 How to Run the Project

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/your-username/online-store.git
cd online-store
```

---

### 🐳 2. Run Backend & DB with Docker

In the root project folder (where `docker-compose.yml` is located):

```bash
docker-compose up --build
```

* API available at: `http://localhost:5000`
* MySQL running on: `localhost:3306`

---

### 🌐 3. Start the Frontend (React)

Open a **new terminal** and run:

```bash
cd front/front
npm install
npm run dev
```

* The frontend will be available at: `http://localhost:5173`

---

### 🧪 4. Test the API with Postman (optional)

Try sending requests to:

* `GET /goods`
* `POST /order`
* `GET /orders`
* `PUT /orders/{id}`
* `DELETE /orders/{id}`

---

### 📸 Screenshots and Demo (optional)

Add screenshots or demo links here if you have any!

---

###  Example Flow

1. Open the app → `http://localhost:5173`
2. Browse products and add to cart
3. Click " Оформить заказ" to place an order
4. Go to "📦Список заказов" and view details or manage them

---

###  Folder Structure

```
/back             → Flask backend
  ├── app.py
  ├── models.py
  ├── db.py
  └── requirements.txt

/front/front      → React frontend
  ├── components/
  ├── api.ts
  └── App.tsx

/docker-compose.yml
```

---

