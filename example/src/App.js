import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./pages/login-related/PrivateRoute";
import PublicRoute from "./pages/login-related/PublicRoute";

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
import HistoryPage from "./pages/guide-related/intro/History";
import GuidePage from "./pages/guide-related/shop/Guidemain";
import { Kitchen } from "@mui/icons-material";
import KitchenTest from "./pages/community-related/KitchenTest";

// import axios from 'axios';

// import {springAxios} from '../../axiosConfig'
// springAxios.get
// A-Component
// import axios from 'axios';
// axios.get(...)
function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Header />
          {/* <Header /> */}
          <main>
            <Routes>
              {/* 로그인 및 회원가입 페이지 (비로그인 전용) */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/join"
                element={
                  <PublicRoute>
                    <Join />
                  </PublicRoute>
                }
              />
              <Route
                path="/find-id"
                element={
                  <PublicRoute>
                    <FindUserId />
                  </PublicRoute>
                }
              />
              <Route
                path="/find-password"
                element={
                  <PublicRoute>
                    <FindUserPassword />
                  </PublicRoute>
                }
              />

              {/* 회원가입 유형 선택 */}
              <Route
                path="/personal-form"
                element={
                  <PublicRoute>
                    <PersonalForm />
                  </PublicRoute>
                }
              />
              <Route
                path="/business-form"
                element={
                  <PublicRoute>
                    <BusinessForm />
                  </PublicRoute>
                }
              />

              {/* 공통 마이페이지 (로그인된 모든 사용자 접근 가능) */}
              <Route
                path="/mypage/update/info"
                element={
                  <PrivateRoute
                    requiredRoless={["ROLE_ADMIN", "ROLE_BIZ", "ROLE_USER"]}
                  >
                    <UserAccount />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage/update/password"
                element={
                  <PrivateRoute
                    requiredRoless={["ROLE_ADMIN", "ROLE_BIZ", "ROLE_USER"]}
                  >
                    <UserPassword />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage/delete/account"
                element={
                  <PrivateRoute
                    requiredRoless={["ROLE_ADMIN", "ROLE_BIZ", "ROLE_USER"]}
                  >
                    <UserDelete />
                  </PrivateRoute>
                }
              />

              {/* 관리자 마이페이지 (관리자 전용) */}
              <Route
                path="/mypage/admin/approval"
                element={
                  <PrivateRoute requiredRoles="ROLE_ADMIN">
                    <AdminApproval />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage/admin/dashboard"
                element={
                  <PrivateRoute requiredRoles="ROLE_ADMIN">
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />

              {/* 사업자회원 마이페이지 (사업자 전용) */}
              <Route
                path="/mypage/business/apply"
                element={
                  <PrivateRoute requiredRoles="ROLE_BIZ">
                    <BusinessApply />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage/business/register"
                element={
                  <PrivateRoute requiredRoles="ROLE_BIZ">
                    <BusinessRegister />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage/business/apply-status"
                element={
                  <PrivateRoute requiredRoles="ROLE_BIZ">
                    <ApplyStatus />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage/business/update-info"
                element={
                  <PrivateRoute requiredRoles="ROLE_BIZ">
                    <BusinessEdit />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage/business/reservations"
                element={
                  <PrivateRoute requiredRoles="ROLE_BIZ">
                    <BusinessReservations />
                  </PrivateRoute>
                }
              />

              {/* 개인회원 마이페이지 (일반회원 전용) */}
              <Route
                path="/mypage/reviews"
                element={
                  <PrivateRoute requiredRoles="ROLE_USER">
                    <UserReviews />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage/reservations"
                element={
                  <PrivateRoute requiredRoles="ROLE_USER">
                    <UserReservations />
                  </PrivateRoute>
                }
              />

              {/* 홈화면 */}
              <Route path="/" element={<Home />} />
              <Route path="/company" element={<Company />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/features" element={<Features />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />

              {/* 착한가격업소 찾기 */}
              <Route path="/find/map" element={<Store />} />
              <Route path="/find/map/:storeName" element={<StoreDetail />} />

              {/* 커뮤니티 */}
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

              {/* 사이트 소개 */}
              <Route path="/guide-related/intro/brand" element={<Brand />} />
              <Route path="/guide-related/intro/guide" element={<Guide />} />
              <Route path="/chatbot" element={<Imchat />} />
              <Route path="/guide-related/intro/site" element={<Site />} />
              <Route
                path="/guide-related/intro/herosection"
                element={<HeroSection />}
              />
              <Route path="/guide/intro/history" element={<HistoryPage />} />
              <Route path="/guide/shop" element={<GuidePage />} />
              <Route
                path="/guide-related/intro/service"
                element={<Service />}
              />

              {/* 기타 */}
              {/*<Route path="/file" element={<FileUpload />} />
                            <Route path="/ocr" element={<Ocrtest />} />
                            <Route path="/kitchen" element={<KitchenTest />} /> */}
            </Routes>
          </main>
        </div>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
