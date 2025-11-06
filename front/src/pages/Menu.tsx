import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/products';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/lib/auth';

const Menu = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  const cartItems = JSON.parse(localStorage.getItem('maniacookies_cart') || '[]');

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={cartItems.length} />
      
      <main className="container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Nosso Cardápio</h1>
          <p className="text-muted-foreground">
            Escolha entre nossas deliciosas combinações de massa e recheio
          </p>
        </div>

        <div className="mb-6 p-4 bg-accent/30 rounded-lg text-center">
          <p className="text-sm">
            ✨ Cada cookie por apenas <span className="font-bold text-lg text-primary">R$ 3,00</span>
            {user.cpf && <span className="ml-2 text-green-600 font-semibold">+ 10% de desconto no checkout!</span>}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Menu;
