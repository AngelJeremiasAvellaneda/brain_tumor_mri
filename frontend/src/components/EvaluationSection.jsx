import { useState } from "react";
import UploadForm from "./UploadForm";
import ResultCard from "./ResultCard";
import Recommendations from "./Recommendations";

export default function EvaluationSection({ type }) {
  const [resultData, setResultData] = useState(null);

  return (
    <section
      className="
        w-full min-h-screen flex
        p-6 md:p-10
        bg-gradient-to-b from-[#F3FAFF] to-[#E7F4FF] 
        dark:from-[#0A1320] dark:to-[#09111D]
        transition-colors duration-300
      "
    >
      {/* Contenedor principal flex, cambia de columna a fila si hay resultados */}
      <div
        className={`flex w-full h-full transition-all duration-500
          ${resultData ? "flex-col md:flex-row gap-6" : "flex-col items-center justify-center"}
        `}
      >
        {/* UploadForm */}
        <div
          className={`
            transition-all duration-500
            ${resultData ? "w-full md:w-1/3 flex justify-start" : "w-full md:w-auto"}
          `}
        >
          <UploadForm type={type} onResult={setResultData} />
        </div>

        {/* Dashboard: ResultCard + Recommendations */}
        {resultData && (
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            <ResultCard data={resultData} type={type} />
            <Recommendations data={resultData} type={type} />
          </div>
        )}
      </div>
    </section>
  );
}
