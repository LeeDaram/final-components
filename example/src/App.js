import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Company from './pages/Company';
import Marketplace from './pages/Marketplace';
import Features from './pages/Features';
import Login from './pages/login-related/Login';
import Join from './pages/login-related/Join';
// import Header from "./pages/Header";
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import PersonalForm from './pages/login-related/personalForm';
import BusinessForm from './pages/login-related/businessForm';
import FindUserId from './pages/login-related/findUserId';
import FindUserPassword from './pages/login-related/findUserPassword';
import { AuthProvider } from './pages/login-related/AuthContext';

function App() {
    return (
        <Router>
            <AuthProvider>
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
                            <Route path="/personal-form" element={<PersonalForm />} />
                            <Route path="/business-form" element={<BusinessForm />} />
                            <Route path="/find-id" element={<FindUserId />} />
                            <Route path="/find-password" element={<FindUserPassword />} />
                        </Routes>
                    </main>
                </div>
                <Footer />
            </AuthProvider>
        </Router>
    );
}

export default App;
