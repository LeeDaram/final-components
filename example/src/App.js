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
import StoreDetail from "./components/ui/StoreDetail";
// import Header from "./pages/Header";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import PersonalForm from "./pages/login-related/personalForm";
import BusinessForm from "./pages/login-related/businessForm";
import FindUserId from "./pages/login-related/findUserId";
import FindUserPassword from "./pages/login-related/findUserPassword";
import { AuthProvider } from "./pages/login-related/AuthContext";
import UserAccount from "./pages/mypage-related/commonness/userAccount";
import UserPassword from "./pages/mypage-related/commonness/userPassword";
import UserDelete from "./pages/mypage-related/commonness/userDelete";
import UserReviews from "./pages/mypage-related/user/userReviews";
import UserReservations from "./pages/mypage-related/user/userReservations";
import BusinessApply from "./pages/mypage-related/business/businessApply";
import BusinessRegister from "./pages/mypage-related/business/businessRegister";
import ApplyStatus from "./pages/mypage-related/business/applyStatus";
import BusinessEdit from "./pages/mypage-related/business/businessEdit";
import BusinessReservations from "./pages/mypage-related/business/businessReservations";
import AdminApproval from "./pages/mypage-related/admin/adminApproval";
import AdminDashboard from "./pages/mypage-related/admin/adminDashboard";
import NoticePage from "./pages/community-related/Notice";
import Write from "./components/community-related/Write";
import Faq from "./pages/community-related/Faq";
import Answer from "./components/community-related/Answer";
import QnaPage from "./pages/community-related/Qna";
import { CommuModal } from "./components/community-related/CommuModal";
import FileUpload from "./pages/community-related/Mfiletest";
import Ocrtest from "./pages/community-related/Ocrtest";
import SimpleSlider from "./components/ui/homeCarousel/HomeCarousel";
import Brand from "./pages/guide-related/intro/Brand";
import Guide from "./pages/guide-related/intro/Guide";
import Imchat from "./pages/guide-related/intro/imchat.js/Imchatbot";
import Service from "./pages/guide-related/intro/g-service";
import Site from "./pages/guide-related/intro/site";
import HeroSection from "./pages/guide-related/intro/herosection";

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
              <Route
                path="/mypage/update/password"
                element={<UserPassword />}
              />
              <Route path="/mypage/delete/account" element={<UserDelete />} />
              <Route path="/mypage/reviews" element={<UserReviews />} />
              <Route
                path="/mypage/reservations"
                element={<UserReservations />}
              />
              <Route
                path="/mypage/business/apply"
                element={<BusinessApply />}
              />
              <Route
                path="/mypage/business/register"
                element={<BusinessRegister />}
              />
              <Route
                path="/mypage/business/apply-status"
                element={<ApplyStatus />}
              />
              <Route
                path="/mypage/business/update-info"
                element={<BusinessEdit />}
              />
              <Route
                path="/mypage/business/reservations"
                element={<BusinessReservations />}
              />
              <Route
                path="/mypage/admin/approval"
                element={<AdminApproval />}
              />
              <Route
                path="/mypage/admin/dashboard"
                element={<AdminDashboard />}
              />
              <Route path="/find/map" element={<Store />} />
              <Route path="/find/map/:storeName" element={<StoreDetail />} />
              <Route
                path="/community-related/notice"
                element={<NoticePage />}
              />
              <Route
                path="/components/community-related/write"
                element={<Write />}
              />
              <Route path="/community-related/qna" element={<QnaPage />} />
              <Route path="/community-related/faq" element={<Faq />} />
              <Route path="/answer" element={<Answer />} />
              <Route path="/file" element={<FileUpload />} />
              <Route path="/ocr" element={<Ocrtest />} />
              <Route path="/guide-related/intro/brand" element={<Brand />} />
              <Route path="/guide-related/intro/guide" element={<Guide />} />
              <Route path="/chatbot" element={<Imchat />} />
              <Route path="/guide-related/intro/site" element={<Site />} />
              <Route
                path="/guide-related/intro/herosection"
                element={<HeroSection />}
              />
            </Routes>
          </main>
        </div>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
