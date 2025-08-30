import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Bookmark, Clock, User, Calendar } from "lucide-react";

const AllRecipes = () => {
  const [listResep, setListResep] = useState([]);
  const [kataKunci, setKataKunci] = useState("");
  const [urutan, setUrutan] = useState("terbaru");
  const [sedangMemuat, setSedangMemuat] = useState(true);

  // Pagination
  const [halamanAktif, setHalamanAktif] = useState(1);
  const jumlahResepPerHalaman = 12;

  // Ambil userId aktif
  const userId = localStorage.getItem("penggunaAktifId");
  const storageKeySuka = `statusSukaResep_${userId}`;
  const storageKeyFavorit = `statusFavoritResep_${userId}`;

  // Like & Favorite (state per user)
  const [statusSuka, setStatusSuka] = useState(() => {
    const tersimpan = localStorage.getItem(storageKeySuka);
    return tersimpan ? JSON.parse(tersimpan) : {};
  });

  const [statusFavorit, setStatusFavorit] = useState(() => {
    const tersimpan = localStorage.getItem(storageKeyFavorit);
    return tersimpan ? JSON.parse(tersimpan) : {};
  });

  // Ambil data dari JSON + localStorage user
  useEffect(() => {
    fetch("/recipe.json")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal ambil data resep");
        return res.json();
      })
      .then((dataJson) => {
        // --- Ambil semua user ---
        const daftarPengguna =
          JSON.parse(localStorage.getItem("daftarPengguna")) || [];

        let semuaResepUser = [];

        daftarPengguna.forEach((u) => {
          const key = `recipes_${u.id}`;
          const resepUser = JSON.parse(localStorage.getItem(key)) || [];

          const siap = resepUser.map((r) => ({
            id: r.id,
            title: r.title,
            category: r.category,
            cookTime: r.cookTime,
            author: r.author,
            createdAt: r.createdAt,
            likesCount: r.likesCount ?? 0,
            favsCount: r.favsCount ?? 0,
            image: r.image,
          }));

          semuaResepUser = [...semuaResepUser, ...siap];
        });

        // Data bawaan dari JSON
        const resepJsonSiap = dataJson.map((r) => ({
          id: r.id,
          title: r.title,
          category: r.category,
          cookTime: r.cookTime,
          author: r.author,
          createdAt: r.createdAt,
          likesCount: r.likesCount ?? 0,
          favsCount: r.favsCount ?? 0,
          image: r.image,
        }));

        // Gabungkan semua
        setListResep([...resepJsonSiap, ...semuaResepUser]);
        setSedangMemuat(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setSedangMemuat(false);
      });
  }, []);

  // Simpan status suka/favorit ke localStorage
  useEffect(() => {
    localStorage.setItem(storageKeySuka, JSON.stringify(statusSuka));
  }, [statusSuka, storageKeySuka]);

  useEffect(() => {
    localStorage.setItem(storageKeyFavorit, JSON.stringify(statusFavorit));
  }, [statusFavorit, storageKeyFavorit]);

  // Fungsi bantu simpan ke localStorage
  const simpanResepKeStorage = (resepBaru) => {
    const daftarPengguna =
      JSON.parse(localStorage.getItem("daftarPengguna")) || [];
    let sudahSimpan = false;

    daftarPengguna.forEach((u) => {
      const key = `recipes_${u.id}`;
      let resepUser = JSON.parse(localStorage.getItem(key)) || [];
      const idx = resepUser.findIndex((r) => r.id === resepBaru.id);
      if (idx !== -1) {
        resepUser[idx] = resepBaru;
        localStorage.setItem(key, JSON.stringify(resepUser));
        sudahSimpan = true;
      }
    });

    if (!sudahSimpan) {
      // simpan di recipes_json
      let resepJson = JSON.parse(localStorage.getItem("recipes_json")) || [];
      const idx = resepJson.findIndex((r) => r.id === resepBaru.id);
      if (idx !== -1) {
        resepJson[idx] = resepBaru;
      } else {
        resepJson.push(resepBaru);
      }
      localStorage.setItem("recipes_json", JSON.stringify(resepJson));
    }
  };

  // Toggle Like
  const toggleSuka = (id) => {
    setStatusSuka((prev) => {
      const sudahSuka = !!prev[id];
      const baru = { ...prev, [id]: !sudahSuka };

      setListResep((prevList) =>
        prevList.map((r) => {
          if (r.id === id) {
            const updated = {
              ...r,
              likesCount: r.likesCount + (sudahSuka ? -1 : 1),
            };
            simpanResepKeStorage(updated);
            return updated;
          }
          return r;
        })
      );

      return baru;
    });
  };

  // Toggle Favorit
  const toggleFavorit = (id) => {
    setStatusFavorit((prev) => {
      const sudahFavorit = !!prev[id];
      const baru = { ...prev, [id]: !sudahFavorit };

      setListResep((prevList) =>
        prevList.map((r) => {
          if (r.id === id) {
            const updated = {
              ...r,
              favsCount: r.favsCount + (sudahFavorit ? -1 : 1),
            };
            simpanResepKeStorage(updated);
            return updated;
          }
          return r;
        })
      );

      return baru;
    });
  };

  if (sedangMemuat) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        Memuat resep...
      </div>
    );
  }

  // Filter & Sort
  const hasilPencarian = listResep
    .filter((resep) =>
      resep.title.toLowerCase().includes(kataKunci.toLowerCase())
    )
    .sort((a, b) => {
      if (urutan === "terbanyakLike") return b.likesCount - a.likesCount;
      if (urutan === "terbanyakFavorit") return b.favsCount - a.favsCount;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  // Pagination Logic
  const indexResepTerakhir = halamanAktif * jumlahResepPerHalaman;
  const indexResepPertama = indexResepTerakhir - jumlahResepPerHalaman;
  const resepSaatIni = hasilPencarian.slice(
    indexResepPertama,
    indexResepTerakhir
  );
  const totalHalaman = Math.ceil(hasilPencarian.length / jumlahResepPerHalaman);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Toolbar */}
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

      {/* Bookmark Counter */}
      <div className="fixed top-20 right-6 z-30">
        <div className="bg-white shadow-md rounded-full p-2 flex items-center gap-1 cursor-pointer">
          <Bookmark className="text-orange-500" size={22} />
          <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {Object.values(statusFavorit).filter(Boolean).length}
          </span>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {resepSaatIni.map((resep) => (
          <div
            key={resep.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition 
             p-4 flex flex-col border-2 border-orange-100 
             hover:border-orange-400"
          >
            <Link to={`/recipe/${resep.id}`}>
              <img
                src={resep.image}
                alt={resep.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            </Link>

            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {resep.title}
            </h3>

            <p className="text-sm text-gray-500 mb-2 truncate">
              {resep.category}
            </p>

            {/* Meta info */}
            <div className="text-xs text-gray-500 space-y-1 mb-4">
              <div className="flex justify-between">
                <span className="flex items-center gap-1 max-w-[80px] truncate">
                  <Clock size={14} /> {resep.cookTime}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />{" "}
                  {new Date(resep.createdAt).toLocaleDateString("id-ID")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <User size={14} /> {resep.author}
              </div>
            </div>

            <div className="flex justify-between mt-auto">
              <button
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500"
                onClick={() => toggleSuka(resep.id)}
              >
                <Heart
                  size={18}
                  style={{
                    fill: statusSuka[resep.id] ? "red" : "white",
                    cursor: "pointer",
                  }}
                />
                {resep.likesCount + (statusSuka[resep.id] ? 1 : 0)}
              </button>
              <button
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-yellow-500"
                onClick={() => toggleFavorit(resep.id)}
              >
                <Bookmark
                  size={18}
                  style={{
                    fill: statusFavorit[resep.id] ? "gold" : "white",
                    cursor: "pointer",
                  }}
                />
                {resep.favsCount + (statusFavorit[resep.id] ? 1 : 0)}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8 text-sm">
        <button
          disabled={halamanAktif === 1}
          onClick={() => setHalamanAktif((h) => h - 1)}
          className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium 
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:bg-orange-600 transition"
        >
          « Prev
        </button>
        <span className="text-gray-600 font-medium">
          Hal {halamanAktif} dari {totalHalaman}
        </span>
        <button
          disabled={halamanAktif === totalHalaman}
          onClick={() => setHalamanAktif((h) => h + 1)}
          className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium 
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:bg-orange-600 transition"
        >
          Next »
        </button>
      </div>
    </div>
  );
};

export default AllRecipes;
