import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./screens/Layout/Layout";
import Login from "./screens/Login/Login";
import Home from "./screens/Home/Home";
import Registration from "./screens/Registration/Registration";

function App() {
  const routes = createBrowserRouter([
    { path: "/", element: <Layout /> ,
      children: [ 
        { index:true , element: <Home /> },
      ],
    },
    { path: "login", element:<Login /> },
    { path: "Registration", element:<Registration /> },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
