# Business Audit Pro Dashboard

A professional analytical dashboard designed for monitoring audits, managing risks, and visualizing financial data. Built with a modern **React + TypeScript** stack.

## 🚀 Features

- **Executive Overview**: High-level statistics featuring key metrics such as Total Budget, ROI, and Risk levels.
- **Real-time Filtering**: Dynamic search and filtering by risk level (High, Medium, Low).
- **Data Visualization**: 
  - Interactive Budget Distribution bar charts (Recharts).
  - Risk Analysis pie charts with drill-down critical item lists.
- **Export Capabilities**: Seamless CSV export for financial reporting and Excel analysis.
- **Multi-tab Navigation**: Dedicated views for Dashboard, Audit Database, and Risk Reports.
- **Theming**: Full Support for Light and Dark modes with persistent `localStorage` settings.

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript.
- **UI Framework**: Material UI (MUI).
- **Charts**: Recharts (with custom stabilization logic).
- **Icons**: MUI Icons.

## ⚙️ Technical Challenges & Solutions

### Chart Responsiveness & Stabilization
One of the key technical achievements in this project was resolving the common `Recharts: width(-1)` error caused by Material UI's asynchronous Grid rendering.
- **Solution**: Implemented a controlled `isMounted` state logic with a calculated delay.
- **Optimization**: Used the `aspect` ratio property to stabilize chart proportions before the final DOM calculation.
- **Refinement**: Added `minWidth: 0` to Grid containers to prevent flexbox collapse during re-renders.

### Type Safety
Strict TypeScript implementation using the `import type` standard to ensure clean builds and optimized bundle sizes.

## 📦 Installation & Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/business-audit-dashboard.git](https://github.com/your-username/business-audit-dashboard.git)

2. Install dependencies:
npm install

3. Run the project in development mode:
npm run dev

