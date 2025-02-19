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
// import Header from "./pages/Header";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import NoticePage from "./pages/community-related/Notice";
import Write from "./components/community-related/Write";
import Faq from "./pages/community-related/Faq";
import Answer from "./components/community-related/Answer";
import QnaPage from "./pages/community-related/Qna";
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
            <Route path="/community-related/notice" element={<NoticePage />} />
            <Route
              path="/components/community-related/write"
              element={<Write />}
            />
            <Route path="/community-related/qna" element={<QnaPage />} />
            <Route path="/community-related/faq" element={<Faq />} />
            <Route path="/qna/answer" element={<Answer />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
