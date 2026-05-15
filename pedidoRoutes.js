const express = require("express");

const router = express.Router();

const pedidoController = require("../controllers/pedidoController");

router.post("/pedido", pedidoController.registrarPedido);

router.get("/pedidos", pedidoController.mostrarPedidos);

module.exports = router;
