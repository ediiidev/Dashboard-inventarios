// frontend/src/components/ProductForm.jsx
import { useState, useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import axios from "axios";
import { PlusCircle, X } from "lucide-react";

const ProductForm = ({ isOpen, onClose }) => {
  const { categories, fetchData } = useContext(InventoryContext);
  const [formData, setFormData] = useState({
    nombre: "",
    stock: 0,
    precio: 0,
    categoria_id: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviamos a tu API de Node.js
      await axios.post("http://localhost:3001/productos", formData);

      // ¡Paso clave! Refrescamos los datos globales
      await fetchData();

      // Limpiamos y cerramos
      setFormData({ nombre: "", stock: 0, precio: 0, categoria_id: "" });
      onClose();
    } catch (error) {
      alert("Error al crear producto: " + error.response?.data?.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 text-center">
            Añadir Nuevo Producto
          </h2>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-red-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Producto
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                onChange={(e) =>
                  setFormData({ ...formData, stock: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Precio
              </label>
              <input
                type="number"
                step="0.01"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    precio: parseFloat(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              onChange={(e) =>
                setFormData({ ...formData, categoria_id: e.target.value })
              }
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex justify-center items-center gap-2"
          >
            <PlusCircle size={20} /> Guardar Producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
