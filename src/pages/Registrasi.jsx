import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, CheckCircle2, XCircle } from "lucide-react";

function Registrasi() {
  const [namaPengguna, setNamaPengguna] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [pesan, setPesan] = useState("");
  const [pesanTipe, setPesanTipe] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const daftarPengguna = JSON.parse(
      localStorage.getItem("daftarPengguna") || "[]"
    );

    const adaUser = daftarPengguna.find((u) => u.username === namaPengguna);
    if (adaUser) {
      setPesan("Username sudah terdaftar, pilih yang lain.");
      setPesanTipe("error");
      return;
    }

    const newId = daftarPengguna.length > 0 ? daftarPengguna[daftarPengguna.length - 1].id + 1 : 1;

    daftarPengguna.push({
      id: newId,
      username: namaPengguna,
      password: kataSandi,
    });

    localStorage.setItem("daftarPengguna", JSON.stringify(daftarPengguna));

    setPesan("Registrasi berhasil! Silakan login.");
    setPesanTipe("success");

    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-gray-800">
          Sign Up
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Silahkan daftar untuk membuat akun
        </p>

        {pesan && (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg mb-4 text-sm ${
              pesanTipe === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {pesanTipe === "success" ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            {pesan}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={namaPengguna}
              onChange={(e) => setNamaPengguna(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
              placeholder="Buat username"
              required
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="password"
              value={kataSandi}
              onChange={(e) => setKataSandi(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
              placeholder="Buat password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-medium shadow-md"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-orange-600 hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registrasi;