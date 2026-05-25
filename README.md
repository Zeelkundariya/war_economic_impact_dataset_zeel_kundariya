<div align="center">

# 🚀 War Economic Impact Analysis API

### **A high-performance, production-grade backend ecosystem for real-time tracking and predictive analysis of global conflict economics.**

[![Node.js Version](https://img.shields.io/badge/Node.js-v18.0.0-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

[Explore Docs](#-api-overview) · [Report Bug](https://github.com/Zeelkundariya/war_economic_impact_dataset_zeel_kundariya/issues) · [Request Feature](https://github.com/Zeelkundariya/war_economic_impact_dataset_zeel_kundariya/issues)

</div>

## 📌 Project Overview

**War Economic Impact Analysis** is a comprehensive full-stack platform designed to analyze, visualize, and track the economic consequences of historical and ongoing conflicts. By processing a real-world dataset of **300,000+ conflict records**, the system provides deep insights into how wars affect global GDP, inflation, poverty, and unemployment rates.

The system is engineered to provide researchers, students, and policymakers with a structured, high-fidelity way to explore the economic devastation caused by warfare across different regions and time periods.

---

## 🎯 Objectives

-   **Scalable Architecture**: Build a robust RESTful API system using Node.js and Express.js.
-   **High-Performance Schema**: Design an optimized MongoDB schema capable of handling massive economic datasets.
-   **Advanced Discovery**: Implement multi-parameter filtering and complex regex-based search.
-   **Data-Driven Analytics**: Provide trending insights and peak impact data for conflicts.
-   **Security First**: Ensure secure user management and admin protection using JWT and Bcrypt.
-   **Clean Code Standards**: Strictly follow the MVC architecture and industry-standard best practices.

---

## ❓ Problem Statement

Understanding the long-term economic damage of war is difficult due to:
-   ❌ **Scattered Data**: Economic statistics are often fragmented across multiple unorganized reports.
-   ❌ **Poor Visualization**: Hard to compare how different conflicts impact specific sectors (e.g., Agriculture vs. Energy).
-   ❌ **Lack of Searchability**: No centralized way to search for conflicts by specific inflation rates or reconstruction costs.
-   ❌ **No Predictive Context**: Difficult to identify "high-risk" zones or identifying recurring economic collapse trends.

---

## 💡 Solution

This project centralizes war-related economic data into a structured knowledge base where users can:
-   ✅ **Browse Conflicts**: Explore detailed records of World Wars, Civil Wars, and Interstate conflicts.
-   ✅ **Analyze Impact**: View detailed metrics on inflation, currency devaluation, and poverty spikes.
-   ✅ **Advanced Filtering**: Filter by region, country, status (Ongoing/Resolved), and specific economic thresholds.
-   ✅ **Analytics Dashboard**: Identify the highest war costs and reconstruction requirements globally.
-   ✅ **Proactive Security**: Protect sensitive administrative actions with robust JWT authentication.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | Runtime Environment |
| **Express.js** | Web Framework |
| **MongoDB** | Primary Database |
| **Mongoose** | ODM for Data Modeling |
| **JWT** | Secure Authentication |
| **Bcrypt.js** | Password Hashing |
| **Morgan** | HTTP Request Logging |
| **Dotenv** | Environment Configuration |
| **Cors** | Cross-Origin Security |

---

## ✨ Key Features

-   👤 **Advanced User Management**: Secure registration/login and profile handling.
-   📊 **Real-time Analytics**: Dynamic calculation of high-impact conflict metrics.
-   🏗️ **MVC Layered Architecture**: Clean separation of routes, controllers, and models.
-   📥 **Automated Bulk Ingestion**: Custom seeder script for processing 300k+ records.
-   📈 **Predictive Logic**: (Planned) Identifying economic trends and risk zones.
-   🛡️ **Safety Features**: Soft delete functionality and global error handling.

---

## 🧠 Dataset Structure

The application processes a massive JSON dataset with records structured as follows:

```json
{
  "Conflict_Name": "Syrian Civil War",
  "Conflict_Type": "Civil War",
  "Region": "Middle East",
  "Start_Year": "2011",
  "End_Year": "2026",
  "Status": "Ongoing",
  "Primary_Country": "Syria",
  "GDP_Change_%": "-34.81",
  "Inflation_Rate_%": "55.45",
  "Cost_of_War_USD": "114215767997",
  "Estimated_Reconstruction_Cost_USD": "178638357922"
}
```

---

## 🗄️ Database Schema Design

The MongoDB schema is optimized for analytical queries and high-speed retrieval:

```javascript
{
  Conflict_Name: String,
  Conflict_Type: String,
  Region: String,
  Start_Year: String,
  End_Year: String,
  Status: String,
  Primary_Country: String,
  Economic_Metrics: {
    GDP_Change: Number,
    Inflation_Rate: Number,
    Currency_Devaluation: Number
  },
  Social_Impact: {
    Poverty_Rate: Number,
    Food_Insecurity: Number,
    Unemployment_Rate: Number
  },
  Financials: {
    Cost_of_War: Number,
    Reconstruction_Cost: Number
  }
}
```

### ✅ Key Design Decisions
-   **Hybrid Storage**: Core economic metrics are embedded within the conflict document for sub-second retrieval.
-   **Advanced Indexing**: Compound indexes on `Region`, `Status`, and `Conflict_Type`.
-   **Stateless Auth**: JWT implementation ensuring the backend is ready for horizontal scaling.

---

## 📂 Project Structure

```text
war_economic_impact/
└── server/
    ├── config/         # Database & environment configurations
    ├── controllers/    # Request handlers & logic
    ├── models/         # Mongoose schemas
    ├── routes/         # API Endpoint definitions
    ├── middlewares/    # Auth & error management
    ├── services/       # Data processing & analytics
    ├── seeder.js       # Data import script
    └── dataset.json    # Source Data (300k records)
```

---

## ⚙️ API Overview

### 🔐 Authentication
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/api/v1/auth/register` | User Registration | Public |
| POST | `/api/v1/auth/login` | Secure Login & Token | Public |

### 📌 Conflicts (CRUD)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/api/v1/conflicts` | Fetch all conflicts (paginated) | Public |
| GET | `/api/v1/conflicts/:id` | Fetch single conflict details | Public |
| POST | `/api/v1/conflicts` | Add new record | Private |
| PUT | `/api/v1/conflicts/:id` | Replace full record | Private |
| DELETE | `/api/v1/conflicts/:id` | Remove record (Soft delete) | Private |

### 🔍 Search & Filter
- `GET /api/v1/search?q=keyword` - Search across names and countries
- `GET /api/v1/conflicts?region=Europe&status=Ongoing` - Multi-parameter filtering

### 📊 Statistics
- `GET /api/v1/stats/total` - Summary of all records
- `GET /api/v1/stats/highest-impact` - Peak economic damage data

---

## 🚀 Getting Started

### 1️⃣ Clone Repository
```bash
git clone https://github.com/zeel-k/war_economic_impact.git
```

### 2️⃣ Install Dependencies
```bash
cd server
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### 4️⃣ Data Import Strategy
Run the seeder to process the 300k records:
```bash
npm run data:import
```
- **Bulk Insertion**: Uses `insertMany()` for high-speed seeding.
- **Validation**: Strict schema validation during parsing.

---

## 🧪 Testing & Optimization
-   **Postman**: Comprehensive testing for all endpoints. Access the live [Postman Collection Documentation](https://documenter.getpostman.com/view/50840741/2sBXwmPYBh) directly to explore and test all API routes.
-   **Stress Testing**: Handling large data queries with optimized pagination.
-   **Lean Queries**: Using `.lean()` in Mongoose for read-only operations.

## ⚠️ Challenges Faced
-   Normalizing a massive dataset with varying data points.
-   Optimizing queries to handle 300,000+ records without latency.
-   Balancing between embedded and referenced data structures for performance.

## 🔮 Future Improvements
-   **AI Integration**: Predictive economic trend modeling.
-   **Interactivity**: Real-time map visualization for global impact.

---

<div align="center">

### Built with ❤️ by [Zeel Kundariya](https://github.com/Zeelkundariya)

**[↑ Back to Top](#-war-economic-impact-analysis-api)**

</div>
