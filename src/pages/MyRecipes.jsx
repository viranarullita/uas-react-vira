import { useState, useEffect } from "react";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

function MyRecipes() {
  const penggunaAktifId = localStorage.getItem("penggunaAktifId");
  const daftarPengguna = JSON.parse(localStorage.getItem("daftarPengguna"));
  const penggunaAktif = daftarPengguna.find(
    (u) => u.id === parseInt(penggunaAktifId)
  );

  const [resepSaya, setResepSaya] = useState([]);
  const [tampilForm, setTampilForm] = useState(false);
  const [editId, setEditId] = useState(null);

  // state inputan resep
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [waktu, setWaktu] = useState("");
  const [deskripsi, setDeskripsi] = useState(""); // 🆕
  const [bahan, setBahan] = useState("");
  const [langkah, setLangkah] = useState("");
  const [gambar, setGambar] = useState("");

  // ambil resep user dari localStorage
  useEffect(() => {
    const dataResep = JSON.parse(
      localStorage.getItem(`recipes_${penggunaAktifId}`)
    );
    if (dataResep) setResepSaya(dataResep);
  }, [penggunaAktifId]);

  // simpan / update resep
  const handleSimpanResep = (e) => {
    e.preventDefault();

    if (editId) {
      // update resep
      const updated = resepSaya.map((r) =>
        r.id === editId
          ? {
              ...r,
              title: judul,
              category: kategori,
              cookTime: waktu,
              description: deskripsi, 
              ingredients: bahan,
              steps: langkah,
              image: gambar,
            }
          : r
      );
      setResepSaya(updated);
      localStorage.setItem(
        `recipes_${penggunaAktifId}`,
        JSON.stringify(updated)
      );
      setEditId(null);
    } else {
      // tambah resep baru
      const resepBaru = {
        id: Date.now(), // id unik resep
        userId: penggunaAktifId,
        title: judul,
        category: kategori,
        cookTime: waktu,
        description: deskripsi, // 🆕
        ingredients: bahan,
        steps: langkah,
        image: gambar,
        author: penggunaAktif.username,
        createdAt: new Date().toISOString(),
      };

      const updated = [...resepSaya, resepBaru];
      setResepSaya(updated);
      localStorage.setItem(
        `recipes_${penggunaAktifId}`,
        JSON.stringify(updated)
      );
    }

    // reset form
    setJudul("");
    setKategori("");
    setWaktu("");
    setDeskripsi(""); // 🆕
    setBahan("");
    setLangkah("");
    setGambar("");
    setTampilForm(false);
  };

  // hapus resep
  const handleHapus = (id) => {
    if (confirm("Yakin ingin menghapus resep ini?")) {
      const updated = resepSaya.filter((r) => r.id !== id);
      setResepSaya(updated);
      localStorage.setItem(
        `recipes_${penggunaAktifId}`,
        JSON.stringify(updated)
      );
    }
  };

  // buka form edit
  const handleEdit = (resep) => {
    setEditId(resep.id);
    setJudul(resep.title);
    setKategori(resep.category);
    setWaktu(resep.cookTime);
    setDeskripsi(resep.description); 
    setBahan(resep.ingredients);
    setLangkah(resep.steps);
    setGambar(resep.image);
    setTampilForm(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Resep Saya</h2>
        <button
          onClick={() => setTampilForm(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 
             text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg 
             text-sm sm:text-base transition"
        >
          <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />{" "}
          <span className="hidden sm:inline">Tambah Resep</span>
          <span className="sm:hidden">Tambah</span>
        </button>
      </div>

      {/* Pop Up Form Tambah / Edit Resep */}
      {tampilForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div
            className="bg-white shadow-lg rounded-xl p-6 
                          w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] 
                          max-w-lg max-h-[80vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold mb-4">
              {editId ? "Edit Resep" : "Tambah Resep Baru"}
            </h3>
            <form onSubmit={handleSimpanResep}>
              <div className="mb-4">
                <label className="block font-medium">Judul Resep</label>
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium">Kategori</label>
                <input
                  type="text"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-medium">Waktu Memasak</label>
                <input
                  type="text"
                  value={waktu}
                  onChange={(e) => setWaktu(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  required
                />
              </div>

              {/* 🆕 Input Deskripsi */}
              <div className="mb-4">
                <label className="block font-medium">Deskripsi</label>
                <textarea
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="w-full border p-2 rounded-lg min-h-[60px]"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block font-medium">Bahan</label>
                <textarea
                  value={bahan}
                  onChange={(e) => setBahan(e.target.value)}
                  className="w-full border p-2 rounded-lg min-h-[80px]"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block font-medium">Langkah-langkah</label>
                <textarea
                  value={langkah}
                  onChange={(e) => setLangkah(e.target.value)}
                  className="w-full border p-2 rounded-lg min-h-[100px]"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block font-medium">URL Gambar</label>
                <input
                  type="text"
                  value={gambar}
                  onChange={(e) => setGambar(e.target.value)}
                  className="w-full border p-2 rounded-lg"
                  required
                />
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setTampilForm(false);
                    setEditId(null);
                  }}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  {editId ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Daftar Resep */}
      {resepSaya.length === 0 ? (
        <p className="text-center text-gray-600">Belum ada resep.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resepSaya.map((resep) => (
            <div
              key={resep.id}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >
              {resep.image && (
                <img
                  src={resep.image}
                  alt={resep.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{resep.title}</h3>
                <p className="text-sm text-orange-500 font-medium">
                  {resep.category}
                </p>

                {/* Tombol Edit & Hapus di bawah */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(resep)}
                    className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleHapus(resep.id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRecipes;
