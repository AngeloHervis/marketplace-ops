import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Star,
  ArrowLeft,
  User,
  ChevronRight,
} from 'lucide-react';

const sidebarLinks = [
  { to: '/cliente/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/cliente/pedidos', label: 'Meus Pedidos', icon: ShoppingCart },
  { to: '/cliente/avaliacoes', label: 'Minhas Avaliacoes', icon: Star },
];

export function ClienteLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              Minha Conta
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Back to store */}
        <div className="p-3 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar a Loja
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {sidebarLinks.find((l) => l.to === location.pathname)?.label ||
                'Minha Conta'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Cliente Demo
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
