import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import cookiesHero from '@/assets/cookies-hero.jpg';
import { getCurrentUser } from '@/lib/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
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
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Sobre a ManiaCookies</h1>
            <p className="text-xl text-muted-foreground">
              Cookies artesanais feitos com amor e ingredientes selecionados
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-warm">
            <img
              src={cookiesHero}
              alt="ManiaCookies"
              className="w-full h-96 object-cover"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Nossa História</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/80">
              <p>
                A ManiaCookies nasceu do amor por cookies caseiros e da vontade de compartilhar
                momentos especiais com nossos clientes. Cada cookie é preparado artesanalmente,
                com ingredientes selecionados e muito carinho.
              </p>
              <p>
                Oferecemos duas opções de massa deliciosas - baunilha e chocolate - e quatro
                recheios irresistíveis: Nutella, Ninho, Maracujá e Beijinho. São 8 combinações
                únicas para você escolher!
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Nossos Diferenciais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Ingredientes de primeira qualidade</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Produção artesanal e fresca</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Opções de personalização</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Entrega rápida e segura</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Desconto especial para clientes cadastrados</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Massas</h4>
                  <p className="text-sm text-muted-foreground">
                    • Massa de Baunilha<br />
                    • Massa de Chocolate
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Recheios</h4>
                  <p className="text-sm text-muted-foreground">
                    • Nutella<br />
                    • Ninho<br />
                    • Maracujá<br />
                    • Beijinho
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Preço</h4>
                  <p className="text-sm text-muted-foreground">
                    R$ 3,00 por unidade<br />
                    <span className="text-green-600 font-medium">
                      + 10% desconto com CPF cadastrado
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-accent/20">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold mb-2">
                Cadastre seu CPF e Ganhe 10% de Desconto!
              </h3>
              <p className="text-muted-foreground">
                Válido para compras online e presenciais
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
