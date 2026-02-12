import { useContext } from "react";
import { InventoryContext } from "../context/InventoryContext";
import { Package, AlertTriangle, List } from "lucide-react";

const StatCards = () => {
  const { products, categories } = useContext(InventoryContext);

  const totalStock = products.reduce((acc, curr) => acc + curr.stock, 0);
  const lowStock = products.filter((p) => p.stock < 5).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 shadow rounded-lg flex items-center">
        <Package className="text-blue-500 mr-3" />
        <div>
          <p className="text-gray-500 text-sm">Total Productos</p>
          <h3 className="text-2xl font-bold">{products.length}</h3>
        </div>
      </div>
      {/* ... más tarjetas para categorías y lowStock */}
    </div>
  );
};

export default StatCards;
