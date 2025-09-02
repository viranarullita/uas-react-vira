import { Info, Smile } from "lucide-react";

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        <header className="relative py-8 px-6 text-center text-white bg-orange-300 md:py-24">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-md animate-fade-in-down">
              Tentang Website{" "}
            </h1>
          </div>
        </header>

        <main className="p-6 md:p-12">
          <div className="grid gap-8 md:grid-cols-2">
            <section className="bg-orange-50 rounded-xl p-6 shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-slide-in-left">
              <h2 className="flex items-center gap-2 text-xl font-bold text-orange-600 mb-3">
                <Info
                  size={24}
                  className="text-orange-600 animate-pulse-slow"
                />
                Gambaran Umum
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                Website ini dirancang untuk para pencinta masakan. Dengan
                tampilan yang bersih dan mudah digunakan, website ini
                memungkinkan Anda untuk mengelola koleksi resep pribadi,
                menemukan inspirasi baru, dan berbagi kreasi kuliner.
              </p>
            </section>
            <section className="bg-orange-50 rounded-xl p-6 shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-slide-in-right">
              <h2 className="flex items-center gap-2 text-xl font-bold text-orange-600 mb-3">
                <Smile
                  size={24}
                  className="text-lime-500 animate-bounce-slow"
                />
                Manfaat
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                Anda tidak akan lagi kehilangan resep favorit atau kesulitan
                mencari inspirasi. Masak kini jadi lebih menyenangkan, efisien,
                dan penuh kreativitas.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default About;
