import UploadForm from "../components/UploadForm";
export default function Evaluacion() {
  return (
    <div className="py-16 flex flex-col items-center bg-[#0A1320]">

      <h2 className="text-4xl font-bold text-blue-400 mb-4 drop-shadow-[0_0_10px_#1e90ff]">
        Análisis de MRI con Inteligencia Artificial
      </h2>

      <p className="text-gray-300 mb-8 max-w-xl text-center leading-relaxed">
        Sube una imagen MRI y deja que nuestro modelo entrenado detecte posibles anomalías.
      </p>

      <UploadForm />
    </div>
  );
}