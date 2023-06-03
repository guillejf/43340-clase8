import express from "express";
import { productos } from "../utils.js";

export const routerVistaProductos = express.Router();
routerVistaProductos.get("/", (req, res) => {
  return res.render("productos-html", {
    titulo: "TITULO: PRODUCTOS",
    productos: productos,
    dolar: 500 + Math.floor(Math.random() * 100),
  });
});
