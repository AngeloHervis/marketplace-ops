import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  ArrowLeft,
  Settings,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';

const sidebarLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/produtos', label: 'Produtos', icon: Package },
  { to: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { to: '/admin/usuarios', label: 'Usuarios', icon: Users },
  { to: '/admin/suporte', label: 'Suporte', icon: MessageSquare },
];

export function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-destructive flex items-center justify-center">
              <Settings className="w-5 h-5 text-destructive-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              Admin Panel
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
                        ? 'bg-foreground text-background'
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
                'Administracao'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                <Settings className="w-4 h-4 text-destructive" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Administrador
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
