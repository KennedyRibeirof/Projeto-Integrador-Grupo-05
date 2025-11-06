export interface ItemPedido {
    cookieId: string;
    sabor: string;
    recheio: string;
    preco: number;
    quantidade: number;
    observacao?: string;
}

export class Pedido {
    constructor(
        private id: string,
        private clienteEmail: string,
        private items: ItemPedido[],
        private endereco: string,
        private dataEntrega: string,
        private horarioEntrega: string,
        private formaPagamento: string,
        private subtotal: number,
        private desconto: number,
        private total: number,
        private dataPedido: Date
    ) {
        if (!clienteEmail) throw new Error("email do cliente obrigatório");
        if (!items || items.length === 0) throw new Error("pedido deve ter pelo menos um item");
        if (!endereco) throw new Error("endereço obrigatório");
        if (!dataEntrega) throw new Error("data de entrega obrigatória");
        if (!horarioEntrega) throw new Error("horário de entrega obrigatório");
        if (!formaPagamento) throw new Error("forma de pagamento obrigatória");
        if (total === undefined || total === null) throw new Error("total obrigatório");
    }

    static create(
        clienteEmail: string,
        items: ItemPedido[],
        endereco: string,
        dataEntrega: string,
        horarioEntrega: string,
        formaPagamento: string,
        subtotal: number,
        desconto: number,
        total: number
    ) {
        const id = crypto.randomUUID();
        const dataPedido = new Date();
        return new Pedido(
            id,
            clienteEmail,
            items,
            endereco,
            dataEntrega,
            horarioEntrega,
            formaPagamento,
            subtotal,
            desconto,
            total,
            dataPedido
        );
    }

    getId(): string {
        return this.id;
    }

    getClienteEmail(): string {
        return this.clienteEmail;
    }

    getItems(): ItemPedido[] {
        return this.items;
    }

    getEndereco(): string {
        return this.endereco;
    }

    getDataEntrega(): string {
        return this.dataEntrega;
    }

    getHorarioEntrega(): string {
        return this.horarioEntrega;
    }

    getFormaPagamento(): string {
        return this.formaPagamento;
    }

    getSubtotal(): number {
        return this.subtotal;
    }

    getDesconto(): number {
        return this.desconto;
    }

    getTotal(): number {
        return this.total;
    }

    getDataPedido(): Date {
        return this.dataPedido;
    }

    toJSON() {
        return {
            id: this.id,
            clienteEmail: this.clienteEmail,
            items: this.items,
            endereco: this.endereco,
            dataEntrega: this.dataEntrega,
            horarioEntrega: this.horarioEntrega,
            formaPagamento: this.formaPagamento,
            subtotal: this.subtotal,
            desconto: this.desconto,
            total: this.total,
            dataPedido: this.dataPedido
        };
    }
}
