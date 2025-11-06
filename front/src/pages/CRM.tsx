import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getCurrentUser } from '@/lib/auth';
import { pedidosApi, ApiPedido } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShoppingBag, Calendar, Clock, MapPin, CreditCard, DollarSign, Package, TrendingUp, Search } from 'lucide-react';

const CRM = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getCurrentUser();
  const [orders, setOrders] = useState<ApiPedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Redireciona se não houver usuário logado
    if (!user) {
      navigate('/');
      return;
    }

    // Carrega todos os pedidos (não apenas do cliente logado)
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await pedidosApi.getAll();
        // Ordenar por data mais recente
        const sortedOrders = data.sort((a, b) =>
          new Date(b.dataPedido).getTime() - new Date(a.dataPedido).getTime()
        );
        setOrders(sortedOrders);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar histórico",
          description: error instanceof Error ? error.message : "Tente novamente mais tarde",
        });
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []); // Dependências vazias para carregar apenas uma vez

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatPaymentMethod = (method: string) => {
    const methods: Record<string, string> = {
      'dinheiro': 'Dinheiro',
      'pix': 'PIX',
      'debito': 'Cartão de Débito',
      'credito': 'Cartão de Crédito',
    };
    return methods[method] || method;
  };

  const getClienteName = (email: string) => {
    // Extrai o nome do email (parte antes do @)
    return email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Filtrar pedidos por nome do cliente
  const filteredOrders = orders.filter(order =>
    getClienteName(order.clienteEmail).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular estatísticas
  const totalSales = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalItems = orders.reduce((sum, order) =>
    sum + order.items.reduce((itemSum, item) => itemSum + item.quantidade, 0), 0
  );

  if (!user) return null;

  const cartItems = JSON.parse(localStorage.getItem('maniacookies_cart') || '[]');

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={cartItems.length} />

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">CRM - Histórico de Pedidos</h1>
          <p className="text-muted-foreground">
            Acompanhe todos os pedidos realizados
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Cards de Estatísticas */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de Vendas
                  </CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalSales}</div>
                  <p className="text-xs text-muted-foreground">
                    pedidos realizados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Valor Recebido Total
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    em vendas totais
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de Itens
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalItems}</div>
                  <p className="text-xs text-muted-foreground">
                    cookies vendidos
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Campo de Pesquisa */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar por nome do cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {orders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Nenhum pedido encontrado
                  </p>
                  <button
                    onClick={() => navigate('/menu')}
                    className="text-primary hover:underline"
                  >
                    Ir para o Cardápio
                  </button>
                </CardContent>
              </Card>
            ) : filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Nenhum cliente encontrado com o nome "{searchTerm}"
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">
                            Pedido #{order.id.slice(0, 8)}
                          </CardTitle>
                          <p className="text-sm font-medium text-primary mt-1">
                            Cliente: {getClienteName(order.clienteEmail)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Realizado em {formatDate(order.dataPedido)}
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Confirmado
                        </Badge>
                      </div>
                    </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Items */}
                    <div>
                      <h3 className="font-semibold mb-2">Items do Pedido</h3>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-start text-sm bg-accent/20 p-3 rounded-md"
                          >
                            <div className="flex-1">
                              <p className="font-medium">
                                {item.quantidade}x Cookie de {item.sabor} com {item.recheio}
                              </p>
                              {item.observacao && (
                                <p className="text-muted-foreground text-xs mt-1">
                                  Obs: {item.observacao}
                                </p>
                              )}
                            </div>
                            <p className="font-medium ml-4">
                              R$ {(item.preco * item.quantidade).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detalhes da entrega */}
                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Endereço de Entrega</p>
                            <p className="text-sm text-muted-foreground">{order.endereco}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Data de Entrega</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(order.dataEntrega)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Horário de Entrega</p>
                            <p className="text-sm text-muted-foreground">{order.horarioEntrega}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CreditCard className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Forma de Pagamento</p>
                            <p className="text-sm text-muted-foreground">
                              {formatPaymentMethod(order.formaPagamento)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="pt-4 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>R$ {order.subtotal.toFixed(2)}</span>
                      </div>
                      {order.desconto > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Desconto</span>
                          <span>- R$ {order.desconto.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total</span>
                        <span className="text-primary">R$ {order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CRM;
