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
import UserAccount from './pages/mypage-related/commonness/userAccount';
import UserPassword from './pages/mypage-related/commonness/userPassword';
import UserDelete from './pages/mypage-related/commonness/userDelete';
import UserReviews from './pages/mypage-related/user/userReviews';
import UserReservations from './pages/mypage-related/user/userReservations';
import BusinessApply from './pages/mypage-related/business/businessApply';
import BusinessRegister from './pages/mypage-related/business/businessRegister';
import ApplyStatus from './pages/mypage-related/business/applyStatus';
import BusinessEdit from './pages/mypage-related/business/businessEdit';
import BusinessReservations from './pages/mypage-related/business/businessReservations';
import AdminApproval from './pages/mypage-related/admin/adminApproval';
import AdminDashboard from './pages/mypage-related/admin/adminDashboard';

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
                            <Route path="/mypage/update/info" element={<UserAccount />} />
                            <Route path="/mypage/update/password" element={<UserPassword />} />
                            <Route path="/mypage/delete/account" element={<UserDelete />} />
                            <Route path="/mypage/reviews" element={<UserReviews />} />
                            <Route path="/mypage/reservations" element={<UserReservations />} />
                            <Route path="/mypage/business/apply" element={<BusinessApply />} />
                            <Route path="/mypage/business/register" element={<BusinessRegister />} />
                            <Route path="/mypage/business/apply-status" element={<ApplyStatus />} />
                            <Route path="/mypage/business/update-info" element={<BusinessEdit />} />
                            <Route path="/mypage/business/reservations" element={<BusinessReservations />} />
                            <Route path="/mypage/admin/approval" element={<AdminApproval />} />
                            <Route path="/mypage/admin/dashboard" element={<AdminDashboard />} />
                        </Routes>
                    </main>
                </div>
                <Footer />
            </AuthProvider>
        </Router>
    );
}

export default App;
