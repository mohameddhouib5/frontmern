import { useState } from "react";
import Listarticle from "./components/articleRedux/Listarticle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Cart from "./components/articleRedux/cart";
import NavScroll from "./components/NavScrolls";
import ProductsAppAdmin from "./Admin/Components/Articles/ProductsAppAdmin";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Register from "./Admin/Components/Register";
import Login from "./Admin/Components/Login";
import Logout from "./Admin/Components/Logout";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./Admin/ProtectedRoute";
import Dashboard from "./Admin/Dashboard";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <>
      <h1>Bienvenue dans mon site </h1>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/menu" element={<NavScroll />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/articles" element={<Listarticle />} />
         
          <Route path="/cart" element={<Cart />} />
          <Route path="/articlesadmin" element={<ProductsAppAdmin />} />
        </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
