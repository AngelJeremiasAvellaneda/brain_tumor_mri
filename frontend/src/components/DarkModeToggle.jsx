import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 rounded-lg bg-blue-500/30 text-blue-300 border border-blue-500/40
                 hover:bg-blue-500 hover:text-white transition shadow-[0_0_10px_#1e90ff]"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
