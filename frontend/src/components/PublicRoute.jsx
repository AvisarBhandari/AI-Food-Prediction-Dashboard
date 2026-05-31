import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return <Navigate to="/profile" />;
  }

  return children;
}

export default PublicRoute;
