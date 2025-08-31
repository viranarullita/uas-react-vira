import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Flame,
  Sparkles,
  Clock,
  User,
  Calendar,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import recipeData from "../recipe.json"; // 👈 langsung import

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ref & state scroll untuk resep terbaru
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    // langsung pakai data dari import
    setRecipes(recipeData);
    setIsLoading(false);
  }, []);

  // cek posisi scroll untuk resep terbaru
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollByAmount = (amount) => {
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-gray-500">Memuat resep...</div>
    );

  // ambil resep populer & terbaru
  const popularRecipes = [...recipes]
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(0, 3);

  const newestRecipes = [...recipes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 12);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Hero Section */}
      <section
        className="w-full h-[280px] md:h-[440px] flex flex-col items-center justify-center text-center text-white relative overflow-hidden rounded-2xl"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/1200x/d8/ae/72/d8ae72a332c9cd4a486b6e3e82b54b04.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Selamat Datang
          </h1>
          <p className="text-base md:text-lg mb-4">
            Temukan resep terbaik untuk hari ini!
          </p>
          <Link
            to="/all-recipes"
            className="bg-white text-orange-600 font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-orange-100 transition"
          >
            Lihat Semua Resep
          </Link>
        </div>
      </section>

      {/* Popular Recipes */}
      <section className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <Flame size={20} className="text-orange-600" />
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Resep Populer
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {popularRecipes.map((recipe, idx) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
              <div
                className={`flex flex-col md:flex-row items-center md:items-stretch 
                  bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden`}
              >
                {/* Gambar */}
                <div
                  className={`md:w-5/12 w-full ${
                    idx % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-60 md:h-48 object-cover"
                  />
                </div>

                {/* Konten */}
                <div
                  className={`md:w-8/12 w-full p-6 flex flex-col justify-center ${
                    idx % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-700 mb-3 text-base leading-snug line-clamp-2">
                    {recipe.description}
                  </p>

                  <div className="flex items-center justify-between text-sm md:text-base text-orange-600">
                    <span className="bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                      {recipe.category}
                    </span>
                    <span className="flex items-center gap-2 font-medium">
                      <Heart className="text-red-500" size={18} />
                      {recipe.likesCount}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newest Recipes */}
      <section className="mt-12 relative">
        <h2 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-gray-800 mb-5">
          <Sparkles size={20} className="text-orange-600" />
          Resep Terbaru
        </h2>

        {/* Tombol kiri */}
        {canScrollLeft && (
          <button
            onClick={() => scrollByAmount(-250)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-3 scroll-smooth"
        >
          {newestRecipes.map((recipe) => (
            <div
              className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden min-w-[200px] md:min-w-[230px]"
              key={recipe.id}
            >
              <Link to={`/recipe/${recipe.id}`}>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-32 md:h-36 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-1 line-clamp-1">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-orange-600 mb-2">
                    {recipe.category}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {recipe.cookTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={12} /> {recipe.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(recipe.createdAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Tombol kanan */}
        {canScrollRight && (
          <button
            onClick={() => scrollByAmount(250)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </section>
    </div>
  );
};

export default Home;
