import { Link } from 'react-router-dom';
import { ArrowRight, Package, ShoppingCart, Star, Users, Zap, Shield } from 'lucide-react';
import { Button } from '../../components/ui';

const features = [
  {
    icon: Package,
    title: 'Gestao de Produtos',
    description: 'Controle completo do catalogo com estoque em tempo real.',
  },
  {
    icon: ShoppingCart,
    title: 'Processamento de Pedidos',
    description: 'Acompanhe pedidos do inicio ao fim com status detalhado.',
  },
  {
    icon: Star,
    title: 'Sistema de Avaliacoes',
    description: 'Clientes podem avaliar produtos com notas e comentarios.',
  },
  {
    icon: Users,
    title: 'Gerenciamento de Usuarios',
    description: 'Controle de clientes e administradores do sistema.',
  },
  {
    icon: Zap,
    title: 'API RESTful',
    description: 'Backend robusto com .NET e Dapper para alta performance.',
  },
  {
    icon: Shield,
    title: 'Seguranca',
    description: 'Autenticacao e autorizacao com diferentes niveis de acesso.',
  },
];

const stats = [
  { value: '4', label: 'Entidades Principais' },
  { value: '15+', label: 'Endpoints API' },
  { value: '100%', label: 'TypeScript' },
  { value: 'SQL', label: 'Server Database' },
];

export function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Zap className="w-4 h-4" />
          Projeto de Estudos Full Stack
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          MarketplaceOps
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
          Sistema completo de gerenciamento de marketplace com CRUD de produtos,
          pedidos, usuarios e avaliacoes. Backend em .NET com Dapper e frontend
          em React.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/produtos">
            <Button size="lg">
              Ver Produtos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/admin/dashboard">
            <Button variant="outline" size="lg">
              Acessar Admin
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-lg p-6 text-center"
          >
            <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Funcionalidades do Sistema
          </h2>
          <p className="text-muted-foreground">
            Um sistema completo para estudo de desenvolvimento full stack
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Explore as Areas do Sistema
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          Navegue entre a area do cliente para ver pedidos e avaliacoes, ou
          acesse o painel administrativo para gerenciar todo o sistema.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/cliente/dashboard">
            <Button variant="secondary">
              <Users className="w-4 h-4" />
              Area do Cliente
            </Button>
          </Link>
          <Link to="/admin/dashboard">
            <Button>
              <Package className="w-4 h-4" />
              Painel Admin
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
