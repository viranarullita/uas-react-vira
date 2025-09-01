import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { RecipeContext } from "../context/RecipeContext";

function Favorites() {
  const { recipes, favorites } = useContext(RecipeContext);
  const currentUserId = localStorage.getItem("penggunaAktifId") || "guest";

  // State untuk pagination
  const [halamanSaatIni, setHalamanSaatIni] = useState(1);
  const resepPerHalaman = 8;

  // Filter resep hanya yang difavoritkan oleh pengguna aktif
  const favoritResep = recipes.filter((r) =>
    favorites[currentUserId]?.includes(r.id)
  );

  // Logika pagination
  const totalHalaman = Math.ceil(favoritResep.length / resepPerHalaman);
  const indexAwal = (halamanSaatIni - 1) * resepPerHalaman;
  const resepDitampilkan = favoritResep.slice(
    indexAwal,
    indexAwal + resepPerHalaman
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Bookmark className="text-orange-500" /> Resep Favorit Saya
      </h2>

      {favoritResep.length === 0 ? (
        <p className="text-gray-500">
          Belum ada resep favorit untuk user ini.
        </p>
      ) : (
        <>
          {/* Grid Resep Favorit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {resepDitampilkan.map((resep) => (
              <Link
                key={resep.id}
                to={`/recipe/${resep.id}`}
                className="bg-white border-2 border-orange-200 rounded-xl shadow p-4 hover:shadow-lg hover:border-orange-400 transition"
              >
                <img
                  src={resep.image}
                  alt={resep.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold text-gray-800 group-hover:text-orange-600">
                  {resep.title}
                </h3>
              </Link>
            ))}
          </div>

          {/* Navigasi Pagination */}
          {totalHalaman > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                onClick={() => setHalamanSaatIni((prev) => Math.max(prev - 1, 1))}
                disabled={halamanSaatIni === 1}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  halamanSaatIni === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                « Prev
              </button>
              <span className="text-gray-700 font-semibold">
                Hal {halamanSaatIni} dari {totalHalaman}
              </span>
              <button
                onClick={() => setHalamanSaatIni((prev) => Math.min(prev + 1, totalHalaman))}
                disabled={halamanSaatIni === totalHalaman}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  halamanSaatIni === totalHalaman
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                Next »
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Favorites;