import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/carts">Carts</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
    </>
  );
}
