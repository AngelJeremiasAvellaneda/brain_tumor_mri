export default function ResultCard({ data }) {
  const confidence = (data.confidence * 100).toFixed(2);

  return (
    <div className="mt-6 p-6 rounded-xl shadow-lg border border-blue-200 bg-white">
      
      <h3 className="text-2xl font-bold text-blue-700 mb-4">
        Resultado del Análisis
      </h3>

      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-lg text-gray-800">
          <span className="font-bold">Predicción:</span>{" "}
          <span className="text-blue-700 uppercase">{data.prediction}</span>
        </p>

        <p className="text-lg text-gray-800">
          <span className="font-bold">Confianza:</span>{" "}
          <span className="text-blue-700">{confidence}%</span>
        </p>

        {/* 🔥 AVISO PROFESIONAL */}
        {data.forced_risk && (
          <p className="mt-3 text-sm text-red-600 bg-red-100 p-2 rounded-lg border border-red-300">
            ⚠ El sistema detectó probabilidades moderadas asociadas a un tumor,
            por lo que se priorizó la categoría de mayor riesgo para evitar 
            falsos negativos. Se recomienda evaluación médica adicional.
          </p>
        )}
      </div>

      <h4 className="text-lg font-semibold text-gray-700 mb-2">
        Probabilidades por clase
      </h4>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-medium text-gray-700">Clase</th>
              <th className="px-4 py-2 font-medium text-gray-700">Probabilidad</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(data.probabilities).map(([cls, prob]) => (
              <tr
                key={cls}
                className={`border-t ${
                  cls === data.prediction ? "bg-blue-100" : ""
                }`}
              >
                <td className="px-4 py-2 capitalize font-medium">
                  {cls}
                </td>
                <td className="px-4 py-2">
                  {(prob * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
