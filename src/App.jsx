import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Employees_login from "./pages/employees_pages/Employees_login/Employees_login";
import Registration from "./pages/parent_pages/Registration/Registration";
import SideBarContextProvider from "./context/SideBar";
import Requests from "./pages/employees_pages/Requests/Requests";
import Busses from "./pages/employees_pages/Busses/Busses";
import Users from "./pages/employees_pages/Users/Users";
import Employees from "./pages/employees_pages/Employees/Employees";
import Dashboard from "./pages/employees_pages/Dashboard/Dashboard";
import Groups from "./pages/employees_pages/Groups/Groups";
import Parent_login from "./pages/parent_pages/Parent_login/Parent_login";
import Website from "./pages/website/Website";
import Parent_request from "./pages/parent_pages/Parent_request/Parent_request";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  const routes = createBrowserRouter([
    { path: "/", element:<Website /> },
    { path: "/Registration", element:<Registration /> },
    { path: "/parent.login", element:<Parent_login /> },
    { path: "/parentRequest", element:<Parent_request /> },
    
    { path: "/employees.login", element:<Employees_login /> },
    { path: "/employees.panal", element: <Layout /> ,
    children: [
      { index:true, element:<Dashboard /> },
      { path: "/employees.panal/groups", element:<Groups /> },
      { path: "/employees.panal/users", element:<Users /> },
      { path: "/employees.panal/requests", element:<Requests /> },
      { path: "/employees.panal/busses", element:<Busses /> },
      { path: "/employees.panal/employees", element:<Employees /> },
    ],
  },
  ]);

  return (
    <Provider store={store}>
      <SideBarContextProvider>
        <RouterProvider router={routes} />
      </SideBarContextProvider>
    </Provider>
  ) 
  
}

export default App;
