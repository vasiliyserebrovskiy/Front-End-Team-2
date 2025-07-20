import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import { MainLayout } from "./layout/MainLayout";
import About from "./pages/About/About";
import Categories from "./pages/Categories/Categories";
import Users from "./pages/Users/Users";
import Signup from "./pages/Signup/Signup";
import NotFound from "./pages/NotFound/NotFound";
import Cart from "./pages/Cart/Cart";
import { AuthProvider } from "./providers/AuthProviders";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/users" element={<Users />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
