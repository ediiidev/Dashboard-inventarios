import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import StatCards from "./components/StatCards";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        {/* ... header ... */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard de Inventario
          </h1>
          <p className="text-gray-600">Gestión de productos y categorías</p>
        </header>

        <main>
          <StatCards />
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Listado de Existencias</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                + Nuevo Producto
              </button>
            </div>
            <ProductTable />
          </div>
        </main>

        <ProductForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}

export default App;
