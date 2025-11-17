import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Evaluacion from "./pages/Evaluacion";
import About from "./pages/About";
import IAInfo from "./pages/IAInfo";
import Historial from "./pages/Historial";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/evaluacion" element={<Evaluacion />} />
          <Route path="/about" element={<About />} />
          <Route path="/ia-info" element={<IAInfo />} />
          <Route path="/historial" element={<Historial />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
