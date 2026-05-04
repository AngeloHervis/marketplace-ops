import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Package, Clock, ArrowRight } from 'lucide-react';
import { pedidoApi } from '../../services/api';
import {
  StatsCard,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  Loading,
} from '../../components/ui';
import type { Pedido } from '../../types';
import { PedidoStatus } from '../../types';

const USUARIO_DEMO_ID = 1;

export function ClienteDashboard() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pedidoApi.obterPorCliente(USUARIO_DEMO_ID);
        setPedidos(data);
      } catch {
        // Mock data
        setPedidos([
          { id: 1, usuarioId: 1, dataPedido: '2024-01-15T10:30:00', status: PedidoStatus.Enviado },
          { id: 2, usuarioId: 1, dataPedido: '2024-01-18T14:20:00', status: PedidoStatus.Pendente },
          { id: 3, usuarioId: 1, dataPedido: '2024-01-10T09:00:00', status: PedidoStatus.Cancelado },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusBadge = (status: PedidoStatus) => {
    const variants: Record<PedidoStatus, 'success' | 'warning' | 'destructive'> = {
      [PedidoStatus.Enviado]: 'success',
      [PedidoStatus.Pendente]: 'warning',
      [PedidoStatus.Cancelado]: 'destructive',
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const pedidosPendentes = pedidos.filter((p) => p.status === PedidoStatus.Pendente).length;
  const pedidosEnviados = pedidos.filter((p) => p.status === PedidoStatus.Enviado).length;

  if (loading) {
    return <Loading text="Carregando dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Bem-vindo de volta!
        </h2>
        <p className="text-muted-foreground">
          Acompanhe seus pedidos e gerencie suas avaliacoes.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={<ShoppingCart className="w-5 h-5 text-primary" />}
          label="Total de Pedidos"
          value={pedidos.length}
        />
        <StatsCard
          icon={<Clock className="w-5 h-5 text-warning" />}
          label="Pedidos Pendentes"
          value={pedidosPendentes}
        />
        <StatsCard
          icon={<Package className="w-5 h-5 text-success" />}
          label="Pedidos Enviados"
          value={pedidosEnviados}
        />
        <StatsCard
          icon={<Star className="w-5 h-5 text-primary" />}
          label="Avaliacoes Feitas"
          value={5}
        />
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pedidos Recentes</CardTitle>
          <Link to="/cliente/pedidos">
            <Button variant="ghost" size="sm">
              Ver Todos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {pedidos.slice(0, 3).map((pedido) => (
              <div
                key={pedido.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Package className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Pedido #{pedido.id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(pedido.dataPedido).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                {getStatusBadge(pedido.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/produtos" className="block">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Fazer Nova Compra</h3>
                <p className="text-sm text-muted-foreground">
                  Explore nossos produtos
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/cliente/avaliacoes" className="block">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Minhas Avaliacoes</h3>
                <p className="text-sm text-muted-foreground">
                  Gerencie suas avaliacoes
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
