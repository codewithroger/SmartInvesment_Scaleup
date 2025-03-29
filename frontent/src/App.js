import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import InvestorPage from "./pages/InvestorPage";
import StartupPage from "./pages/StartupPage";
import Dashboard from "./components/Dashboard";
import About from "./components/About";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/home" element={<Dashboard />} />
                <Route path="/investor" element={<InvestorPage />} />
                <Route path="/startup" element={<StartupPage />} />
                <Route path="/about" element={<About/>} />

            </Routes>
        </Router>
    );
}

export default App;
