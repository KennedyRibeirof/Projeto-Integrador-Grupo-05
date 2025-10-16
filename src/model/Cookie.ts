export class Cookies {
    constructor(
        private id: string,
        private sabor: string,
        private recheio: string,
        private preco: number
    )   {
        if (!sabor) throw new Error("sabor obrigatório");
        if (!recheio) throw new Error("recheio obrigatório");
        if (preco === undefined || preco === null) throw new Error("preco obrigatório");
    }

    static create(sabor: string, recheio: string, preco: number) {
        const id = crypto.randomUUID();
        return new Cookies(id, sabor, recheio, preco);
    }

    getSabor(): string {
        return this.sabor;
    }

    getRecheio(): string {
        return this.recheio;
    }

    getPreco(): number {
        return this.preco;
    }
}