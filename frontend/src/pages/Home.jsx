import { Link } from "react-router-dom";
import { Cpu, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#F8FBFF] dark:bg-[#070B13] text-[#255892] dark:text-[#E6F1FF] transition-colors duration-500">

      {/* 🌊 HERO */}
      <section
        className="relative w-full h-screen flex flex-col justify-center items-center text-center px-4 sm:px-8
        bg-cover bg-center bg-[url('/chart-mri.jpg')] dark:bg-[url('/chart-mri-dark.webp')] transition-all duration-500"
      >
        <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight animate-fade-in-up">
            IA Médica para Diagnóstico Temprano
          </h1>

          <p className="mt-5 max-w-xl mx-auto text-[#34455A] dark:text-[#C9D9EE] text-base sm:text-lg">
            Analiza imágenes médicas usando <span className="font-semibold">Deep Learning</span> para apoyar decisiones clínicas.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 sm:gap-6 justify-center">
            <Btn link="/tumores" text="Evaluar Tumores" />
            <Btn link="/pulmones" text="Evaluar Pulmones" secondary />
          </div>
        </div>
      </section>

      {/* 🔬 Ecosistema IA */}
      <section className="py-20 md:py-28 bg-[#EDF4FF]/60 dark:bg-[#0D121D] transition-colors duration-500">
        <div className="mx-auto max-w-6xl space-y-12 px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold max-w-3xl text-[#1F7AA8] dark:text-[#82D0FF]">
            Un ecosistema de diagnóstico asistido.
          </h2>

          <div className="flex flex-col md:flex-row gap-16 md:items-center">
            <div className="space-y-6 md:w-1/2 text-sm sm:text-base">
              <p className="text-[#34455A] dark:text-[#C9D9EE]">
                Modelos que trabajan juntos para ofrecer soporte clínico profesional.
              </p>
              <p className="text-[#34455A] dark:text-[#C9D9EE]">
                Alta precisión en tumores cerebrales y evaluaciones pulmonares.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <Feature icon={<Zap size={18} />} title="Rápido" text="Procesa estudios en segundos." />
                <Feature icon={<Cpu size={18} />} title="Preciso" text="Resultados confiables." />
              </div>
            </div>

            <div className="md:w-1/2 rounded-xl overflow-hidden shadow-lg animate-fade-in">
              <img
                src="/card-brain.jpg"
                alt="Modelo IA Médica"
                className="w-full object-cover dark:hidden"
              />
              <img
                src="/card-brain-dark.png"
                alt="Modelo IA Médica Oscuro"
                className="w-full object-cover hidden dark:block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 🧠 Cards */}
      <section className="py-20 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-[#1F7AA8] dark:text-[#82D0FF]">
          Tecnologías Utilizadas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card title="Detección de Tumores" light="/brain-card.jpg" dark="/brain-card-dark.jpg" desc="Clasificación MRI avanzada." />
          <Card title="Radiografías Torácicas" light="/lungs-card.jpg" dark="/lungs-card-dark.jpg" desc="Predicción COVID-19, Neumonía, Normal." />
          <Card title="Redes Neuronales" light="/deep-card.jpg" dark="/deep-card-dark.jpg" desc="EfficientNet + Transfer Learning." />
        </div>
      </section>

    </div>
  );
}

function Btn({ link, text, secondary }) {
  return (
    <Link
      to={link}
      className={`px-8 py-3 font-semibold rounded-lg shadow-md hover:scale-[1.03] transition-all duration-300
      ${
        secondary
          ? "bg-[#3CA2DB] text-white hover:bg-[#3490C7]"
          : "bg-[#1F7AA8] text-white hover:bg-[#19688F]"
      }`}
    >
      {text}
    </Link>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 font-medium text-[#1F7AA8] dark:text-[#82D0FF]">
        {icon} {title}
      </div>
      <p>{text}</p>
    </div>
  );
}

function Card({ title, desc, light, dark }) {
  return (
    <div className="bg-white dark:bg-[#111823] rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02]">
      <img src={light} className="w-full h-48 object-cover dark:hidden" />
      <img src={dark} className="w-full h-48 object-cover hidden dark:block" />
      <div className="p-5 text-center">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-3 text-sm opacity-80">{desc}</p>
      </div>
    </div>
  );
}
