import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from  "./components/layouts/navbar";
import About from "./components/about";
import Contact from "./components/contact";
import Home from "./components/home";
import Plans from "./components/plans";
import Login from "./components/login";
import Politics from "./components/politics";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />}></Route>
            <Route path="plans" element={<Plans />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="politics" element={<Politics />}></Route>
            <Route path="contact" element={<Contact />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
