import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  ShoppingCart,
  Users,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
} from 'lucide-react';
import { pedidoApi, produtoApi } from '../../services/api';
import {
  StatsCard,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  Loading,
  StarRating,
} from '../../components/ui';
import type { PedidoStatusCountDto, ProdutoDashboardDto } from '../../types';
import { PedidoStatus } from '../../types';

export function AdminDashboard() {
  const [statusCount, setStatusCount] = useState<PedidoStatusCountDto[]>([]);
  const [produtosRating, setProdutosRating] = useState<ProdutoDashboardDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusData, ratingData] = await Promise.all([
          pedidoApi.obterContagemStatus(),
          produtoApi.obterNotaMedia(),
        ]);
        setStatusCount(statusData);
        setProdutosRating(ratingData);
      } catch {
        // Mock data
        setStatusCount([
          { status: PedidoStatus.Pendente, quantidade: 12 },
          { status: PedidoStatus.Enviado, quantidade: 45 },
          { status: PedidoStatus.Cancelado, quantidade: 5 },
        ]);
        setProdutosRating([
          { produtoId: 1, nomeProduto: 'Notebook Pro', notaMedia: 4.8 },
          { produtoId: 2, nomeProduto: 'Mouse Gamer RGB', notaMedia: 4.5 },
          { produtoId: 3, nomeProduto: 'Monitor 27" 4K', notaMedia: 4.9 },
          { produtoId: 4, nomeProduto: 'Teclado Mecanico', notaMedia: 4.2 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusIcon = (status: PedidoStatus) => {
    switch (status) {
      case PedidoStatus.Pendente:
        return <Clock className="w-5 h-5 text-warning" />;
      case PedidoStatus.Enviado:
        return <CheckCircle className="w-5 h-5 text-success" />;
      case PedidoStatus.Cancelado:
        return <XCircle className="w-5 h-5 text-destructive" />;
    }
  };

  const totalPedidos = statusCount.reduce((acc, s) => acc + s.quantidade, 0);
  const pendentes = statusCount.find((s) => s.status === PedidoStatus.Pendente)?.quantidade || 0;
  const enviados = statusCount.find((s) => s.status === PedidoStatus.Enviado)?.quantidade || 0;

  if (loading) {
    return <Loading text="Carregando dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Painel de Controle
        </h2>
        <p className="text-muted-foreground">
          Visao geral do sistema MarketplaceOps
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={<ShoppingCart className="w-5 h-5 text-primary" />}
          label="Total de Pedidos"
          value={totalPedidos}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          icon={<Clock className="w-5 h-5 text-warning" />}
          label="Pedidos Pendentes"
          value={pendentes}
        />
        <StatsCard
          icon={<CheckCircle className="w-5 h-5 text-success" />}
          label="Pedidos Enviados"
          value={enviados}
        />
        <StatsCard
          icon={<Users className="w-5 h-5 text-primary" />}
          label="Usuarios Ativos"
          value={128}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Status de Pedidos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Status dos Pedidos</CardTitle>
            <Link to="/admin/pedidos">
              <Button variant="ghost" size="sm">
                Ver Todos
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {statusCount.map((item) => {
              const percentage = totalPedidos > 0
                ? Math.round((item.quantidade / totalPedidos) * 100)
                : 0;
              return (
                <div key={item.status} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className="text-sm font-medium text-foreground">
                        {item.status}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.quantidade} ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        item.status === PedidoStatus.Pendente
                          ? 'bg-warning'
                          : item.status === PedidoStatus.Enviado
                          ? 'bg-success'
                          : 'bg-destructive'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Top Produtos por Avaliacao */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Produtos por Avaliacao</CardTitle>
            <Link to="/admin/produtos">
              <Button variant="ghost" size="sm">
                Ver Todos
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {produtosRating.slice(0, 5).map((produto, index) => (
                <div
                  key={produto.produtoId}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                        <Package className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground">
                        {produto.nomeProduto}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={Math.round(produto.notaMedia)} readonly size="sm" />
                    <Badge variant="outline">{produto.notaMedia.toFixed(1)}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link to="/admin/produtos" className="block">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Gerenciar Produtos</h3>
                <p className="text-sm text-muted-foreground">
                  Estoque e precos
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/admin/usuarios" className="block">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Gerenciar Usuarios</h3>
                <p className="text-sm text-muted-foreground">
                  Clientes e admins
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/admin/suporte" className="block">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Tickets de Suporte</h3>
                <p className="text-sm text-muted-foreground">
                  Atendimento ao cliente
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
