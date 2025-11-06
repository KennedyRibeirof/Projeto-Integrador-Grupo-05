import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { products } from '@/lib/products';
import { getCurrentUser } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus } from 'lucide-react';
import { CartItem } from '@/types';
import { formatDoughName, formatFillingName } from '@/lib/formatters';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getCurrentUser();
  
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const product = products.find(p => p.id === id);

  if (!product || !user) return null;

  const handleAddToCart = () => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('maniacookies_cart') || '[]');
    
    const existingItemIndex = cart.findIndex(
      item => item.product.id === product.id && item.observation === observation
    );

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ product, quantity, observation });
    }

    localStorage.setItem('maniacookies_cart', JSON.stringify(cart));

    toast({
      title: "Adicionado ao carrinho!",
      description: `${quantity} ${product.name} adicionado(s)`,
    });

    navigate('/carrinho');
  };

  const cartItems = JSON.parse(localStorage.getItem('maniacookies_cart') || '[]');

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={cartItems.length} />
      
      <main className="container py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="aspect-square rounded-lg overflow-hidden shadow-warm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">
                Massa de {formatDoughName(product.dough)} • Recheio de {formatFillingName(product.filling)}
              </p>
            </div>

            <p className="text-foreground/80">{product.description}</p>

            <div className="p-4 bg-accent/20 rounded-lg">
              <p className="text-3xl font-bold text-primary">
                R$ {product.price.toFixed(2)}
                <span className="text-sm text-muted-foreground ml-2">por unidade</span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observation">Observações (opcional)</Label>
                <Textarea
                  id="observation"
                  placeholder="Alguma modificação ou preferência especial?"
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="pt-4 space-y-3">
                <p className="text-lg font-semibold">
                  Total: R$ {(product.price * quantity).toFixed(2)}
                </p>
                <Button onClick={handleAddToCart} className="w-full" size="lg">
                  Adicionar ao Carrinho
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/menu')} 
                  className="w-full"
                >
                  Voltar ao Cardápio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Product;
