import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { getCurrentUser, logout } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

interface NavbarProps {
  cartItemsCount?: number;
}

export const Navbar = ({ cartItemsCount = 0 }: NavbarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to={user ? "/menu" : "/"} className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold bg-gradient-chocolate bg-clip-text text-transparent">
            ManiaCookies
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <Link to="/menu">
                <Button variant="ghost" size="sm">
                  Cardápio
                </Button>
              </Link>
              <Link to="/sobre">
                <Button variant="ghost" size="sm">
                  Sobre
                </Button>
              </Link>
              <Link to="/carrinho">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user.username}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
