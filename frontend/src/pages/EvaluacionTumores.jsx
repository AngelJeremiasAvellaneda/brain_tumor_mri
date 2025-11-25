import EvaluationSection from "../components/EvaluationSection";
import { Brain } from "lucide-react";

export default function EvaluacionTumores() {
  return (
    <>
      {/* 🟦 PRIMERA PANTALLA: Título + Instrucciones */}
      <div
        className="
          py-24 px-4 flex flex-col items-center
          bg-gradient-to-b dark:from-[#060B15] dark:to-[#0A1320]
          from-[#F3FAFF] to-[#E7F4FF]
          transition-colors duration-300 ease-in-out
        "
      >
        {/* Título */}
        <h2
          className="
            text-4xl sm:text-5xl font-extrabold flex items-center gap-3 text-center
            text-[#1F7AA8] dark:text-[#82D0FF]
          "
        >
          <Brain className="w-10 h-10" />
          Evaluación de Tumores Cerebrales
        </h2>

        {/* Descripción */}
        <p
          className="
            text-gray-700 dark:text-gray-300 mt-6 mb-12 max-w-2xl text-center text-lg
          "
        >
          Sube una imagen de resonancia magnética (MRI) para analizar posibles indicios
          de tumores cerebrales mediante IA médica de apoyo clínico.
        </p>

        {/* Caja de instrucciones */}
        <div
          className="
            p-8 rounded-2xl shadow-xl max-w-3xl w-full border
            bg-white/90 border-[#CEEAFB]
            dark:bg-[#0D121A]/90 dark:border-white/10
            transition-all duration-300
          "
        >
          <h3
            className="
              text-2xl font-semibold mb-4
              text-[#1F7AA8] dark:text-[#82D0FF]
            "
          >
            Indicaciones de Uso
          </h3>

          <ul className="list-disc list-inside space-y-2 text-base text-gray-700 dark:text-gray-300">
            <li>Sube una imagen MRI en formato JPG o PNG de alta resolución.</li>
            <li>Evita imágenes borrosas o con marcas externas.</li>
            <li>El análisis tarda unos segundos y mostrará resultados estimados.</li>
            <li>Esta evaluación aún no valida otros tipos de imágenes.</li>
            <li>La IA ofrece apoyo clínico, no reemplaza un diagnóstico médico profesional.</li>
          </ul>

          <p
            className="
              text-gray-600 dark:text-gray-400 mt-5 text-sm border-t pt-4
              border-[#B6D9EE] dark:border-white/10
            "
          >
            ⚠️ Consulta siempre a un especialista para obtener un diagnóstico definitivo.
          </p>
        </div>
      </div>

      {/* 🟥 SEGUNDA PANTALLA: Subida + Resultados */}
      <EvaluationSection type="tumor" />
    </>
  );
}
