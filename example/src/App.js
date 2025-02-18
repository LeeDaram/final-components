import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Company from "./pages/Company";
import Marketplace from "./pages/Marketplace";
import Features from "./pages/Features";
import Login from "./pages/login-related/Login";
import Join from "./pages/login-related/Join";
import Store from "./pages/find-related/store";
// import Header from "./pages/Header";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

function App() {
  return (
    <Router>
      <div>
        <Header />
        {/* <Header /> */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/features" element={<Features />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/find/map" element={<Store />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
