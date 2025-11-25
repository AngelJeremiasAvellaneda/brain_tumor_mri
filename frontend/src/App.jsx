import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import EvaluacionTumores from "./pages/EvaluacionTumores";
import EvaluacionPulmones from "./pages/EvaluacionPulmones";
import About from "./pages/About";
import IAInfo from "./pages/IAInfo";
import Historial from "./pages/Historial";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/evaluacion/tumores" element={<EvaluacionTumores />} />
          <Route path="/evaluacion/pulmones" element={<EvaluacionPulmones />} />
          <Route path="/about" element={<About />} />
          <Route path="/ia-info" element={<IAInfo />} />
          <Route path="/historial" element={<Historial />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
