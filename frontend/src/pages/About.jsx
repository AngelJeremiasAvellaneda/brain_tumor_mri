export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6 bg-[#0A1320]">

      <h1 className="text-4xl font-bold text-blue-400 mb-6 drop-shadow-[0_0_6px_#1e90ff]">
        Sobre el Proyecto
      </h1>

      <p className="text-gray-300 leading-relaxed">
        BrainScan AI utiliza modelos de visión computacional entrenados en imágenes MRI 
        para detectar tumores con gran precisión, aportando apoyo a profesionales médicos.
      </p>

      <p className="mt-4 text-gray-300 leading-relaxed">
        El objetivo es ofrecer una herramienta accesible y rápida que ayude a acelerar diagnósticos.
      </p>
    </div>
  );
}
