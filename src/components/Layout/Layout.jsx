import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import SideBar from "../SideBar/SideBar";
import { SideBarContext } from "../../context/SideBar";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";

export default function Layout() {

  const {employeeToken} = useSelector(state=> state.employee)
  const { SideBarToggle, setSideBarToggle } = useContext(SideBarContext);
  window.addEventListener("resize", () => {
    window.innerWidth < 1250 ? setSideBarToggle(true) : setSideBarToggle(false);
  });

  if (!employeeToken) return <Navigate to={'/employees.login'} />

  return (
    <div className="MainContainer">
      <SideBar />
      <main className={`AppContainer bg-main ${SideBarToggle ? "ps-60" : "ps-250"}`}>
        <NavBar />
        <Outlet />
      </main>
    </div>
  );
}
