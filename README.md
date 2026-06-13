# 🍴 Food4Fork

> **Eat Healthy. Spend Smart. Waste Less.**

A full-stack MERN food ordering web app inspired by Swiggy & Zomato — with two killer extra features: a **Health Score System** and a **Budget Meal Finder**.

---

## ✨ Features

### 🌿 Health Score System
Every dish is rated **0–10** for healthiness based on calories, protein, fat, and carbs:
- 🔴 **0–3** → Unhealthy (shown in red)
- 🟡 **4–7** → Moderate (shown in yellow)
- 🟢 **8–10** → Healthy (shown in green)

### 🎯 Budget Meal Finder
Enter your budget (e.g., ₹200) and instantly see every dish you can afford — sorted healthiest first, so you always make a smarter choice.

### 🛒 Full Food Ordering Flow
- Browse 30+ dishes across 10 categories
- Filter by category, health score, veg/non-veg, price
- Add to cart, adjust quantities
- Checkout with address + payment method selection
- View past orders with health score breakdown

### 🔐 Auth
- JWT-based register/login
- Protected routes
- User profile with saved address and budget

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, React Router v6 |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| Styling | Pure CSS (no frameworks) |
| State | React Context API |
| Notifications | react-hot-toast |
| Icons | react-icons |

---

## 📁 Project Structure

```
food4fork/
├── backend/
│   ├── config/
│   ├── controllers/     # authController, foodController, orderController, cartController
│   ├── data/            # seeder.js (30+ food items)
│   ├── middleware/      # authMiddleware.js
│   ├── models/          # User, Food, Order
│   ├── routes/          # authRoutes, foodRoutes, orderRoutes, cartRoutes
│   ├── .env.example
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/  # Navbar, HealthBadge, ProtectedRoute
    │   │   ├── food/    # FoodCard
    │   │   └── cart/    # CartDrawer
    │   ├── context/     # AuthContext, CartContext
    │   ├── pages/       # Home, Menu, BudgetMeal, Login, Register, Checkout, Orders, Profile
    │   └── index.css
    ├── .env.example
    └── vite.config.js
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works fine)

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/food4fork.git
cd food4fork
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env — add your MONGO_URI and JWT_SECRET
npm run seed      # Seeds 30+ food items into DB
npm run dev       # Starts backend on http://localhost:5000
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
cp .env.example .env
# .env already has VITE_API_URL=http://localhost:5000/api for local dev
npm run dev       # Starts frontend on http://localhost:5173
```

---

## ☁️ Deployment

### Backend → Railway
1. Push the repo to GitHub
2. Create a new project on [railway.app](https://railway.app)
3. Connect GitHub repo → select the `backend/` folder as root
4. Add environment variables:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = any random string
   - `CLIENT_URL` = your Vercel frontend URL (add after deploying frontend)
5. Deploy — Railway auto-detects `package.json` and runs `npm start`
6. **After seeding locally, your Atlas DB is populated. No re-seeding needed.**

### Frontend → Vercel (or Netlify)
1. Go to [vercel.com](https://vercel.com) → New Project → Import GitHub repo
2. Set **Root Directory** to `frontend`
3. Add environment variable:
   - `VITE_API_URL` = `https://your-railway-app.railway.app/api`
4. Deploy

### ⚠️ Important: CORS
After deploying frontend, update `CLIENT_URL` in Railway env vars to your Vercel URL and redeploy backend.

---

## 🌱 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/profile` | Get profile (auth) |
| PUT | `/api/auth/profile` | Update profile (auth) |

### Food
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/food` | Get all foods (with filters) |
| GET | `/api/food/budget?amount=200` | Foods under budget |
| GET | `/api/food/categories` | All categories |
| GET | `/api/food/:id` | Single food item |

### Cart (all auth protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart |
| POST | `/api/cart/add` | Add item |
| PUT | `/api/cart/update` | Update quantity |
| DELETE | `/api/cart/remove/:foodId` | Remove item |
| DELETE | `/api/cart/clear` | Clear cart |

### Orders (all auth protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place order |
| GET | `/api/orders/myorders` | My orders |
| GET | `/api/orders/:id` | Order details |

---

## 👨‍💻 Author

Built by **Sohail Azain** — CSE Student @ JB Institute of Engineering and Technology, Hyderabad.

- GitHub: [@sohailazain](https://github.com/sohailazain)
- LinkedIn: [linkedin.com/in/sohailazain](https://linkedin.com/in/sohailazain)

---

## 📄 License

MIT License — feel free to use and modify.
