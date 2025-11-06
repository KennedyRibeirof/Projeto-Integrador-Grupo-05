import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/auth';
import { CartItem } from '@/types';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getCurrentUser();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    loadCart();
  }, [user, navigate]);

  const loadCart = () => {
    const cartData = JSON.parse(localStorage.getItem('maniacookies_cart') || '[]');
    setCart(cartData);
  };

  const removeItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('maniacookies_cart', JSON.stringify(newCart));
    toast({
      title: "Item removido",
      description: "O item foi removido do carrinho",
    });
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={cart.length} />
      
      <main className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

        {cart.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
              <Button onClick={() => navigate('/menu')}>
                Ir para o Cardápio
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {cart.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Quantidade: {item.quantity} × R$ {item.product.price.toFixed(2)}
                      </p>
                      {item.observation && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Obs: {item.observation}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <p className="font-bold text-lg">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-accent/20">
              <CardContent className="p-6">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">R$ {total.toFixed(2)}</span>
                </div>
                {user.cpf && (
                  <p className="text-sm text-green-600 mt-2 text-right">
                    Você terá 10% de desconto no checkout!
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/menu')}
                className="flex-1"
              >
                Continuar Comprando
              </Button>
              <Button
                onClick={() => navigate('/checkout')}
                className="flex-1"
              >
                Finalizar Pedido
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
