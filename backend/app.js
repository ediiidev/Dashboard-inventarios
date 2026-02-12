// backend/app.js (fragmento)
const express = require("express");
const supabase = require("./db"); // Importamos nuestro cliente
const app = express();

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

module.exports = app;
