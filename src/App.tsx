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
import ProductPage from './pages/ProductPage/ProductPage';
import { AuthProvider } from "./providers/AuthProviders";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import ChangeUserPassword from "./pages/ChangeUserPassword/ChangeUserPassword";
import ProductsInShop from "./pages/ProductsInShop/ProductsInShop";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/shops/:restaurantId/products" element={<ProductsInShop />} />
              <Route path="/categories" element={<Categories />} />
              <Route path='/products/:type?' element={<Products />} />
							<Route path={'/product/:id'} element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/users" element={<Users />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangeUserPassword />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
