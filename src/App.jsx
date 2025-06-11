import { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import BookingForm from "./components/BookingForm";
import PurchaseForm from "./components/PurchaseForm";

function App() {
  const [currentView, setCurrentView] = useState("home"); // "home", "booking", "purchase"

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomePage onSelectOption={setCurrentView} />;
      case "booking":
        return <BookingForm onBack={() => setCurrentView("home")} />;
      case "purchase":
        return <PurchaseForm onBack={() => setCurrentView("home")} />;
      default:
        return <HomePage onSelectOption={setCurrentView} />;
    }
  };

  return <div className="app-container">{renderCurrentView()}</div>;
}

export default App;
