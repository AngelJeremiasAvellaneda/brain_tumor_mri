export default function IAInfo() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 sm:px-8">
      
      {/* TÍTULO */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 dark:text-blue-300 mb-6 text-center">
        ¿Cómo funciona la Inteligencia Artificial? 🤖
      </h1>

      {/* INTRODUCCIÓN */}
      <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl leading-relaxed text-center mb-10">
        Nuestra IA analiza imágenes médicas mediante avanzadas redes neuronales convolucionales (CNNs), basadas en EfficientNet, ofreciendo resultados precisos y confiables de manera rápida.
      </p>

      {/* PASOS */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="bg-white/80 dark:bg-[#0D111A]/80 border border-blue-100 dark:border-gray-700 rounded-xl p-6 shadow-lg flex flex-col items-start">
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">1️⃣ Preprocesamiento</h3>
          <p className="text-gray-700 dark:text-gray-300">
            La imagen se normaliza y ajusta para mejorar la precisión del análisis.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-[#0D111A]/80 border border-green-100 dark:border-gray-700 rounded-xl p-6 shadow-lg flex flex-col items-start">
          <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">2️⃣ Extracción de características</h3>
          <p className="text-gray-700 dark:text-gray-300">
            La red neuronal identifica automáticamente patrones y características relevantes.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-[#0D111A]/80 border border-red-100 dark:border-gray-700 rounded-xl p-6 shadow-lg flex flex-col items-start">
          <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">3️⃣ Clasificación</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Se determina el tipo de tumor o anomalía, según los patrones aprendidos por la IA.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-[#0D111A]/80 border border-purple-100 dark:border-gray-700 rounded-xl p-6 shadow-lg flex flex-col items-start">
          <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">4️⃣ Confianza y resultados</h3>
          <p className="text-gray-700 dark:text-gray-300">
            La IA calcula probabilidades y muestra la confianza de cada predicción.
          </p>
        </div>
      </div>

      {/* NOTA FINAL */}
      <p className="text-gray-500 dark:text-gray-400 mt-10 text-sm sm:text-base text-center">
        ⚠️ Nota: Esta herramienta es de carácter informativo y no reemplaza el diagnóstico profesional. Siempre consulta a un especialista.
      </p>

    </div>
  );
}
