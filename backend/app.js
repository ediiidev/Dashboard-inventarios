// backend/app.js (fragmento)
const express = require("express");
const supabase = require("./db"); // Importamos nuestro cliente
const app = express();
const cors = require("cors"); // Importamos CORS

app.use(cors()); // Habilitamos para todas las rutas
app.use(express.json());

// Obtener todos los productos con su categoría
app.get("/productos", async (req, res) => {
  const { data, error } = await supabase.from("productos").select(`
            *,
            categorias (
                nombre
            )
        `);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Crear un producto
app.post("/productos", async (req, res) => {
  const { nombre, stock, precio, categoria_id } = req.body;

  const { data, error } = await supabase
    .from("productos")
    .insert([{ nombre, stock, precio, categoria_id }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

// Obtener todas las categorías
app.get("/categorias", async (req, res) => {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("nombre", { ascending: true });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

//Eliminar un producto
app.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("productos").delete().eq("id", id);

  if (error) return res.status(400).json(error);
  res.json({ message: "Producto eliminado correctamente" });
});

module.exports = app;
