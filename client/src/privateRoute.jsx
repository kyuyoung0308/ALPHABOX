import { Outlet, Navigate } from "react-router-dom";
import { auth } from "./firebase";

const useAuth = () => {
  const user = { loggedIn: false };
  if (auth.currentUser) user.loggedIn = true;
  return user && user.loggedIn;
};

const PrivateRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

// const PrivateRoute = () => { 
//     if (auth.currentUser) return <Login />;
//     else return <Outlet />; 
// };

export default PrivateRoute;