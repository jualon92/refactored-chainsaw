const express = require("express");
const router = express.Router()

const {GetAllOperaciones, GetOperacion, UpdateOperacion, DeleteOperacion, CreateOperacion} =  require("../controller/Operacion");


router.get("/", GetAllOperaciones)
router.get("/:id",GetOperacion)
router.put("/:id", UpdateOperacion)
router.post("/", CreateOperacion)
router.delete("/:id", DeleteOperacion)
module.exports = router;