import { cadastro } from "../model/Cliente";
import { app } from "../server"
import { ClienteService } from "../service/Cliente";

export function ClienteController() {
    const list: cadastro[] = [];
    const service = new ClienteService(list);
    
    app.get("/api/Clientes", (req, res) => {
       const clientes = service.getClientes();
       res.json(clientes);
    });

    app.post("/api/clientes", (req, res) => {
        try {
            const clienteData = req.body;
            const newCliente = service.createCliente(clienteData);
            res.status(201).json(newCliente);
        } catch (error) {
            res.status(400).json({
                message: "Erro ao criar cliente",
                error: error instanceof Error ? error.message : "Erro desconhecido"
            });
        }
    });
    
    app.get("/api/cliente/search", (req, res) => {
        const { nome, email, senha, telefone } = req.query;

        if (nome) {
            const cliente = service.getClienteByNome(nome as string);
            if (cliente) {
                return res.status(200).json(cliente);
            }
        }
        if(email) {
            const cliente = service.getClienteByEmail(email as string);
            if (cliente) {
                return res.status(200).json(cliente);
            }
        }
        if(telefone) {
            const cliente = service.getClienteByTelefone(telefone as string);
            if (cliente) {
                return res.status(200).json(cliente);
            }
        }

        return res.status(404).json({ message: "Cliente nao encontrado" });
    })

    app.post("/api/login", (req, res) => {
        try {
            const { usernameOrEmail, password } = req.body;

            if (!usernameOrEmail || !password) {
                return res.status(400).json({
                    message: "Usuário/email e senha são obrigatórios"
                });
            }

            const cliente = service.login(usernameOrEmail, password);

            if (cliente) {
                return res.status(200).json({
                    id: Date.now().toString(),
                    username: cliente.getNome(),
                    email: cliente.getEmail(),
                    telefone: cliente.getTelefone()
                });
            } else {
                return res.status(401).json({
                    message: "Usuário ou senha incorretos"
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Erro ao fazer login",
                error: error instanceof Error ? error.message : "Erro desconhecido"
            });
        }
    });

    app.post("/api/register", (req, res) => {
        try {
            const { username, email, password, telefone, cpf } = req.body;

            if (!username || !email || !password || !telefone) {
                return res.status(400).json({
                    message: "Nome, email, senha e telefone são obrigatórios"
                });
            }

            // Verificar se já existe
            const existingCliente = service.getClienteByEmail(email) || service.getClienteByNome(username);
            if (existingCliente) {
                return res.status(409).json({
                    message: "Usuário ou email já existe"
                });
            }

            const newCliente = service.createCliente({
                nome: username,
                email,
                senha: password,
                telefone
            });

            res.status(201).json({
                id: Date.now().toString(),
                username: newCliente.getNome(),
                email: newCliente.getEmail(),
                telefone: newCliente.getTelefone(),
                cpf: cpf || undefined
            });
        } catch (error) {
            res.status(400).json({
                message: "Erro ao criar cadastro",
                error: error instanceof Error ? error.message : "Erro desconhecido"
            });
        }
    });
}