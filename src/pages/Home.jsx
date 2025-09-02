import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Flame, Sparkles, Clock, User, Calendar, Heart, BookOpen } from "lucide-react";
import { RecipeContext } from "../context/RecipeContext";

const Home = () => {
  const { recipes } = useContext(RecipeContext);
  const [daftarResep, setDaftarResep] = useState([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);

  useEffect(() => {
    if (recipes && recipes.length > 0) {
      setDaftarResep(recipes);
    } else {
      setDaftarResep([]);
    }
    setSedangMemuat(false);
  }, [recipes]);

  if (sedangMemuat) {
    return (
      <div className="text-center py-20 text-gray-500 animate-pulse">
        Memuat resep...
      </div>
    );
  }

  const resepPopuler = [...daftarResep]
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(0, 3);

  const resepTerbaru = [...daftarResep]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-10">
      <section
        className="w-full min-h-[380px] md:min-h-[460px] flex flex-col items-center justify-center text-center text-white relative overflow-hidden rounded-2xl px-4"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/1200x/d8/ae/72/d8ae72a332c9cd4a486b6e3e82b54b04.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-md mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Selamat Datang
          </h1>
          <p className="text-sm md:text-lg mb-5">
            Temukan resep terbaik untuk hari ini!
          </p>
          <Link
            to="/all-recipes"
            className="bg-white text-orange-600 font-semibold px-4 py-1.5 text-sm rounded-md shadow-md hover:bg-orange-100 transition"
          >
            Lihat Semua Resep
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center gap-2 mb-6">
          <Flame size={20} className="text-orange-600 animate-pulse-slow" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Resep Populer
          </h2>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
          {resepPopuler.map((resep) => (
            <Link
              to={`/recipe/${resep.id}`}
              key={resep.id}
              className="block group"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="relative">
                  <img
                    src={resep.image}
                    alt={resep.title}
                    className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Heart size={14} /> {resep.likesCount}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                    {resep.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {resep.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-orange-600 font-semibold">
                    <span className="bg-orange-50 px-3 py-1 rounded-full">
                      {resep.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} /> {resep.cookTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-800 mb-6">
          <Sparkles size={20} className="text-orange-600 animate-spin-slow" />
          Resep Terbaru
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {resepTerbaru.map((resep) => (
            <div
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              key={resep.id}
            >
              <Link to={`/recipe/${resep.id}`}>
                <div className="relative">
                  <img
                    src={resep.image}
                    alt={resep.title}
                    className="w-full h-32 sm:h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-semibold flex items-center gap-1.5">
                      <BookOpen size={16} /> Buka Resep
                    </span>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-1 line-clamp-1">
                    {resep.title}
                  </h3>
                  <p className="text-xs text-orange-600 mb-2 font-semibold">
                    {resep.category}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[10px] sm:text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <User size={12} /> {resep.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(resep.createdAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;