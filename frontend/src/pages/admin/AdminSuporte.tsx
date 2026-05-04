import { useState, useEffect } from 'react';
import { MessageSquare, Mail, Package, Calendar, User } from 'lucide-react';
import { pedidoApi } from '../../services/api';
import {
  Card,
  CardContent,
  Loading,
  EmptyState,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui';
import type { PedidoSuporteDto } from '../../types';

export function AdminSuporte() {
  const [tickets, setTickets] = useState<PedidoSuporteDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pedidoApi.obterSuporte();
        setTickets(data);
      } catch {
        // Mock data
        setTickets([
          {
            pedidoId: 1,
            nomeCliente: 'Joao Silva',
            emailCliente: 'joao@email.com',
            nomeProduto: 'Notebook Pro',
            dataPedido: '2024-01-20T10:30:00',
          },
          {
            pedidoId: 4,
            nomeCliente: 'Ana Costa',
            emailCliente: 'ana@email.com',
            nomeProduto: 'Headset Wireless',
            dataPedido: '2024-01-19T11:15:00',
          },
          {
            pedidoId: 7,
            nomeCliente: 'Roberto Alves',
            emailCliente: 'roberto@email.com',
            nomeProduto: 'Teclado Mecanico',
            dataPedido: '2024-01-18T14:20:00',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading text="Carregando tickets..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-1">
          Tickets de Suporte
        </h2>
        <p className="text-muted-foreground">
          Pedidos que necessitam de atencao
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{tickets.length}</p>
              <p className="text-sm text-muted-foreground">Tickets Abertos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <User className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {new Set(tickets.map((t) => t.emailCliente)).size}
              </p>
              <p className="text-sm text-muted-foreground">Clientes Unicos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* List */}
      {tickets.length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="w-6 h-6 text-muted-foreground" />}
          title="Nenhum ticket de suporte"
          description="Todos os pedidos estao em dia."
        />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.pedidoId}>
                  <TableCell>
                    <span className="font-medium text-foreground">
                      #{ticket.pedidoId}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">
                        {ticket.nomeCliente}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{ticket.emailCliente}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Package className="w-4 h-4" />
                      <span>{ticket.nomeProduto}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(ticket.dataPedido).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
