# Brain Tumor & Pulmonary Disease Detection AI – Frontend

**Autor:** Angel Jeremías Avellaneda

Este frontend en **React** sirve como interfaz de usuario para la detección de **tumores cerebrales** y **enfermedades crónicas pulmonares** usando imágenes médicas (MRI y radiografías de tórax). Se comunica con el backend mediante API REST para enviar imágenes y recibir resultados de predicción.

---

## 🔹 Tecnologías utilizadas

* React 19
* React Router DOM 7
* Axios (para comunicación con el backend)
* TailwindCSS (estilos responsivos y modernos)
* Vite (bundler y servidor de desarrollo)
* @tensorflow/tfjs (para posibles predicciones en frontend si se requiere)
* MUI Icons y Lucide React (iconografía y elementos UI)
* PostCSS, Autoprefixer (procesamiento CSS)

---

## 🔹 Estructura del frontend

```
frontend/
├─ node_modules/                  # Dependencias de NPM
├─ public/                        # Archivos estáticos (imágenes, SVG, favicon, etc.)
│  ├─ brain-card.jpg / brain-card-dark.jpg
│  ├─ card-brain.jpg / card-brain-dark.png
│  ├─ chart-mri.jpg / chart-mri-dark.webp
│  ├─ deep-card.jpg / deep-card-dark.jpg
│  ├─ lungs-card.jpg / lungs-card-dark.jpg
│  └─ vite.svg
├─ src/
│  ├─ api/
│  │  └─ axiosClient.js           # Configuración de Axios para llamadas al backend
│  ├─ assets/                     # Recursos estáticos (ej. react.svg)
│  ├─ components/                 # Componentes reutilizables
│  │  ├─ DarkModeToggle.jsx
│  │  ├─ EvaluationSection.jsx
│  │  ├─ Loader.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ Recommendations.jsx
│  │  ├─ ResultCard.jsx
│  │  └─ UploadForm.jsx
│  ├─ pages/                      # Páginas principales
│  │  ├─ About.jsx
│  │  ├─ EvaluacionPulmones.jsx
│  │  ├─ EvaluacionTumores.jsx
│  │  ├─ Historial.jsx
│  │  ├─ Home.jsx
│  │  └─ IAInfo.jsx
│  ├─ utils/                      # Funciones auxiliares
│  ├─ App.jsx                      # Componente principal y rutas
│  ├─ index.css                    # Estilos globales
│  └─ main.jsx                     # Entrada de la aplicación
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
└─ README.md
```

---

## 🔹 Funcionamiento

1. Los usuarios pueden subir imágenes médicas (MRI o radiografía de tórax) mediante `UploadForm`.
2. La imagen se envía al backend usando Axios (`axiosClient.js`).
3. El backend procesa la imagen y devuelve el resultado de la predicción.
4. Los componentes `ResultCard` y `Recommendations` muestran visualmente el resultado.
5. `DarkModeToggle` permite alternar entre modo claro y oscuro para la interfaz.

**Nota:** Las imágenes de prueba se encuentran en `public/` y los componentes son reutilizables para facilitar la escalabilidad del proyecto.

---

## 🔹 Ejecución del proyecto

```bash
cd frontend
npm install
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173` (Vite por defecto).

---

## 🔹 Observaciones

* Se utiliza **TailwindCSS** para un diseño moderno y responsive.
* La estructura modular de componentes permite añadir nuevas funcionalidades fácilmente.
* `axiosClient.js` centraliza la configuración de llamadas al backend.
* `UploadForm.jsx` es el componente clave para la interacción con el usuario y la carga de imágenes médicas.
