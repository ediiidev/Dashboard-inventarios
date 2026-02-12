// backend/db.js
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validamos que las variables existan para evitar errores crípticos
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Faltan las credenciales de Supabase en el archivo .env");
}

// Creamos el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("✅ Cliente de Supabase inicializado correctamente");

module.exports = supabase;
