import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCurrentUser, calculateDiscount } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { CartItem } from '@/types';
import { pedidosApi, ApiItemPedido } from '@/lib/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getCurrentUser();
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    address: '',
    deliveryDate: '',
    deliveryTime: '',
    paymentMethod: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    const cartData = JSON.parse(localStorage.getItem('maniacookies_cart') || '[]');
    if (cartData.length === 0) {
      navigate('/carrinho');
      return;
    }
    setCart(cartData);
  }, [user, navigate]);

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discount = calculateDiscount(subtotal);
  const total = subtotal - discount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.address || !formData.deliveryDate || !formData.deliveryTime || !formData.paymentMethod) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Preencha todos os campos",
      });
      return;
    }

    try {
      // Converter os items do carrinho para o formato da API
      const items: ApiItemPedido[] = cart.map((item) => ({
        cookieId: item.product.id,
        sabor: item.product.dough,
        recheio: item.product.filling,
        preco: item.product.price,
        quantidade: item.quantity,
        observacao: item.observation,
      }));

      // Criar o pedido na API
      await pedidosApi.create({
        clienteEmail: user!.email,
        items,
        endereco: formData.address,
        dataEntrega: formData.deliveryDate,
        horarioEntrega: formData.deliveryTime,
        formaPagamento: formData.paymentMethod,
        subtotal,
        desconto: discount,
        total,
      });

      // Clear cart
      localStorage.setItem('maniacookies_cart', JSON.stringify([]));

      toast({
        title: "Pedido realizado com sucesso! 🎉",
        description: `Total: R$ ${total.toFixed(2)}. Entrega em ${formData.deliveryDate} às ${formData.deliveryTime}`,
      });

      navigate('/menu');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao realizar pedido",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
      });
    }
  };

  if (!user || cart.length === 0) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={cart.length} />
      
      <main className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Dados de Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço Completo</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Rua, número, complemento, bairro, cidade"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Data de Entrega</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Horário de Entrega</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.deliveryTime}
                      onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment">Forma de Pagamento</Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    >
                      <SelectTrigger id="payment">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dinheiro">Dinheiro</SelectItem>
                        <SelectItem value="pix">PIX</SelectItem>
                        <SelectItem value="debito">Cartão de Débito</SelectItem>
                        <SelectItem value="credito">Cartão de Crédito</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Confirmar Pedido
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-medium">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto (10%)</span>
                      <span>- R$ {discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xl font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-primary">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {user.cpf && (
              <Card className="mt-4 bg-green-50 border-green-200">
                <CardContent className="py-4">
                  <p className="text-sm text-green-700 font-medium">
                    ✓ Desconto de CPF aplicado!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
