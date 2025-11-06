import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { login, register } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import cookiesBanner from '@/assets/cookies-banner.jpg';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loginData, setLoginData] = useState({ usernameOrEmail: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    cpf: '' 
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(loginData.usernameOrEmail, loginData.password);
    
    if (user) {
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a), ${user.username}!`,
      });
      navigate('/menu');
    } else {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Usuário ou senha incorretos.",
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "As senhas não coincidem.",
      });
      return;
    }

    const success = register(
      registerData.username,
      registerData.email,
      registerData.password,
      registerData.cpf || undefined
    );

    if (success) {
      toast({
        title: "Cadastro realizado!",
        description: registerData.cpf 
          ? "Você receberá 10% de desconto em suas compras!"
          : "Faça login para continuar.",
      });
      setRegisterData({ username: '', email: '', password: '', confirmPassword: '', cpf: '' });
    } else {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "Usuário ou email já existe.",
      });
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${cookiesBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-chocolate bg-clip-text text-transparent mb-2">
            ManiaCookies
          </h1>
          <p className="text-lg text-foreground/80">Os melhores cookies artesanais</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Cadastro</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Entrar</CardTitle>
                <CardDescription>Entre com seu usuário ou email</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username">Usuário ou Email</Label>
                    <Input
                      id="login-username"
                      type="text"
                      value={loginData.usernameOrEmail}
                      onChange={(e) => setLoginData({ ...loginData, usernameOrEmail: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Entrar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Criar Conta</CardTitle>
                <CardDescription>Cadastre-se para fazer pedidos</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Nome de Usuário</Label>
                    <Input
                      id="register-username"
                      type="text"
                      value={registerData.username}
                      onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-cpf">CPF (Opcional - 10% desconto)</Label>
                    <Input
                      id="register-cpf"
                      type="text"
                      placeholder="000.000.000-00"
                      value={registerData.cpf}
                      onChange={(e) => setRegisterData({ ...registerData, cpf: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirmar Senha</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Cadastrar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-accent/50 backdrop-blur-sm rounded-lg text-center">
          <p className="font-semibold text-accent-foreground">🎉 Promoção Especial!</p>
          <p className="text-sm text-accent-foreground/80 mt-1">
            Cadastre seu CPF e ganhe 10% de desconto em todas as compras!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
