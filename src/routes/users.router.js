//@ts-check
import express from "express";
import { UserModel } from "../models/users.model.js";
export const routerUsers = express.Router();

routerUsers.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).json({
      status: "success",
      msg: "listado de usuarios",
      data: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

routerUsers.post("/", async (req, res) => {
  //EXTRAER LOS DATOS DEL BODY
  const { firstName, lastName, email } = req.body;
  try {
    //VALIDAR SI LOS DATOS DEL BODY ESTAN OK
    if (!firstName || !lastName || !email) {
      console.log(
        "validation error: please complete firstName, lastname and email."
      );
      //RETORNA SI ES ERROR
      return res.status(400).json({
        status: "error",
        msg: "please complete firstName, lastname and email.",
        data: {},
      });
    }

    //BIEN!!! LLAMO A OTRA FUNCION EN OTRA CAPA PARA QUE LO HAGA POR Y SOLO LA ESPERO!!
    const userCreated = await UserModel.create({ firstName, lastName, email });

    //RESPONDE AL USUARIO CON EXITO
    return res.status(201).json({
      status: "success",
      msg: "user created",
      data: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

routerUsers.put("/:id", async (req, res) => {
  //EXTRAE LOS DATOS
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    //HACE LAS VAIDADIONES
    if (!firstName || !lastName || !email || !id) {
      console.log(
        "validation error: please complete firstName, lastname and email."
      );
      //RESPONDE
      return res.status(400).json({
        status: "error",
        msg: "please complete firstName, lastname and email.",
        data: {},
      });
    }

    //BIEN!
    const userUptaded = await UserModel.updateOne(
      { _id: id },
      { firstName, lastName, email }
    );

    //RETORNA SI ES EXITOSO
    return res.status(201).json({
      status: "success",
      msg: "user uptaded",
      data: userUptaded,
    });
  } catch (e) {
    //LOGGER
    console.log(e);
    //RETORNA SI HAY ERROR
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

//BIEN!!! RUTEAR!!!
routerUsers.delete("/:id", async (req, res) => {
  try {
    //TOMA LOS DATOS A BORRAR
    const { id } = req.params;
    //BIEN!!! USA LA CAPA DE ABSTRACCION DEL MODELO Y SE SACA LA RESp.
    const deleted = await UserModel.deleteOne({ _id: id });
    //RESPONDER
    return res.status(200).json({
      status: "success",
      msg: "user deleted",
      data: {},
    });
  } catch (e) {
    //LOGEAR NO!
    console.log(e);
    //RESPODNER NO!
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});
