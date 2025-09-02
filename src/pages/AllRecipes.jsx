import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Heart, Bookmark, Clock, User, Calendar } from "lucide-react";
import { RecipeContext } from "../context/RecipeContext";

function AllRecipes() {
  const { recipes, favorites, likes, toggleFavorite, toggleLike } = useContext(RecipeContext);

  const currentUserId = localStorage.getItem("penggunaAktifId") || "guest";

  const [kataKunci, setKataKunci] = useState("");
  const [urutan, setUrutan] = useState("terbaru");

  const [halamanAktif, setHalamanAktif] = useState(1);
  const jumlahResepPerHalaman = 8;

  const hitungLike = (resep) => {
    let total = resep.likesCount || 0;
    for (const userId in likes) {
      if (likes[userId]?.includes(resep.id)) total++;
    }
    return total;
  };

  const hitungFavorit = (resep) => {
    let total = resep.favsCount || 0;
    for (const userId in favorites) {
      if (favorites[userId]?.includes(resep.id)) total++;
    }
    return total;
  };

  const totalFavoritUser = () => {
    const favsDariUser = favorites[currentUserId] || [];
    return favsDariUser.length;
  };

  const hasilPencarian = recipes.filter((r) =>
    r.title.toLowerCase().includes(kataKunci.toLowerCase())
  );

  hasilPencarian.sort((a, b) => {
    if (urutan === "terbanyakLike") return hitungLike(b) - hitungLike(a);
    if (urutan === "terbanyakFavorit") return hitungFavorit(b) - hitungFavorit(a);

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const indexResepTerakhir = halamanAktif * jumlahResepPerHalaman;
  const indexResepPertama = indexResepTerakhir - jumlahResepPerHalaman;
  const resepSaatIni = hasilPencarian.slice(indexResepPertama, indexResepTerakhir);

  const totalHalaman = Math.ceil(hasilPencarian.length / jumlahResepPerHalaman);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="flex flex-col md:flex-row gap-4 mb-3">
        <input
          type="text"
          placeholder="Cari resep..."
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none max-w-2xl"
        />
        <select
          value={urutan}
          onChange={(e) => setUrutan(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none w-60"
        >
          <option value="terbaru">Terbaru</option>
          <option value="terbanyakLike">Terbanyak Like</option>
          <option value="terbanyakFavorit">Terbanyak Favorit</option>
        </select>
      </div>

      <div className="fixed top-20 right-6 z-30">
        <div className="bg-white shadow-md rounded-full p-2 flex items-center gap-1 cursor-pointer">
          <Bookmark className="text-orange-500" size={22} />
          <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {totalFavoritUser()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {resepSaatIni.map((resep) => {
          const isLiked = likes[currentUserId]?.includes(resep.id);
          const isFavorited = favorites[currentUserId]?.includes(resep.id);

          return (
            <div
              key={resep.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-4 flex flex-col border-2 border-orange-100 hover:border-orange-400"
            >
              <Link to={`/recipe/${resep.id}`}>
                <img
                  src={resep.image}
                  alt={resep.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              </Link>
              <h3 className="text-lg font-semibold text-gray-800 truncate">{resep.title}</h3>
              <p className="text-sm text-gray-500 mb-2 truncate">{resep.category}</p>

              <div className="text-xs text-gray-500 space-y-1 mb-4">
                <div className="flex justify-between">
                  <span className="flex items-center gap-1 max-w-[80px] truncate">
                    <Clock size={14} /> {resep.cookTime} menit
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {new Date(resep.createdAt).toLocaleDateString("id-ID")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={14} /> {resep.author || "Unknown"}
                </div>
              </div>

              <div className="flex justify-between mt-auto">
                <button
                  className={`flex items-center gap-1 text-sm transition ${
                    isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
                  }`}
                  onClick={() => toggleLike(resep.id, currentUserId)}
                >
                  <Heart size={18} stroke={isLiked ? "red" : "gray"} fill={isLiked ? "red" : "none"} />
                  {hitungLike(resep)}
                </button>
                <button
                  className={`flex items-center gap-1 text-sm transition ${
                    isFavorited ? "text-yellow-500" : "text-gray-600 hover:text-yellow-500"
                  }`}
                  onClick={() => toggleFavorite(resep.id, currentUserId)}
                >
                  <Bookmark size={18} stroke={isFavorited ? "gold" : "gray"} fill={isFavorited ? "gold" : "none"} />
                  {hitungFavorit(resep)}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8 text-sm">
        <button
          disabled={halamanAktif === 1}
          onClick={() => setHalamanAktif((h) => h - 1)}
          className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-600 transition"
        >
          Prev
        </button>
        <span className="text-gray-600 font-medium">
          Hal {halamanAktif} dari {totalHalaman}
        </span>
        <button
          disabled={halamanAktif === totalHalaman}
          onClick={() => setHalamanAktif((h) => h + 1)}
          className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default  AllRecipes;