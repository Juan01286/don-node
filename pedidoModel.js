const pedidos = [];

function agregarPedido(pedido){
    pedidos.push(pedido);
}

function obtenerPedidos(){
    return pedidos;
}

module.exports = {
    agregarPedido,
    obtenerPedidos
};
