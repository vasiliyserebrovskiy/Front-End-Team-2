import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <section className="flex gap-3 bg-gray-400">
      <nav className="flex p-3 gap-6 justify-center items-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/carts">Carts</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/sign-up">Signup</NavLink>
        <NavLink to="/sign-in">Signin</NavLink>
        {/*  */}
      </nav>
    </section>
  );
}
