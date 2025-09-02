import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Flame, Sparkles, Clock, User, Calendar, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import dataResep from "../recipe.json"; 

const Home = () => {
  const [daftarResep, setDaftarResep] = useState([]); 
  const [sedangMemuat, setSedangMemuat] = useState(true); 

  const refScroll = useRef(null); 
  const [bisaScrollKiri, setBisaScrollKiri] = useState(false); 
  const [bisaScrollKanan, setBisaScrollKanan] = useState(false); 

  useEffect(() => {
    setDaftarResep(dataResep);
    setSedangMemuat(false);
  }, []);

  const periksaScroll = () => {
    const elemen = refScroll.current;
    if (!elemen) return;
    setBisaScrollKiri(elemen.scrollLeft > 0);
    setBisaScrollKanan(elemen.scrollLeft + elemen.clientWidth < elemen.scrollWidth);
  };

  useEffect(() => {
    periksaScroll();
    const elemen = refScroll.current;
    if (elemen) {
      elemen.addEventListener("scroll", periksaScroll);
      window.addEventListener("resize", periksaScroll);
    }
    return () => {
      if (elemen) elemen.removeEventListener("scroll", periksaScroll);
      window.removeEventListener("resize", periksaScroll);
    };
  }, []);

  const geserScroll = (jumlah) => {
    refScroll.current.scrollBy({ left: jumlah, behavior: "smooth" });
  };

  if (sedangMemuat) {
    return (
      <div className="text-center py-20 text-gray-500">Memuat resep...</div>
    );
  }

  const resepPopuler = [...daftarResep]
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(0, 3);

  const resepTerbaru = [...daftarResep]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 12);

  return (
    <div className="container mx-auto px-4 py-10">
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

      <section className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <Flame size={20} className="text-orange-600" />
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Resep Populer
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {resepPopuler.map((resep, indeks) => (
            <Link to={`/recipe/${resep.id}`} key={resep.id}>
              <div
                className={`flex flex-col md:flex-row items-center md:items-stretch
                bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden`}
              >
                {/* Gambar Resep */}
                <div
                  className={`md:w-5/12 w-full ${
                    indeks % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <img
                    src={resep.image}
                    alt={resep.title}
                    className="w-full h-60 md:h-48 object-cover"
                  />
                </div>

                {/* Konten Resep */}
                <div
                  className={`md:w-8/12 w-full p-6 flex flex-col justify-center ${
                    indeks % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    {resep.title}
                  </h3>
                  <p className="text-gray-700 mb-3 text-base leading-snug line-clamp-2">
                    {resep.description}
                  </p>

                  <div className="flex items-center justify-between text-sm md:text-base text-orange-600">
                    <span className="bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                      {resep.category}
                    </span>
                    <span className="flex items-center gap-2 font-medium">
                      <Heart className="text-red-500" size={18} />
                      {resep.likesCount}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 relative">
        <h2 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-gray-800 mb-5">
          <Sparkles size={20} className="text-orange-600" />
          Resep Terbaru
        </h2>

        {bisaScrollKiri && (
          <button
            onClick={() => geserScroll(-250)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div
          ref={refScroll}
          className="flex gap-5 overflow-x-auto pb-3 scroll-smooth"
        >
          {resepTerbaru.map((resep) => (
            <div
              className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden min-w-[200px] md:min-w-[230px]"
              key={resep.id}
            >
              <Link to={`/recipe/${resep.id}`}>
                <img
                  src={resep.image}
                  alt={resep.title}
                  className="w-full h-32 md:h-36 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-1 line-clamp-1">
                    {resep.title}
                  </h3>
                  <p className="text-xs text-orange-600 mb-2">
                    {resep.category}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {resep.cookTime}
                    </span>
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

        {bisaScrollKanan && (
          <button
            onClick={() => geserScroll(250)}
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