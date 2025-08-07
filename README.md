

# 📦 AIWebPOS - Smart, Scalable Point of Sale System

AIWebPOS is a modular, AI-powered POS platform designed for retail and enterprise environments. It combines real-time sales, intelligent analytics, and remote business management—running across distributed microservices to support everything from logistics to financials, HR, payments, and compliance.

---

## 📌 Features at a Glance

| Category               | Description                                                                      |
| ---------------------- | -------------------------------------------------------------------------------- |
| 🛍️ POS Interface      | Fast, intuitive UI (touchscreen & barcode-ready) built with Next.js              |
| 🔄 Online/Offline Mode | Ensures business continuity even without internet                                |
| 🌐 Remote Management   | Full control of branches, inventory, analytics & users remotely                  |
| 📦 Supply Chain        | Track orders, stock levels, vendors, and shipments                               |
| 💵 Finance & Payments  | Built-in payment gateway, VAT (200105876-3) tax support, debts, AR/AP management |
| 📊 Analytics & AI      | Python-powered modules for trends, pricing, fraud detection, and demand planning |
| 👥 HR & Employees      | Time tracking, payroll, roles, and KPIs                                          |
| ⚙️ Microservice Design | Independent modules communicating via secure APIs                                |

---

## 🛠️ Tech Stack

| Layer             | Technology Used                               |
| ----------------- | --------------------------------------------- |
| 🖼️ Frontend UI   | Next.js, TailwindCSS                          |
| 🧠 AI & Analytics | Python, scikit-learn, pandas, NumPy           |
| 🔌 Backend API    | Django REST Framework (DRF)                   |
| 🗃️ Database      | PostgreSQL / MS SQL Server                    |
| 🔐 Auth & Access  | DRF JWT + Role-Based Access Control (RBAC)    |
| 📡 Integrations   | External APIs (payment, logistics, tax, etc.) |
| ☁️ Hosting        | AWS, DigitalOcean, Vercel, Docker             |

---

## 🧪 Installation & Setup

### ⚙️ Prerequisites

* Node.js v18+
* Python 3.11+
* PostgreSQL or SQL Server
* Docker (optional)
* Redis (optional, for caching and background jobs)

---

### 🔧 Backend (DRF + AI + DB)

```bash
# Clone repo
git clone https://github.com/your-org/aiwebpos.git
cd aiwebpos/backend

# Create and activate virtual environment
python -m venv env
source env/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Start Django development server
python manage.py runserver
```

---

### 🎯 Frontend (Next.js)

```bash
cd ../frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Access frontend at http://localhost:3000
```

---

## 📡 External API Keys (Optional but Recommended)

Set environment variables (or use `.env`):

```bash
PAYMENT_API_KEY=sk_test_...
TAX_API_ENDPOINT=https://govapi.ls/tax
ANALYTICS_MODEL_PATH=/models/trained_model.pkl
```

---

## 🔒 Authentication

* JWT-based auth securing all endpoints
* Role-Based Access Control (RBAC) with roles: admin, cashier, manager, analyst, logistics, HR
* Middleware enforces permissions per route

---

## 🔄 Continuous Learning & AI Modules

* Real-time model retraining nightly or triggered by key events
* Fraud detection, price optimization, seasonal demand forecasting
* Python scripts located in `analytics/` folder
* Modular and extendable AI architecture for plug-and-play models

---

## 📈 Sample AI Use Case

**Sales Prediction Module**

* **Inputs:** Daily sales, location, product category, seasonal factors, economic index
* **Output:** Recommended reorder volumes & dynamic pricing strategies
* **Model:** RandomForestRegressor updated weekly

---

## 🔐 Security & Compliance

* VAT support with Lesotho tax registration (VAT No. 200105876-3)
* SSL/TLS encryption on all services
* Comprehensive audit logging for all critical actions
* Optional user session timeout and IP address logging for security

---

## 📤 Deployment Options

* Docker-compose file included for containerized deployment
* Frontend deployable on Vercel, Netlify, or any static hosting
* Backend deployable on Heroku, DigitalOcean, AWS EC2
* CI/CD pipeline examples with GitHub Actions and Jenkins

---

## 👨‍💻 Developer Notes

* Backend business logic in `services/`, API views in `api/`, AI modules in `analytics/`
* Microservices structured as separate Django apps inside `apps/` directory
* Data shared securely through DRF APIs with token validation
* Modules designed for easy scaling and independent deployment

---

## 🤝 Contributions

Pull requests, suggestions, and ideas are welcome!
Please follow the contribution guidelines and submit PRs to the `dev` branch.

---

## 📄 License

MIT License – © 2025 \[[www.codeburst.co.ls](http://www.codeburst.co.ls)]


