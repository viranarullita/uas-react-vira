import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const penggunaAktifId = localStorage.getItem("penggunaAktifId");

  if (!penggunaAktifId) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;