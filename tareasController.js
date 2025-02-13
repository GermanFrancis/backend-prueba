const fs = require("fs");

const FILE = "tareas.json";

const leerTareas = () => {
  try {
    const data = fs.readFileSync(FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer tareas:", error);
    return [];
  }
};

const guardarTareas = (tareas, res) => {
  try {
    fs.writeFileSync(FILE, JSON.stringify(tareas, null, 2));
  } catch (error) {
    console.error("Error al guardar tareas:", error);
    res.status(500).json({ error: "Error al guardar la tarea", code: 500 });
  }
};

const obtenerTareas = (req, res) => {
  const tareas = leerTareas();
  res.json(tareas);
};

const crearTarea = (req, res) => {
  const { titulo } = req.body;
  if (!titulo) {
    return res.status(400).json({ error: "El título es obligatorio", code: 400 });
  }

  const tareas = leerTareas();
  const idIncremental = tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) + 1 : 1;
  const nuevaTarea = { id: idIncremental, titulo, estado: "pendiente" };
  tareas.push(nuevaTarea);
  guardarTareas(tareas, res);

  res.status(201).json(nuevaTarea);
};

const actualizarTarea = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  if (!["pendiente", "completada"].includes(estado)) {
    return res.status(400).json({ error: "Estado inválido, usa 'pendiente' o 'completada'", code: 400 });
  }

  let tareas = leerTareas();
  const tareaIndex = tareas.findIndex((t) => t.id == id);

  if (tareaIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada", code: 404 });
  }

  tareas[tareaIndex].estado = estado;
  guardarTareas(tareas, res);
  res.json(tareas[tareaIndex]);
};

const eliminarTarea = (req, res) => {
  const { id } = req.params;
  let tareas = leerTareas();

  if (!tareas.some((t) => t.id == id)) {
    return res.status(404).json({ error: "Tarea no encontrada", code: 404 });
  }

  tareas = tareas.filter((t) => t.id != id);
  guardarTareas(tareas, res);
  res.json({ mensaje: "Tarea eliminada correctamente" });
};

module.exports = {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
};
