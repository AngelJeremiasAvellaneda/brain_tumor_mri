import { useState } from "react";
import client from "../api/axiosClient";
import Loader from "./Loader";

export default function UploadForm({ type, onResult }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const IAmodel = type === "lungs" ? "Radiografía Torácica" : "Tumor Cerebral MRI";
  const IAcolor = type === "lungs" ? "from-green-400 to-green-600" : "from-red-400 to-red-600";

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(file.type)) {
      alert("Solo puedes subir imágenes JPG/PNG");
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError(null);
    onResult(null);
  }

  async function analyze() {
    if (!image) return alert("Sube una imagen primero.");

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    setError(null);
    onResult(null);

    try {
      const endpoint = type === "lungs" ? "/predict/lungs" : "/predict/tumor";
      const res = await client.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (!res.data?.result) {
        setError("❌ Resultado no disponible");
        return;
      }
      onResult(res.data.result);
    } catch (err) {
      console.error(err);
      setError("❌ Error analizando la imagen. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 shadow-xl p-6 rounded-2xl text-white transition-all">
      <h3 className={`text-center font-bold text-lg mb-4 bg-gradient-to-r ${IAcolor} bg-clip-text text-transparent`}>
        Evaluación IA: {IAmodel}
      </h3>

      <label
        htmlFor="fileInput"
        className="block cursor-pointer border-2 border-dashed border-gray-400 hover:border-blue-400 dark:hover:border-white/60 transition p-4 rounded-xl text-center hover:scale-105 duration-200"
      >
        {preview ? (
          <img className="w-full h-48 object-cover rounded-xl" src={preview} />
        ) : (
          <p className="text-gray-300">
            📤 <strong>Haz clic</strong> o arrastra una imagen aquí
          </p>
        )}
      </label>

      <input id="fileInput" type="file" onChange={handleImage} className="hidden" />

      <div className="mt-4">
        {!loading ? (
          <button
            onClick={analyze}
            className={`w-full bg-gradient-to-r ${IAcolor} hover:opacity-90 text-white py-2 rounded-xl font-semibold shadow-lg transition`}
          >
            🔍 Analizar Imagen
          </button>
        ) : (
          <Loader />
        )}
      </div>

      {error && <p className="mt-3 text-red-500 text-center">{error}</p>}
    </div>
  );
}
