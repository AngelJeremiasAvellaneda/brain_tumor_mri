import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center border-b border-blue-100 dark:border-gray-700">
      
      <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 tracking-wide">
        BrainScan AI
      </h1>

      <div className="flex gap-6 text-gray-700 dark:text-gray-300 font-medium">
        <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-300 transition">Inicio</Link>
        <Link to="/evaluacion" className="hover:text-blue-500 dark:hover:text-blue-300 transition">Evaluación IA</Link>
        <Link to="/about" className="hover:text-blue-500 dark:hover:text-blue-300 transition">Acerca de</Link>
        <Link to="/ia-info" className="hover:text-blue-500 dark:hover:text-blue-300 transition">Como Funciona</Link>
        <Link to="/historial" className="hover:text-blue-500 dark:hover:text-blue-300 transition">Historial</Link>
      </div>

      <DarkModeToggle />
    </nav>
  );
}
