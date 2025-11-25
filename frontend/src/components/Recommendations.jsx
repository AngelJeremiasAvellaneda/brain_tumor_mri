export default function Recommendations({ data, type }) {
  if (!data || !data.prediction || !data.probabilities) return null;

  let recommendations = [];
  const sortedProbs = Object.entries(data.probabilities).sort((a, b) => b[1] - a[1]);
  const [topClass, topProb] = sortedProbs[0];
  const [secondClass, secondProb] = sortedProbs[1];

  if (type === "tumor") {
    const tumorMessages = {
      notumor: [
        "No se detectan tumores significativos en la imagen.",
        "Mantener controles periódicos y hábitos de vida saludables.",
        "Realizar revisiones médicas rutinarias para monitorear cambios potenciales."
      ],
      glioma: [
        "Se detectó un posible glioma.",
        "Se recomienda evaluación médica especializada con neuroimagen avanzada (MRI, CT).",
        "Consultar con un neurólogo o especialista en oncología cerebral.",
        "Considerar seguimiento regular para monitorizar evolución del tumor."
      ],
      meningioma: [
        "Se detectó un posible meningioma.",
        "Se recomienda evaluación neurológica y seguimiento con especialista en oncología cerebral.",
        "Revisiones periódicas con imagenología para evaluar tamaño y crecimiento."
      ],
      pituitary: [
        "Se detectaron indicios de tumor pituitario.",
        "Consultar con un endocrinólogo y un neurólogo para estudios hormonales y neuroimagen.",
        "Revisión periódica de función hormonal y tamaño del tumor."
      ],
      uncertain: [
        "Indicios de tumor cerebral no concluyentes.",
        "Se recomienda estudios médicos adicionales y seguimiento cercano.",
        "Consultar con especialista en neuroimagen para una segunda evaluación."
      ]
    };

    if (topClass !== "notumor" && topProb >= 0.2) {
      recommendations = tumorMessages[topClass] || [
        "Se detectaron indicios de un tumor cerebral no clasificado.",
        "Consultar con un especialista para evaluación detallada."
      ];
      recommendations.push("⚠ Prioridad médica: Probabilidad significativa de tumor cerebral.");
    } else if (topClass === "notumor" && secondProb >= 0.2) {
      recommendations = [
        "No se detectan tumores significativos según la categoría principal.",
        `Sin embargo, se detectan indicios de ${secondClass} con probabilidad ${(secondProb * 100).toFixed(2)}%.`,
        "Se recomienda evaluación médica adicional para descartar riesgos potenciales.",
        "Mantener seguimiento médico y repetir imagenología según indicación profesional."
      ];
    } else {
      recommendations = tumorMessages["notumor"];
    }

    recommendations.push(`Confianza de la predicción principal: ${(topProb * 100).toFixed(2)}%.`);
  } else if (type === "lungs") {
    const lungsMessages = {
      NORMAL: [
        "Pulmones normales según la imagen analizada.",
        "Mantener hábitos respiratorios saludables (ejercicio moderado, evitar fumar).",
        "Realizar revisiones periódicas para monitorear la salud pulmonar."
      ],
      NEUMONIA: [
        "Se detectaron indicios de neumonía.",
        "Consultar con un neumólogo para diagnóstico y tratamiento adecuado.",
        "Seguir pautas médicas sobre reposo, hidratación y medicación."
      ],
      COVID: [
        "Se detectaron indicios de infección por COVID-19.",
        "Realizar pruebas médicas complementarias y seguimiento de síntomas.",
        "Aislamiento según protocolos sanitarios y tratamiento médico adecuado."
      ]
    };

    recommendations = lungsMessages[topClass] || [
      "Se detectaron indicios de una enfermedad pulmonar no clasificada.",
      "Consultar con un especialista en neumología para evaluación detallada."
    ];

    recommendations.push(`Confianza de la predicción: ${(topProb * 100).toFixed(2)}%.`);
  }

  return (
    <div className="mt-6 p-4 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors shadow-xl">
      <h4 className="font-semibold mb-3 text-lg">Recomendaciones y Sugerencias</h4>
      <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
        {recommendations.map((rec, i) => (
          <li key={i}>{rec}</li>
        ))}
      </ul>
    </div>
  );
}
