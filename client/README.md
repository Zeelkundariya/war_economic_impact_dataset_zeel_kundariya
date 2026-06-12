# Economic Impact Analysis Dashboard (Client Interface)

Welcome to the frontend application for the War Economic Impact Dataset dashboard. This interface is built as a state-of-the-art React dashboard leveraging modern web architecture, responsive glassmorphic layouts, and real-time data visualizations.

---

## 🚀 Key Features
1. **Interactive SaaS Dashboard Overview:** KPI statistics tracking total, active, and resolved geopolitical crises, peak damage, and critical hazards (inflation, GDP decline, and reconstruction). Includes an Area Chart of the top 10 most expensive conflict events.
2. **Geopolitical Analytics Suite:** Deep-dive charts including regional conflict distribution (Bar Chart), Cost of War vs. Reconstruction Comparison (Double Bar Chart), GDP Change vs. Inflation Rate correlation matrix (Scatter Plot), and Conflict Type classification composition (Donut Pie Chart).
3. **Validated Database Grid & CRUD Modals:** A full paginated conflict records table with keyword search, sorting options, and status filters, equipped with Formik + Yup validated creation/editing forms and deletion warning modals.
4. **User Profile Settings:** Allows users to modify details (name, email) and passwords securely.
5. **System Settings & diagnostics:** Syncs system-wide dark/light theme options, default row limits, and tests backend ping latency status in real time.
6. **Admin User Management:** Restricted control grid for admins to promote standard analysts to administrator status or revoke active user accounts.

---

## 🛠️ Technology Stack
- **Bundler:** Vite
- **UI Core:** React 19 + Material UI (MUI) v9
- **Styling:** Tailwind CSS v4 + Vanilla CSS custom variables (Light/Dark mode synced)
- **State Management:** Redux Toolkit + React Redux
- **HTTP Client:** Axios with JWT interceptors
- **Visualizations:** Recharts v3 (React 19 compatible)
- **Form Handling:** Formik + Yup schemas
- **Icons:** Lucide React

---

## 📂 Folder Layout
Inside `client/src/`:
```text
src/
├── components/         # Reusable UI components (Layout, Theme, Navbar, Sidebar, Modals, Toasts)
├── pages/              # Main view screens (Dashboard, Conflicts, Analytics, UserManagement, Profile, Settings, Login, Register, NotFound)
├── services/           # Axios central API configuration with authorization interceptors
├── store/              # Central Redux Toolkit configuration and slices (authSlice, dataSlice, uiSlice)
├── App.jsx             # React Router routing logic and Protected guards configuration
├── index.css           # Global Tailwind and base styles
└── main.jsx            # React mounting file
```

---

## 💻 Local Setup & Development

### 1. Installation
Navigate to the `client/` folder and install dependencies:
```bash
npm install
```

### 2. Running the Dev Server
Start the development server with Vite (proxies `/api` requests to port `5000` automatically):
```bash
npm run dev
```

### 3. Building for Production
Verify compilation safety and build the optimized production assets:
```bash
npm run build
```
This builds static assets into the `dist/` folder.
