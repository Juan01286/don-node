const pedidoModel = require("../models/pedidoModel");

function registrarPedido(req, res){

    const cliente = req.body.cliente;
    const tamano = req.body.tamano;
    const cantidad = parseInt(req.body.cantidad);

    let ingredientes = req.body.ingredientes;

    if(!ingredientes){
        ingredientes = [];
    }

    if(!Array.isArray(ingredientes)){
        ingredientes = [ingredientes];
    }

    const cantidadIngredientes = ingredientes.length;

    let precioBase = 0;
    let valorExtra = 0;

    if(tamano === "Chica"){
        precioBase = 3990;
        valorExtra = 500;
    }

    else if(tamano === "Mediana"){
        precioBase = 5990;
        valorExtra = 800;
    }

    else if(tamano === "Grande"){
        precioBase = 8490;
        valorExtra = 1200;
    }

    let extras = 0;

    if(cantidadIngredientes > 3){
        extras = cantidadIngredientes - 3;
    }

    const precioUnitario = precioBase + (extras * valorExtra);

    const total = precioUnitario * cantidad;

    const pedido = {
        cliente,
        tamano,
        ingredientes,
        precioUnitario,
        cantidad,
        total
    };

    pedidoModel.agregarPedido(pedido);

    res.redirect("/pedidos");
}

function mostrarPedidos(req, res){

    const pedidos = pedidoModel.obtenerPedidos();

    let totalGeneral = 0;

    let filas = "";

    pedidos.forEach((pedido) => {

        totalGeneral += pedido.total;

        filas += `
            <tr>
                <td>${pedido.cliente}</td>
                <td>${pedido.tamano}</td>
                <td>${pedido.ingredientes.join(", ")}</td>
                <td>$${pedido.precioUnitario}</td>
                <td>${pedido.cantidad}</td>
                <td>$${pedido.total}</td>
            </tr>
        `;
    });

    const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Lista de pedidos</title>

        <style>

            body{
                font-family: Arial;
                background-color: #f4f4f4;
                padding: 20px;
            }

            table{
                width: 100%;
                border-collapse: collapse;
                background-color: white;
            }

            th, td{
                border: 1px solid black;
                padding: 10px;
                text-align: center;
            }

            th{
                background-color: #ff6b00;
                color: white;
            }

            h1{
                text-align: center;
            }

            .total{
                margin-top: 20px;
                font-size: 20px;
                font-weight: bold;
            }

            a{
                display: inline-block;
                margin-top: 20px;
            }

        </style>

    </head>

    <body>

        <h1>Lista de pedidos</h1>

        <table>

            <tr>
                <th>Nombre</th>
                <th>Tamaño</th>
                <th>Ingredientes</th>
                <th>Precio unitario</th>
                <th>Cantidad</th>
                <th>Total</th>
            </tr>

            ${filas}

        </table>

        <div class="total">
            Total acumulado: $${totalGeneral}
        </div>

        <a href="/">Volver al formulario</a>

    </body>
    </html>
    `;

    res.send(html);
}

module.exports = {
    registrarPedido,
    mostrarPedidos
};
