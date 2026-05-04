import { useState, useEffect } from 'react';
import { ShoppingCart, Clock, CheckCircle, XCircle, Filter } from 'lucide-react';
import { pedidoApi } from '../../services/api';
import {
  Card,
  CardContent,
  Badge,
  Button,
  Loading,
  EmptyState,
  Select,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui';
import type { PedidoStatusCountDto } from '../../types';
import { PedidoStatus } from '../../types';

interface PedidoAdmin {
  id: number;
  usuarioId: number;
  usuarioNome: string;
  dataPedido: string;
  status: PedidoStatus;
  produtoNome: string;
}

export function AdminPedidos() {
  const [pedidos, setPedidos] = useState<PedidoAdmin[]>([]);
  const [statusCount, setStatusCount] = useState<PedidoStatusCountDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countData = await pedidoApi.obterContagemStatus();
        setStatusCount(countData);
      } catch {
        setStatusCount([
          { status: PedidoStatus.Pendente, quantidade: 12 },
          { status: PedidoStatus.Enviado, quantidade: 45 },
          { status: PedidoStatus.Cancelado, quantidade: 5 },
        ]);
      }

      // Mock pedidos com mais detalhes
      setPedidos([
        { id: 1, usuarioId: 1, usuarioNome: 'Joao Silva', dataPedido: '2024-01-20T10:30:00', status: PedidoStatus.Pendente, produtoNome: 'Notebook Pro' },
        { id: 2, usuarioId: 2, usuarioNome: 'Maria Santos', dataPedido: '2024-01-19T14:20:00', status: PedidoStatus.Enviado, produtoNome: 'Mouse Gamer RGB' },
        { id: 3, usuarioId: 3, usuarioNome: 'Carlos Lima', dataPedido: '2024-01-18T09:00:00', status: PedidoStatus.Enviado, produtoNome: 'Monitor 27" 4K' },
        { id: 4, usuarioId: 1, usuarioNome: 'Joao Silva', dataPedido: '2024-01-17T16:45:00', status: PedidoStatus.Cancelado, produtoNome: 'Teclado Mecanico' },
        { id: 5, usuarioId: 4, usuarioNome: 'Ana Costa', dataPedido: '2024-01-16T11:15:00', status: PedidoStatus.Pendente, produtoNome: 'Headset Wireless' },
        { id: 6, usuarioId: 5, usuarioNome: 'Pedro Souza', dataPedido: '2024-01-15T08:30:00', status: PedidoStatus.Enviado, produtoNome: 'Webcam Full HD' },
      ]);
      
      setLoading(false);
    };
    fetchData();
  }, []);

  const getStatusBadge = (status: PedidoStatus) => {
    const config: Record<PedidoStatus, { variant: 'success' | 'warning' | 'destructive'; icon: typeof Clock }> = {
      [PedidoStatus.Pendente]: { variant: 'warning', icon: Clock },
      [PedidoStatus.Enviado]: { variant: 'success', icon: CheckCircle },
      [PedidoStatus.Cancelado]: { variant: 'destructive', icon: XCircle },
    };
    const { variant, icon: Icon } = config[status];
    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const pedidosFiltrados = filtroStatus
    ? pedidos.filter((p) => p.status === filtroStatus)
    : pedidos;

  if (loading) {
    return <Loading text="Carregando pedidos..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">
          Gestao de Pedidos
        </h2>
        <p className="text-muted-foreground">
          Acompanhe e gerencie todos os pedidos do sistema
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {statusCount.reduce((acc, s) => acc + s.quantidade, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        {statusCount.map((item) => (
          <Card key={item.status}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${
                item.status === PedidoStatus.Pendente
                  ? 'text-warning'
                  : item.status === PedidoStatus.Enviado
                  ? 'text-success'
                  : 'text-destructive'
              }`}>
                {item.quantidade}
              </p>
              <p className="text-sm text-muted-foreground">{item.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filtrar por:</span>
        </div>
        <Select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          options={[
            { value: '', label: 'Todos os Status' },
            { value: PedidoStatus.Pendente, label: 'Pendente' },
            { value: PedidoStatus.Enviado, label: 'Enviado' },
            { value: PedidoStatus.Cancelado, label: 'Cancelado' },
          ]}
          className="w-48"
        />
        {filtroStatus && (
          <Button variant="ghost" size="sm" onClick={() => setFiltroStatus('')}>
            Limpar Filtro
          </Button>
        )}
      </div>

      {/* Table */}
      {pedidosFiltrados.length === 0 ? (
        <EmptyState
          icon={<ShoppingCart className="w-6 h-6 text-muted-foreground" />}
          title="Nenhum pedido encontrado"
          description="Nao ha pedidos com o filtro selecionado."
        />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidosFiltrados.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell>
                    <span className="font-medium text-foreground">#{pedido.id}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{pedido.usuarioNome}</p>
                      <p className="text-xs text-muted-foreground">ID: {pedido.usuarioId}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{pedido.produtoNome}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(pedido.dataPedido).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell>{getStatusBadge(pedido.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
