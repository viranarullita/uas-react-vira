import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-orange-50 to-amber-100"></div>
      <Header />
      <main className="flex-grow relative">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;