import { useEffect, useState } from "react";
import { Cpu, Zap, Activity, Eye, Heart, Thermometer, Stethoscope } from "lucide-react";

export default function IAInfo() {
  const steps = [
    { icon: <Activity size={24} />, title: "Preprocesamiento", color: "blue", desc: "Normalizamos y ajustamos la imagen para maximizar la precisión del análisis.", img: "/preprocessing.jpg" },
    { icon: <Eye size={24} />, title: "Extracción de características", color: "green", desc: "La IA detecta automáticamente patrones y características relevantes.", img: "/features.jpg" },
    { icon: <Cpu size={24} />, title: "Clasificación", color: "red", desc: "Se determina el tipo de tumor o anomalía según los patrones aprendidos.", img: "/classification.jpg" },
    { icon: <Zap size={24} />, title: "Resultados y confianza", color: "purple", desc: "La IA muestra probabilidades y el nivel de confianza de cada predicción.", img: "/results.jpg" },
  ];

  const iconSet = [Heart, Thermometer, Stethoscope, Cpu, Zap, Eye];
  const colors = ["#1F7AA8", "#82D0FF", "#FF6B6B", "#4ADE80", "#FACC15", "#C084FC"];

  // Posiciones fijas predefinidas
  const predefinedPositions = [
    { x: 100, y: 100 }, { x: 300, y: 150 }, { x: 500, y: 200 }, { x: 700, y: 250 },
    { x: 900, y: 300 }, { x: 1100, y: 350 }, { x: 1300, y: 400 }, { x: 150, y: 450 },
    { x: 350, y: 500 }, { x: 550, y: 550 }, { x: 750, y: 600 }, { x: 950, y: 650 },
    { x: 1150, y: 700 }, { x: 1350, y: 750 }, { x: 200, y: 200 }, { x: 400, y: 250 },
    { x: 600, y: 300 }, { x: 800, y: 350 }, { x: 1000, y: 400 }, { x: 1200, y: 450 },
    { x: 1400, y: 500 }, { x: 250, y: 550 }, { x: 450, y: 600 }, { x: 650, y: 650 },
    { x: 850, y: 700 },
  ];

  const [icons, setIcons] = useState([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const arr = predefinedPositions.map((pos, i) => ({
      Icon: iconSet[i % iconSet.length],
      color: colors[i % colors.length],
      size: Math.random() * 12 + 8,
      x0: pos.x,
      y0: pos.y,
      x: pos.x,
      y: pos.y,
    }));
    setIcons(arr);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const dx = (e.clientX - window.innerWidth / 2) * 0.05;
      const dy = (e.clientY - window.innerHeight / 2) * 0.05;
      setOffset({ x: dx, y: dy });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      setIcons(prev =>
        prev.map(ic => ({
          ...ic,
          x: ic.x + ((ic.x0 + offset.x - ic.x) * 0.1), // suavidad
          y: ic.y + ((ic.y0 + offset.y - ic.y) * 0.1),
        }))
      );
      requestAnimationFrame(animate);
    };
    animate();
  }, [offset]);

  return (
    <div className="w-full min-h-screen bg-[#F8FBFF] dark:bg-[#070B13] text-[#255892] dark:text-[#E6F1FF] transition-colors duration-500">

      {/* 🌟 HERO */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden px-6 sm:px-8">
        {icons.map((ic, i) => (
          <ic.Icon
            key={i}
            size={ic.size}
            className="absolute opacity-25"
            style={{
              top: ic.y,
              left: ic.x,
              color: ic.color,
              transform: `translate(-50%, -50%)`,
              pointerEvents: "none",
            }}
          />
        ))}

        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 z-10 relative animate-fade-in-up">
          ¿Cómo funciona la Inteligencia Artificial?
        </h1>

        <p className="max-w-3xl text-center text-base sm:text-lg leading-relaxed z-10 relative animate-fade-in">
          Nuestra IA analiza imágenes médicas mediante redes neuronales avanzadas (CNNs, EfficientNet), generando resultados precisos y confiables en tiempo récord. Cada paso está optimizado para ofrecer soporte clínico profesional.
        </p>
      </section>

      {/* 🔄 PASOS */}
      <section className="py-20 px-6 sm:px-8 max-w-6xl mx-auto">
        <div className="grid gap-8 sm:grid-cols-2">
          {steps.map((step, i) => (
            <StepCard key={i} {...step} delay={i * 150} />
          ))}
        </div>
      </section>

      {/* ⚠️ NOTA FINAL */}
      <p className="text-gray-500 dark:text-gray-400 mt-12 text-sm sm:text-base text-center animate-fade-in mb-20">
        ⚠️ Nota: Esta herramienta es informativa y no reemplaza el diagnóstico profesional. Consulta siempre a un especialista.
      </p>
    </div>
  );
}

function StepCard({ icon, title, desc, color, img, delay }) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={`
        bg-white/90 dark:bg-[#111823] rounded-3xl shadow-[0_12px_30px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.05)]
        border border-${color}-200 dark:border-gray-700 overflow-hidden transition-transform duration-500
        hover:scale-[1.05] hover:shadow-[0_20px_35px_rgba(0,0,0,0.25),0_0_25px_rgba(255,255,255,0.1)]
        animate-fade-in-up
      `}
    >
      <div className="w-full h-44 relative overflow-hidden rounded-t-3xl">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-transparent via-transparent"></div>
      </div>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900 text-${color}-600 dark:text-${color}-400 shadow-md animate-bounce`}>
            {icon}
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{title}</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{desc}</p>
      </div>
    </div>
  );
}
