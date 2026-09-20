import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isLogged, children }) {
  if (!isLogged) {
    return <Navigate to={"/signin"} replace />;
  }
  return children;
}
