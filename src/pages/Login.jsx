import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock } from "lucide-react";

function Login() {
  const [namaPengguna, setNamaPengguna] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [pesanError, setPesanError] = useState("");
  const navigate = useNavigate();

  // kalau sudah login, langsung redirect ke beranda
  useEffect(() => {
    const penggunaAktif = localStorage.getItem("penggunaAktifId");
    if (penggunaAktif) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const daftarPengguna = JSON.parse(
      localStorage.getItem("daftarPengguna") || "[]"
    );

    const penggunaDitemukan = daftarPengguna.find(
      (p) => p.username === namaPengguna && p.password === kataSandi
    );

    if (!penggunaDitemukan) {
      setPesanError("Username atau password salah!");
      return;
    }

    localStorage.setItem("penggunaAktifId", penggunaDitemukan.id);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md">
        {/* Judul */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-gray-800">
          Sign In
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Gunakan akun yang sudah terdaftar
        </p>

        {/* Pesan Error */}
        {pesanError && (
          <div className="mb-4 bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg">
            {pesanError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Username"
              value={namaPengguna}
              onChange={(e) => setNamaPengguna(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none text-gray-700"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="password"
              placeholder="Password"
              value={kataSandi}
              onChange={(e) => setKataSandi(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none text-gray-700"
              required
            />
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* Link ke Registrasi */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-orange-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;