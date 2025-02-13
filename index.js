const cors = require("cors");
const express = require("express");

const {
    obtenerTareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
  } = require("./tareasController");
  
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 

app.get("/tareas", obtenerTareas);
app.post("/tareas", crearTarea);
app.put("/tareas/:id", actualizarTarea);
app.delete("/tareas/:id", eliminarTarea);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
