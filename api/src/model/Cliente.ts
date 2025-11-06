export class cadastro {
    constructor(
        private nome: string,
        private email: string,
        private senha: string,
    )  {
        if (!nome) throw new Error("nome obrigatório");
        if (!email) throw new Error("email obrigatório");
        if (!senha) throw new Error("senha obrigatória");

        if (nome.length < 3) throw new Error("nome muito curto");
        if (senha.length < 6) throw new Error("senha muito curta");
    } 

    static create(nome: string, email: string, senha: string,) {
        const id = crypto.randomUUID();
        return new cadastro(nome, email, senha);
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
}