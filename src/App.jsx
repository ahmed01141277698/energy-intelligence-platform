import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { motion } from "motion/react";
import { store } from "./store/store.js";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { EnergyHeader } from "./components/energy-header.jsx";
import { Navigation } from "./components/layout/Navigation.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Analysis } from "./pages/Analysis.jsx";
import { Predictions } from "./pages/Predictions.jsx";
import { Comparison } from "./pages/Comparison";
import { EnergySources } from "./pages/EnergySources";
import { FactoryZones } from "./pages/FactoryZones";
import { CalculatorPage } from "./pages/Calculator.jsx";
import { Reports } from "./pages/Reports.jsx";
import { Alerts } from "./pages/Alerts.jsx";
import { Goals } from "./pages/Goals.jsx";
import { Maintenance } from "./pages/Maintenance.jsx";
import { Standards } from "./pages/Standards.jsx";
import { About } from "./pages/About.jsx";
import { useSelector } from "react-redux";

function AppContent() {
  const language = useSelector((state) => state.app.language);

  return (
    <div
      className="min-h-screen bg-background"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <EnergyHeader />

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar Navigation */}
        <motion.aside
          className="w-64 border-r bg-card/50 backdrop-blur-sm"
          initial={{ x: language === "ar" ? 100 : -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Navigation />
        </motion.aside>

        {/* Main Content */}
        <motion.main
          className="flex-1 overflow-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto px-6 py-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/standards" element={<Standards />} />
              <Route path="/comparison" element={<Comparison />} />
              <Route path="/energy-sources" element={<EnergySources />} />
              <Route path="/factory-zones" element={<FactoryZones />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </motion.main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <Router>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <AppContent />
          </motion.div>
        </Router>
      </LanguageProvider>
    </Provider>
  );
}
