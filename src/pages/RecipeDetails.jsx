import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import resepData from "../recipe.json";
import { Clock, Utensils, ArrowLeft, Circle, FileText, ShoppingBasket, ListOrdered, User } from "lucide-react";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [resepDipilih, setResepDipilih] = useState(null);
  const [sedangMemuat, setSedangMemuat] = useState(true);

  useEffect(() => {
    const idParsed = Number(id);

    const daftarPengguna = JSON.parse(localStorage.getItem("daftarPengguna")) || [];

    let semuaResepUser = [];
    daftarPengguna.forEach((user) => {
      const resepUser =
        JSON.parse(localStorage.getItem(`recipes_${user.id}`)) || [];
      semuaResepUser = semuaResepUser.concat(resepUser);
    });
    const semuaResep = [...resepData, ...semuaResepUser];

    const resepDitemukan = semuaResep.find((resep) => resep.id === idParsed) || null;

    setResepDipilih(resepDitemukan);
    setSedangMemuat(false);
  }, [id]);


  if (sedangMemuat)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg animate-pulse">
          Memuat detail resep...
        </p>
      </div>
    );

  if (!resepDipilih)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-medium">Resep tidak ditemukan</p>
      </div>
    );


  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
      >
        <ArrowLeft size={18} /> Kembali
      </button>

      <div className="grid md:grid-cols-2 gap-8 mb-10 items-start">
        <img
          src={resepDipilih.image}
          alt={resepDipilih.title}
          className="w-full h-80 object-cover rounded-2xl shadow-md"
        />

        <div className="bg-white rounded-2xl shadow p-6 space-y-3 max-h-96 overflow-y-auto pr-2 break-words">
          <h2 className="text-2xl font-bold text-gray-800">
            {resepDipilih.title}
          </h2>

          <p className="flex items-center text-gray-700">
            <Utensils size={18} className="text-orange-500 mr-2" />
            <span className="font-semibold">Kategori:</span>
            <span className="ml-1">{resepDipilih.category}</span>
          </p>

          <p className="flex items-center text-gray-700">
            <Clock size={18} className="text-orange-500 mr-2" />
            <span className="font-semibold">Waktu Memasak:</span>
            <span className="ml-1">{resepDipilih.cookTime || "-"}</span>
          </p>

          <p className="flex items-center text-gray-700">
            <User size={18} className="text-orange-500 mr-2" />
            <span className="font-semibold">Author:</span>
            <span className="ml-1">{resepDipilih.author}</span>
          </p>

          {resepDipilih.description && (
            <p className="flex items-start text-gray-700 whitespace-pre-line">
              <FileText size={18} className="text-orange-500 mr-2 mt-1" />
              <span>
                <span className="font-semibold mr-1">Deskripsi:</span>
                {resepDipilih.description}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="mb-10">
        <h3 className="flex items-center text-xl font-semibold text-orange-600 mb-3">
          <ShoppingBasket size={20} className="mr-2" /> Bahan-bahan
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700 bg-white shadow rounded-2xl p-6 max-h-64 overflow-y-auto pr-2">
          {Array.isArray(resepDipilih.ingredients) ? (
            resepDipilih.ingredients.map((bahan, index) => (
              <li key={index} className="flex items-start">
                <Circle size={14} className="text-orange-500 mr-2 mt-1" />
                {bahan}
              </li>
            ))
          ) : (
            <li>{resepDipilih.ingredients}</li>
          )}
        </ul>
      </div>

      <div>
        <h3 className="flex items-center text-xl font-semibold text-orange-600 mb-3">
          <ListOrdered size={20} className="mr-2" /> Cara Membuat
        </h3>
        <ol className="space-y-3 text-gray-700 bg-white shadow rounded-2xl p-6 max-h-96 overflow-y-auto pr-2">
          {Array.isArray(resepDipilih.steps) ? (
            resepDipilih.steps.map((langkah, index) => (
              <li key={index} className="flex">
                <span className="font-bold text-orange-500 mr-3">
                  {index + 1}.
                </span>
                <span>{langkah}</span>
              </li>
            ))
          ) : (
            <li>{resepDipilih.steps}</li>
          )}
        </ol>
      </div>
    </div>
  );
}

export default RecipeDetails;