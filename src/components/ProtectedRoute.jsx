import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Cek apakah ada ID pengguna aktif di localStorage
  const penggunaAktifId = localStorage.getItem("penggunaAktifId");

  // Jika tidak ada, alihkan ke halaman login
  if (!penggunaAktifId) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada, tampilkan komponen anak-anak
  return children;
}

export default ProtectedRoute;