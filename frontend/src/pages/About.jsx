import { Cpu, Eye, Zap, Activity, ShieldCheck, Clock } from "lucide-react";

export default function About() {
  const steps = [
    {
      icon: <Eye size={24} />,
      number: 1,
      title: "Preprocesamiento",
      desc: "Normalizamos y ajustamos cada imagen MRI para maximizar la precisión del análisis.",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: <Activity size={24} />,
      number: 2,
      title: "Extracción de características",
      desc: "La IA detecta automáticamente patrones y características clave para clasificar tumores.",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: <Cpu size={24} />,
      number: 3,
      title: "Clasificación",
      desc: "Se determina el tipo de tumor o anomalía según los patrones aprendidos por la red neuronal.",
      color: "text-red-600 dark:text-red-400",
    },
    {
      icon: <Zap size={24} />,
      number: 4,
      title: "Resultados y confianza",
      desc: "La IA muestra probabilidades y el nivel de confianza de cada predicción.",
      color: "text-yellow-600 dark:text-yellow-400",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-24 px-6 sm:px-8 transition-colors duration-500">

      <h1 className="text-4xl sm:text-5xl font-extrabold text-[#255892] dark:text-[#E6F1FF] mb-10">
        Sobre el Proyecto
      </h1>

      <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl leading-relaxed mb-6">
        <span className="font-semibold text-[#255892] dark:text-[#E6F1FF]">BrainScan AI</span> es un proyecto innovador que utiliza <span className="font-medium text-[#6B46C1]">Inteligencia Artificial</span> y modelos de visión computacional entrenados en imágenes <span className="font-medium text-[#6B46C1]">MRI</span> para detectar <span className="font-medium text-[#DC2626]">tumores cerebrales</span> de manera precisa y confiable. Su objetivo es asistir a profesionales médicos proporcionando un análisis rápido y detallado.
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-[#1E40AF] dark:text-[#93C5FD] mb-6 mt-12">
        ¿Cómo Funciona?
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {steps.map((step) => (
          <div key={step.number} className="bg-white dark:bg-[#050c16] rounded-2xl shadow-md p-6 flex gap-4 items-start transition-transform hover:scale-[1.03] duration-300">
            <div className={`flex flex-col items-center justify-start ${step.color} font-bold text-lg`}>
              <span className="text-2xl mb-2">{step.number}</span>
              {step.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{step.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-[#1E40AF] dark:text-[#93C5FD] mb-4 mt-12">
        Beneficios Clave
      </h2>
      <ul className="list-decimal list-inside text-gray-700 dark:text-gray-300 text-lg sm:text-xl leading-relaxed space-y-2 mb-6">
        <li>Detección temprana y precisa de tumores cerebrales.</li>
        <li>Soporte rápido para profesionales médicos y radiólogos.</li>
        <li>Optimización del tiempo en diagnósticos clínicos.</li>
        <li>Accesibilidad para instituciones de salud con limitaciones de recursos.</li>
        <li>Interfaz intuitiva y visualizaciones claras de los resultados.</li>
        <li>Seguridad y ética médica en todo el flujo de trabajo.</li>
      </ul>

      <h2 className="text-2xl sm:text-3xl font-bold text-[#1E40AF] dark:text-[#93C5FD] mb-4 mt-8">
        Confiabilidad y Ética
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
        Aunque BrainScan AI proporciona información valiosa y detallada, no reemplaza la evaluación profesional. Todos los resultados están pensados para <span className="font-medium text-[#16A34A]">apoyar la toma de decisiones médicas</span> y no deben considerarse un diagnóstico definitivo. La ética y la seguridad de los pacientes son una prioridad en cada etapa del desarrollo del proyecto.
      </p>

    </div>
  );
}
