import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/navbar";
import NavbarDashboard from "./components/layouts/NavbarDasboard";
import { AuthProvider } from "./context/AuthContext";
import AboutUs from "./components/about";
import Contact from "./components/contact";
import Home from "./components/home";
import Plans from "./components/plans";
import Login from "./components/login";
import Politics from "./components/politics";
import Dashboard from "./components/dashboard";
import Accidents from "./components/accidents";
import Reports from "./components/reports";
import Messages from "./components/messages";
import Policies from "./components/policies";
import SignUp from "./components/signUp";
import NewPassword from "./components/newPassword";
import Configuration from "./components/configuration";
import PoliciesCreate  from "./components/policiescreate";
import AccidentsCreate  from "./components/accidentscreate";
import ReportsCreate  from "./components/reportscreate";
import MessageView  from "./components/messageview";
import Users  from "./components/users";
import UserCreate  from "./components/usercreate";
import Payments  from "./components/payments";
import PaymentCreate  from "./components/paymentcreate";
import PoliciesType  from "./components/policiesType";
import PoliciesTypeCreate  from "./components/policiesTypecreate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />}></Route>
              <Route path="plans" element={<Plans />}></Route>
              <Route path="about" element={<AboutUs />}></Route>
              <Route path="politics" element={<Politics />}></Route>
              <Route path="contact" element={<Contact />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="*" element={<Navigate replace to="/" />}></Route>
              <Route path="signUp" element={<SignUp />}></Route>
              <Route path="newPassword" element={<NewPassword />}></Route>
              
            </Route>

            <Route path="/" element={<NavbarDashboard />}>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="policies" element={<Policies />}></Route>
              <Route path="accidents" element={<Accidents />}></Route>
              <Route path="policiesType" element={<PoliciesType />}></Route>

              <Route path="payments" element={<Payments />}></Route>
              <Route path="payments/view/:id" element={<PaymentCreate typeRoute="view" />}></Route>
              <Route path="payments/update/:id" element={<PaymentCreate typeRoute="update" />}></Route>
              <Route path="payments/create" element={<PaymentCreate typeRoute="create" />}></Route>

              <Route path="users" element={<Users />}></Route>
              <Route path="users/view/:id" element={<UserCreate typeRoute="view" />}></Route>
              <Route path="users/update/:id" element={<UserCreate typeRoute="update" />}></Route>
              <Route path="users/create" element={<UserCreate typeRoute="create" />}></Route>

              <Route path="messages" element={<Messages />}></Route>
              <Route path="messages/view/:id" element={<MessageView typeRoute="view" />}></Route>
              <Route path="messages/update/:id" element={<MessageView typeRoute="update" />}></Route>

              <Route path="reports" element={<Reports />}></Route>

              <Route path="reports/view/:id" element={<ReportsCreate typeRoute="view" />}></Route>
              <Route path="reports/update/:id" element={<ReportsCreate typeRoute="update" />}></Route>
              <Route path="reports/create" element={<ReportsCreate typeRoute="create" />}></Route>

              <Route path="policies/view/:id" element={<PoliciesCreate typeRoute="view" />}></Route>
              <Route path="policies/update/:id" element={<PoliciesCreate typeRoute="update" />}></Route>
              <Route path="policies/create" element={<PoliciesCreate typeRoute="create" />}></Route>

              <Route path="policiesType/view/:id" element={<PoliciesTypeCreate typeRoute="view" />}></Route>
              <Route path="policiesType/update/:id" element={<PoliciesTypeCreate typeRoute="update" />}></Route>
              <Route path="policiesType/create" element={<PoliciesTypeCreate typeRoute="create" />}></Route>
              
              <Route path="/accidents-create" element={<AccidentsCreate typeRoute="create" />}></Route>
              <Route path="/accidents/view/:id" element={<AccidentsCreate typeRoute="view" />}></Route>
              <Route path="/accidents/update/:id" element={<AccidentsCreate typeRoute="update" />}></Route>

              <Route path="configuration" element={<Configuration />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
