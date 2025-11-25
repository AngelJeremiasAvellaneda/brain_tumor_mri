import { Cpu, Eye, Zap } from "lucide-react";

export default function Historial() {
  // Datos de ejemplo
  const historial = [
    { id: 1, fecha: "24/11/2025", resultado: "Tumor benigno", icon: <Eye size={24} />, confianza: "95%" },
    { id: 2, fecha: "20/11/2025", resultado: "Sin anomalías", icon: <Cpu size={24} />, confianza: "99%" },
    { id: 3, fecha: "18/11/2025", resultado: "Tumor maligno", icon: <Zap size={24} />, confianza: "87%" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 sm:px-8 transition-colors duration-500">
      
      <h1 className="text-4xl sm:text-5xl font-bold text-[#255892] dark:text-[#E6F1FF] mb-10">
        Historial de Evaluaciones
      </h1>

      {historial.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
          Aún no se han registrado evaluaciones. Cuando conectemos el backend, aquí aparecerán tus análisis previos.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {historial.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#060e1b] rounded-2xl shadow-md p-6 flex gap-4 items-center transition-transform hover:scale-[1.03] duration-300">
              <div className="text-blue-500 dark:text-blue-400">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{item.resultado}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Fecha: {item.fecha}</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">Confianza: {item.confianza}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
