export default function ResultCard({ data, type }) {
  if (!data || !data.prediction || !data.probabilities) {
    return (
      <div className="w-full p-6 rounded-xl shadow-xl border border-gray-700 bg-gray-900 text-white text-center">
        ⚠ Resultado no disponible
      </div>
    );
  }

  let displayPrediction = data.prediction;
  if (type === "tumor" && data.prediction === "uncertain") {
    displayPrediction = "Indicios de Tumor Cerebral";
  }

  const confidence = (data.confidence * 100).toFixed(2);

  // Colores según tipo y predicción
  let panelBg = "bg-white dark:bg-gray-800";
  let textColor = "";
  let highlightBg = "";
  if (type === "lungs") {
    textColor = "text-green-600 dark:text-green-400";
    highlightBg = "bg-green-100 dark:bg-green-900/20";
  } else {
    if (data.prediction === "uncertain") {
      textColor = "text-yellow-500 dark:text-yellow-300";
      highlightBg = "bg-yellow-100 dark:bg-yellow-800/20";
    } else {
      textColor = "text-red-500 dark:text-red-400";
      highlightBg = "bg-red-100 dark:bg-red-900/20";
    }
  }

  let analysisBox = null;
  const sortedProbs = Object.entries(data.probabilities).sort((a, b) => b[1] - a[1]);

  if (type === "tumor") {
    const [topClass, topProb] = sortedProbs[0];
    const [secondClass, secondProb] = sortedProbs[1];

    if (topClass === "notumor" && topProb < 0.5) {
      analysisBox = (
        <div className={`mt-4 p-4 rounded-xl ${highlightBg} border border-yellow-300 dark:border-yellow-700 shadow-md`}>
          <p className="mb-2 font-semibold text-yellow-700 dark:text-yellow-200">
            ⚠ Posible tumor cerebral ({secondClass}) con confianza de {(secondProb * 100).toFixed(2)}%.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Aunque "No Tumor" tiene {(topProb * 100).toFixed(2)}%, la imagen no permite confirmar un cerebro completamente sano.
          </p>
        </div>
      );
    }
  }

  const getBarGradient = (cls, prob, idx) => {
    if (type === "lungs") return "bg-gradient-to-r from-green-400 to-green-600";
    if (cls === data.prediction) return "bg-gradient-to-r from-red-400 to-red-600";
    if (type === "tumor" && analysisBox && idx === 1) return "bg-gradient-to-r from-orange-400 to-orange-600";
    return "bg-gray-400/50 dark:bg-gray-600/50";
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 items-stretch">
      {/* Panel Predicción */}
      <div className={`flex-[1_1_0%] p-6 rounded-xl shadow-xl ${panelBg} transition-colors`}>
        <h3 className={`text-2xl font-bold mb-4 ${textColor}`}>Resultado del Análisis</h3>
        <p className="text-lg mb-2">
          <span className="text-gray-800 dark:text-gray-200">Predicción:</span>{" "}
          <span className={`uppercase font-semibold ${textColor}`}>{displayPrediction}</span>
        </p>
        <p className="text-lg mb-2">
          <span className="text-gray-800 dark:text-gray-200">Confianza:</span> <span className={textColor}>{confidence}%</span>
        </p>

        {type === "tumor" && data.forced_risk && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 p-2 rounded-lg border border-red-300 dark:border-red-700 shadow-sm">
            ⚠ Probabilidades moderadas asociadas a un tumor. Evaluación médica adicional recomendada.
          </p>
        )}

        {analysisBox}
      </div>

      {/* Panel Probabilidades */}
      <div className={`flex-[1_1_0%] p-6 rounded-xl shadow-xl ${panelBg} transition-colors`}>
        <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Probabilidades por clase</h4>
        <div className="space-y-4">
          {sortedProbs.map(([cls, prob], idx) => (
            <div key={cls}>
              <div className="flex justify-between mb-1 text-gray-700 dark:text-gray-300">
                <span className="capitalize">{cls}</span>
                <span>{(prob * 100).toFixed(2)}%</span>
              </div>
              <div className="w-full h-6 rounded-xl bg-gray-300 dark:bg-gray-700 overflow-hidden">
                <div
                  className={`h-6 rounded-xl transition-all duration-1000 ease-out ${getBarGradient(cls, prob, idx)}`}
                  style={{ width: `${(prob * 100).toFixed(2)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
