const express = require("express");
const router = express.Router()

const {GetAllOperaciones, GetOperacion, UpdateOperacion, DeleteOperacion, CreateOperacion, CreateOperacionesRandom} =  require("../controller/Operacion");


router.get("/", GetAllOperaciones)
router.get("/:id",GetOperacion)
router.put("/:id", UpdateOperacion)
router.post("/", CreateOperacion)
router.post("/:id", CreateOperacionesRandom)
router.delete("/:id", DeleteOperacion)
module.exports = router;