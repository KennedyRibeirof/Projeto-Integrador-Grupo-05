const API_URL = 'http://localhost:3000';

export interface ApiCookie {
  id: string;
  sabor: string;
  recheio: string;
  preco: number;
}

export interface ApiItemPedido {
  cookieId: string;
  sabor: string;
  recheio: string;
  preco: number;
  quantidade: number;
  observacao?: string;
}

export interface ApiPedido {
  id: string;
  clienteEmail: string;
  items: ApiItemPedido[];
  endereco: string;
  dataEntrega: string;
  horarioEntrega: string;
  formaPagamento: string;
  subtotal: number;
  desconto: number;
  total: number;
  dataPedido: string;
}

export interface CreatePedidoData {
  clienteEmail: string;
  items: ApiItemPedido[];
  endereco: string;
  dataEntrega: string;
  horarioEntrega: string;
  formaPagamento: string;
  subtotal: number;
  desconto: number;
  total: number;
}

// Cookies API
export const cookiesApi = {
  getAll: async (): Promise<ApiCookie[]> => {
    const response = await fetch(`${API_URL}/cookies`);
    if (!response.ok) throw new Error('Erro ao buscar cookies');
    return response.json();
  },

  create: async (cookie: Omit<ApiCookie, 'id'>): Promise<ApiCookie> => {
    const response = await fetch(`${API_URL}/cookies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cookie),
    });
    if (!response.ok) throw new Error('Erro ao criar cookie');
    return response.json();
  },
};

// Pedidos API
export const pedidosApi = {
  getAll: async (): Promise<ApiPedido[]> => {
    const response = await fetch(`${API_URL}/pedidos`);
    if (!response.ok) throw new Error('Erro ao buscar pedidos');
    return response.json();
  },

  getByClienteEmail: async (email: string): Promise<ApiPedido[]> => {
    const response = await fetch(`${API_URL}/pedidos/cliente/${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error('Erro ao buscar pedidos do cliente');
    return response.json();
  },

  getById: async (id: string): Promise<ApiPedido> => {
    const response = await fetch(`${API_URL}/pedidos/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar pedido');
    return response.json();
  },

  create: async (pedido: CreatePedidoData): Promise<ApiPedido> => {
    const response = await fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar pedido');
    }
    return response.json();
  },
};
