//router dom
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
//Layout
import MainLayout from "./layout/MainLayout";
//pages
import {
  Home,
  Registor,
  Login,
  About,
  SingleDish,
  Cart,
  Error,
  Create,
} from "./pages";
// redux
import { useSelector } from "react-redux";
import ProtectRuter from "./components/ProtectRuter";
//action
import { action as registorAction } from "./pages/Registor";
import { action as loginAction } from "./pages/Login";
import { action as createAction } from "./pages/Create";
function App() {
  const { user } = useSelector((state) => state.user);

  let router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRuter user={user}>
          <MainLayout />
        </ProtectRuter>
      ),
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/create",
          element: <Create />,
          action: createAction,
        },
        {
          path: "/singleDish/:id",
          element: <SingleDish />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: loginAction,
      errorElement: <Error />,
    },
    {
      path: "/registor",
      element: user ? <Navigate to="/" /> : <Registor />,
      action: registorAction,
      errorElement: <Error />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
