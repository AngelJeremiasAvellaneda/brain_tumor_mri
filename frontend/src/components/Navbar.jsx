// 🔹 IMPORTS
import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

// Lucide Icons
import {
  Brain,
  HeartPulse,
  ChevronDown,
  Menu,
  BrainCircuit,
  X
} from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const btnRef = useRef(null);
  const submenuRef = useRef(null);
  const location = useLocation();

  const base =
    "px-2 py-1 text-sm font-medium transition-all link-underline";
  const active =
    "text-[#1F7AA8] dark:text-[#82D0FF] font-semibold link-underline-active";
  const inactive =
    "text-gray-700 dark:text-gray-300 hover:text-[#1F7AA8] dark:hover:text-[#82D0FF]";

  /* 📌 Cerrar submenu al hacer click afuera */
  useEffect(() => {
    const closeOnOutside = (e) => {
      if (window.innerWidth < 640) return;
      if (
        submenuRef.current &&
        btnRef.current &&
        !submenuRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      )
        setSubMenuOpen(false);
    };
    document.addEventListener("click", closeOnOutside);
    return () => document.removeEventListener("click", closeOnOutside);
  }, []);

  /* 📌 Detectar si la ruta pertenece al submenu */
  const isEvalActive = location.pathname.startsWith("/evaluacion");

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-white dark:bg-[#070B13]/75 shadow-sm border-b border-black/5 dark:border-white/5 px-6 py-3 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <BrainCircuit className="w-8 h-8 text-[#1F7AA8] dark:text-[#82D0FF] group-hover:opacity-90 transition-all" />
            <span className="text-lg font-extrabold text-[#1F7AA8] dark:text-[#82D0FF] tracking-wide group-hover:opacity-90">
              MedScan AI
            </span>
          </Link>



          {/* Toggle Mobile */}
          <button
            className="sm:hidden text-gray-800 dark:text-gray-300 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* 🖥 LINKS */}
          <div className="hidden sm:flex sm:items-center gap-6">

            <NavLink to="/" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
              Inicio
            </NavLink>

            {/* Submenu Desktop */}
            <div
              onMouseEnter={() => setSubMenuOpen(true)}
              onMouseLeave={() => setSubMenuOpen(false)}
              className="relative"
            >
              <button
                ref={btnRef}
                className={`${base} flex items-center gap-1 ${isEvalActive ? active : inactive}`}
              >
                Evaluación IA
                <ChevronDown className={`w-4 h-4 transition-transform ${subMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <div
                ref={submenuRef}
                className={`absolute left-0 mt-3 w-64 backdrop-blur-xl bg-white dark:bg-[#0D121D] shadow-xl rounded-xl overflow-hidden border border-black/10 dark:border-white/10 transition-all duration-200
                  ${subMenuOpen ? "opacity-100 visible" : "opacity-0 invisible -translate-y-2"}`}
              >
                <MenuItem to="/evaluacion/tumores" icon={<Brain />} text="Tumores Cerebrales" />
                <MenuItem to="/evaluacion/pulmones" icon={<HeartPulse />} text="Radiografía Pulmonar" />
              </div>
            </div>

            <NavLink to="/ia-info" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
              Cómo Funciona
            </NavLink>

            <NavLink to="/about" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
              Acerca de
            </NavLink>

            <NavLink to="/historial" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
              Historial
            </NavLink>

            <DarkModeToggle />
          </div>
        </div>
      </nav>

      {/* Overlay Mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => { setMenuOpen(false); setSubMenuOpen(false); }}
        />
      )}

      {/* MENU MÓVIL */}
      <aside className={`fixed top-0 right-0 h-screen w-64 z-50 bg-white dark:bg-[#0D1117] border-l border-black/10 dark:border-white/10 shadow-xl pt-24 px-4 sm:hidden transition-all duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>

        <MobileLink to="/" close={() => setMenuOpen(false)}>Inicio</MobileLink>

        <MobileButton open={subMenuOpen} setOpen={setSubMenuOpen}>Evaluación IA</MobileButton>

        <div className={`mt-1 flex flex-col bg-white/90 dark:bg-[#101825]/80 rounded-xl overflow-hidden transition-all duration-300 ${subMenuOpen ? "max-h-72 py-2" : "max-h-0 py-0"}`}>
          <MobileLink to="/evaluacion/tumores" close={() => setMenuOpen(false)}>Tumores Cerebrales</MobileLink>
          <MobileLink to="/evaluacion/pulmones" close={() => setMenuOpen(false)}>Radiografía Pulmonar</MobileLink>
        </div>

        <MobileLink to="/ia-info" close={() => setMenuOpen(false)}>Cómo Funciona</MobileLink>
        <MobileLink to="/about" close={() => setMenuOpen(false)}>Acerca de</MobileLink>
        <MobileLink to="/historial" close={() => setMenuOpen(false)}>Historial</MobileLink>

        <div className="mt-4"><DarkModeToggle /></div>
      </aside>
    </>
  );
}

/* ===== COMPONENTES ===== */
const MenuItem = ({ to, text, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 text-sm transition-all
      ${isActive
        ? "bg-[#1F7AA8]/10 dark:bg-[#82D0FF]/10 text-[#1F7AA8] dark:text-[#82D0FF] border-l-4 border-[#1F7AA8] dark:border-[#82D0FF]"
        : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10"
      }`}
  >
    {icon && <span className="w-5 h-5">{icon}</span>}
    {text}
  </NavLink>
);

const MobileLink = ({ to, children, close }) => (
  <NavLink
    to={to}
    onClick={close}
    className={({ isActive }) =>
      `block px-2 py-3 text-sm transition-all
      ${isActive
        ? "text-[#1F7AA8] dark:text-[#82D0FF] font-semibold"
        : "text-gray-700 dark:text-gray-300 hover:text-[#1F7AA8] dark:hover:text-[#82D0FF]"
      }`}
  >
    {children}
  </NavLink>
);

const MobileButton = ({ open, setOpen, children }) => (
  <button
    className={`flex items-center justify-between w-full px-2 py-3 text-sm transition-all
      ${open ? "text-[#1F7AA8] dark:text-[#82D0FF]" : "text-gray-700 dark:text-gray-300"}
      hover:text-[#1F7AA8] dark:hover:text-[#82D0FF]`}
    onClick={() => setOpen(!open)}
  >
    {children}
    <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
  </button>
);
