import { useState } from "react";
import client from "../api/axiosClient";
import Loader from "./Loader";
import ResultCard from "./ResultCard";

export default function UploadForm() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    // validación
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(file.type)) {
      alert("Solo puedes subir imágenes JPG/PNG");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function analyze() {
  if (!image) return alert("Sube una imagen primero.");

  const formData = new FormData();
  formData.append("image", image);

  setLoading(true);
  setResult(null);

  try {
    const res = await client.post("/predict", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    setResult(res.data);
  } catch (err) {
    console.error(err);
    alert("Error analizando la imagen.");
  }

  setLoading(false);
}


  return (
    <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-xl border border-blue-100">
      <input
        type="file"
        onChange={handleImage}
        className="mb-4"
      />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full h-64 object-cover rounded-lg mb-4 border"
        />
      )}

      {!loading ? (
        <button
          onClick={analyze}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Analizar Imagen
        </button>
      ) : (
        <Loader />
      )}

      {result && <ResultCard data={result} />}
    </div>
  );
}
