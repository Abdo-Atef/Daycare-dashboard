import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Employees_login from "./pages/employees_pages/Employees_login/Employees_login";
import Registration from "./pages/parent_pages/Registration/Registration";
import SideBarContextProvider from "./context/SideBar";
import Requests from "./pages/employees_pages/Requests/Requests";
import Busses from "./pages/employees_pages/Busses/Busses";
import Employees from "./pages/employees_pages/Employees/Employees";
import Dashboard from "./pages/employees_pages/Dashboard/Dashboard";
import Groups from "./pages/employees_pages/Groups/Groups";
import Parent_login from "./pages/parent_pages/Parent_login/Parent_login";
import Website from "./pages/website/Website";
import Parent_request from "./pages/parent_pages/Parent_request/Parent_request";
import { useSelector } from "react-redux";
import ForgetPassword from "./pages/employees_pages/ForgetPassword/ForgetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeProfile from "./pages/employees_pages/EmployeeProfile/EmployeeProfile";
import ParentForgetPass from "./pages/parent_pages/Parent_forgetPassword/ParentForgetPass";
import EvaluatorRequests from "./pages/employees_pages/EvaluatorRequests/EvaluatorRequests";
import About from "./pages/website/About/About";
import Contact from "./pages/website/Contact/Contact";
import SpicificRequest from "./pages/employees_pages/spicificRequest/SpicificRequest";
import Interview from "./pages/employees_pages/interview/Interview";
import ResultIntervew from "./pages/employees_pages/ResultInterviewsForAllinterviewer/ResultIntervew";
import SpRequestToEvaluator from "./pages/employees_pages/EvaluatorRequests/SpRequestToEvaluator";
import EvaluatedRequests from "./pages/employees_pages/EvaluatorRequests/EvaluatedRequests";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import SpecificGroup from "./pages/employees_pages/Groups/SpecificGroup";
import Children from "./pages/employees_pages/Children/Children";

function App() {

  const { employeeToken } = useSelector((state) => state.employee);
  const [Role, setRole] = useState(null);
  // console.log(Role);
  useEffect(() => {
    if (employeeToken) {
      const UserData = jwtDecode(employeeToken);
      setRole(UserData.role);
    }
  }, [employeeToken]);

  const routes = createBrowserRouter([
    { path: "/", element: <Website /> },
    { path: "/Registration", element: <Registration /> },
    { path: "/parent.login", element: <Parent_login /> },
    { path: "/parentRequest", element: <Parent_request /> },
    { path: "/parentForgetPassword", element: <ParentForgetPass /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/employees.login", element: <Employees_login /> },
    {
      path: "/employees.panal",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <AdminProtectedRoute>
              <Dashboard role = {Role}/>
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/employees.panal/groups",
          element: (
            <AdminProtectedRoute>
              <Groups role = {Role} />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/employees.panal/groups/:id",
          element: (
            <AdminProtectedRoute>
              <SpecificGroup role = {Role} />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/employees.panal/requests",
          element: (
            <AdminProtectedRoute>
              <Requests role = {Role} />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/employees.panal/children",
          element: (
            <AdminProtectedRoute>
              <Children role = {Role} />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/employees.panal/SpicificRequest/:id",
          element: (
            <AdminProtectedRoute>
              <SpicificRequest role = {Role} />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/employees.panal/busses",
          element: (
            <AdminProtectedRoute>
              <Busses role = {Role} />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/employees.panal/employees",
          element: (
            <AdminProtectedRoute>
              <Employees role = {Role} />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/employees.panal/EmployeeProfile",
          element: <EmployeeProfile />,
        },
        {
          path: "/employees.panal/interview",
          element: (
            <InterProtectedRoute>
              <Interview role = {Role} />
            </InterProtectedRoute>
          ),
        },
        {
          path: "/employees.panal/resultsInterview",
          element: (
            <InterProtectedRoute>
              <ResultIntervew role = {Role} />
            </InterProtectedRoute>
          ),
        },
        {
          path: "/employees.panal/EvaluatorRequests",
          element: (
            <EvaProtectedRoute>
              <EvaluatorRequests role = {Role} />
            </EvaProtectedRoute>
          ),
        },
        {
          path: "/employees.panal/EvaluatedRequests",
          element: (
            <EvaProtectedRoute>
              <EvaluatedRequests role = {Role} />
            </EvaProtectedRoute>
          ),
        },
        {
          path: "/employees.panal/EvaluatorRequests/:email",
          element: (
            <EvaProtectedRoute>
              <SpRequestToEvaluator role = {Role} />
            </EvaProtectedRoute>
          ),
        },
      ],
    },
    { path: "/employees.ForgetPassword", element: <ForgetPassword /> },
  ]);

  return (
    
      <SideBarContextProvider>
        <RouterProvider router={routes} />
        <ToastContainer />
      </SideBarContextProvider>
  );
}

export default App;



function AdminProtectedRoute({ children }) {
  if (children.props.role == "admin") {
    return children;
  } else if (children.props.role == "evaluator") {
    return <Navigate to={"/employees.panal/EvaluatorRequests"} />;
  } else if (children.props.role == "interviewer") {
    return <Navigate to={"/employees.panal/interview"} />;
  }
}
function EvaProtectedRoute({ children }) {
  if (children.props.role == "evaluator") {
    return children;
  } else if (children.props.role == "admin") {
    return <Navigate to={"/employees.panal"} />;
  } else if (children.props.role == "interviewer") {
    return <Navigate to={"/employees.panal/interview"} />;
  }
}
function InterProtectedRoute({ children }) {
  if (children.props.role == "interviewer") {
    return children;
  } else if (children.props.role == "evaluator") {
    return <Navigate to={"/employees.panal/EvaluatorRequests"} />;
  } else if (children.props.role == "admin") {
    return <Navigate to={"/employees.panal"} />;
  }
}
