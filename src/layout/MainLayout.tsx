import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

export const MainLayout = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Outlet />
      <footer>
        <a href="">Some Footer</a>
      </footer>
    </>
  );
};
