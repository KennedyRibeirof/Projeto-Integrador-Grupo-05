import { cadastro } from "../model/Cliente";
import { app } from "../server"
import { ClienteService } from "../service/Cliente";

export function ClienteController() {
    const list: cadastro[] = [];
    const service = new ClienteService(list);
    
    app.get("/Clientes", (req, res) => {
       const clientes = service.getClientes();
       res.json(clientes);
    });

    app.post("clientes", (req, res) => {
         const clienteData = req.body;
        const newCliente = service.createCliente(clienteData)
        res.status(201).json(newCliente);
    })
    
    app.get("/cliente/search", (req, res) => {
        const { nome, email, senha } = req.query;

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

        return res.status(404).json({ message: "Cliente nao encontrado" });
    })
}