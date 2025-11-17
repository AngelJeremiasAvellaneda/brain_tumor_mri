import UploadForm from "../components/UploadForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        MRI Brain Tumor Analyzer
      </h2>

      <p className="text-gray-600 text-center mb-8 max-w-xl">
        Sube una imagen de resonancia magnética (MRI) y nuestro modelo de 
        Inteligencia Artificial analizará si existe indicio de tumor.
      </p>

      <UploadForm />
    </div>
  );
}
