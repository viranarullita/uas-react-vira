import { Facebook, Instagram, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="max-w-lg mx-auto mb-6 text-sm">
          Cook Recipe membantu kamu menemukan inspirasi masakan sehari-hari
          dengan mudah dan cepat.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-700 pt-4">
          <p className="text-xs">&copy; 2025 CookRecipe - Vira Narullita</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-white transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-white transition">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;