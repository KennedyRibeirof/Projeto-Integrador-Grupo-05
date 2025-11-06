import { HelpCircle, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t bg-card/50 backdrop-blur mt-16">
      <div className="container py-8 px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Atendimento ao Cliente
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Suporte Técnico da Empresa - Central de Ajuda
            </p>
            <a 
              href="mailto:maniacookiesuporte@gmail.com"
              className="text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Mail className="h-4 w-4" />
              maniacookiesuporte@gmail.com
            </a>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} ManiaCookies. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
