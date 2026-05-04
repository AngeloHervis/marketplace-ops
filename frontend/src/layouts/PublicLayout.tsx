import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Settings, Home, Package, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function PublicLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Inicio', icon: Home },
    { to: '/produtos', label: 'Produtos', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                MarketplaceOps
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                      ${
                        isActive
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link
                to="/cliente/dashboard"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <User className="w-4 h-4" />
                Area do Cliente
              </Link>
              <Link
                to="/admin/dashboard"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Admin
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                      ${
                        isActive
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-border space-y-2">
                <Link
                  to="/cliente/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Area do Cliente
                </Link>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Admin
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              2024 MarketplaceOps. Projeto de estudos.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Documentacao
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
