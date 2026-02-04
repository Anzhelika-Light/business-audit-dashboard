# Business Audit Pro Dashboard

A professional analytical dashboard designed for monitoring audits, managing risks, and visualizing financial data. Built with a modern **React + TypeScript** stack, featuring full CRUD capabilities and real-time data synchronization.

## 🚀 Features

- **Executive Overview**: High-level statistics featuring key metrics such as Total Budget, ROI, and Risk levels.
- **Full CRUD Support**: Create, read, update, and delete audits with instant UI feedback and server persistence.
- **Real-time Filtering**: Dynamic search and filtering by risk level (High, Medium, Low).
- **Data Visualization**:
  - **Budget Distribution**: Interactive bar charts (Recharts) with custom color mapping.
  - **Risk Analysis**: Responsive pie charts for quick distribution assessment.
- **Export Capabilities**: Seamless CSV export for financial reporting and Excel analysis.
- **Theming**: Full support for Light and Dark modes with persistent settings via `localStorage`.
- **State Management**: Predictable global state flow using Redux Toolkit.

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript.
- **State Management**: Redux Toolkit (Thunks for async logic).
- **UI Framework**: Material UI v6 (Grid v2, custom slotProps).
- **Charts**: Recharts.
- **Backend Simulation**: JSON Server (REST API).
- **Icons**: MUI Icons.

## ⚙️ Technical Challenges & Solutions

### Chart Responsiveness & Stabilization

One of the primary technical challenges was resolving the `Recharts: width(-1)` warning caused by Material UI's asynchronous Grid layout calculations.

- **Solution**: Implemented a "Ready-State" rendering pattern. Components use a small intentional delay (150ms) and `useEffect` hooks to ensure parent containers are fully rendered before initializing charts.
- **Refinement**: Applied `minWidth: 0` to Flexbox containers to prevent layout collapse and used `debounce` properties for smooth resizing.

### Type Safety & Architecture

The project maintains 100% type safety by eliminating the `any` type across the entire codebase.

- **Custom Hooks**: Implemented typed Redux hooks (`useAppSelector`, `useAppDispatch`) to ensure seamless state access.
- **Component Patterns**: Migrated from deprecated properties (like `Cell` in Recharts or `PaperProps` in MUI) to modern standards (`slotProps`, `data-driven styling`).

## 📊 Data Structure

The application manages `Audit` objects via a RESTful API:

- `id`: Unique identifier (string/number)
- `name`: Audit title/engagement name
- `budget`: Financial value (number)
- `risk`: Level ("Low" | "Medium" | "High")
- `date`: Completion/Target date

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/your-username/business-audit-dashboard.git](https://github.com/your-username/business-audit-dashboard.git)
   cd business-audit-dashboard
   ```
2. Install dependencies:
   npm install

3. Start the Backend (JSON Server):
   npm run server
   Note: This starts the mock API on http://localhost:3001

4. Start the Frontend (Vite):
   npm run dev
5. Build for production:
   npm run build

Live page: https://business-audit-dashboard.netlify.app/
