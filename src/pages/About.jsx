import { Info, Star, Smile } from "lucide-react";

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Tentang Aplikasi
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Gambaran Umum */}
        <section className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-orange-600 mb-3">
            <Info size={20} /> Gambaran Umum
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Aplikasi ini dirancang sebagai wadah untuk mengelola resep masakan
            dengan cara yang lebih praktis. Pengguna dapat menambahkan resep
            baru, menyimpan resep favorit, dan menjelajahi berbagai ide masakan
            dari koleksi yang tersedia.
          </p>
        </section>

        {/* Fitur Utama */}
        <section className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-orange-600 mb-3">
            <Star size={20} /> Fitur Utama
          </h2>
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            <li>Menyimpan resep pribadi agar mudah diakses kapan saja.</li>
            <li>Menandai resep favorit untuk referensi cepat.</li>
            <li>Mencari resep berdasarkan judul atau kategori.</li>
            <li>Mengorganisir resep agar lebih rapi dan terstruktur.</li>
          </ul>
        </section>

        {/* Manfaat */}
        <section className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-orange-600 mb-3">
            <Smile size={20} /> Manfaat
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Dengan adanya aplikasi ini, pengguna tidak perlu lagi mencatat
            resep di buku atau catatan terpisah. Semua resep tersimpan dengan
            aman dalam satu tempat, sehingga memasak jadi lebih menyenangkan
            dan efisien.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;