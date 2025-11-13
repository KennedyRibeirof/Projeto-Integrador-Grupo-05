import { cadastro } from "../model/Cliente";

export class ClienteService {
    lista: cadastro[] = [];

    constructor(public armazenamento: cadastro[]) {
        this.lista = armazenamento;
    }

    createCliente(cliente: {
        nome: string;
        email: string;
        senha: string;
        telefone: string;
    }): cadastro {
        const clienteCreated = cadastro.create(
            cliente.nome,
            cliente.email,
            cliente.senha,
            cliente.telefone
        );
        this.lista.push(clienteCreated);
        return clienteCreated;
    }

    getClientes(): cadastro[] {
        return this.lista;
    }

    getClienteByNome(nome: string): cadastro | undefined {
        return this.lista.find((cliente) => cliente.getNome() === nome);
    }

    getClienteByEmail(email: string): cadastro | undefined {
        return this.lista.find((cliente) => cliente.getEmail() === email);
    }

    getClienteBySenha(senha: string): cadastro | undefined {
        return this.lista.find((cliente) => cliente.getSenha() === senha);
    }

    getClienteByTelefone(telefone: string): cadastro | undefined {
        return this.lista.find((cliente) => cliente.getTelefone() === telefone);
    }

    login(usernameOrEmail: string, password: string): cadastro | null {
        const cliente = this.lista.find(
            (c) => (c.getEmail() === usernameOrEmail || c.getNome() === usernameOrEmail) && c.getSenha() === password
        );
        return cliente || null;
    }
}