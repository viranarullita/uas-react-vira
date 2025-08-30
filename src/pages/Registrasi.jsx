import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, CheckCircle2, XCircle } from "lucide-react";

function Registrasi() {
  const [namaPengguna, setNamaPengguna] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [pesan, setPesan] = useState("");
  const [pesanTipe, setPesanTipe] = useState(""); // success / error
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const daftarPengguna = JSON.parse(localStorage.getItem("daftarPengguna") || "[]");

    // cek username sudah dipakai atau belum
    const adaUser = daftarPengguna.find((u) => u.username === namaPengguna);
    if (adaUser) {
      setPesan("Username sudah terdaftar, pilih yang lain.");
      setPesanTipe("error");
      return;
    }

    const newId =
      daftarPengguna.length > 0
        ? daftarPengguna[daftarPengguna.length - 1].id + 1
        : 1;

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md transform transition hover:scale-[1.01]">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Registrasi
        </h1>

        {/* Pesan Alert */}
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

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={namaPengguna}
                onChange={(e) => setNamaPengguna(e.target.value)}
                className="w-full pl-10 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
                placeholder="Buat username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={kataSandi}
                onChange={(e) => setKataSandi(e.target.value)}
                className="w-full pl-10 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
                placeholder="Buat password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition font-medium shadow-md"
          >
            Daftar
          </button>
        </form>

        {/* Link ke Login */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-orange-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registrasi;