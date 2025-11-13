import { randomUUID } from "node:crypto";

export class cadastro {
    constructor(
        private nome: string,
        private email: string,
        private senha: string,
        private telefone: string,
    )  {
        if (!nome) throw new Error("nome obrigatório");
        if (!email) throw new Error("email obrigatório");
        if (!senha) throw new Error("senha obrigatória");
        if (!telefone) throw new Error("telefone obrigatório");

        if (nome.length < 3) throw new Error("nome muito curto");
        if (senha.length < 6) throw new Error("senha muito curta");
        if (telefone.length < 10) throw new Error("telefone inválido");
    }

    static create(nome: string, email: string, senha: string, telefone: string) {
        const id = randomUUID();
        return new cadastro(nome, email, senha, telefone);
    }

    getNome(): string {
        return this.nome;
    }

    getEmail(): string {
        return this.email;
    }

    getSenha(): string {
        return this.senha;
    }

    getTelefone(): string {
        return this.telefone;
    }
}