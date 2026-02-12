// frontend/src/context/InventoryContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      //Nos aseguramos que el puerto sea el mismo que definimos en el backend
      const resProd = await axios.get("http://localhost:3001/productos");
      const resCat = await axios.get("http://localhost:3001/categorias");
      setProducts(resProd.data);
      setCategories(resCat.data);
    } catch (error) {
      console.error("Error cargando datos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //feat: Eliminar productos del inventario
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/productos/${id}`);
      await fetchData(); // Refresca la lista automáticamente
    } catch (error) {
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <InventoryContext.Provider
      value={{ products, categories, loading, fetchData, deleteProduct }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
