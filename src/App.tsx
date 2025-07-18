import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Carts from "./pages/Carts/Carts";
import { MainLayout } from "./layout/MainLayout";
import About from "./pages/About/About";
import Categories from "./pages/Categories/Categories";
import Users from "./pages/Users/Users";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/carts" element={<Carts />} />
            <Route path="/users" element={<Users />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/sign-in" element={<Signin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
