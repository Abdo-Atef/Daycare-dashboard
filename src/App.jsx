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
import ForgetPassword from "./pages/employees_pages/ForgetPassword/ForgetPassword";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EmployeeProfile from "./pages/employees_pages/EmployeeProfile/EmployeeProfile";
import ParentForgetPass from "./pages/parent_pages/Parent_forgetPassword/ParentForgetPass";
import EvaluatorRequests from "./pages/employees_pages/EvaluatorRequests/EvaluatorRequests";
import About from "./pages/website/About/About";
import Contact from "./pages/website/Contact/Contact";
import SpicificRequest from "./pages/employees_pages/spicificRequest/SpicificRequest";
import Interview from "./pages/employees_pages/interview/Interview";
import ResultIntervew from "./pages/employees_pages/ResultInterviewsForAllinterviewer/ResultIntervew";
function App() {
  const routes = createBrowserRouter([
    { path: "/", element:<Website />},
    { path: "/Registration", element:<Registration /> },
    { path: "/parent.login", element:<Parent_login /> },
    { path: "/parentRequest", element:<Parent_request /> },
    { path: "/parentForgetPassword", element:<ParentForgetPass/> },
    { path: "/about", element:<About/> },
    { path: "/contact", element:<Contact/> },
    { path: "/employees.login", element:<Employees_login /> },
    { path: "/employees.panal", element: <Layout /> ,
    children: [
      { index:true, element:<Dashboard /> },
      { path: "/employees.panal/groups", element:<Groups /> },
      { path: "/employees.panal/users", element:<Users /> },
      { path: "/employees.panal/requests", element:<Requests /> },
      { path: "/employees.panal/SpicificRequest/:id", element:<SpicificRequest/> },
      { path: "/employees.panal/busses", element:<Busses/> },
      { path: "/employees.panal/employees", element:<Employees /> },
      { path: "/employees.panal/EmployeeProfile", element:<EmployeeProfile /> },
      { path: "/employees.panal/interview", element:<Interview/> },
      { path: "/employees.panal/interview/resultsInterview", element:<ResultIntervew/> },
      { path: "/employees.panal/EvaluatorRequests", element:<EvaluatorRequests /> },
    ],
  } ,
  { path: "/employees.ForgetPassword", element:<ForgetPassword /> },
  ]);

  return (
    <Provider store={store}>
      <SideBarContextProvider>
        <RouterProvider router={routes} />
        <ToastContainer />
      </SideBarContextProvider>
    </Provider>
  ) 
  
}

export default App;
