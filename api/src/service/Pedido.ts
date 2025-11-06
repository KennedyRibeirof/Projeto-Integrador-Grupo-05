import { Pedido, ItemPedido } from "../model/Pedido";

export class PedidoService {
    lista: Pedido[] = [];

    constructor(public armazenamento: Pedido[]) {
        this.lista = armazenamento;
    }

    createPedido(pedidoData: {
        clienteEmail: string;
        items: ItemPedido[];
        endereco: string;
        dataEntrega: string;
        horarioEntrega: string;
        formaPagamento: string;
        subtotal: number;
        desconto: number;
        total: number;
    }): Pedido {
        const pedidoCreated = Pedido.create(
            pedidoData.clienteEmail,
            pedidoData.items,
            pedidoData.endereco,
            pedidoData.dataEntrega,
            pedidoData.horarioEntrega,
            pedidoData.formaPagamento,
            pedidoData.subtotal,
            pedidoData.desconto,
            pedidoData.total
        );
        this.lista.push(pedidoCreated);
        return pedidoCreated;
    }

    getPedidos(): Pedido[] {
        return this.lista;
    }

    getPedidosByClienteEmail(email: string): Pedido[] {
        return this.lista.filter((pedido) => pedido.getClienteEmail() === email);
    }

    getPedidoById(id: string): Pedido | undefined {
        return this.lista.find((pedido) => pedido.getId() === id);
    }
}
