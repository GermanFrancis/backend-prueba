const express = require("express");
const fs = require("fs");

const APP = express();
const PUERTO = 3000;

APP.use(express.json()); 

APP.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
