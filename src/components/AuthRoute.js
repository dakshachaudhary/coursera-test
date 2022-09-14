import { Navigate } from "react-router";
import { useAuth } from "../hooks";

function AuthRoute({ children }) {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
}

export default AuthRoute;
