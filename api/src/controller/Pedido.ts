import { Pedido } from "../model/Pedido";
import { app } from "../server";
import { PedidoService } from "../service/Pedido";

export function PedidoController() {
    const list: Pedido[] = [];
    const service = new PedidoService(list);

    // Criar um novo pedido
    app.post("/pedidos", (req, res) => {
        try {
            const pedidoData = req.body;
            const newPedido = service.createPedido(pedidoData);
            res.status(201).json(newPedido.toJSON());
        } catch (error) {
            res.status(400).json({
                message: "Erro ao criar pedido",
                error: error instanceof Error ? error.message : "Erro desconhecido"
            });
        }
    });

    // Listar todos os pedidos
    app.get("/pedidos", (req, res) => {
        const pedidos = service.getPedidos();
        res.json(pedidos.map(p => p.toJSON()));
    });

    // Buscar pedidos por email do cliente
    app.get("/pedidos/cliente/:email", (req, res) => {
        const { email } = req.params;
        const pedidos = service.getPedidosByClienteEmail(email);
        res.json(pedidos.map(p => p.toJSON()));
    });

    // Buscar pedido por ID
    app.get("/pedidos/:id", (req, res) => {
        const { id } = req.params;
        const pedido = service.getPedidoById(id);

        if (pedido) {
            res.json(pedido.toJSON());
        } else {
            res.status(404).json({ message: "Pedido não encontrado" });
        }
    });
}
