export default function IAInfo() {
  return (
    <div className="max-w-3xl mx-auto py-14 px-6">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-4">
        ¿Cómo funciona la Inteligencia Artificial?
      </h1>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Nuestra IA utiliza redes neuronales convolucionales (CNNs) basadas en EfficientNet,
        especialmente diseñadas para analizar imágenes médicas.
      </p>

      <ul className="list-disc ml-6 mt-4 text-gray-700 dark:text-gray-300">
        <li>Preprocesamiento y normalización de la imagen</li>
        <li>Extracción automática de características</li>
        <li>Clasificación en los tipos de tumor más comunes</li>
        <li>Cálculo de probabilidad y confianza</li>
      </ul>
    </div>
  );
}
