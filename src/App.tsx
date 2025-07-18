import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Carts from "./pages/Carts/Carts";
import Users from "./pages/Users/Users";
import { MainLayout } from "./layout/MainLayout";
import AddProduct from "./pages/AddProduct/AddProduct";
import AddUser from "./pages/AddUser/AddUser";
import AddCart from "./pages/AddCart/AddCart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/carts" element={<Carts />} />
            <Route path="/add-cart" element={<AddCart />} />
            <Route path="/users" element={<Users />} />
            <Route path="/add-user" element={<AddUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
