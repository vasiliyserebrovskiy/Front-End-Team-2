import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import { MainLayout } from "./layout/MainLayout";
import About from "./pages/About/About";
import Categories from "./pages/Categories/Categories";
import Users from "./pages/Users/Users";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import NotFound from "./pages/NotFound/NotFound";
import Cart from "./pages/Cart/Cart";
import CategoryPage from "./pages/CategoryPage/CategoryPage";

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
            <Route path="/cart" element={<Cart />} />
            <Route path="/users" element={<Users />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/categories/:type" element={<CategoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
