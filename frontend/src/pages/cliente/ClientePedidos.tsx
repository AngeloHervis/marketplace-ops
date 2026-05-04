import { useState, useEffect } from 'react';
import { ShoppingCart, Package, X, MapPin } from 'lucide-react';
import { pedidoApi } from '../../services/api';
import {
  Card,
  CardContent,
  Badge,
  Button,
  Loading,
  EmptyState,
  Modal,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui';
import type { Pedido } from '../../types';
import { PedidoStatus } from '../../types';

const USUARIO_DEMO_ID = 1;

export function ClientePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelando, setCancelando] = useState<number | null>(null);
  const [modalEndereco, setModalEndereco] = useState<Pedido | null>(null);
  const [novoEndereco, setNovoEndereco] = useState('');
  const [atualizando, setAtualizando] = useState(false);

  const fetchPedidos = async () => {
    try {
      const data = await pedidoApi.obterPorCliente(USUARIO_DEMO_ID);
      setPedidos(data);
    } catch {
      // Mock data
      setPedidos([
        { id: 1, usuarioId: 1, dataPedido: '2024-01-15T10:30:00', status: PedidoStatus.Enviado },
        { id: 2, usuarioId: 1, dataPedido: '2024-01-18T14:20:00', status: PedidoStatus.Pendente },
        { id: 3, usuarioId: 1, dataPedido: '2024-01-10T09:00:00', status: PedidoStatus.Cancelado },
        { id: 4, usuarioId: 1, dataPedido: '2024-01-20T16:45:00', status: PedidoStatus.Pendente },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleCancelar = async (pedidoId: number) => {
    if (!confirm('Tem certeza que deseja cancelar este pedido?')) return;
    
    setCancelando(pedidoId);
    try {
      await pedidoApi.cancelar(pedidoId, 1); // produtoId demo
      await fetchPedidos();
    } catch {
      // Mock update
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === pedidoId ? { ...p, status: PedidoStatus.Cancelado } : p
        )
      );
    } finally {
      setCancelando(null);
    }
  };

  const handleAtualizarEndereco = async () => {
    if (!modalEndereco || !novoEndereco.trim()) return;
    
    setAtualizando(true);
    try {
      await pedidoApi.atualizarEndereco(modalEndereco.id, novoEndereco);
      alert('Endereco atualizado com sucesso!');
    } catch {
      alert('Endereco atualizado (simulado)!');
    } finally {
      setAtualizando(false);
      setModalEndereco(null);
      setNovoEndereco('');
    }
  };

  const getStatusBadge = (status: PedidoStatus) => {
    const variants: Record<PedidoStatus, 'success' | 'warning' | 'destructive'> = {
      [PedidoStatus.Enviado]: 'success',
      [PedidoStatus.Pendente]: 'warning',
      [PedidoStatus.Cancelado]: 'destructive',
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  if (loading) {
    return <Loading text="Carregando pedidos..." />;
  }

  if (pedidos.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingCart className="w-6 h-6 text-muted-foreground" />}
        title="Nenhum pedido encontrado"
        description="Voce ainda nao realizou nenhum pedido."
        action={
          <Button onClick={() => window.location.href = '/produtos'}>
            Explorar Produtos
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">
          Meus Pedidos
        </h2>
        <p className="text-muted-foreground">
          Acompanhe e gerencie seus pedidos
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{pedidos.length}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">
              {pedidos.filter((p) => p.status === PedidoStatus.Pendente).length}
            </p>
            <p className="text-sm text-muted-foreground">Pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">
              {pedidos.filter((p) => p.status === PedidoStatus.Enviado).length}
            </p>
            <p className="text-sm text-muted-foreground">Enviados</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Acoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pedidos.map((pedido) => (
              <TableRow key={pedido.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                      <Package className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="font-medium">#{pedido.id}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(pedido.dataPedido).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                <TableCell>{getStatusBadge(pedido.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    {pedido.status === PedidoStatus.Pendente && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setModalEndereco(pedido);
                            setNovoEndereco('');
                          }}
                        >
                          <MapPin className="w-4 h-4" />
                          Endereco
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          loading={cancelando === pedido.id}
                          onClick={() => handleCancelar(pedido.id)}
                        >
                          <X className="w-4 h-4" />
                          Cancelar
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Modal Atualizar Endereco */}
      <Modal
        isOpen={!!modalEndereco}
        onClose={() => setModalEndereco(null)}
        title="Atualizar Endereco de Entrega"
      >
        <div className="space-y-4">
          <Input
            label="Novo Endereco"
            placeholder="Rua, numero, bairro, cidade..."
            value={novoEndereco}
            onChange={(e) => setNovoEndereco(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalEndereco(null)}>
              Cancelar
            </Button>
            <Button
              onClick={handleAtualizarEndereco}
              loading={atualizando}
              disabled={!novoEndereco.trim()}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
