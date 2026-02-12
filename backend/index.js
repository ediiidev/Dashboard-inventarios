// backend/index.js
require("dotenv").config();
const app = require("./app");
const supabase = require("./db");

const PORT = process.env.PORT || 3001;

async function checkConnection() {
  // Intentamos una operación ultra simple: pedir el nombre de la DB
  const { data, error } = await supabase
    .from("categorias")
    .select("count", { count: "exact", head: true });

  if (error) {
    console.error("❌ Error de conexión con Supabase:", error.message);
    console.error(
      "Revisa tu SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en el .env",
    );
    process.exit(1); // Detiene el servidor si no hay conexión
  } else {
    console.log("✅ Conexión exitosa a Supabase. Las llaves son correctas.");
  }
}

checkConnection();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
